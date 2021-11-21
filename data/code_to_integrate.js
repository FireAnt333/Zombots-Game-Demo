// 11/06/21: 
// maybe place instances of LoadoutCard and ItemCard as objects within other classes, one called Loadout and others for different items, so the display is attached to the item
// Instances of LoadoutCard are extensions of the UISection class, but also go within centerLeftLoadoutList, which is another instance of UISection.

// 11/17/21: Decide inside of LoadoutCard what icons and colors to use
class LoadoutCard extends UISection {
  constructor (name, origin, width, height, border, scrolling, scrollDirection, scrollDistance, elements, base, weapons, utilities) {
    super(name, origin, width, height, border, scrolling, scrollDirection, scrollDistance, elements);
    this.base = base;
    this.weapons = weapons;
    this.utilities = utilities; 

    this.icon = base.imgSrc0; 
    this.icon.origin = {x: this.origin.x + base.icon.offset.x, y: this.origin.y + base.icon.offset.y};

    // Consider loops to condense the following code sections defining icons and positions
    this.weaponIcon1 = weapons[0] ? weapons[0].iconSrc : 'empty slot icon src'; 
    this.weaponIcon2 = weapons[1] ? weapons[1].iconSrc : 'empty slot icon src'; 
    this.weaponIcon3 = weapons[2] ? weapons[2].iconSrc : 'empty slot icon src'; 

    this.weaponIcon1 = {x: this.origin.x + base.weaponIcon1.offset.x, y: this.origin.y + base.weaponIcon1.offset.y};
    this.weaponIcon2 = {x: this.origin.x + base.weaponIcon2.offset.x, y: this.origin.y + base.weaponIcon2.offset.y};
    this.weaponIcon3 = {x: this.origin.x + base.weaponIcon3.offset.x, y: this.origin.y + base.weaponIcon3.offset.y};

    this.utilityIcon1 = utilities[0] ? utilities[0].iconSrc : 'empty slot icon src'; 
    this.utilityIcon2 = utilities[1] ? utilities[1].iconSrc : 'empty slot icon src'; 
    this.utilityIcon3 = utilities[2] ? utilities[2].iconSrc : 'empty slot icon src'; 

    this.utilityIcon1.origin = {x: this.origin.x + base.utilityIcon1.offset.x, y: this.origin.y + base.utilityIcon1.offset.y};
    this.utilityIcon2.origin = {x: this.origin.x + base.utilityIcon2.offset.x, y: this.origin.y + base.utilityIcon2.offset.y};
    this.utilityIcon3.origin = {x: this.origin.x + base.utilityIcon3.offset.x, y: this.origin.y + base.utilityIcon3.offset.y};

    // May not need these if I simply refer to this.base.modIcon1-10.origin
    this.modIcon1.origin = {x: this.origin.x + base.modIcon1.offset.x, y: this.origin.y + base.modIcon1.offset.y};
    this.modIcon2.origin = {x: this.origin.x + base.modIcon2.offset.x, y: this.origin.y + base.modIcon2.offset.y};
    this.modIcon3.origin = {x: this.origin.x + base.modIcon3.offset.x, y: this.origin.y + base.modIcon3.offset.y};
    this.modIcon4.origin = {x: this.origin.x + base.modIcon4.offset.x, y: this.origin.y + base.modIcon4.offset.y};
    this.modIcon5.origin = {x: this.origin.x + base.modIcon5.offset.x, y: this.origin.y + base.modIcon5.offset.y};
    this.modIcon6.origin = {x: this.origin.x + base.modIcon6.offset.x, y: this.origin.y + base.modIcon6.offset.y};
    this.modIcon7.origin = {x: this.origin.x + base.modIcon7.offset.x, y: this.origin.y + base.modIcon7.offset.y};
    this.modIcon8.origin = {x: this.origin.x + base.modIcon8.offset.x, y: this.origin.y + base.modIcon8.offset.y};
    this.modIcon9.origin = {x: this.origin.x + base.modIcon9.offset.x, y: this.origin.y + base.modIcon9.offset.y};
    this.modIcon10.origin = {x: this.origin.x + base.modIcon10.offset.x, y: this.origin.y + base.modIcon10.offset.y};

    this.elementsToDraw = [loadoutCardBackground, baseName, this.weaponIcon1, this.weaponIcon2, this.weaponIcon3, this.utilityIcon1, this.utilityIcon2, this.utilityIcon3, this.base.modIcon1, this.base.modIcon2, this.base.modIcon3, this.base.modIcon4, this.base.modIcon5, this.base.modIcon6, this.base.modIcon7, this.base.modIcon8, this.base.modIcon9, this.base.modIcon10];

  }
}

class ItemCard extends UISection {
  constructor(name, origin, width, height, border, scrolling, scrollDirection, scrollDistance, iconSrc, modIndicators) {
    super(name, origin, width, height, border, scrolling, scrollDirection, scrollDistance);

    this.backgroundSrc = 'item card background';
    this.iconSrc = iconSrc;
    this.modIndicators = modIndicators; // array of 10 true/false/null values
  }
}


