var Users = artifacts.require("./Users.sol");
var Monster = artifacts.require("./MonsterFactory.sol");
var MonsterHelper = artifacts.require("./MonsterHelper.sol");

module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(Monster);
  deployer.deploy(MonsterHelper)
};
