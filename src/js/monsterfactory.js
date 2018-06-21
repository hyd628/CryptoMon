import contract from 'truffle-contract'
import MonsterFactoryContract from '@contracts/MonsterFactory.json'

const MonsterFactory = {
    
  contract: null,
    
  instance: null,
    
  init: function () {
    let self = this
    return new Promise(function (resolve, reject) {
      self.contract = contract(MonsterFactoryContract)
      self.contract.setProvider(window.web3.currentProvider)
      self.contract.deployed().then(instance => {
        self.instance = instance
        //console.log(instance) 
       resolve()
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

  Monsters: function (id) {
    let self = this
    return self.instance.monsters.call(id,{from: window.web3.eth.accounts[0]})
  }
}

export default MonsterFactory
