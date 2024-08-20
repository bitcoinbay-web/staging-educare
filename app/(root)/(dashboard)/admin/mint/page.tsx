import WagmiSafeMint from "@/components/WagmiSafeMint";
import WagmiWriteContractComponent from "@/components/WagmiWriteContractComponent";
import React from "react";

const Mint = () => {
  return (
    <>
      <div className="pt-10 pl-20 ml-64 h-full">
        <h1>Work in Progress</h1>
        <WagmiSafeMint />
        <WagmiWriteContractComponent />
      </div>
    </>
  );
};

export default Mint;
