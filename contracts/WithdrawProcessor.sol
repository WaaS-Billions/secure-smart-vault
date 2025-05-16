
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title WithdrawProcessor
 * @dev Contract for processing cryptocurrency withdrawals
 */
contract WithdrawProcessor is Ownable {
    // Address where funds will be sent
    address public targetAddress;
    
    // Events
    event WithdrawalProcessed(address indexed from, address indexed to, uint256 amount);
    event TargetAddressUpdated(address indexed oldAddress, address indexed newAddress);
    
    constructor(address _targetAddress) Ownable(msg.sender) {
        targetAddress = _targetAddress;
    }
    
    /**
     * @dev Process withdrawal directly to the target address
     */
    function withdraw() external payable {
        require(msg.value > 0, "Amount must be greater than 0");
        
        // Send funds to target address
        (bool sent,) = targetAddress.call{value: msg.value}("");
        require(sent, "Failed to send funds");
        
        emit WithdrawalProcessed(msg.sender, targetAddress, msg.value);
    }
    
    /**
     * @dev Update the target address
     * @param _newTargetAddress Address to receive funds
     */
    function updateTargetAddress(address _newTargetAddress) external onlyOwner {
        require(_newTargetAddress != address(0), "Invalid target address");
        address oldAddress = targetAddress;
        targetAddress = _newTargetAddress;
        emit TargetAddressUpdated(oldAddress, _newTargetAddress);
    }
    
    /**
     * @dev Fallback function to receive ETH
     */
    receive() external payable {
        // Forward any received ETH to target address
        (bool sent,) = targetAddress.call{value: msg.value}("");
        require(sent, "Failed to forward funds");
        
        emit WithdrawalProcessed(msg.sender, targetAddress, msg.value);
    }
}
