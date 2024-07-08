// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import necessary contracts from OpenZeppelin
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Define the EduCare contract inheriting from multiple OpenZeppelin contracts
contract EduCare is 
    ERC721, 
    ERC721URIStorage, 
    ERC721Enumerable,
    Ownable
{
    // Constructor to initialize the ERC721 token with name and symbol, and set the owner
    constructor() ERC721("Educare", "EDU") Ownable(msg.sender) {}

    // Allows minting of a new NFT, only callable by the contract owner
    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyOwner
    {
        _safeMint(to, tokenId); // Mint the token safely to the specified address
        _setTokenURI(tokenId, uri); // Set the token URI for metadata
    }

    // Allows setting the token URI, ensuring the caller is authorized
    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isAuthorized(ownerOf(tokenId), _msgSender(), tokenId) || owner() == _msgSender(), 
            "Caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI); // Set the new token URI
    }

    // The following functions are overrides required by Solidity.

    // Override the _update function to use the ERC721 and ERC721Enumerable implementations
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    // Override the _increaseBalance function to use the ERC721 and ERC721Enumerable implementations
    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    // Override the tokenURI function to use the ERC721 and ERC721URIStorage implementations
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // Override the supportsInterface function to use the ERC721, ERC721Enumerable, and ERC721URIStorage implementations
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
