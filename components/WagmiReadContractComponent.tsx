"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { abi } from '@/constants/educareNFTABI';
import { Button } from './ui/button';

import { contractAddress } from "@/constants/index"

const WagmiReadContractComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenURI, setTokenURI] = useState<string>('');
  const [tokenId, setTokenId] = useState<number>(0);
  const { address, isConnected } = useAccount();

  const { data: tokenIdData, isError: tokenIdError, refetch: refetchTokenId } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'tokenOfOwnerByIndex',
    args: [address, BigInt(0)],
    // enabled: false, // disable automatic fetching
  });

  const { data: tokenURIData, isError: tokenURIError, refetch: refetchTokenURI } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
    // enabled: false, // disable automatic fetching
  });

  useEffect(() => {
    if (!address) return;

    setIsLoading(true);
    refetchTokenId();
  }, [address, refetchTokenId]);

  useEffect(() => {
    if (tokenIdData && !tokenIdError) {
      setTokenId(Number(tokenIdData));
      refetchTokenURI();
    } else {
      setIsLoading(false);
    }
  }, [tokenIdData, tokenIdError, refetchTokenURI]);

  useEffect(() => {
    if (tokenURIData && !tokenURIError) {
      setTokenURI(tokenURIData as string);
    }
    setIsLoading(false);
  }, [tokenURIData, tokenURIError]);

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
