pragma solidity ^0.4.19;

import "./MonsterHelper.sol";
import "./erc721.sol";

contract MonsterOwnership is MonsterHelper, ERC721 {

    mapping (uint => address) monsterApprovals;

    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerMonsterCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return monsterToOwner[_tokenId];
    }

    function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        monsterToOwner[_tokenId] = _to;
        ownerMonsterCount[msg.sender]--;
        ownerMonsterCount[_to]++;
        emit MonsterTransferred(_tokenId, msg.sender, _to, monsters[_tokenId].name);
        emit Transfer(msg.sender, _to, _tokenId);

    }

    function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        monsterApprovals[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function takeOwnership(uint256 _tokenId) public {
        require(monsterApprovals[_tokenId] == msg.sender);
        address owner = ownerOf(_tokenId);
        monsterToOwner[_tokenId] = msg.sender;
        ownerMonsterCount[owner]--;
        ownerMonsterCount[msg.sender]++;
        emit MonsterTransferred(_tokenId, owner, msg.sender, monsters[_tokenId].name);
        emit Transfer(owner, msg.sender, _tokenId);
    }
}
