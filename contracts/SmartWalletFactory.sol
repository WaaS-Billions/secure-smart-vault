
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SmartWallet.sol";

/**
 * @title SmartWalletFactory
 * @dev Factory contract for deploying SmartWallet contracts
 */
contract SmartWalletFactory {
    // Event emitted when a new wallet is created
    event WalletCreated(
        address indexed walletAddress,
        address indexed creator,
        string walletName,
        address[] signers,
        uint256 threshold,
        string walletType
    );
    
    /**
     * @dev Creates a new SmartWallet instance
     * @param _signers Array of signer addresses
     * @param _threshold Minimum number of signatures required
     * @param _name Name of the wallet
     * @param _walletType Type of the wallet (personal or multiparty)
     * @return Address of the newly created wallet
     */
    function createWallet(
        address[] memory _signers,
        uint256 _threshold,
        string memory _name,
        string memory _walletType
    ) external returns (address) {
        // Create new SmartWallet
        SmartWallet wallet = new SmartWallet(_signers, _threshold);
        
        // Transfer ownership to the caller (creator)
        wallet.transferOwnership(msg.sender);
        
        // Emit event
        emit WalletCreated(
            address(wallet),
            msg.sender,
            _name,
            _signers,
            _threshold,
            _walletType
        );
        
        return address(wallet);
    }
}
