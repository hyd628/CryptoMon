pragma solidity ^0.4.19;

import "./MonsterFactory.sol";

contract MonsterHelper is MonsterFactory{

    function getZombiesByOwner(address _owner) external view returns(uint[]) {
        uint[] memory result = new uint[](ownerMonsterCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < monsters.length; i++) {
            if (monsterToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
            if (counter == ownerMonsterCount[_owner])
            {
                break;
            }
        }
        return result;
    }
}
