import { useEffect, useState } from 'react';

import { promises as fs } from 'fs';
import hre from "hardhat";

export const useGetContractInfo = () => {
  const [contract, setContract] = useState(true)
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   first
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  

  return { isLoading }
}

