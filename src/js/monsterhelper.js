import contract from 'truffle-contract'
import MonsterHelperContract from '@contracts/MonsterHelper.json'

const MonsterHelper = {
    
  contract: null,
    
  instance: null,
    
  init: function () {
    let self = this
    return new Promise(function (resolve, reject) {
      self.contract = contract(MonsterHelperContract)
      self.contract.setProvider(window.web3.currentProvider)
      self.contract.deployed().then(instance => {
        self.instance = instance
       resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
    
  getZombiesByOwner: function (address) {
    let self = this
    /*
    return self.instance.getZombiesByOwner(address,
        {from: window.web3.eth.accounts[0]})*/
    
    return new Promise((resolve, reject) => {
      self.instance.getZombiesByOwner(address,
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
        {from: window.web3.eth.accounts[0]}
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
      self.instance.transferMonster(mID, newowner,
        {from: window.web3.eth.accounts[0]}
      ).then(tx => {
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
