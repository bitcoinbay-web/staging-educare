"use client";

// Import necessary modules and components
import React, { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { abi } from '@/constants/educareNFTABI';
import { Button } from './ui/button';
import { contractAddress, network } from "@/constants/index";

// Define the main component
const WagmiWriteContractComponent: React.FC = () => {
  // State for storing token ID and new token URI
  const [tokenId, setTokenId] = useState<number>(0);
  const [newTokenURI, setNewTokenURI] = useState<string>('');
  // Destructure address and connection status from useAccount hook
  const { address, isConnected } = useAccount();

  // Destructure write contract function and statuses from useWriteContract hook
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check if wallet is connected
    if (isConnected) {
      // Call writeContract to update the token URI
      writeContract({
        abi,
        address: contractAddress,
        functionName: 'setTokenURI',
        args: [BigInt(tokenId), newTokenURI],
        onSuccess: (data) => {
          console.log('Success:', data);
        },
        onError: (error) => {
          console.error('Error:', error);
        },
        chain: network.sepolia,
        account: address
      });
    } else {
      alert('Please connect your wallet.');
    }
  };

  // Render the component UI
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Token URI</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tokenId">Token ID:</label>
          <input
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="number"
            id="tokenId"
            value={tokenId}
            onChange={(e) => setTokenId(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="newTokenURI">New Token URI:</label>
          <input
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            id="newTokenURI"
            value={newTokenURI}
            onChange={(e) => setNewTokenURI(e.target.value)}
          />
        </div>
        <Button className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="submit" disabled={isPending}>
          {isPending ? 'Updating...' : 'Update Token URI'}
        </Button>
      </form>
      {/* Display success message */}
      {isSuccess && <p>Token URI updated successfully!</p>}
      {/* Display error message */}
      {error && <p>Error updating token URI: {error.message}</p>}
    </div>
  );
};

export default WagmiWriteContractComponent;
