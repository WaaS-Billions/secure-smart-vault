
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, localhost } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi';

// Get projectId from environment variable
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

export const config = createConfig({
  chains: [mainnet, sepolia, localhost],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
});

// Initialize web3modal
export const web3Modal = createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chainImages: {},
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#3B82F6',
  },
});

export default config;
