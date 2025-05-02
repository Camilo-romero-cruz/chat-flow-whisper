
import { useState } from "react";
import { 
  Dialog, 
  DialogContent,
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (apiKey: string) => void;
  apiKey: string;
}

export function ApiKeyModal({ open, onOpenChange, onSave, apiKey }: ApiKeyModalProps) {
  const [inputKey, setInputKey] = useState(apiKey || "");

  const handleSave = () => {
    onSave(inputKey);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>DeepSeek API Key</DialogTitle>
          <DialogDescription>
            Enter your DeepSeek API key to start chatting. Your API key will be stored locally in your browser.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apiKey" className="text-right">
              API Key
            </Label>
            <Input
              id="apiKey"
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="col-span-3"
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={!inputKey.trim()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
