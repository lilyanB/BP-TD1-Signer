// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

//import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IERC721 {
    function mint(address to, uint256 tokenId) external view;
}

contract Minter {
    address owner = msg.sender;
    address ERC721 = msg.sender;
    mapping(address => bool) whitelistedAddresses;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function changeERC721(address newERC721) public onlyOwner {
        ERC721 = newERC721;
    }

    function mintATokenForMe() public view {
        IERC721 MyERC721 = IERC721(ERC721);
        address to = msg.sender;
        MyERC721.mint(to, 1);
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

    function addUser(address _addressToWhitelist) public onlyOwner {
        whitelistedAddresses[_addressToWhitelist] = true;
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
}
