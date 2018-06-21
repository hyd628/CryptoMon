var Users = artifacts.require("./Users.sol");
var Monster = artifacts.require("./MonsterFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(Monster);
};
