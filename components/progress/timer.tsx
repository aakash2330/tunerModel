"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function progressColors({ progress }: { progress: number }) {
  if (progress == 100) {
    return "[&>*]:bg-green-400";
  } else if (progress > 60) {
    return "[&>*]:bg-orange-400";
  } else {
    return "[&>*]:bg-white";
  }
}

export function ProgressTimer({ progress }: { progress: number }) {
  return (
    <Progress
      value={progress}
      className={cn(`${progressColors({ progress })} h-1 transition-all`)}
    />
  );
}
