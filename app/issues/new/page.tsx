"use client";
import React from "react";
import { TextField, TextArea, Button } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Titile"></TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit a new Issue</Button>
    </div>
  );
};

export default NewIssuePage;
