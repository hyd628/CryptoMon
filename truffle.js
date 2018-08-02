var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "original garbage entry monster creek police delay talent maximum wink treat joy";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 3000000,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/m2J3nuxzfTtQZMdOBhMG")
      },
      network_id: 3
    }   
  }
};
