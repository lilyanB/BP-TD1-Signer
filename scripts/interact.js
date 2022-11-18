const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


const { ethers } = require("hardhat");

const ERC721_CONTRACT_ADDRESS = process.env.ERC721_CONTRACT_ADDRESS;
const Minter_CONTRACT_ADDRESS = process.env.Minter_CONTRACT_ADDRESS;
const EVALUATOR = process.env.EVALUATOR;
const contractERC721 = require("../artifacts/contracts/MyCollectible.sol/MyCollectible.json");
const contractMinter = require("../artifacts/contracts/Minter.sol/MyCollectible.json");
const contractEvaluator = require("../artifacts/contracts/Evaluator.sol/Evaluator.json");

//console.log(JSON.stringify(contract.abi));

const provider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const ERC721 = new ethers.Contract(ERC721_CONTRACT_ADDRESS, contractERC721.abi, signer);
const Minter = new ethers.Contract(Minter_CONTRACT_ADDRESS, contractMinter.abi, signer);
const Evaluator = new ethers.Contract(EVALUATOR, contractEvaluator.abi, signer);

async function main() {

  const ChangeMinter = await ERC721.changeMinter(Minter_CONTRACT_ADDRESS);
  console.log("Result : ", ChangeMinter);

  
  const ChangeERC721 = await Minter.changeERC721(ERC721_CONTRACT_ADDRESS);
  console.log("Result : ", ChangeERC721);

  const submit = await Evaluator.submitExercice(Minter_CONTRACT_ADDRESS);
  const exo1 = await Evaluator.ex1_testERC721()
  const resultExo1 = await Evaluator.exerciceProgression[msg.sender][1];
  console.log("Exo1 fini : ", resultExo1);


  msg = "0x00000000596f75206e65656420746f207369676e207468697320737472696e67"
  let ma_signature = await signer.signMessage( msg );
  console.log("ma signature : ", ma_signature );
  const exo2 = await Evaluator.ex2_generateASignature(ma_signature)
  const resultExo2 = await Evaluator.exerciceProgression[msg.sender][2];
  console.log("Exo2 fini : ", resultExo2);


  
  const exo3 = await Evaluator.ex3_extractAddressFromSignature()
  const resultExo3 = await Evaluator.exerciceProgression[msg.sender][3];
  console.log("Exo3 fini : ", resultExo3);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });