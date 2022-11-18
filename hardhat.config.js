require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { PRIVATE_KEY, API_URL_goerli, API_URL_mumbai } = process.env;

module.exports = {
   solidity: "0.8.1",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL_mumbai,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      goerli:{
         url: API_URL_goerli,
         accounts: [`0x${PRIVATE_KEY}`]
       }
   },
}