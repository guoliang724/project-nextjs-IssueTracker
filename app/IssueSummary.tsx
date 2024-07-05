import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Close Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {containers.map((c) => (
        <Card key={c.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${c.status}`}
            >
              {c.label}
            </Link>
          </Flex>
          <Text size="5" className="font-bold">
            {c.value}
          </Text>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
