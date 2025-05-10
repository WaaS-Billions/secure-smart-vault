
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-3xl w-full px-4 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Secure Smart Vault</h1>
          <p className="text-xl text-gray-600">Non-custodial smart wallet with MPC security</p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>
            <p className="text-gray-600 mb-6">
              Access your wallet dashboard to manage your assets, create new wallets, and perform transactions.
            </p>
            <Link to="/dashboard">
              <Button className="w-full">Open Dashboard</Button>
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create New Wallet</h2>
            <p className="text-gray-600 mb-6">
              Create a new secure multi-signature wallet with customizable threshold and signers.
            </p>
            <Link to="/wallet/create">
              <Button className="w-full">Create Wallet</Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
          <p className="text-gray-600 mb-6">
            For administrators only. Access advanced management features and analytics.
          </p>
          <Link to="/admin">
            <Button variant="outline" className="w-full">Admin Access</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
