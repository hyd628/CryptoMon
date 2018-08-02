var Users = artifacts.require("./Users.sol");
var MonsterOwnership = artifacts.require("./MonsterOwnership.sol");

module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(MonsterOwnership)
};
