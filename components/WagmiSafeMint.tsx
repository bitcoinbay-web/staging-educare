'use client'

import { useState, FormEvent } from 'react'
import { parseEther } from 'viem'
import { useAccount, useWaitForTransactionReceipt, useReadContract, useWriteContract } from 'wagmi'
import { abi } from '@/constants/tempABI';
import { network, contractAddress } from "@/constants";

// const contractAddress = '0xaB238839D44bc09B5090b85B7F1305cC1eef28b6';

function SafeMint() {
  const { address } = useAccount();
  const { data: ownerAddress } = useReadContract({
    address: contractAddress,
    abi,
    functionName: 'owner',
  });

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [recipient, setRecipient] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [uri, setUri] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (address !== ownerAddress) {
      alert('Only the contract owner can mint tokens.');
      return;
    }
    writeContract({
      address: contractAddress,
      abi,
      functionName: 'safeMint',
      args: [recipient, BigInt(tokenId), uri],
    });
  }

  return (
    <div>
      <h2>Safe Mint</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Recipient Address:
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Token ID:
            <input
              type="number"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            URI:
            <input
              type="text"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Minting...' : 'Mint'}
        </button>
      </form>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && 'Waiting for confirmation...'}
      {isConfirmed && 'Transaction confirmed.'}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

export default SafeMint;
