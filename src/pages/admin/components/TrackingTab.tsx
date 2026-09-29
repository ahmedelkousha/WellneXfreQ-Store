import { useState } from "react";

import { 
  useTrackingTools, 
  useAddTrackingTool, 
  useUpdateTrackingTool, 
  useDeleteTrackingTool 
} from "@/hooks/useTracking";
import { TrackingTool, ScriptPlacement } from "@/types/tracking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Edit2, Trash2, Loader2, Eye, EyeOff, Code, Tags, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";




export default function TrackingTab() {
  const { toast } = useToast();
  const { data: trackingTools = [], isLoading } = useTrackingTools();
  const addTracking = useAddTrackingTool();
  const updateTracking = useUpdateTrackingTool();
  const deleteTracking = useDeleteTrackingTool();


  const [editingTrackingId, setEditingTrackingId] = useState<string | null>(null);
  const [deletingTrackingId, setDeletingTrackingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'gtm' | 'custom'>('custom');

  // GTM + Custom both use trackingFormData
  const [trackingFormData, setTrackingFormData] = useState<Partial<TrackingTool>>({
    name: "Custom Script",
    type: "inline",
    placement: "head",
    noscriptPlacement: "body_start",
    category: "analytics",
    content: "",
    noscriptContent: "",
    enabled: true,
  });

  const startAddTool = (mode: 'gtm' | 'custom') => {
    setActiveTab(mode);
    setEditingTrackingId("new");
    // Both modes use trackingFormData — reset to clean state
    setTrackingFormData({
      name: mode === 'gtm' ? "Google Tag Manager" : "Custom Script",
      type: "inline",
      placement: "head",
      noscriptPlacement: "body_start",
      category: "analytics",
      content: "",
      noscriptContent: "",
      enabled: true,
    });
  };

  const startEditTracking = (tool: TrackingTool) => {
    setEditingTrackingId(tool.id);
    const isGtm = tool.name.toLowerCase().includes('gtm') || tool.name.toLowerCase().includes('google tag manager');
    setActiveTab(isGtm ? 'gtm' : 'custom');
    setTrackingFormData({ ...tool });
  };

  const handleSaveTracking = async () => {
    try {
      if (activeTab === 'gtm') {
        if (!trackingFormData.content) {
          toast({ title: "Missing snippet", description: "Please paste your GTM snippet.", variant: "destructive" });
          return;
        }
        // Extract GTM ID for a clean display name
        const idMatch = trackingFormData.content.match(/['"]GTM-([A-Z0-9]+)['"]/i);
        const gtmLabel = idMatch ? `GTM-${idMatch[1]}` : "GTM";
        const payload: Partial<TrackingTool> = {
          name: `Google Tag Manager (${gtmLabel})`,
          type: "inline",
          placement: trackingFormData.placement || "head",
          noscriptPlacement: trackingFormData.noscriptPlacement || "body_start",
          category: "analytics",
          content: trackingFormData.content,
          noscriptContent: trackingFormData.noscriptContent || "",
          enabled: true,
        };
        if (editingTrackingId === "new") {
          await addTracking.mutateAsync(payload as any);
          toast({ title: "GTM Added", description: `Container ${gtmLabel} is now active.` });
        } else if (editingTrackingId) {
          await updateTracking.mutateAsync({ ...payload, id: editingTrackingId } as TrackingTool);
          toast({ title: "GTM Updated", description: "Changes saved successfully." });
        }
      } else {
        if (!trackingFormData.name || !trackingFormData.content) {
          toast({ title: "Validation Error", description: "Please fill in the Name and Script Content.", variant: "destructive" });
          return;
        }
        if (editingTrackingId === "new") {
          await addTracking.mutateAsync(trackingFormData as any);
          toast({ title: "Script Added", description: `${trackingFormData.name} is now active.` });
        } else if (editingTrackingId) {
          await updateTracking.mutateAsync({ ...trackingFormData, id: editingTrackingId } as TrackingTool);
          toast({ title: "Script Updated", description: "Changes saved successfully." });
        }
      }
      setEditingTrackingId(null);
    } catch (err) {
      console.error("Tracking save error:", err);
      toast({ title: "Error", description: "Failed to save tracking tool.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Tracking & Analytics</h2>
          <p className="text-white/40 text-sm">Manage GTM and custom scripts for your site.</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> All scripts are active
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => startAddTool('gtm')} className="gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
            <Tags className="w-4 h-4" /> Add GTM
          </Button>
          <Button onClick={() => startAddTool('custom')} className="gap-2 bg-white/5 text-white border border-white/10 hover:bg-white/10">
            <Code className="w-4 h-4" /> Add Custom Script
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid gap-6">
          {trackingTools.map((tool) => (
            <motion.div
              key={tool.id}
              className={`bg-card border ${tool.enabled ? 'border-primary/20 bg-primary/5' : 'border-white/10'} p-6 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4`}
            >
              <div className="flex gap-4 items-center">
                <div className={`p-3 rounded-xl ${tool.enabled ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/30'}`}>
                  {tool.name.toLowerCase().includes('gtm') || tool.name.toLowerCase().includes('google tag manager') ? <Tags className="w-5 h-5" /> : <Code className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {tool.name}
                    {!tool.enabled && <span className="text-[10px] bg-white/10 text-white/40 px-1.5 py-0.5 rounded uppercase tracking-widest font-bold">Disabled</span>}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">{tool.placement}</span>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">{tool.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="text-white/40 hover:text-white" onClick={() => updateTracking.mutate({ ...tool, enabled: !tool.enabled })}>
                  {tool.enabled ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button size="sm" variant="outline" className="border-white/10 text-white/70 hover:bg-white/5" onClick={() => startEditTracking(tool)}>
                  <Edit2 className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={deleteTracking.isPending}
                  onClick={async () => {
                    setDeletingTrackingId(tool.id);
                    try {
                      await deleteTracking.mutateAsync(tool.id);
                      toast({ title: "Deleted", description: "Tool removed." });
                    } finally {
                      setDeletingTrackingId(null);
                    }
                  }}
                >
                  {deletingTrackingId === tool.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </Button>
              </div>
            </motion.div>
          ))}
          {trackingTools.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 text-white/30">
              <p>No scripts added yet.</p>
            </div>
          )}
        </div>
      )}

      {/* TRACKING EDITOR DIALOG */}
      <Dialog open={editingTrackingId !== null} onOpenChange={(open) => !open && setEditingTrackingId(null)}>
        <DialogContent className="bg-background border-white/10 text-white max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {activeTab === 'gtm' ? <Tags className="text-primary w-6 h-6" /> : <Code className="text-white w-6 h-6" />}
              {editingTrackingId === 'new' ? (activeTab === 'gtm' ? 'Add Google Tag Manager' : 'Add Custom Script') : 'Edit Script'}
            </DialogTitle>
            <DialogDescription className="text-white/40">
              {activeTab === 'gtm' ? 'Enter your GTM snippets and choose their placements.' : 'Configure your custom tracking script.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {activeTab === 'gtm' ? (
              /* ─── GTM MODE ─── */
              <div className="space-y-6">
                {/* Main Script Section */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-primary font-bold uppercase tracking-wider text-[10px]">1. Main GTM Snippet</Label>
                    <div className="flex items-center gap-2">
                       <Label className="text-[10px] text-white/40">Placement:</Label>
                       <Select value={trackingFormData.placement || "head"} onValueChange={(val: ScriptPlacement) => setTrackingFormData({ ...trackingFormData, placement: val })}>
                        <SelectTrigger className="bg-black/40 border-white/10 text-white h-7 text-[10px] w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                          <SelectItem value="head">Inside &lt;head&gt;</SelectItem>
                          <SelectItem value="body_start">Top of &lt;body&gt;</SelectItem>
                          <SelectItem value="body_end">Bottom of &lt;body&gt;</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Textarea
                    placeholder={`Paste the main GTM script:\n<script>(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>`}
                    value={trackingFormData.content || ''}
                    onChange={(e) => setTrackingFormData({ ...trackingFormData, content: e.target.value })}
                    className="bg-black/20 border-white/10 font-mono text-xs min-h-[120px]"
                  />
                </div>

                {/* Noscript Section */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-white/60 font-bold uppercase tracking-wider text-[10px]">2. Noscript Fallback (Optional)</Label>
                    <div className="flex items-center gap-2">
                       <Label className="text-[10px] text-white/40">Placement:</Label>
                       <Select value={trackingFormData.noscriptPlacement || "body_start"} onValueChange={(val: ScriptPlacement) => setTrackingFormData({ ...trackingFormData, noscriptPlacement: val })}>
                        <SelectTrigger className="bg-black/40 border-white/10 text-white h-7 text-[10px] w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                          <SelectItem value="head">Inside &lt;head&gt;</SelectItem>
                          <SelectItem value="body_start">Top of &lt;body&gt;</SelectItem>
                          <SelectItem value="body_end">Bottom of &lt;body&gt;</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Textarea
                    placeholder={`Paste the noscript snippet:\n<!-- Google Tag Manager (noscript) -->\n<noscript><iframe src="..." ...></iframe></noscript>`}
                    value={trackingFormData.noscriptContent || ''}
                    onChange={(e) => setTrackingFormData({ ...trackingFormData, noscriptContent: e.target.value })}
                    className="bg-black/20 border-white/10 font-mono text-xs min-h-[100px]"
                  />
                </div>
              </div>
            ) : (
              /* ─── CUSTOM SCRIPT MODE ─── */
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white/60">Name / Identifier</Label>
                  <Input
                    placeholder="Meta Pixel, LinkedIn Pixel, etc."
                    value={trackingFormData.name || ''}
                    onChange={(e) => setTrackingFormData({ ...trackingFormData, name: e.target.value })}
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/60">Placement</Label>
                  <Select value={trackingFormData.placement || "head"} onValueChange={(val: ScriptPlacement) => setTrackingFormData({ ...trackingFormData, placement: val })}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white w-full">
                      <SelectValue placeholder="Where to inject?" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                      <SelectItem value="head">Inside &lt;head&gt; (Standard)</SelectItem>
                      <SelectItem value="body_start">Top of &lt;body&gt;</SelectItem>
                      <SelectItem value="body_end">Bottom of &lt;body&gt;</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/60">Script Code / HTML Snippet</Label>
                  <Textarea
                    placeholder={`Paste anything:\nhttps://pixel.example.com/track.js\n<script src="...">\n<noscript><iframe src="..."></noscript>`}
                    value={trackingFormData.content || ''}
                    onChange={(e) => setTrackingFormData({ ...trackingFormData, content: e.target.value })}
                    className="bg-white/5 border-white/10 font-mono text-xs min-h-[150px]"
                  />
                  <p className="text-[10px] text-white/30 italic">Accepts: raw URL, full &lt;script&gt; tags, or HTML snippets (like GTM noscript).</p>
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-6 border-t border-white/10">
              <Button variant="ghost" onClick={() => setEditingTrackingId(null)} className="text-white/60">Cancel</Button>
              <Button
                onClick={handleSaveTracking}
                className="bg-primary text-black font-bold px-8 rounded-full"
                disabled={addTracking.isPending || updateTracking.isPending}
              >
                {(addTracking.isPending || updateTracking.isPending) ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {editingTrackingId === 'new' ? 'Add' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
