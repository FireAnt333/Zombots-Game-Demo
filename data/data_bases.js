/*
BASE ITEM DATA (MEDU CHASSIS, TURRET BASES, HQ BUILDINGS)

This file contains all information and data for all MEDU chassis, turret bases and HQ buildings in the game.

TO DO: 
- 

*/



// 11/17/21: Add instances of Loadout class to gs.gd.loadoutLibrary.

class Loadout {
            // name, base, structure, armor, engine, battery, storage, weapons, utilities
  constructor (name, base, structure, armor, engine, battery, storage, weapons, utilities) {
    this.name = name;
    this.base = base;
    this.inventoryStatus = 'owned';

    this.structure = {
      max: structure, 
      current: structure,
    };
    this.armor = {
      max: armor, 
      current: armor,
    };
    this.engine = {
      max: engine, 
      current: engine,
    };
    this.battery = {
      max: battery, // Maximum weight
      current: battery, 
      cap: battery * 100, // Capacity in power units (100 power per weight)
      power: battery * 100, // Current power level
    };
    this.storage = {
      max: storage, // Maximum weight
      current: storage, 
      cap: storage * 100, // Capacity in parts (100 parts per weight)
      parts: storage * 100, // Current parts level
    };

    this.weaponsArray = weapons;
    this.weapons = {
      mount1: weapons[0], 
      mount2: weapons[1],  
      mount3: weapons[2], 
    };

    this.utilitiesArray = utilities;
    this.utilities = {
      mount1: utilities[0], 
      mount2: utilities[1],  
      mount3: utilities[2], 
    };


    //this.loadoutCard = new LoadoutCard(this.base.name, origin, width, height, border, false, null, 0, this.elements, this.base, this.weapons, this.utilities);
    //this.loadoutCard = new LoadoutCard(this.base.name, {x:0, y:0}, 133, 42, 1, false, null, 0, [], this.base, this.weapons, this.utilities);
  }

  validateLoadout() {
    // Check to see if all arguments passed in with a new loadout are valid based on the chassis' minimum and maximum values
    let numOfFlags = 0;
    let flagMessages = [];
    if (this.structure.current > this.structure.max || this.structure.current < this.structure.min) {
      numOfFlags++;
      flagMessages.push(`Structure (${this.structure.current}) is outside of required range (${this.structure.min} to ${this.structure.max})`);
    }
    if (this.armor.current > this.armor.max || this.armor.current < this.armor.min) {
      numOfFlags++;
      flagMessages.push(`Armor (${this.armor.current}) is outside of required range (${this.armor.min} to ${this.armor.max})`);
    }
    if (this.engine.current > this.engine.max || this.engine.current < this.engine.min) {
      numOfFlags++;
      flagMessages.push(`Engine (${this.engine.current}) is outside of required range (${this.engine.min} to ${this.engine.max})`);
    }
    if (this.battery.current > this.battery.max || this.battery.current < this.battery.min) {
      numOfFlags++;
      flagMessages.push(`Battery (${this.battery.current}) is outside of required range (${this.battery.min} to ${this.battery.max})`);
    }
    if (this.storage.current > this.storage.max || this.storage.current < this.storage.min) {
      numOfFlags++;
      flagMessages.push(`Storage (${this.storage.current}) is outside of required range (${this.storage.min} to ${this.storage.max})`);
    }

    // Add flags for weapons and utility slot violations (items too heavy, no weapons OR utilities mounted, etc.)

    if (numOfFlags > 0) {
      console.log(`Invalid loadout - Errors: ${numOfFlags}`);
      for (let i = 0; i < flagMessages.length; i++) {
        console.log(flagMessages[i]);
      }
      return false;
    } else if (numOfFlags === 0) {
      console.log('Loadout validated!');
      return true;
    }
  }
}

class Base {
  constructor(name, weight, structure, armor, engine, battery, storage, weapons, utilities, nameImgSrc, objImgSrc, ) {

    this.name = name;
    this.wt = weight.max; // Weight
    this.type = 'Chassis';
    this.class = 'Wheeled';
    this.nameImgSrc = nameImgSrc;
    this.objImgSrc = objImgSrc;

    this.weight = {
      max: weight.max,
    };
    this.structure = {
      max: structure.max, 
      min: structure.min,
    };
    this.armor = {
      max: armor.max, 
      min: armor.min,
    };
    this.engine = {
      max: engine.max, 
      min: engine.min,
    };
    this.battery = {
      max: battery.max, 
      min: battery.min,
    };
    this.storage = {
      max: storage.max, 
      min: storage.min,
    };
    this.weapons = {
      mount1: {
        maxWeight: weapons.mount1.maxWeight,
      },
      mount2: {
        maxWeight: weapons.mount2.maxWeight,
      },
      mount3: {
        maxWeight: weapons.mount3.maxWeight,
      },
    };
    this.utilities = {
      mount1: {
        maxWeight: utilities.mount1.maxWeight,
      },
      mount2: {
        maxWeight: utilities.mount2.maxWeight,
      },
      mount3: {
        maxWeight: utilities.mount3.maxWeight,
      },
    };
  }
}



