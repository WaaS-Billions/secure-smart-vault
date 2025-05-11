
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// Use import.meta.env instead of process.env for Vite applications
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// Configure Sepolia as the default network
export const config = createConfig({
  chains: [
    sepolia,
    mainnet
  ],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http()
  }
});

export default config;
