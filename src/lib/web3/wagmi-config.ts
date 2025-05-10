
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia, localhost } from 'wagmi/chains';

// Get projectId from environment variable
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

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
