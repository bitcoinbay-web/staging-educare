"use client";

// Import necessary modules and components
import { useState, FormEvent } from 'react';
import { useAccount, useWaitForTransactionReceipt, useReadContract, useWriteContract } from 'wagmi';
import { abi } from '@/constants/educareNFTABI';
import { network, contractAddress } from "@/constants";
import Loader from './Loader'; // Import the Loader component

// Define the SafeMint component
function SafeMint() {
  // Get the user's account address
  const { address } = useAccount();
  
  // Read the contract owner's address
  const { data: ownerAddress } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'owner',
  });

  // Define state for transaction hash, error, and contract writing status
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Define state for recipient address, token ID, and URI
  const [recipient, setRecipient] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [uri, setUri] = useState('');
  // Define state to track loading state for token URI
  const [isLoadingTokenURI, setIsLoadingTokenURI] = useState(false);

  // Read the token URI from the contract
  const { data: tokenUriData, refetch: refetchTokenUri } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
    // enabled: false, // disable automatic fetching
  });

  // Handle form submission
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Check if the user is the contract owner
    if (address !== ownerAddress) {
      alert('Only the contract owner can mint tokens.');
      return;
    }

    // Set loading state to true and refetch token URI
    setIsLoadingTokenURI(true);
    const { data } = await refetchTokenUri();
    setIsLoadingTokenURI(false); // Set loading state to false after fetching data

    // Check if the token ID already exists with a valid URI
    if (data) {
      alert('Token ID already exists with a valid URI.');
      return;
    }

    // Write the contract to mint the token
    writeContract({
      address: contractAddress,
      abi,
      functionName: 'safeMint',
      args: [recipient, BigInt(tokenId), uri],
    });
  }

  // Render the component UI
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
          {isPending || isLoadingTokenURI ? 'Loading...' : 'Mint'}
        </button>
      </form>
      {isLoadingTokenURI && <Loader />} {/* Render Loader if loading */}
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && 'Waiting for confirmation...'}
      {isConfirmed && 'Transaction confirmed.'}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

export default SafeMint;
