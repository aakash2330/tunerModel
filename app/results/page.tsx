import { Dashboard } from "@/components/playground";
import { DataTableDemo } from "@/components/table/page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Download } from "lucide-react";

export default function TestPage() {
  return (
    <>
      <div
        className="relative hidden flex-col w-[25%] items-start gap-8 md:flex"
        x-chunk="dashboard-03-chunk-0"
      >
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid  rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
            <div className="grid gap-3">
              <Label htmlFor="model">Model</Label>
              <Select>
                <SelectTrigger
                  id="model"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>

                <SelectContent>
                  {["model1", "model2", "model3"].map((m, index) => {
                    return (
                      <SelectItem key={index} value={m}>
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <div className="grid gap-0.5">
                            <span className="font-medium text-foreground">
                              {m}
                            </span>
                            <p className="text-xs" data-description>
                              {m}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </fieldset>
        </form>
      </div>
      <DataTableDemo></DataTableDemo>
    </>
  );
}
