import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./AssigneeSelect";
import AuthOptions from "@/app/auth/AuthOptions";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const sessions = await getServerSession(AuthOptions);

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {sessions && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id}></EditIssueButton>
            <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generatemetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    descrition: "Details of issue" + issue?.id,
  };
}
