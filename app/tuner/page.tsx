import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
export default function TunerPage() {
  return (
    <form className="grid w-full justify-center items-center gap-6 overflow-auto p-4 pt-0">
      <fieldset className="grid  w-[20rem] gap-12 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Create Model</legend>
        <div className="grid gap-3">
          <Label htmlFor="model">Tune</Label>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="temperature">Max Number of Sale (Years)</Label>
          <Slider defaultValue={[0]} max={100} step={1} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="top-p">Demand Uncertainity</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="field1" />
            <label
              htmlFor="field1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Field 1
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="field2" />
            <label
              htmlFor="field2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Field 2
            </label>
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="top-k">Demand Distribution</Label>
          <Select>
            <SelectTrigger
              id="model"
              className="items-start [&_[data-description]]:hidden"
            >
              <SelectValue placeholder="Select a Distribution" />
            </SelectTrigger>

            <SelectContent>
              {["Distribution1", "Distribution2", "Distribution3"].map(
                (m, index) => {
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
                },
              )}
            </SelectContent>
          </Select>
        </div>
        <Button variant={"outline"}>Create Model</Button>
      </fieldset>
    </form>
  );
}