class Loadout {
  constructor (name, base, structure, armor, engine, battery, storage, weapons, utilities) {
    this.name = name;
    this.base = base;
    this.structure = structure;
    this.armor = armor;
    this.engine = engine;
    this.battery = battery;
    this.storage = storage; 
    this.weapons = weapons;
    this.utilities = utilities;

    // Decide the specific icons and colors to be sent to the new LoadoutCard object created below (for weapons, utilities and mods, get purple icons if base is a chassis, green if base is a building)
    this.elements = [];

    this.loadoutCard = new LoadoutCard(this.base.name, origin, width, height, border, false, null, 0, this.elements, this.base, this.weapons, this.utilities);
  }
}

// In the base item object, define each mod slot icon as new UIElement() objects
// Loadout argument format: name, base, structure, armor, engine, battery, storage, weapons, utilities

const bipedal100 = new Loadout(`100-BPD: Stock`, bpd100, 20, 15, 15, 10, 10, [new mcg10(), new mcg10()], [new bct10()]);
const wheeled200 = new Loadout(`200-WHL: Stock`, whl200, 40, 30, 40, 15, 15, [new hac40()], [new btc20()]);
const aerial200 = new Loadout(`200-AER: Stock`, aer200, 30, 30, 60, 15, 15, [new lac40()], [new bct10()]); 
const tracked300 = new Loadout(`300-TRK: Stock`, trk300, 50, 60, 50, 20, 20, [new can60(), new mcg20()], [new bct20()]); 

const turretMCG = new Loadout(`50-SWF: MCG`, 10, 20, 0, 0, 0, [new MCG20()], []);
const turretSHG = new Loadout(`50-SWF: SHG`, 10, 20, 0, 0, 0, [new SHG20()], []);
const turretBRL = new Loadout(`50-SWF: BRL`, 10, 20, 0, 0, 0, [new BRL20()], []);
const turretLAC = new Loadout(`70-SWF: LAC`, 15, 25, 0, 0, 0, [new LAC30()], []);
const turretMNG = new Loadout(`90-SWF: MNG`, 20, 30, 0, 0, 0, [new MNG40()], []);
const turretRAC = new Loadout(`90-SWF: RAC`, 20, 25, 0, 0, 0, [new RAC45()], []);
const turretHAC = new Loadout(`100-SWF: HAC`, 20, 30, 0, 0, 0, [new HAC50()], []);
const turretCAN = new Loadout(`120-SWF: CAN`, 25, 35, 0, 0, 0, [new CAN60()], []);


// 11/07/21: 

// maxMoveSpeed factors: engineWeight, chassisWeight, chassisMultiplier
// measured in pixels per second
maxMoveSpeedpx = 350 * (engineWeight / chassisWeight) * chassisMultiplier;
maxMoveSpeedTl = maxMoveSpeedPx / stdTileWidth;

//  Example speeds for stock loadouts
// bpd100: 500*(15/100)*0.7 = 52.00px/s, 3.28ti/s (350 base: 36.75px/s, 2.30ti/s)
// whl200: 500*(40/200)*1.0 = 100.00px/s, 6.25ti/s (350 base: 70.00px/s, 4.38ti/s)
// aer200: 500*(60/200)*0.8 = 120.00px/s, 7.50ti/s (350 base: 84.00px/s, 5.25ti/s)
// trk200: 500*(50/300)*0.8 = 66.67px/s, 4.17ti/s (350 base: 46.67px/s, 2.92ti/s)

class Building {
  constructor(name, origin, width, height, imgSrc, cost, loadout) {
    this.name = name; 
    this.origin = origin; 
    this.width = width;
    this.height = height; 
    this.img = new Image(); 
    this.img.src = imgSrc;

    this.cost = cost;

    this.structure = loadout.structure;
    this.armor = loadout.armor;
    this.storage = loadout.storage;
    this.battery = loadout.battery;
    this.weapons = loadout.weapons;
    this.utilities = loadout.utilities;
  }

  beginConstruction() {} //  begins construction process by establishing a "ghost" building object that is visible at the build location, but doesn't interact with anything until a tool increases its health above 0-10%.
  completeConstruction() {} // Brings the building fully online and unlocks all of its functionality.
  increaseHealth() {} // Increases the building's health up to max.
  decreaseHealth() {} // Decreases the building's health and calls destroy() if it falls to or below 0.
  destroy() {} // Removes the building from existence and activates anything that needs to happen upon that event.
}

class Wall extends Building {
  constructor(name, origin, width, height, imgSrc, cost, loadout) {
    super(name, origin, width, height, imgSrc, cost, loadout);
    this.collisionAreaRect = [[this.origin.x, this.origin.y], [this.origin.x + this.width, this.origin.y + this.height]]
  }
}

