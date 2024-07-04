"use client";

import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusType = Object.values(Status);
  const handleValueChange = (status: Status) => {
    const _status = statusType.includes(status) ? status : "";

    const params = new URLSearchParams();

    if (_status) params.append("status", _status);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);

    const query = params.size ? "?" + params.toString() : "";
    router.push("/issues/list/" + query);
  };
  return (
    <Select.Root
      onValueChange={handleValueChange}
      defaultValue={searchParams.get("status") || "All"}
    >
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
