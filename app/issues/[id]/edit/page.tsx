import "easymde/dist/easymde.min.css";
import { z } from "zod";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const NewIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return <IssueForm issue={issue}></IssueForm>;
};

export default NewIssuePage;
