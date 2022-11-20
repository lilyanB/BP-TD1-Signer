// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyCollectible is ERC721 {

    address public owner;
    uint256 public supply;


    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {
        owner = msg.sender;
    }

    function mint(address _for) public returns (uint256){
        require(msg.sender == owner, "Only minter can call this function.");
        require(_for != address(0), "ERC721: mint to the zero address");
        uint256 id = supply;
        _mint(_for, id);
        supply ++;
        return id;
    }
}
