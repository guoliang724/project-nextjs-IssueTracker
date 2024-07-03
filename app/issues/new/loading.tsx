import ErrorMessage from "@/app/components/ErrorMessage";
import { Callout, TextField, Button, Spinner, Box } from "@radix-ui/themes";
import axios from "axios";
import { error } from "console";
import { register } from "module";
import router from "next/router";
import React from "react";
import { Controller } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import loading from "../loading";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;
