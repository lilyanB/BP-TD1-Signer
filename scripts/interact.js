const API_KEY_goerli = process.env.API_KEY_goerli;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const { ethers } = require("hardhat");

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3("https://eth-goerli.g.alchemy.com/v2/kWBvEiso-d70OEPlThp6oJknYBr6XMlO");

const ERC721_CONTRACT_ADDRESS = process.env.ERC721_CONTRACT_ADDRESS;
const Minter_CONTRACT_ADDRESS = process.env.Minter_CONTRACT_ADDRESS;
const EVALUATOR = process.env.EVALUATOR;
const contractERC721 = require("../artifacts/contracts/MyCollectible.sol/MyCollectible.json");
const contractMinter = require("../artifacts/contracts/Minter.sol/Minter.json");
const contractEvaluator = require("../artifacts/contracts/Evaluator.sol/Evaluator.json");

//console.log(JSON.stringify(contract.abi));

const provider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY_goerli);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const ERC721 = new ethers.Contract(ERC721_CONTRACT_ADDRESS, contractERC721.abi, signer);
const Minter = new ethers.Contract(Minter_CONTRACT_ADDRESS, contractMinter.abi, signer);
const Evaluator = new ethers.Contract(EVALUATOR, contractEvaluator.abi, signer);

async function main() {
  
  const erc721 = await Minter.ERC721Address();
  console.log("Address erc721 : ", erc721);

  /* const submit = await Evaluator.submitExercice(Minter_CONTRACT_ADDRESS);
  const exo1 = await Evaluator.ex1_testERC721()
  console.log("Exo1 info : ", exo1); */
  const resultExo1 = await Evaluator.exerciceProgression(PUBLIC_KEY,1);
  console.log("Exo1 fini : ", resultExo1);


  const msg = "0x00000000596f75206e65656420746f207369676e207468697320737472696e67";
  var str = web3.utils.toAscii(msg);
  let ma_signature = await signer.signMessage( str );
  console.log("ma signature : ", ma_signature );
  //const exo2 = await Evaluator.ex2_generateASignature(ma_signature)
  const resultExo2 = await Evaluator.exerciceProgression(PUBLIC_KEY,2);
  console.log("Exo2 fini : ", resultExo2);

  //const exo3 = await Evaluator.ex3_extractAddressFromSignature()
  const resultExo3 = await Evaluator.exerciceProgression(PUBLIC_KEY,3);
  console.log("Exo3 fini : ", resultExo3);


  //msg2 = "You need to sign this string"
  msg2 = "0x00000000596f75206e65656420746f207369676e207468697320737472696e67"
  var str = web3.utils.toAscii(msg);
  let ma_signature2 = await signer.signMessage( str );
  console.log("ma signature : ", ma_signature2 );
  /* const addWhiteList = await Minter.addUser(PUBLIC_KEY);
  console.log("Address was whitelisted : ", PUBLIC_KEY); */
  /* const exo4 = await Evaluator.ex4_manageWhiteListWithSignature(msg2,ma_signature2)*/
  const resultExo4 = await Evaluator.exerciceProgression(PUBLIC_KEY,4); 
  console.log("Exo4 fini : ", resultExo4);


  concatener = web3.utils.soliditySha3(EVALUATOR,PUBLIC_KEY,erc721)
  console.log("address concatener :");
  console.log(EVALUATOR);
  console.log(PUBLIC_KEY);
  console.log(erc721);
  ma_signature3 = await signer.signMessage( concatener );
  console.log("concatener : ", concatener );
  console.log("ma signature pour mint : ", ma_signature3 );
  const exo5 = await Evaluator.ex5_mintATokenWithASpecificSignature(ma_signature3);
  console.log("Exo5 tx : ", exo5);
  const resultExo5 = await Evaluator.exerciceProgression(PUBLIC_KEY,5);
  console.log("Exo5 fini : ", resultExo5);

  /* const exo6 = await Evaluator.ex6_deployBouncerProxyAndWhitelistYourself();
  const resultExo6 = await Evaluator.exerciceProgression(PUBLIC_KEY,6);
  console.log("Exo6 fini : ", resultExo6); */
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });