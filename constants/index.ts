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

// export const contractAddress = "0xaB238839D44bc09B5090b85B7F1305cC1eef28b6"

export const contractAddress = "0xd184ee1AE307a6597DbE148e57BdDF9F2d62014E"