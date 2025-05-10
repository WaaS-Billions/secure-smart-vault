
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, localhost } from 'wagmi/chains';
import { defaultWagmiConfig } from '@web3modal/ethereum';

// Get projectId from environment variable
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// Create wagmi config
export const config = defaultWagmiConfig({
  projectId,
  chains: [mainnet, sepolia, localhost],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
  metadata: {
    name: 'Secure Smart Vault',
    description: 'Non-custodial smart wallet with MPC features',
    url: 'https://securevault.example.com', 
    icons: ['https://securevault.example.com/icon.png']
  }
});

export default config;
