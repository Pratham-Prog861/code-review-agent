"use client";

import { Textarea } from "@/components/ui/textarea";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function CodeEditor({ code, onChange, disabled }: CodeEditorProps) {
  return (
    <div className="w-full h-full flex flex-col bg-muted/20">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 group">
            <div className="w-3 h-3 rounded-full bg-red-400/80 group-hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80 group-hover:bg-amber-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-400/80 group-hover:bg-green-500 transition-colors" />
          </div>
          <span className="text-xs font-medium text-muted-foreground ml-3 border-l pl-3">
            editor.tsx
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
            {code.length} chars
          </div>
        </div>
      </div>
      <Textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder="// Paste your code here for intelligent review..."
        className="flex-1 min-h-100 font-mono text-sm resize-none border-0 focus-visible:ring-0 p-6 leading-relaxed bg-transparent selection:bg-indigo-100 dark:selection:bg-indigo-900/30"
        disabled={disabled}
        spellCheck={false}
      />
    </div>
  );
}
