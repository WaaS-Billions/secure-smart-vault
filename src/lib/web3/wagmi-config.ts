
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, localhost } from 'wagmi/chains';

// Use import.meta.env instead of process.env for Vite applications
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

export const config = createConfig({
  chains: [
    mainnet,
    sepolia,
    localhost
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http()
  }
});

export default config;
