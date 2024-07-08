"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Service = {
  id: string;
  name: string;
  status: "pending" | "processing" | "success" | "failed";
  stdID: string;
};

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "stdID",
    header: "StdID",
  },
  {
    accessorKey: "name",
    header: "Service Provider",
  },
];
