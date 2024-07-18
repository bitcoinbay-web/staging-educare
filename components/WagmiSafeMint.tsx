"use client";

import { useState, FormEvent } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { abi } from "@/constants/educareNFTABI";
import { network, contractAddress } from "@/constants";
import Loader from "./Loader"; // Import the Loader component

function SafeMint() {
  const { address } = useAccount();
  const { data: ownerAddress } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "owner",
  });

  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const [recipient, setRecipient] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [uri, setUri] = useState("");
  const [isLoadingTokenURI, setIsLoadingTokenURI] = useState(false); // New state to track loading state

  const { data: tokenUriData, refetch: refetchTokenUri } = useReadContract({
    address: contractAddress,
    abi,
    functionName: "tokenURI",
    args: [BigInt(tokenId)],
    // enabled: false, // disable automatic fetching
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (address !== ownerAddress) {
      alert("Only the contract owner can mint tokens.");
      return;
    }

    setIsLoadingTokenURI(true); // Set loading state to true
    const { data } = await refetchTokenUri();
    setIsLoadingTokenURI(false); // Set loading state to false after fetching data

    if (data) {
      alert("Token ID already exists with a valid URI.");
      return;
    }

    writeContract({
      address: contractAddress,
      abi,
      functionName: "safeMint",
      args: [recipient, BigInt(tokenId), uri],
      chain: network.sepolia,
      account: address,
    });

    // if (safeMint) {
    //   safeMint();
    // }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Safe Mint</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Recipient Address:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Token ID:</label>
          <input
            type="number"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">URI:</label>
          <input
            type="text"
            value={uri}
            onChange={(e) => setUri(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isPending || isLoadingTokenURI} // Disable button if loading
          className="border border-blue-500 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isPending || isLoadingTokenURI ? "Loading..." : "Mint"}
        </button>
      </form>
      {isLoadingTokenURI && <Loader />} {/* Render Loader if loading */}
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && "Waiting for confirmation..."}
      {isConfirmed && "Transaction confirmed."}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

export default SafeMint;
