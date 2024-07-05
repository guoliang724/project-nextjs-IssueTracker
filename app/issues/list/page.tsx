import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issueCount = await prisma.issue.count({
    where: { status: searchParams.status },
  });

  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues}></IssueTable>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      ></Pagination>
    </Flex>
  );
};

export default IssuesPage;
