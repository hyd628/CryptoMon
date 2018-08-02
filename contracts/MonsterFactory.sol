pragma solidity ^0.4.19;

import "./ownable.sol";

contract MonsterFactory is Ownable {

    event NewMonster(uint MonsterId, string name, uint dna, address owner);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTime = 1 days;

    struct Monster {
        string name;
        uint dna;
        uint32 experience;
        uint32 readyTime;
        uint16 winCount;
        uint16 lossCount;
    }

    Monster[] public monsters;

    mapping (uint => address) public monsterToOwner;
    mapping (address => uint) public ownerMonsterCount;

    function _createMonster(string _name, uint _dna) internal {
        /* solium-disable-next-line */
        uint id = monsters.push(Monster(_name, _dna, 0, uint32(now + cooldownTime), 0, 0)) - 1;
        monsterToOwner[id] = msg.sender;
        ownerMonsterCount[msg.sender]++;
        emit NewMonster(id, _name, _dna, msg.sender);
    }

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    function createRandomMonster(string _name) public {
        //require(ownerMonsterCount[msg.sender] == 0); For testing.
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        _createMonster(_name, randDna);
    }

    modifier onlyOwnerOf(uint _monsterId) {
        require(msg.sender == monsterToOwner[_monsterId]);
        _;
    }

}