// ------------------------------------------------------------
//        WHEELED CHASSIS CLASS, BASE ITEMS AND LOADOUTS
// ------------------------------------------------------------

class ChassisWheeled extends Base {
  constructor(name, weight, structure, armor, engine, battery, storage, weapons, utilities, nameImgSrc, objImgSrc) {
    super(name, weight, structure, armor, engine, battery, storage, weapons, utilities, nameImgSrc, objImgSrc);
    this.type = 'chassis';
    this.class = 'wheeled';

    this.iconSrc = 'resources/images/ui_480x320/Icons/Icon_Chassis_Wheeled_1_16x16.png';
    this.iconSrcPrimary = 'resources/images/ui_480x320/Icons/Icon_Chassis_Wheeled_1_16x16.png';
    this.nameImgSrc = nameImgSrc;
  }
}

const whl200 = new ChassisWheeled(
  'Chassis: 200-WHL', 
  {max: 200},                // Weight
  {max:  60, min: 20},       // Structure
  {max:  60, min:  0},       // Armor
  {max:  60, min: 20},       // Engine
  {max:  30, min:  0},       // Battery
  {max:  30, min:  0},       // Storage
  {mount1: {maxWeight: 40},  // Weapon mount 1
   mount2: {maxWeight: 20},  // Weapon mount 2
   mount3: {maxWeight:  0}}, // Weapon mount 3
  {mount1: {maxWeight: 40},  // Utility mount 1
   mount2: {maxWeight: 20},  // Utility mount 2
   mount3: {maxWeight:  0}}, // Utility mount 3
   'resources/images/ui_480x320/Text/ChassisName_200-WHL_53x18.png' // nameImgSrc
);
const whl200stock = new Loadout('200-WHL: Stock', whl200, 40, 40, 50, 15, 15, [new MCG30(), false, null], [new BCT10(), false, null]);



// ------------------------------------------------------------
//        TRACKED CHASSIS CLASS, BASE ITEMS AND LOADOUTS
// ------------------------------------------------------------

class ChassisTracked extends Base {
  constructor(name, weight, structure, armor, engine, battery, storage, weapons, utilities, nameImgSrc, objImgSrc) {
    super(name, weight, structure, armor, engine, battery, storage, weapons, utilities, nameImgSrc, objImgSrc);
    this.type = 'chassis';
    this.class = 'tracked';

    this.iconSrc = 'resources/images/ui_480x320/Icons/Icon_Chassis_Tracked_1_16x16.png';
    this.iconSrcPrimary = 'resources/images/ui_480x320/Icons/Icon_Chassis_Tracked_1_16x16.png';
    this.nameImgSrc = nameImgSrc;
  }
}

const trk300 = new ChassisTracked(
  'Chassis: 300-TRK', 
  {max: 300},                // Weight
  {max:  90, min: 30},       // Structure
  {max: 100, min:  0},       // Armor
  {max:  90, min: 30},       // Engine
  {max:  40, min:  0},       // Battery
  {max:  40, min:  0},       // Storage
  {mount1: {maxWeight: 60},  // Weapon mount 1
   mount2: {maxWeight: 20},  // Weapon mount 2
   mount3: {maxWeight: 20}}, // Weapon mount 3
  {mount1: {maxWeight: 40},  // Utility mount 1
   mount2: {maxWeight: 20},  // Utility mount 2
   mount3: {maxWeight:  0}}, // Utility mount 3
   'resources/images/ui_480x320/Text/ChassisName_300-TRK_53x18.png'
);
const trk300stock = new Loadout(`300-TRK: Stock`, trk300, 50, 60, 50, 20, 20, [new CAN60(), new MCG20(), false], [new BCT20(), false, null]); 



// ------------------------------------------------------------
//      STATIC WEAPON FRAME CLASS, BASE ITEMS AND LOADOUTS
// ------------------------------------------------------------

