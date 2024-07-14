"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Download,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Payment[] = [
  {
    id: 1,
    year: "2000",
    num_vehicles: "num_vehicles_1",
    type: "type_1",
    fuel: "fuel_1",
    distance_bucket: "distance_bucket_1",
    distance_per_vehicle: "distance_per_vehicle_1",
  },
  {
    id: 2,
    year: "2001",
    num_vehicles: "num_vehicles_2",
    type: "type_2",
    fuel: "fuel_2",
    distance_bucket: "distance_bucket_2",
    distance_per_vehicle: "distance_per_vehicle_2",
  },
  {
    id: 3,
    year: "2002",
    num_vehicles: "num_vehicles_3",
    type: "type_3",
    fuel: "fuel_3",
    distance_bucket: "distance_bucket_3",
    distance_per_vehicle: "distance_per_vehicle_3",
  },
  {
    id: 4,
    year: "2003",
    num_vehicles: "num_vehicles_4",
    type: "type_4",
    fuel: "fuel_4",
    distance_bucket: "distance_bucket_4",
    distance_per_vehicle: "distance_per_vehicle_4",
  },
  {
    id: 5,
    year: "2004",
    num_vehicles: "num_vehicles_5",
    type: "type_5",
    fuel: "fuel_5",
    distance_bucket: "distance_bucket_5",
    distance_per_vehicle: "distance_per_vehicle_5",
  },
  {
    id: 6,
    year: "2005",
    num_vehicles: "num_vehicles_6",
    type: "type_6",
    fuel: "fuel_6",
    distance_bucket: "distance_bucket_6",
    distance_per_vehicle: "distance_per_vehicle_6",
  },
];

export type Payment = {
  id: number;
  year: string;
  num_vehicles: string;
  type: string;
  fuel: string;
  distance_bucket: string;
  distance_per_vehicle: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "year",
    header: "year",
    cell: ({ row }) => <div className="capitalize">{row.getValue("year")}</div>,
  },
  {
    accessorKey: "num_vehicles",
    header: "num_vehicles",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("num_vehicles")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "type",
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "fuel",
    header: "fuel",
    cell: ({ row }) => <div className="capitalize">{row.getValue("fuel")}</div>,
  },
  {
    accessorKey: "distance_bucket",
    header: "distance_bucket",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("distance_bucket")}</div>
    ),
  },
  {
    accessorKey: "distance_per_vehicle",
    header: "distance_per_vehicle",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("distance_per_vehicle")}</div>
    ),
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center py-4">
        <Input
          placeholder="Filter num_vehicles..."
          value={
            (table.getColumn("num_vehicles")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("num_vehicles")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline">Advance Filters</Button>

        <Button
          variant="outline"
          size="sm"
          className="ml-auto self-end gap-1.5 text-sm"
        >
          <Download className="size-3.5" />
          Download as CSV
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
