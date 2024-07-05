import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });

  const close = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <IssueSummary
      open={open}
      closed={close}
      inProgress={inProgress}
    ></IssueSummary>
  );
}