class StaticWeaponFrame {
  constructor() {
    //super(structure, armor, engine, battery, storage, weapons, utilities);
    this.type = 'building';
    this.class = 'weaponframe';

    this.iconSrc = 'resources/images/ui_480x320/Icons/Icon_Building_WeaponFrame_GREEN_16x16.png';
    this.iconSrcPrimary = 'resources/images/ui_480x320/Icons/Icon_Building_WeaponFrame_GREEN_16x16.png';
  }
}

class SWF40 extends StaticWeaponFrame {
  constructor(position, id) {
    super();
    this.name = 'Building: 40-SWF'; 
    this.position = position;
    this.id = id;

    this.img = new Image();
    this.img.src = 'resources/images/sprites/buildings/Turret_Base_4_32x32.png';
    this.width = 32;
    this.height = 32;

    this.nameImgSrc = '';
    this.objImgSrc = '';

    this.weight =    {max: 40, min: 0, current: 0}; // Weight
    this.structure = {max: 20, min: 5, current: 0}; // Structure
    this.armor =     {max: 20, min: 0, current: 0}; // Armor
    this.engine =    {max:  0, min: 0, current: 0}; // Engine
    this.battery =   {max:  0, min: 0, current: 0}; // Battery
    this.storage =   {max:  0, min: 0, current: 0}; // Storage


    this.weapons =   {mount1: {maxWeight: 20, current: null}, // Weapon mount 1
                      mount2: {maxWeight:  0, current: null}, // Weapon mount 2
                      mount3: {maxWeight:  0, current: null}, // Weapon mount 3
                     }; 
    this.utilities = {mount1: {maxWeight:  0, current: null}, // Utility mount 1
                      mount2: {maxWeight:  0, current: null}, // Utility mount 2
                      mount3: {maxWeight:  0, current: null}, // Utility mount 3
                     };
    this.nameImgSrc = 'resources/images/ui_480x320/Text/BuildingName_40-SWF_53x18.png'; // Name image for display in menus
    this.objImgSrc = 'resources/images/sprites/buildings/Turret_Base_4_32x32.png'; // Object image for display in levels
  }
}

/*
const swf40 = new StaticWeaponFrame(
  'Building: 40-SWF', 
  {max: 40},                 // Weight
  {max: 20, min: 10},        // Structure
  {max: 20, min:  0},        // Armor
  {max:  0, min:  0},        // Engine
  {max:  0, min:  0},        // Battery
  {max:  0, min:  0},        // Storage
  {mount1: {maxWeight: 20},  // Weapon mount 1
   mount2: {maxWeight:  0},  // Weapon mount 2
   mount3: {maxWeight:  0}}, // Weapon mount 3
  {mount1: {maxWeight:  0},  // Utility mount 1
   mount2: {maxWeight:  0},  // Utility mount 2
   mount3: {maxWeight:  0}}, // Utility mount 3
   'resources/images/ui_480x320/Text/BuildingName_40-SWF_53x18.png', // Name image for display in menus
   'resources/images/sprites/buildings/Turret_Base_4_32x32.png', // Object image for display in levels
);
*/

const swf40stock = new Loadout('40-SWF: Stock', new SWF40(null, null), 10, 20, 0, 0, 0, [new MCG10(), null, null], [null, null, null]); 

const swf100 = new StaticWeaponFrame(
  'Building: 100-SWF', 
  {max: 100},                // Weight
  {max:  40, min: 20},       // Structure
  {max:  40, min:  0},       // Armor
  {max:   0, min:  0},       // Engine
  {max:   0, min:  0},       // Battery
  {max:   0, min:  0},       // Storage
  {mount1: {maxWeight: 60},  // Weapon mount 1
   mount2: {maxWeight:  0},  // Weapon mount 2
   mount3: {maxWeight:  0}}, // Weapon mount 3
  {mount1: {maxWeight:  0},  // Utility mount 1
   mount2: {maxWeight:  0},  // Utility mount 2
   mount3: {maxWeight:  0}}, // Utility mount 3
   'resources/images/ui_480x320/Text/BuildingName_100-SWF_53x18.png'
);
const swf100stock = new Loadout('100-SWF: Stock', swf100, 20, 35, 0, 0, 0, [new CAN45(), null, null], [null, null, null]);



/* Old loadout drafts (format not used, stats still useful for demo)
const wheeled200 = new Loadout(`200-WHL: Basic Test`, new WHL200(40, 40, 50, 15, 15, [new MCG30()], [new BCT10()]));
const wheeled200 = new Loadout(`200-WHL: Stock`, new WHL200(), 40, 30, 40, 15, 15, [new HAC40()], [new BCT20()]);

const bipedal100 = new Loadout(`100-BPD: Stock`, bpd100, 20, 15, 15, 10, 10, [new mcg10(), new mcg10()], [new bct10()];
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
*/

