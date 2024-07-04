"use client";

import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import React from "react";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || ""}>
            {status.value}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueFilter;
