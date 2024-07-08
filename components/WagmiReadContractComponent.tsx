"use client";

// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { abi } from '@/constants/educareNFTABI';
import { Button } from './ui/button';

import { contractAddress } from "@/constants/index"

// Define the component
const WagmiReadContractComponent: React.FC = () => {
  // State to manage loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State to store the token URI
  const [tokenURI, setTokenURI] = useState<string>('');
  // State to store the token ID
  const [tokenId, setTokenId] = useState<number>(0);
  // Destructure address and isConnected from useAccount hook
  const { address, isConnected } = useAccount();

  // Hook to read the token ID from the contract
  const { data: tokenIdData, isError: tokenIdError, refetch: refetchTokenId } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'tokenOfOwnerByIndex',
    args: [address, BigInt(0)],
    // enabled: false, // disable automatic fetching
  });

  // Hook to read the token URI from the contract
  const { data: tokenURIData, isError: tokenURIError, refetch: refetchTokenURI } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
    // enabled: false, // disable automatic fetching
  });

  // Effect to refetch token ID when address changes
  useEffect(() => {
    if (!address) return;

    setIsLoading(true);
    refetchTokenId();
  }, [address, refetchTokenId]);

  // Effect to refetch token URI when token ID data changes
  useEffect(() => {
    if (tokenIdData && !tokenIdError) {
      setTokenId(Number(tokenIdData));
      refetchTokenURI();
    } else {
      setIsLoading(false);
    }
  }, [tokenIdData, tokenIdError, refetchTokenURI]);

  // Effect to update token URI and loading state when token URI data changes
  useEffect(() => {
    if (tokenURIData && !tokenURIError) {
      setTokenURI(tokenURIData as string);
    }
    setIsLoading(false);
  }, [tokenURIData, tokenURIError]);

  // Render the component UI
  return (
    <div>
      {isConnected && (
        <div>
          {isLoading && <div>Loading...</div>}
          {!isLoading && tokenURI && <div>Onboarding Status: {tokenURI}</div>}
          {!isLoading && !tokenURI && <div>No token found for the address.</div>}
        </div>
      )}
    </div>
  );
};

export default WagmiReadContractComponent;
