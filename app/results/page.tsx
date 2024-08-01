"use client";
import { artificialDelay } from "@/actions/artificialDelay";
import { TabsResults } from "@/components/tab/TabsMain";
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
import { TprocessType } from "@/types/types";
import { Download, Play } from "lucide-react";
import { run } from "node:test";
import { useState } from "react";

export default function TestPage() {
  const [selectedModel, setSelectedModel] = useState<string>();
  const [runningModels, setRunningModels] = useState<TprocessType[]>([]);
  console.log({ runningModels });

  function timerInterval({ processId }: { processId: string }) {
    const interval = setInterval(() => {
      setRunningModels((prev) => {
        const foundRunningModelIndex = prev.findIndex((process) => {
          return process.processId == processId;
        });
        if (prev[foundRunningModelIndex].progress >= 100) {
          clearInterval(interval);
          return prev;
        }
        if (foundRunningModelIndex != -1) {
          const updatedPrev = [...prev];
          updatedPrev[foundRunningModelIndex] = {
            ...updatedPrev[foundRunningModelIndex],
            progress: updatedPrev[foundRunningModelIndex].progress + 10,
          };
          return updatedPrev;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);
  }
  return (
    <div className=" h-[100vh] flex flex-col gap-5">
      <div
        className="relative hidden flex-col w-[25%] items-start gap-8 md:flex"
        x-chunk="dashboard-03-chunk-0"
      >
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid  rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <span>Model</span>
                {selectedModel && (
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => {
                      const processIdNew = selectedModel + Math.random();
                      setRunningModels((prev) => {
                        if (runningModels.length < 4) {
                          return [
                            ...prev,
                            {
                              processId: processIdNew,
                              progress: 0,
                            },
                          ];
                        } else {
                          alert("cannot run more than 4 models at a time");
                          return prev;
                        }
                      });

                      timerInterval({ processId: processIdNew });
                    }}
                  >
                    <Play></Play>
                  </Button>
                )}
              </div>
              <Select
                onValueChange={(value) => {
                  setSelectedModel(value);
                }}
              >
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
      <TabsResults runningModels={runningModels}></TabsResults>
    </div>
  );
}
