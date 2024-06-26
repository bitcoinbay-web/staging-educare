"use client";

import React, { ReactNode } from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";
import { config } from "./config";

// const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
const projectId = 'd7249a66e952859b00d83dc41da38c85'

if (!projectId) throw new Error("Project ID is not defined");

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional
});

export const ContextProvider = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // configure as per your needs
          },
        },
      })
  );

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
export default ContextProvider;
