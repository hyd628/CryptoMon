import contract from 'truffle-contract'
import MonsterOwnershipContract from '@contracts/MonsterOwnership.json'

const MonsterHelper = {
    
  contract: null,
    
  instance: null,
    
  init: function () {
    let self = this
    return new Promise(function (resolve, reject) {
      self.contract = contract(MonsterOwnershipContract)
      self.contract.setProvider(window.web3.currentProvider)
      self.contract.deployed().then(instance => {
        self.instance = instance
       resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
    
  getMonstersByOwner: function (address) {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.getMonstersByOwner(address,
        {from: window.web3.eth.accounts[0]}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },

  createRandomMonster: function (_name) {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.createRandomMonster(_name,
        {from: window.web3.eth.accounts[0], gas: 1000000, gasPrice: window.web3.toWei(10, 'gwei')}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },

  transferMonster: function (mID, newowner){
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.transfer(newowner, mID,
        {from: window.web3.eth.accounts[0], gas: 1000000, gasPrice: window.web3.toWei(10, 'gwei')}
      ).then(tx => {
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },

  reportBattleResult: function (mID1, mID2){
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.reportBattleResult(mID1, mID2,
        {from: window.web3.eth.accounts[0], gas: 1000000, gasPrice: window.web3.toWei(10, 'gwei')}
      ).then(tx => {
        //console.log(tx)
        resolve(tx)
      }).catch(err => {
        reject(err)
      })
    })
  },

  Monsters: function (id) {
    let self = this
    return new Promise((resolve, reject) => {
        self.instance.monsters.call(id,{from: window.web3.eth.accounts[0]})
      .then(mon => {
        resolve(mon)
      }).catch(err => {
        reject(err)
      })
    })
  }

}

export default MonsterHelper