class Turret extends Building {
// Only make turrets handle one weapon at a time for the demo.
  constructor(name, origin, width, height, imgSrc, cost, loadout) {
    super(name, origin, width, height, imgSrc, cost, loadout);
  }
  renewTarget() {} // decide what to shoot at, taking into account the equipped weapon's range and target priority, and any obstructions that block the line of fire to an otherwise valid target.
  aimAtTarget() {} // Rotate gun toward target, not firing unless the gun is on target. 
  turn() {} // Rotate the weapon. 
  checkReadyToFire() {} // Tests if the weapon is ready to fire.
  fire() {} // Fires the weapon.
}


// Zombot economy/spawning ideas

// Enemy starting resources and resource gain rate is part of the level object, and is modified by the difficulty setting
gs.lm.enemyResources = 0; 
gs.lm.enemyResourceGainRate = 1; // per second
// Every frame, as part of enemy behavior, the game loop should:
// -- Choose an enemy spawn group based on which ones are currently available at the current time into the level, and the current weighting/percent chance assigned to each group (Example: group1 60%, group2 30%, group3 10%, group4 0%).
// -- Check to see if there are enough resources to spawn the next enemy spawn group, spawn if so, wait if not.

class EnemySpawnPoint {
  constructor(name, id, origin) {
    this.name = name; 
    this.id = id;
    this.origin = origin; 
  }
  spawnEnemyGroup(group) {
    let groupToSpawn = []; 
    let spawnOffset = {x: 0, y: 0}; 
    for (let i = 0; i < group.length; i++) {
      if (group[i].name === enemyA) {
        groupToSpawn.push(new enemyA());
      } else if (group[i].name === enemyB) {
        groupToSpawn.push(new enemyB());
      }
    }
    for (let i = 0; i < groupToSpawn.length; i++) {
      if (i === 0) {
        spawnOffset = {x: -4 - (groupToSpawn[i].width), y: -4 - (groupToSpawn[i].height)}
      } else if (i === 1) {
        spawnOffset = {x: 4, y: -4 - (groupToSpawn[i].height)}
      } else if (i === 2) {
        spawnOffset = {x: -8 - (groupToSpawn[i].width), y: 4}
      } else if (i === 3) {
        spawnOffset = {x: 4, y: 4}
      } else {
        console.log('Error: more than 4 objects in groupToSpawn')
      }
      groupToSpawn[i].origin.x = groupToSpawn[i].origin.x + spawnOffset.x;
      groupToSpawn[i].origin.y = groupToSpawn[i].origin.y + spawnOffset.y;
      currentMobiles.push(groupToSpawn[i]);
    }
  }
}

// Example of enemy spawn possibilities based on each level
// sg = spawn group
let sgZombotBasic1 = {cost: 5, units: ['zombotBasic']};
let sgZombotBasic4 = {cost: 20, units: ['zombotBasic', 'zombotBasic', 'zombotBasic', 'zombotBasic']};
let sgZombotArmored1 = {cost: 10, units: ['zombotArmored']};
let sgZombotArmored4 = {cost: 40, units: ['zombotArmored', 'zombotArmored', 'zombotArmored', 'zombotArmored']}; 

level.enemySpawns = [sgZombotBasic1, sgZombotBasic4, sgZombotArmored1, sgZombotArmored4];


// 11/08/21: 
// Continuing enemy spawning ideas

// Store some of this info in gs.lm, not the level object. Level object should function as read-only. Any modifications are made outside the object.
level.sgWeightsMin = [80, 20, 0, 0]; 
level.sgWeightsMax = [10, 20, 40, 30]; 
level.sgWeightsCurrent = level.sgWeightsMin;
level.presenceMin = 1; 
level.presenceMax = 100; 
level.presenceCurrent = 20; 

// Methods in Level class
class Level {
  constructor() {

  }
  changePresence(newNum) {
    this.currentPresence = newNum;
    for (let i = 0; i < this.sgWeightsCurrent; i++) {
      // Make the weights change linearly between their min and max numbers based on the current presence level.
      this.sgWeightsCurrent[i] = []; // factors: this.sgWeightsMin, this.sgWeightsMax, this.currentPresence
    }

    // Old
    for (let i = 0; i < 100; i++) {
      if (i === this.currentPhase) {
        this.sgWeightsCurrent = this.spawnWeights[i];
      }
    }
  }

  increasePhase() {
    this.changePhase(this.currentPhase + 1);
  }

  decreasePhase() {
    this.changePhase(this.currentPhase - 1);
  }
}


// Maybe have like 100 phases per level, a starting set of spawn weights, a minimum set and a maximum set. That way phases (rename to Zombot presence?) have room to progress with time, but also with how much the player builds, which effectively attracts more Zombots by increasing the phase or "presence".
// Maybe levels can actually add or activate more spawn points to handle increased spawn rates late in the level if needed. 