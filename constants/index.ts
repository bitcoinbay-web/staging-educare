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

export const contractAddress = "0xa1A5c9E37B4fc8a5d2d8C2C397acCB792dEe2362"