"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const Redirect = ({ to }: { to: string }) => {
    const router = useRouter();

    useEffect(() => {
      router.push(to);
    }, [to, router]);

    return null;
  };
  return <Redirect to="/" />;
};

export default Page;
