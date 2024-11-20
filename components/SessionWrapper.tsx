"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const SessionWrapper = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  return <SessionProvider session={session} refetchInterval={300}>{children}</SessionProvider>;
};

export default SessionWrapper;
