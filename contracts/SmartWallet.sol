
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title SmartWallet
 * @dev EIP-4337 compatible smart wallet contract with MPC support
 */
contract SmartWallet is Ownable {
    using ECDSA for bytes32;

    // Mapping of approved signers for this wallet
    mapping(address => bool) public approvedSigners;
    
    // Minimum number of signers required for a transaction
    uint256 public signerThreshold;
    
    // Transaction nonce to prevent replay attacks
    uint256 public nonce;

    // Events
    event SignerAdded(address indexed signer);
    event SignerRemoved(address indexed signer);
    event ThresholdChanged(uint256 newThreshold);
    event TransactionExecuted(address indexed to, uint256 value, bytes data, uint256 nonce);

    constructor(address[] memory _signers, uint256 _threshold) Ownable(msg.sender) {
        require(_threshold > 0 && _threshold <= _signers.length, "Invalid threshold");
        
        for (uint256 i = 0; i < _signers.length; i++) {
            approvedSigners[_signers[i]] = true;
        }
        
        signerThreshold = _threshold;
    }

    /**
     * @dev Add a new signer to the wallet
     * @param _signer Address of the new signer
     */
    function addSigner(address _signer) external onlyOwner {
        require(!approvedSigners[_signer], "Signer already exists");
        approvedSigners[_signer] = true;
        emit SignerAdded(_signer);
    }

    /**
     * @dev Remove a signer from the wallet
     * @param _signer Address of the signer to remove
     */
    function removeSigner(address _signer) external onlyOwner {
        require(approvedSigners[_signer], "Signer does not exist");
        approvedSigners[_signer] = false;
        emit SignerRemoved(_signer);
    }

    /**
     * @dev Change the threshold of required signers
     * @param _threshold New threshold value
     */
    function changeThreshold(uint256 _threshold) external onlyOwner {
        require(_threshold > 0, "Threshold must be greater than 0");
        signerThreshold = _threshold;
        emit ThresholdChanged(_threshold);
    }

    /**
     * @dev Execute a transaction with multiple signatures
     * @param _to Destination address
     * @param _value Amount of ETH to send
     * @param _data Call data to send
     * @param _signatures Array of signatures from approved signers
     */
    function executeTransaction(
        address _to,
        uint256 _value,
        bytes calldata _data,
        bytes[] calldata _signatures
    ) external returns (bool) {
        require(_signatures.length >= signerThreshold, "Not enough signatures");
        
        // Construct the message that was signed
        bytes32 messageHash = getTransactionHash(_to, _value, _data, nonce);
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        
        // Verify all signatures
        address[] memory signers = new address[](_signatures.length);
        for (uint256 i = 0; i < _signatures.length; i++) {
            address signer = ethSignedMessageHash.recover(_signatures[i]);
            require(approvedSigners[signer], "Invalid signer");
            
            // Ensure no duplicate signers
            for (uint256 j = 0; j < i; j++) {
                require(signer != signers[j], "Duplicate signer");
            }
            signers[i] = signer;
        }
        
        // Increment nonce to prevent replay attacks
        nonce++;
        
        // Execute the transaction
        (bool success, ) = _to.call{value: _value}(_data);
        require(success, "Transaction execution failed");
        
        emit TransactionExecuted(_to, _value, _data, nonce - 1);
        return success;
    }

    /**
     * @dev Returns the hash of a transaction
     * @param _to Destination address
     * @param _value Amount of ETH to send
     * @param _data Call data to send
     * @param _nonce Current transaction nonce
     */
    function getTransactionHash(
        address _to,
        uint256 _value,
        bytes calldata _data,
        uint256 _nonce
    ) public view returns (bytes32) {
        return keccak256(abi.encodePacked(address(this), _to, _value, _data, _nonce));
    }

    // Receive function to accept ETH
    receive() external payable {}
}
