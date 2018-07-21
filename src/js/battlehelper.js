const BattleHelper = {

  getDerivedStats: function (baseMon) {
    var detailedMon =  {
        name: '',
        mid: '',
        hp: 0,
        hpGrowth: 0,
        attack: 0,
        attackGrowth: 0,
        defense: 0,
        defenseGrowth: 0,
        level: 0,
      }
    
    detailedMon.level = this.getLevelFromExp(baseMon.experience)
    detailedMon.hpGrowth = (baseMon.dna % 10 ** 15 - baseMon.dna % 10 ** 13) / 10 ** 13
    detailedMon.attackGrowth = (baseMon.dna % 10 ** 13 - baseMon.dna % 10 ** 12) / 10 ** 12
    detailedMon.defenseGrowth = (baseMon.dna % 10 ** 12 - baseMon.dna % 10 ** 11) / 10 ** 11
    detailedMon.hp = detailedMon.level*(50+detailedMon.hpGrowth)
    detailedMon.attack = detailedMon.level*(5+detailedMon.attackGrowth)
    detailedMon.defense = detailedMon.level*(5+detailedMon.defenseGrowth)
    detailedMon.name = baseMon.name
    detailedMon.mid = baseMon.mid
    
    return detailedMon
  },

  getLevelFromExp: function(exp) {
    if(exp <= 10){
        return 1
    }
    else{
        return Math.ceil(Math.log(exp/10)/Math.log(4)) + 1
    }
  },

  getRandomInt: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }

}

export default BattleHelper
