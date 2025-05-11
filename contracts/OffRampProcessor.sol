
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title OffRampProcessor
 * @dev Contract to handle off-ramping of crypto to fiat
 */
contract OffRampProcessor is Ownable {
    // Address of the treasury wallet where funds will be sent
    address public treasuryWallet;
    
    // Mapping of supported tokens
    mapping(string => address) public supportedTokens;
    
    // Off-ramp request structure
    struct OffRampRequest {
        address sender;
        string cryptoAsset;
        uint256 cryptoAmount;
        string fiatCurrency;
        uint256 fiatAmount;
        string paymentDetails;
        uint256 timestamp;
        string status;
        string referenceNumber;
    }
    
    // Mapping of reference numbers to off-ramp requests
    mapping(string => OffRampRequest) public offRampRequests;
    
    // Array of all reference numbers
    string[] public allReferenceNumbers;
    
    // Events
    event OffRampInitiated(
        string referenceNumber,
        address indexed sender,
        string cryptoAsset,
        uint256 cryptoAmount,
        string fiatCurrency,
        uint256 fiatAmount,
        uint256 timestamp
    );
    
    event OffRampStatusUpdated(
        string referenceNumber,
        string status
    );
    
    /**
     * @dev Constructor
     * @param _treasuryWallet Address of the treasury wallet
     */
    constructor(address _treasuryWallet) Ownable(msg.sender) {
        treasuryWallet = _treasuryWallet;
        
        // Add supported tokens (in a real implementation, we would add actual token addresses)
        supportedTokens["ETH"] = address(0); // Native ETH
        // Add more tokens as needed
    }
    
    /**
     * @dev Update treasury wallet address
     * @param _newTreasuryWallet New treasury wallet address
     */
    function setTreasuryWallet(address _newTreasuryWallet) external onlyOwner {
        treasuryWallet = _newTreasuryWallet;
    }
    
    /**
     * @dev Add a supported token
     * @param _symbol Token symbol
     * @param _tokenAddress Token contract address
     */
    function addSupportedToken(string calldata _symbol, address _tokenAddress) external onlyOwner {
        supportedTokens[_symbol] = _tokenAddress;
    }
    
    /**
     * @dev Remove a supported token
     * @param _symbol Token symbol to remove
     */
    function removeSupportedToken(string calldata _symbol) external onlyOwner {
        delete supportedTokens[_symbol];
    }
    
    /**
     * @dev Generate a unique reference number
     * @return referenceNumber Unique reference number for the off-ramp request
     */
    function generateReferenceNumber(address _sender) internal view returns (string memory) {
        // Simple implementation - in production this would be more sophisticated
        return string(
            abi.encodePacked(
                "OFFRAMP-",
                toHexString(uint160(_sender), 8),
                "-",
                toHexString(block.timestamp, 8)
            )
        );
    }
    
    /**
     * @dev Convert uint to hex string
     * @param _value Value to convert
     * @param _length Length of the resulting string
     * @return hexString Hex string representation
     */
    function toHexString(uint256 _value, uint256 _length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(_length);
        for (uint256 i = _length; i > 0; --i) {
            buffer[_length - i] = bytes1(
                uint8(48 + uint8(_value % 16 > 9 ? 87 + _value % 16 : _value % 16))
            );
            _value /= 16;
        }
        return string(buffer);
    }
    
    /**
     * @dev Process an off-ramp request for native ETH
     * @param _cryptoAsset Crypto asset symbol
     * @param _fiatCurrency Fiat currency code
     * @param _fiatAmount Amount in fiat to receive
     * @param _paymentDetails Payment details for fiat transfer
     * @return referenceNumber Reference number for the off-ramp request
     */
    function processOffRamp(
        string calldata _cryptoAsset,
        string calldata _fiatCurrency,
        uint256 _fiatAmount,
        string calldata _paymentDetails
    ) external payable returns (string memory) {
        // For simplicity, we're only handling native ETH in this example
        require(keccak256(bytes(_cryptoAsset)) == keccak256(bytes("ETH")), "Only ETH supported in this implementation");
        
        // Create reference number
        string memory referenceNumber = generateReferenceNumber(msg.sender);
        
        // Store the request
        offRampRequests[referenceNumber] = OffRampRequest({
            sender: msg.sender,
            cryptoAsset: _cryptoAsset,
            cryptoAmount: msg.value,
            fiatCurrency: _fiatCurrency,
            fiatAmount: _fiatAmount,
            paymentDetails: _paymentDetails,
            timestamp: block.timestamp,
            status: "Pending",
            referenceNumber: referenceNumber
        });
        
        // Add reference number to the array
        allReferenceNumbers.push(referenceNumber);
        
        // Transfer ETH to treasury
        (bool success, ) = treasuryWallet.call{value: msg.value}("");
        require(success, "ETH transfer failed");
        
        // Emit event
        emit OffRampInitiated(
            referenceNumber,
            msg.sender,
            _cryptoAsset,
            msg.value,
            _fiatCurrency,
            _fiatAmount,
            block.timestamp
        );
        
        return referenceNumber;
    }
    
    /**
     * @dev Process an off-ramp request for ERC20 tokens
     * @param _cryptoAsset Crypto asset symbol
     * @param _amount Amount of tokens to off-ramp
     * @param _fiatCurrency Fiat currency code
     * @param _fiatAmount Amount in fiat to receive
     * @param _paymentDetails Payment details for fiat transfer
     * @return referenceNumber Reference number for the off-ramp request
     */
    function processERC20OffRamp(
        string calldata _cryptoAsset,
        uint256 _amount,
        string calldata _fiatCurrency,
        uint256 _fiatAmount,
        string calldata _paymentDetails
    ) external returns (string memory) {
        address tokenAddress = supportedTokens[_cryptoAsset];
        require(tokenAddress != address(0), "Unsupported token");
        
        // Create reference number
        string memory referenceNumber = generateReferenceNumber(msg.sender);
        
        // Store the request
        offRampRequests[referenceNumber] = OffRampRequest({
            sender: msg.sender,
            cryptoAsset: _cryptoAsset,
            cryptoAmount: _amount,
            fiatCurrency: _fiatCurrency,
            fiatAmount: _fiatAmount,
            paymentDetails: _paymentDetails,
            timestamp: block.timestamp,
            status: "Pending",
            referenceNumber: referenceNumber
        });
        
        // Add reference number to the array
        allReferenceNumbers.push(referenceNumber);
        
        // Transfer tokens from sender to treasury
        IERC20 token = IERC20(tokenAddress);
        require(token.transferFrom(msg.sender, treasuryWallet, _amount), "Token transfer failed");
        
        // Emit event
        emit OffRampInitiated(
            referenceNumber,
            msg.sender,
            _cryptoAsset,
            _amount,
            _fiatCurrency,
            _fiatAmount,
            block.timestamp
        );
        
        return referenceNumber;
    }
    
    /**
     * @dev Update the status of an off-ramp request (only owner)
     * @param _referenceNumber Reference number of the request
     * @param _status New status
     */
    function updateOffRampStatus(string calldata _referenceNumber, string calldata _status) external onlyOwner {
        require(bytes(offRampRequests[_referenceNumber].referenceNumber).length > 0, "Request not found");
        
        offRampRequests[_referenceNumber].status = _status;
        
        emit OffRampStatusUpdated(_referenceNumber, _status);
    }
    
    /**
     * @dev Get an off-ramp request by reference number
     * @param _referenceNumber Reference number of the request
     * @return OffRampRequest info
     */
    function getOffRampRequest(string calldata _referenceNumber) 
        external 
        view 
        returns (OffRampRequest memory) 
    {
        return offRampRequests[_referenceNumber];
    }
    
    /**
     * @dev Get the total number of off-ramp requests
     * @return Total number of requests
     */
    function getOffRampRequestCount() external view returns (uint256) {
        return allReferenceNumbers.length;
    }
    
    /**
     * @dev Get all off-ramp requests for a specific user
     * @param _user User address
     * @return Array of reference numbers
     */
    function getUserOffRampRequests(address _user) external view returns (string[] memory) {
        uint256 count = 0;
        
        // First count the number of requests for the user
        for (uint256 i = 0; i < allReferenceNumbers.length; i++) {
            if (offRampRequests[allReferenceNumbers[i]].sender == _user) {
                count++;
            }
        }
        
        // Create an array with the correct size
        string[] memory userRequests = new string[](count);
        uint256 index = 0;
        
        // Fill the array
        for (uint256 i = 0; i < allReferenceNumbers.length; i++) {
            if (offRampRequests[allReferenceNumbers[i]].sender == _user) {
                userRequests[index] = allReferenceNumbers[i];
                index++;
            }
        }
        
        return userRequests;
    }
    
    // Receive function to accept ETH
    receive() external payable {}
}
