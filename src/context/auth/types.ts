
// Define auth context types
export type User = {
  id: string;
  email?: string;
  address?: string;
  fullName?: string;
  isWalletUser: boolean;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  connectWallet: () => Promise<void>;
  logout: () => void;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
