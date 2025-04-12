"use client";
import { Button } from "@mui/material";
import NextLink from "next/link";
import Head from "next/head";

export default function Page404() {
  return (
    <>
      <Head>
        <title> not found Page </title>
      </Head>
      <div className="text-center pt-10">
        <h1 className="mb-8"> 404 not found Page</h1>
        <Button component={NextLink} href="/" size="large" variant="contained">
          home
        </Button>
      </div>
    </>
  );
}
