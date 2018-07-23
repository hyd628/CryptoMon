pragma solidity ^0.4.19;

import "./MonsterFactory.sol";

contract MonsterHelper is MonsterFactory{

    event MonsterTransferred(uint MonsterId, address oldOwner, address newOwner, string name);
    event BattleResult(uint winnerMID, uint loserMID, string winnerName, string loserName, address winnerOwner, address loserOwner);

    function getMonstersByOwner(address _owner) external view returns(uint[]) {
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

    function transferMonster(uint mID, address newOwner) public {
        require(monsterToOwner[mID] == msg.sender); 
        monsterToOwner[mID] = newOwner;
        ownerMonsterCount[msg.sender]--;
        ownerMonsterCount[newOwner]++;
        emit MonsterTransferred(mID, msg.sender, newOwner, monsters[mID].name);
    }

    function reportBattleResult(uint mIDwinner, uint mIDloser) public {
        monsters[mIDwinner].experience = monsters[mIDwinner].experience + 50;
        monsters[mIDwinner].winCount++;
        monsters[mIDloser].experience = monsters[mIDloser].experience + 15;
        monsters[mIDloser].lossCount++;
        /* solium-disable-next-line */
        emit BattleResult(mIDwinner, mIDloser, monsters[mIDwinner].name, monsters[mIDloser].name, monsterToOwner[mIDwinner], monsterToOwner[mIDloser]);
    }
}
