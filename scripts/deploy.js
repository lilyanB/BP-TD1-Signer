const API_KEY_goerli = process.env.API_KEY_goerli;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ERC721_CONTRACT_ADDRESS = process.env.ERC721_CONTRACT_ADDRESS;
const Minter_CONTRACT_ADDRESS = process.env.Minter_CONTRACT_ADDRESS;
const MY_ADRESS = process.env.MY_ADRESS;
const { ethers } = require("hardhat");

async function main() {

  const contractOwner = await ethers.getSigners();
  console.log(`Deploying contract from: ${contractOwner[0].address}`);

  /* const MyERC721 = await ethers.getContractFactory("MyCollectible");
  const myERC721 = await MyERC721.deploy("MyCollectible", "symbole");
  await myERC721.deployed();

  console.log(`ERC721 deployed to ${myERC721.address}`); */

  const Minter = await ethers.getContractFactory("Minter");
  const minter = await Minter.deploy();
  await minter.deployed();

  console.log(`Minter deployed to ${minter.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
