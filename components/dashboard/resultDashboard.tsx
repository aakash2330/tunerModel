"use client";
import { artificialDelay } from "@/actions/artificialDelay";
import { TprocessType } from "@/types/types";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";

export function ResultDashboard({
  runningModel,
}: {
  runningModel: TprocessType;
}) {
  const [result, setResult] = useState("loading");
  useEffect(() => {
    if (runningModel.progress == 100) {
      artificialDelay().then(() => {
        setResult("result fetched");
      });
    }
  }, [runningModel]);
  return (
    <div className="h-[100vh] flex flex-col gap-2">
      <div className="flex gap-2">
        <CustomDashboardCard></CustomDashboardCard>
        <CustomDashboardCard></CustomDashboardCard>
        <CustomDashboardCard></CustomDashboardCard>
        <CustomDashboardCard></CustomDashboardCard>
      </div>
      <div className="flex gap-2">
        <Card className="h-[30rem] w-[60%]  p-10">Card</Card>
        <Card className="h-[30rem] p-10 flex-1">Card</Card>
      </div>
    </div>
  );
}

function CustomDashboardCard() {
  return <Card className="p-10 flex-1">Card</Card>;
}
