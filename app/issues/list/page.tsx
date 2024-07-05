import React from "react";
import { Table } from "@radix-ui/themes";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import prisma from "@/prisma/client";
import { IssueStatusBadge } from "../../components";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import { Issue } from "@prisma/client";
import Pagination from "@/app/components/Pagination";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const orderBy = columns.map((c) => c.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status: searchParams.status },
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((c) => (
              <Table.ColumnHeaderCell key={c.label} className={c.className}>
                <Link href={{ query: { ...searchParams, orderBy: c.value } }}>
                  {c.label}
                </Link>
                {c.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={100}
      ></Pagination>
    </div>
  );
};

export default IssuesPage;
