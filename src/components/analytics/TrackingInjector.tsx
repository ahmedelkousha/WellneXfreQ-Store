import { useEffect, useRef, useState } from "react";
import { useTrackingTools } from "@/hooks/useTracking";
import { getStoredConsent, ConsentValue } from "@/components/analytics/ConsentBanner";

/**
 * Parses a script string, which may be:
 * - A raw JS snippet: `console.log("hello")`
 * - A full HTML script tag with src: `<script src="https://..."></script>`
 * - A full HTML script tag with inline code: `<script>console.log("hello")</script>`
 *
 * Returns: { content: string, isExternal: boolean }
 */
/**
 * Parses a snippet string and determines how to inject it.
 * It can be a script URL, a script tag, or a general HTML fragment (like a noscript iframe).
 */
function parseSnippet(raw: string): { content: string; isExternal: boolean; isHtml: boolean } {
  const trimmed = raw.trim();

  // If it's a <script src="..."> tag
  const srcMatch = trimmed.match(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i);
  if (srcMatch) {
    return { content: srcMatch[1], isExternal: true, isHtml: false };
  }

  // If it's a <script>...</script> tag
  const inlineMatch = trimmed.match(/<script\b[^>]*>([\s\S]*?)<\/script>/im);
  if (inlineMatch) {
    return { content: inlineMatch[1].trim(), isExternal: false, isHtml: false };
  }

  // If it has other HTML tags (<iframe>, <noscript>, <img>, etc.)
  if (/<(iframe|noscript|img|div|span|style|link)\b[^>]*>/i.test(trimmed)) {
    // If it's a noscript tag, we extract the inside or just inject it as is
    // Browser will ignore noscript content anyway if JS is on, so we should 
    // probably extract the inner content if we want it to work for users with JS.
    // However, user specifically asked to add the "noscript" snippet, so we'll inject the whole thing.
    return { content: trimmed, isExternal: false, isHtml: true };
  }

  // Plain URL (no tags)
  if (/^https?:\/\//i.test(trimmed)) {
    return { content: trimmed, isExternal: true, isHtml: false };
  }

  // Raw JS code (default if no tags found)
  return { content: trimmed, isExternal: false, isHtml: false };
}

export default function TrackingInjector() {
  const { data: tools = [] } = useTrackingTools();
  const injectedTools = useRef<Map<string, { element: HTMLElement; content: string }>>(new Map());


  useEffect(() => {
    const enabledTools = tools.filter((t) => t.enabled);
    const enabledIds = new Set(enabledTools.map((t) => t.id));

    // Remove disabled/deleted tools
    injectedTools.current.forEach((val, id) => {
      const toolId = id.split("-")[0];
      if (!enabledIds.has(toolId)) {
        val.element.remove();
        injectedTools.current.delete(id);
        console.log(`[Tracking] Removed tool: ${id}`);
      }
    });

    // Helper to inject a snippet
    const injectSnippet = (snippetRaw: string, placement: string, toolId: string, subId: string, toolName: string) => {
      if (!snippetRaw) return;
      const { content, isExternal, isHtml } = parseSnippet(snippetRaw);

      // We need a unique ID for the injected tool map
      const fullId = `${toolId}-${subId}`;
      const existing = injectedTools.current.get(fullId);

      if (existing && existing.content === content) return;

      if (existing) {
         existing.element.remove();
         injectedTools.current.delete(fullId);
      }

      try {
        let element: HTMLElement;

        if (isHtml) {
          element = document.createElement("span");
          element.id = `tracking-${fullId}`;
          const fragment = document.createRange().createContextualFragment(content);
          element.appendChild(fragment);
        } else {
          const script = document.createElement("script");
          script.id = `tracking-${fullId}`;
          script.async = true;

          if (isExternal || snippetRaw.startsWith('http')) {
            script.src = content;
          } else {
            script.text = content;
          }
          element = script;
        }

        if (placement === "head") {
          document.head.appendChild(element);
        } else if (placement === "body_start") {
          document.body.insertBefore(element, document.body.firstChild);
        } else {
          document.body.appendChild(element);
        }

        injectedTools.current.set(fullId, { element, content });
        console.log(`[Tracking] Injected ${isHtml ? 'HTML' : 'Script'} (${subId}): ${toolName}`);
      } catch (err) {
        console.error(`[Tracking] Failed to inject ${toolName} (${subId}):`, err);
      }
    };

    // Inject or update tools
    enabledTools.forEach((tool) => {
      // Inject main content
      injectSnippet(tool.content ?? "", tool.placement, tool.id, "main", tool.name);
      
      // Inject noscript content if it exists
      if (tool.noscriptContent) {
        injectSnippet(tool.noscriptContent, tool.noscriptPlacement || "body_start", tool.id, "noscript", tool.name);
      }
    });
  }, [tools]);

  return null;
}
