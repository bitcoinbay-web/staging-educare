import { mainnet, sepolia } from '@wagmi/core/chains'

export const sidebarLinks = [
  {
    label: 'Home',
    route: '/',
    imgUrl: '/icons/home.svg',
  },
  {
    label: 'dashboard',
    route: '/studentdashboard',
    imgUrl: '/icons/upcoming.svg',
  },
  {
    label: 'register',
    route: '/register',
    imgUrl: '/icons/previous.svg',
  },
  {
    label: 'admin',
    route: '/admin',
    imgUrl: '/icons/previous.svg',
  },
];

export const network = {
  "mainnet": mainnet,
  "sepolia": sepolia
}

// Update contract address here - currently deployed on Sepolia Testnet
export const contractAddress = "0xd184ee1AE307a6597DbE148e57BdDF9F2d62014E"