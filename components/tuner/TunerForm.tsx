"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import axios from "axios";

const formSchema = z.object({
  max_sale_year: z.number(),
  demand_uncertainty: z.enum(["Yes", "No"]),
  distribution: z.enum(["distribution1", "distribution2"]),
  fuel_cost_uncertainty: z.enum(["Yes", "No"]),
  bev_enforcement_year: z.number(),
  stringent_carbon_achiever_percent: z.number(),
  rsb_cost_decrease_for_evs: z.enum(["Yes", "No"]),
  rsb_on: z.array(z.object({ year: z.number(), location: z.string() })),
  bev_resiliency: z.object({
    no_of_standby_traditional_vehicles: z.number(),
    uptil_year: z.number(),
  }),
  vehicle_retention_policy: z.enum(["Risky", "Mild"]),
});

export default function ProfileForm() {
  const [bevSlider, setBevslider] = useState(5);
  const [saleSlider, setSaleSlider] = useState(10);
  const [stringentSlider, setStringentSlider] = useState(0);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      max_sale_year: 1,
      demand_uncertainty: "Yes",
      distribution: "distribution1",
      fuel_cost_uncertainty: "Yes",
      bev_enforcement_year: 2024,
      stringent_carbon_achiever_percent: 0,
      rsb_cost_decrease_for_evs: "Yes",
      rsb_on: [{ year: 2024, location: "location1" }],
      bev_resiliency: {
        no_of_standby_traditional_vehicles: 0,
        uptil_year: 2024,
      },
      vehicle_retention_policy: "Mild",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await axios.post("http://localhost:3001/tuner/data", {
      values
    })

    console.log(response);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[40rem]"
      >
        <FormField
          control={form.control}
          name="max_sale_year"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="temperature">Max Number of Sale </Label>
              <FormControl>
                <Slider
                  onChange={(e) => {
                    //@ts-ignore
                    setSaleSlider(e.target.value);
                  }}
                  min={10}
                  defaultValue={[10]}
                  max={100}
                  step={10}
                />
              </FormControl>
              <FormDescription>
                Max Number of Sale Years between 1-10
              </FormDescription>
              <FormDescription>
                Current Selection - {saleSlider / 10}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="demand_uncertainty"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Demand Uncertainity</FormLabel>
                <FormDescription>
                  Select whether you want to include Demand Uncertainity
                </FormDescription>
              </div>
              {["Yes", "No"].map((item, index) => (
                <FormField
                  key={item + index}
                  control={form.control}
                  name="demand_uncertainty"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item + index}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value == item}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange(item)
                                : field.onChange();
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="distribution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distribution</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    disabled={
                      form.getValues("demand_uncertainty") == "Yes"
                        ? false
                        : true
                    }
                  >
                    <SelectValue placeholder="Select Distribution" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["distribution1", "distribution2"].map((d, index) => {
                    return (
                      <SelectItem key={d + index} value={d}>
                        {d}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fuel_cost_uncertainty"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">
                  Fuel Cost Uncertainity
                </FormLabel>
                <FormDescription>
                  Select whether you want to include Fuel Cost Uncertainity{" "}
                </FormDescription>
              </div>
              {["Yes", "No"].map((item, index) => (
                <FormField
                  key={item + index}
                  control={form.control}
                  name="fuel_cost_uncertainty"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item + index}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value == item}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange(item)
                                : field.onChange();
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bev_enforcement_year"
          render={({ field }) => (
            <FormItem>
              <Label>BEV Enforcement Year</Label>

              <FormControl>
                <Slider
                  onChange={(e) => {
                    //@ts-ignore
                    setBevslider(e.target.value);
                  }}
                  defaultValue={[0]}
                  max={100}
                  step={5}
                />
              </FormControl>
              <FormDescription>
                BEV Enforcement Year (starts from 2023)
              </FormDescription>

              <FormDescription>
                Current Selection - {bevSlider / 5 + 2023}
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stringent_carbon_achiever_percent"
          render={({ field }) => (
            <FormItem>
              <Label>Stringent Carbon Achiever (%)</Label>

              <FormControl>
                <Slider
                  onChange={(e) => {
                    //@ts-ignore
                    setStringentSlider(e.target.value);
                  }}
                  defaultValue={[0]}
                  max={100}
                  step={5}
                />
              </FormControl>
              <FormDescription>
                Stringent Carbon Achiever Percentage
              </FormDescription>

              <FormDescription>
                Current Selection - {stringentSlider}%
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rsb_cost_decrease_for_evs"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">
                  Rerouting/SuddenBreakdown(RSB)
                </FormLabel>
                <FormDescription>
                  Rerouting/SuddenBreakdown(RSB) cost in the objective...(only
                  dependent on the year) - RSB will decrease from year to year
                  for EVs.(not appl LNG and Diesel)
                </FormDescription>
              </div>
              {["Yes", "No"].map((item, index) => (
                <FormField
                  key={item + index}
                  control={form.control}
                  name="rsb_cost_decrease_for_evs"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item + index}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value == item}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange(item)
                                : field.onChange();
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicle_retention_policy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Retention Policy</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vehicle Retention Policy" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Risky", "Mild"].map((d, index) => {
                    return (
                      <SelectItem key={d + index} value={d}>
                        {d}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
