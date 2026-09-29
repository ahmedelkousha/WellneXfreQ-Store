export type ScriptType = 'script' | 'inline' | 'external_url';
export type ScriptPlacement = 'head' | 'body_start' | 'body_end';
export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

export interface TrackingTool {
  id: string;
  name: string;
  type: ScriptType;
  placement: ScriptPlacement;
  noscriptPlacement?: ScriptPlacement; // Optional: where to put the noscript part
  category: ConsentCategory;
  content: string; // The script itself or the URL
  noscriptContent?: string; // Optional: the noscript fallback snippet
  enabled: boolean;
  createdAt?: any;
}
