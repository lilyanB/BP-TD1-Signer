// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

//import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./MyCollectible.sol";

contract Minter {
    address public owner;
    mapping(address => bool) public whitelistedAddresses;
    MyCollectible public erc721;

    constructor () {
        erc721 = new MyCollectible("MyCollectible", "symbole");
        whitelistedAddresses[msg.sender] = true;
        owner = msg.sender;
    }

    function ERC721Address() public view returns (address) {
        return address(erc721);
    }

    function mintATokenForMe() external returns (uint256){
        return erc721.mint(msg.sender);
    }

    function getAddressFromSignature(bytes32 _hash, bytes memory _signature)
        internal
        pure
        returns (address)
    {
        bytes32 r;
        bytes32 s;
        uint8 v;
        // Check the signature length
        if (_signature.length != 65) {
            return address(0);
        }
        // Divide the signature in r, s and v variables
        // ecrecover takes the signature parameters, and the only way to get them
        // currently is to use assembly.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            r := mload(add(_signature, 32))
            s := mload(add(_signature, 64))
            v := byte(0, mload(add(_signature, 96)))
        }
        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }
        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            return address(0);
        } else {
            // solium-disable-next-line arg-overflow
            return
                ecrecover(
                    keccak256(
                        abi.encodePacked(
                            "\x19Ethereum Signed Message:\n32",
                            _hash
                        )
                    ),
                    v,
                    r,
                    s
                );
        }
    }

    function addUser(address _addressToWhitelist) public returns(bool){
        require(msg.sender == owner, "Only minter can call this function.");
        whitelistedAddresses[_addressToWhitelist] = true;
        return whitelistedAddresses[_addressToWhitelist];
    }

    function whitelist(address _whitelistedAddress) public view returns (bool) {
        bool userIsWhitelisted = whitelistedAddresses[_whitelistedAddress];
        return userIsWhitelisted;
    }

    function signerIsWhitelisted(bytes32 _hash, bytes memory _signature) public view returns (bool) {
        address signer = getAddressFromSignature(_hash, _signature);
        bool userIsWhitelisted = whitelist(signer);
        return userIsWhitelisted;
    }

    function mintATokenForMeWithASignature(bytes memory _signature) public returns (uint256){
        bytes32 dataToSign = keccak256(abi.encodePacked(msg.sender, tx.origin, address(this)));
        bool isWhitelisted = signerIsWhitelisted(dataToSign,_signature);
        require(isWhitelisted , "address not whitelisted");

        address to = msg.sender;
        return erc721.mint(to);
    }
}
