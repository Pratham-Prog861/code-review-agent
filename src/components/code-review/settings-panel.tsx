"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { LANGUAGE_CONTEXTS } from "@/lib/constants";

interface SettingsPanelProps {
  language: string;
  setLanguage: (val: string) => void;
  depth: "quick" | "standard" | "thorough";
  setDepth: (val: "quick" | "standard" | "thorough") => void;
  useCompression: boolean;
  setUseCompression: (val: boolean) => void;
  disabled?: boolean;
}

export function SettingsPanel({
  language,
  setLanguage,
  depth,
  setDepth,
  useCompression,
  setUseCompression,
  disabled,
}: SettingsPanelProps) {
  const languages = Object.keys(LANGUAGE_CONTEXTS).map(
    (l) => l.charAt(0).toUpperCase() + l.slice(1),
  );

  return (
    <Card className="border-none shadow-none bg-muted/20">
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label>Language</Label>
          <Select
            value={language}
            onValueChange={setLanguage}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang.toLowerCase()}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Review Depth</Label>
          <Select
            value={depth}
            onValueChange={(val) =>
              setDepth(val as "quick" | "standard" | "thorough")
            }
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Depth" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quick">Quick Scan</SelectItem>
              <SelectItem value="standard">Standard Review</SelectItem>
              <SelectItem value="thorough">Deep Analysis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-0.5">
            <Label>ScaleDown Compression</Label>
            <div className="text-xs text-muted-foreground">
              Optimize context tokens
            </div>
          </div>
          <Switch
            checked={useCompression}
            onCheckedChange={setUseCompression}
            disabled={disabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}
