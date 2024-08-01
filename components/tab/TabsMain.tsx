import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { run } from "node:test";
import { ProgressTimer } from "../progress/timer";
import { useEffect } from "react";
import { artificialDelay } from "@/actions/artificialDelay";
import { TprocessType } from "@/types/types";
import { ResultDashboard } from "../dashboard/resultDashboard";

export function TabsResults({
  runningModels,
}: {
  runningModels: TprocessType[] | undefined;
}) {
  return (
    <Tabs
      defaultValue={!!runningModels?.length ? runningModels[0].processId : ""}
    >
      <TabsList className="w-full flex justify-evenly gap-2 overflow-y-auto">
        {runningModels?.map((process, index) => {
          return (
            <TabsTrigger
              className="w-full flex gap-1 flex-col"
              key={process.processId + index}
              value={process.processId}
              disabled={process.progress == 100 ? false : true}
            >
              {process.processId}
              <ProgressTimer progress={process.progress}></ProgressTimer>
            </TabsTrigger>
          );
        })}
      </TabsList>
      {runningModels?.map((process, index) => {
        return (
          <TabsContent
            key={process.processId + index}
            value={process.processId}
          >
            <ResultDashboard runningModel={process}></ResultDashboard>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
