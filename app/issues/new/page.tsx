"use client";

import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Titile"></TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit a new Issue</Button>
    </div>
  );
};

export default NewIssuePage;
