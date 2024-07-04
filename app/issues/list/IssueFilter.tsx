"use client";

import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueFilter = () => {
  const router = useRouter();
  const statusType = Object.values(Status);
  const handleValueChange = (status: Status) => {
    const query = statusType.includes(status) ? `?status=${status}` : "";
    router.push("/issues/list/" + query);
  };
  return (
    <Select.Root onValueChange={handleValueChange}>
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "All"}>
            {status.value}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
