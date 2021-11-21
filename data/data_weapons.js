/*
WEAPON DATA

This file contains all information and data for all weapons in the game.

TO DO: 
- Make individual weapons their own class, so I can create multiple instances of the same weapon. For example, 10-MCG, 20-MCG and 30-MCG should all have their own separate class


*/



/* WEAPON PROPERTIES AND EXPECTED INPUTS
// Properties that all weapons have
DI = Direct Input
CI = Calculated Input (based on direct inputs)
----------
- (DI) name
  - Description: The name of the item.
  - Expected Format: A 6-character string in the format '##-XXX', with 2 numbers designating the weight, 1 dash, and 3 letters designating the item type. Ex: '10-MCG' is a Machine Gun (MCG) with a weight of 10.
----------
- (DI) wt (Weight)
  - Description: The weight of the item.
  - Expected Format: An integer.
----------
- (DI) sps (Shots Per Second)
  - Description: The number of times a weapon can be fired in one second, averaged out across time.
  - Expected Format: An integer or floating point number. 
----------
- (CI) shotReload (Shot Reload Time)
  - Description: The time from firing a weapon until it can be fired again.
  - Expected Format: An integer or floating point number (NOT A DIRECT INPUT; calculated based on other inputs).
----------
- (DI) currentAngle
  - Description: 
  - Expected Format: An integer or floating point number.
----------
- (DI) centerOfRotation
  - Description: The coordinates within the weapon's sprite where it attaches to the chassis and rotates.
  - Expected Format: An array of two integers. 
*/
// name, wt, sps, currentAngle, centerOfRotation
class Weapon {
  constructor (name, wt, sps, currentAngle, centerOfRotation) {
    this.name = name; // Description above "Weapon" class
    this.wt = wt; // Description above "Weapon" class
    this.sps = sps; // Description above "Weapon" class
    this.currentAngle = currentAngle; // Description above "Weapon" class
    this.centerOfRotation = centerOfRotation; // Description above "Weapon" class
  }
};



/* WEAPON GROUP PROPERTIES AND EXPECTED INPUTS
// Optional properties, based on the characteristics of each weapon group
DI = Direct Input
----------
- (DI) ivi (Intra-Volley Interval)
  - Description: The time between individual projectiles in weapons that fire multiple projectiles successively upon one instance of firing the weapon. Ex: Burst Rifle, Grenade Volley. (Not to be confused with weapons like the shotgun that can fire multiple projectiles simultaneously, but not successively.)
  - Expected Format: An integer or floating point number. 
----------
- (DI) rampUpTime
  - Description: The time that the fire button must be held before the weapon begins firing.
  - Expected Format: An integer or floating point number. 
*/
// ivi, rampUpTime
class MCG extends Weapon {
  constructor(name, wt, sps, currentAngle, centerOfRotation, ivi, rampUpTime) {
    super(name, wt, sps, currentAngle, centerOfRotation);
    this.ivi = ivi; // Description above weapon group classes
    this.rampUpTime = rampUpTime; // Description above weapon group classes
  };
};



/* WEAPON PROPERTIES
// Properties that represent the characteristics of each individual weapon
BAT = Based on Ammo Type
DI = Direct Input
CI = Calculated Input (based on direct inputs)

----------
- (DI) name
  - Description: The name of the item.
  - Expected Format: A 6-character string in the format '##-XXX', with 2 numbers designating the weight, 1 dash, and 3 letters designating the item type. Ex: '10-MCG' is a Machine Gun (MCG) with a weight of 10.
----------
- (DI) wt (Weight)
  - Description: The weight of the item.
  - Expected Format: An integer.
----------
- (DI) reload
  - Description: The number of times a weapon can be fired in one second, averaged out across time.
  - Expected Format: An array where the first index is an integer or floating point number, and the second index is a string, either 'sps' or 'sr'. 
----------
- (CI) sps (Shots Per Second)
  - Description: The number of times a weapon can be fired in one second, averaged out across time.
  - Expected Format: An integer or floating point number. (NOT A DIRECT INPUT; calculated based on other inputs).
----------
- (CI) shotReload (Shot Reload Time)
  - Description: The time from firing a weapon until it can be fired again.
  - Expected Format: An integer or floating point number (NOT A DIRECT INPUT; calculated based on other inputs).
----------
- (DI) ppv (Projectiles Per Volley)
  - Description: The number of separate projectiles fired in quick succession upon one click when using volley weapons.
  - Expected Format: An integer.
----------
- (DI) ivi (Intra-Volley Interval)
  - Description: The time between individual projectiles in weapons that fire multiple projectiles successively upon one instance of firing the weapon. Ex: Burst Rifle, Grenade Volley. (Not to be confused with weapons like the shotgun that can fire multiple projectiles simultaneously, but not successively.)
  - Expected Format: An integer or floating point number. 
----------
- (DI) rampUpTime
  - Description: The time that the fire button must be held before the weapon begins firing.
  - Expected Format: An integer or floating point number. 
----------
- (DI) shotsPerMag (Shots Per Magazine)
  - Description: the number of times the weapon can be fired before needing a magazine reload.
  - Expected Format: An integer. 
----------
- (DI) magReload (Magazine Reload Time)
  - Description: The time it takes for the magazine to reload.
  - Expected Format: An integer or floating point number. 
----------
- (CI) magCycle (Magazine Full Cycle Time)
  - Description: The time it takes to fire a full magazind and reload. 
  - Expected Format: An integer or floating point number (NOT A DIRECT INPUT; calculated based on other inputs).
----------
- (DI) baseSpread
  - Description: The number of degrees (upon the first shot) that set the boundaries of how far this weapon's shots can deviate from perfect, straight-line accuracy, accounting for deviation to the left and right. (EX: minSpread of 10 means the shots can deviate up to 5 degrees to the left and 5 degrees to the right, or anywhere in between.)
  - Expected Format: An integer or floating point number. 
----------
- (CI) currentSpread
  - Description: The current width of the spread arc (measured in degrees).
  - Expected Format: An integer or floating point number. 
----------
- (DI) maxSpread
  - Description: The maximum number of degrees (upon long-term sustained fire) that set the boundaries of how far this weapon's shots can deviate from perfect, straight-line accuracy, accounting for deviation to the left and right. (EX: maxSpread of 20 means the shots can deviate up to 10 degrees to the left and 10 degrees to the right, or anywhere in between.)
  - Expected Format: An integer or floating point number. 
----------
- (DI) spreadPerShot
  - Description: The number of degrees the spread arc increases by when one shot is fired (applied for each projectile in volley weapons). 
  - Expected Format: An integer or floating point number. 
----------
- (DI) spreadDecay
  - Description: The number of degrees the spread arc decreases per second when it is above its base level.
  - Expected Format: An integer or floating point number. 
----------
- (CI) spreadTime (Time to Max Spread)
  - Description: The time it takes for minSpread to increase to maxSpread as the weapon fires continuously.
  - Expected Format: An integer or floating point number (NOT A DIRECT INPUT; calculated based on other inputs). 
----------
- (DI) ammoTypes
  - Description: Info and behavior specific to different types of ammunition that can be used in the weapon.
  - Expected Format: An object containing 1 or more other objects, each with these properties/characteristics:
    ----------
    - (DI/BAT) ammoNameShort
      - Description: An abbreviation of the ammo type's full name.
      - Expected Format: A string. 
    ----------
    - (DI/BAT) ammoNameFull
      - Description: The ammo type's full name.
      - Expected Format: A string. 
    ----------
    - (DI/BAT) description (...of the ammo type)
      - Description: Describes the general parameters of the ammo type, and what sets it apart from the standard type.
      - Expected Format: A string. 
    ----------
    - (DI/BAT) pps (Projectiles Per Shot)
      - Description: the number of projectiles fired upon one instance of firing the weapon.
      - Expected Format: An integer.
    ----------
    - (DI/BAT) damage
      - Description: The base number of damage done to a target per projectile.
      - Expected Format: An integer.
    ----------
    - (DI/BAT) damageVariance
      - Description: A multiplier indicating the amount that damage can deviate from the base. (Ex: damageVariance of 0.2 means that 10 damage can vary by +/- 2 and become anywhere between 8 and 12.)
      - Expected Format: A floating point number between 0 and 1.
    ----------
    - (DI/BAT) damageType
      - Description: A "type" of damage, like ballistic, explosive or electric, that may have a special interaction with the target.
      - Expected Format: A string.
    ----------
    - (DI/BAT) splashDamage
      - Description: A multiplier indicating the amount of the base damage that is applied as splash/area damage. (Ex: splashDamage of 0.5 means a projectile with a damage of 10 will do an additional 5 splash/area damage.)
      - Expected Format: A floating point number between 0 and 1.
    ----------
    - (DI/BAT) splashRange
      - Description: The distance from the point of impact where splash damage decreases to 0.
      - Expected Format: An integer or floating point number. 
    ----------
    - (DI/BAT) penetration
      - Description: An indicator of how much armor a round can penetrate, roughly corellating with more damage, especially against heavily armored targets.
      - Expected Format: An integer or floating point number.
    ----------
    - (DI/BAT) optRange (Optimal Range)
      - Description: A range at which the weapon functions ideally.
      - Expected Format: An integer, floating point number, or a range between two integers or floating point numbers.
    ----------
    - (DI/BAT) minRange (Minimum Range)
      - Description: A range below which the weapon will function less effectively, or not at all.
      - Expected Format: An integer or floating point number. 
    ----------
    - (DI/BAT) maxRange (Maximum Range)
      - Description: A range above which the weapon will function less effectively, or not at all.
      - Expected Format: An integer or floating point number. 
    ----------
    - (DI/BAT) projectileSpeed
      - Description: The speed of the fired projectile (different from velocity, which takes vector into account). 
      - Expected Format: An integer or floating point number. 
    ----------
    - (DI/BAT) spreadMultiplier
      - Description: Modifies the weapon's base spreadPerShot, either increasing or decreasing effective accuracy.
      - Expected Format: An integer or floating point number.
  ----------
  - (CI/BAT) magDamage (Magazine Damage Total)
    - Description: The average damage output of a full magazine.
    - Expected Format: An integer or floating point number (NOT A DIRECT INPUT; calculated based on other inputs)
  ----------
  - (CI/BAT) dps (Damage Per Second)
    - Description: The average damage per second output of a continuously-firing weapon.
    - Expected Format: An integer or floating point number (NOT A DIRECT INPUT; calculated based on other inputs)
  ----------
  - (CI/BAT) dpswt (Damage Per Second Per Weight)
    - Description: The DPS number divided by the weapon's weight.
    - Expected Format: An integer or floating point number (NOT A DIRECT INPUT; calculated based on other inputs)
  ----------
  - (CI/BAT) sdps (Sustained Damage Per Second)
    - Description: The average damage per second output of a continuously-firing weapon, including reload periods if required.
    - Expected Format: An integer or floating point number (NOT A DIRECT INPUT; calculated based on other inputs)
  ----------
  - (CI/BAT) sdpswt (Sustained Damage Per Second Per Weight)
    - Description: The SDPS number divided by the weapon's weight.
    - Expected Format: An integer or floating point number (NOT A DIRECT INPUT; calculated based on other inputs)
  ----------
  - (DI) imgSrc (Image Source)
    - Description: The file location of the weapon's image to draw on the screen. 
    - Expected Format: A string.
  ----------
  - (DI) centerOfRotation
    - Description: The coordinates within the weapon's sprite where it attaches to the chassis and rotates.
    - Expected Format: An array of two integers. 
  ----------
  - (DI) position
    - Description: The X and Y coordinates in a level that indicate the location of the weapon. 
    - Expected Format: An array of two integers or floting point numbers.
  ----------
  - (DI) angle
    - Description: The number of degrees that represents the angle the weapon is currently facing.
    - Expected Format: An integer or floating point number.
*/

// name, wt, sps, shotReload, ivi, rampUp, shotsPerMag, magReload, baseSpread, maxSpread, spreadPerShot, spreadDecay, ammoTypes [ammoNameShort, ammoNameFull, description, pps, damage, damageVariance, damageType, splashDamage, splashRange, penetration, optRange, minRange, maxRange, projectileSpeed, spreadMultiplier], imgSrc, centerOfRotation, position, angle

// 11/12/21: Constructor takes in 10 values indicating mods, true/false/null, true for active mod slot, false for inactive mod slot, null for a slot with no mods available (used for items with less than 10 possible mods)
class MCG10 {
  constructor() {
    this.img = new Image();
    this.img.src = 'resources/images/sprites/weapons/Player_Gun_16x16.png';
    this.width = 16;
    this.height = 16;

    this.iconSrcRed = 'resources/images/ui_480x320/Icons/Icon_Weapon_MachineGun_RED_16x16.png';
    this.iconSrcGreen = 'resources/images/ui_480x320/Icons/Icon_Weapon_MachineGun_GREEN_16x16.png';
    this.iconSrcPurple = 'resources/images/ui_480x320/Icons/Icon_Weapon_MachineGun_PURPLE_16x16.png';
    this.iconSrcPrimary = this.iconSrcRed;
    this.nameImgSrc = 'resources/images/ui_480x320/Text/ItemName_10-MCG_53x18.png';

    this.collisionIgnoreList = ['player'];

    this.position = {x:0, y:0};
    this.projectileOrigin = {x:8, y:2};
    this.centerOfRotation = {x:8, y:10};
    this.angle = 0;

    this.name = '10-MCG';
    this.wt = 10; // Weight
    
    this.sps = 10; // Shots Per Second
    this.shotReload = 1 / this.sps;
    this.ppv = 1; // Projectiles Per Volley
    this.ivi = 0; // Intra-Volley Interval
    this.rampUpTime = 0; 
    this.shotsPerMag = 30; 
    this.currentShotsInMag = this.shotsPerMag;
    this.magReload = 5; 
    this.magCycle = this.magReload + (this.shotReload * (this.shotsPerMag - 1)) + (this.ivi * this.shotsPerMag); 
    
    this.tols = 0; // Time Of Last Shot
    this.tolp = 0; // Time Of Last Projectile (when PPV > 1)
    this.tolmr = 0; // Time Of Last Magazine Reload
    this.tslmr = 0; // Time Since Last Magazine Reload
    this.currentlyReloading = false;
    
    this.baseSpread = 10; 
    this.currentSpread = this.baseSpread;
    this.maxSpread = 20; 
    this.spreadPerShot = 1;
    this.spreadDecay = 5;

    //  SLD: Spread Limit Difference
    // GSPS: Gross Spread Per Second
    // NSPS:   Net Spread Per Second
    // this.spreadTime = (maxSpread - baseSpread) / (sps * (ivi * (ppv-1)) * spreadPerShot) - spreadDecay; 
    //             SLD = (maxSpread - baseSpread)
    //            GSPS =                            (sps * (ivi * (ppv-1)) * spreadPerShot)
    //            NSPS =                            (                 GSPS                ) - spreadDecay
    //      spreadTime = (         SLD          ) / (                 NSPS                               )
    this.spreadTime = (this.maxSpread - this.baseSpread) / (this.sps * (this.ivi * (this.ppv-1)) * this.spreadPerShot) - this.spreadDecay; 

    // Each object in ammoTypes has properties of (ammoNameShort, ammoNameFull, description, pps, damage, damageVariange, damageType, splashDamage, splashRange, penetration, optRange, minRange, maxRange, projectileSpeed, spreadMultiplier, hitRange, imgSrc)
    this.ammoTypes = {
      ammoType1: {
        ammoNameShort: 'BA',
        ammoNameFull: 'Ball',
        description: 'A basic round designed to deal damage to unarmored or lightly armored targets.',
        pps: 1,
        damage: 10,
        damageVariance: 0.2,
        damageType: 'Ballistic',
        penetration: 10,
        splashDamage: 0,
        splashRange: 0,
        optRange: 10,
        minRange: 0,
        maxRange: 100,
        projectileSpeed: 2,
        spreadMultiplier: 1,
        hitRange: 2, 
        imgSrc: 'resources/images/sprites/weapons/Bullet1_8x8.png',
        width: 8,
        height: 8,
      }, 
      ammoType2: {
        ammoNameShort: 'HP',
        ammoNameFull: 'Hollow Point',
        description: 'An alternative round designed to deal higher damage at the cost of lower armor penetration.',
        pps: 1,
        damage: 12,
        damageVariance: 0.2,
        damageType: 'Ballistic',
        penetration: 7,
        splashDamage: 0,
        splashRange: 0,
        optRange: 9,
        minRange: 0,
        maxRange: 100,
        projectileSpeed: 2,
        spreadMultiplier: 0.9,
        hitRange: 2, 
        imgSrc: 'resources/images/sprites/weapons/Bullet1_8x8.png',
        width: 8,
        height: 8,
      },
    };
    this.activeAmmo = this.ammoTypes.ammoType1;

    // These are calculated using stats from the standard ammo type for the weapon.
    //this.damage = this.ammoTypes['ammoType1']['damage'] * this.ammoTypes['ammoType1']['pps'];
    this.damage = this.ammoTypes.ammoType1.damage * this.ammoTypes.ammoType1.pps; 
    this.magDamage = this.damage * this.shotsPerMag;
    this.dps = this.damage * this.sps;
    this.sdps = (this.magCycle > 0) ? this.magDamage / this.magCycle : this.dps;
    this.dpswt = this.dps / this.wt;
    this.sdpswt = this.sdps / this.wt;
    
    this.firstMag = true;
  };

  // Attempts to fire weapon, and calls fire() if weapon isReadyToFire()
  attemptFire(timestamp) {
    if (this.isReadyToFire(timestamp)) {
      this.fire(timestamp);
    } else {
      //console.log('This weapon is not ready to fire');
    }
  }
  
  // Checks if weapon is ready to fire
  isReadyToFire(timestamp) {
    //console.log(`TSLS : ${timestamp - this.tols}`);
    //console.log(`TSLMR: ${timestamp - this.tolmr}`);
    if (
      timestamp -  this.tols >= this.shotReload*1000 &&
      (timestamp - this.tolmr >=  this.magReload*1000 || this.firstMag) &&
      this.currentShotsInMag > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  // Fires weapon
  fire(timestamp) {
    // Decides whether damage variance will be added to or subtracted from base damage for this projectile
    let posOrNeg = Math.random();
    if (posOrNeg < 0.5) {
      posOrNeg = -1;
    } else if (posOrNeg >= 0.5) {
      posOrNeg = 1;
    }
    
    // Decides whether the damage number should be rounded up or down to an integer
    let projectileDamageMultiplier = 1 + (posOrNeg * this.damageVariance * Math.random());
    //console.log(`this.activeAmmo: ${this.activeAmmo.ammoNameShort}`);
    //console.log(`gs.lm.player: ${gs.lm.player}`);
    //console.log(`gs.lm.player.loadout.weapons[0].name: ${gs.lm.player.loadout.weapons[0].name}`);
    let projectileDamageInitial = this.activeAmmo.damage * projectileDamageMultiplier;
    let projectileDamageRemainder = projectileDamageInitial % 1;
    let projectileDamageFinal = 0;
    if (projectileDamageRemainder < 0.5) {
      projectileDamageFinal = Math.floor(projectileDamageInitial);
    } else if (projectileDamageRemainder >= 0.5) {
      projectileDamageFinal = Math.ceil(projectileDamageInitial);
    }
    
    // Creates new Projectile() object and adds it to the gs.lm.currenetProjectiles array, where the game logic can act on it
    // Projectile() object inputs: sourceWeaponName, ammoType, position, angle, speed, minRange, optRange, maxRange, distanceTraveled, hitRange, damage, damageType, splashDamage, splashRange, penetration, imgSrc
    gs.lm.currentProjectiles.push(new Projectile(
      this.name, // Source weapon name
      this.activeAmmo.ammoNameShort, // Ammo type
      {x: gs.lm.player.position.x, y: gs.lm.player.position.y},
      //{x: this.position.x, y: this.position.y}, // Position
      //{x:10, y:10},
      this.angle, // Angle
      this.activeAmmo.projectileSpeed, // Speed
      this.activeAmmo.minRange, // Minimum range
      this.activeAmmo.optRange, // Optimal range
      this.activeAmmo.maxRange, // Maximum range
      0, // Distance traveled
      this.activeAmmo.hitRange, // Hit range (circular hit box diameter)
      projectileDamageFinal, // Damage
      this.activeAmmo.damageType, // Damage type
      this.activeAmmo.splashDamage, // Splash damage
      this.activeAmmo.splashRange, // Splash range
      this.activeAmmo.penetration, // Penetration
      this.activeAmmo.imgSrc, // Image source
      this.activeAmmo.width, // Image width
      this.activeAmmo.height, // Image height
      this.collisionIgnoreList, // List of object names for which to ignore collision
      ));
      
    this.tols = timestamp;
    this.tolp = timestamp;
    this.currentShotsInMag -= 1;
    
    // If the last shot in the magazine was just fired, initiate a magazine reload
    if (this.currentShotsInMag === 0) { 
      this.startReload(timestamp);
    }
  }

  // Checks if weapon reload should be started
  checkToStartReload(timestamp) {
    if (keyRPressedThisFrame && this.currentShotsInMag < this.shotsPerMag && !this.currentlyReloading) {
      this.startReload(timestamp);
    }
  }

  // Starts weapon reload cycle
  startReload(timestamp) {
    console.log('Reload start');
    this.tolmr = timestamp;
    this.currentShotsInMag = 0;
    this.firstMag = false;
    this.currentlyReloading = true;
    
  }

  // Checks if weapon reload is ready to complete
  checkToCompleteReload(timestamp) {
    this.tslmr = timestamp - this.tolmr;
    if (this.tslmr >= this.magReload*1000 && this.currentShotsInMag === 0) {
      this.completeReload();
    }
  }
  
  // Completes weapon reload cycle
  completeReload() {
    console.log('Reload complete');
    this.currentShotsInMag = this.shotsPerMag;
    this.currentlyReloading = false;
  }
  
  // Switches active ammo type and initiates a reload
  switchAmmoType(timestamp, ammoInput) {
    let validAmmoInput = true;
    if (validAmmoImput) { // validAmmoInput should check if the weapon has the ammo type specified
      this.activeAmmo = ammoInput;
      this.startReload(timestamp);
    } else {
      console.log('Invalid ammo input in weapon.switchAmmoType(), no action taken');
    }
  }
};

class MCG20 {
  constructor() {
    this.name = '20-MCG (Placeholder)';
    this.wt = 20; // Weight
    this.type = 'Ballistic';
    this.class = 'Machine Gun';

    this.iconSrcRed = 'resources/images/ui_480x320/Icons/Icon_Weapon_MachineGun_RED_16x16.png';
    this.iconSrcGreen = 'resources/images/ui_480x320/Icons/Icon_Weapon_MachineGun_GREEN_16x16.png';
    this.iconSrcPurple = 'resources/images/ui_480x320/Icons/Icon_Weapon_MachineGun_PURPLE_16x16.png';
    this.iconSrcPrimary = this.iconSrcRed;
    this.nameImgSrc = 'resources/images/ui_480x320/Text/ItemName_20-MCG_53x18.png';
  }
};

class MCG30 {
  constructor() {
    this.name = '30-MCG (Placeholder)';
    this.wt = 30; // Weight
    this.type = 'Ballistic';
    this.class = 'Machine Gun';

    this.iconSrcRed = 'resources/images/ui_480x320/Icons/Icon_Weapon_MachineGun_RED_16x16.png';
    this.iconSrcGreen = 'resources/images/ui_480x320/Icons/Icon_Weapon_MachineGun_GREEN_16x16.png';
    this.iconSrcPurple = 'resources/images/ui_480x320/Icons/Icon_Weapon_MachineGun_PURPLE_16x16.png';
    this.iconSrcPrimary = this.iconSrcRed;
    this.nameImgSrc = 'resources/images/ui_480x320/Text/ItemName_30-MCG_53x18.png';
  }
};

class CAN60 {
  constructor() {
    this.name = '60-CAN (Placeholder)';
    this.wt = 60; // Weight
    this.type = 'Ballistic';
    this.class = 'Cannon';

    this.iconSrcRed = 'resources/images/ui_480x320/Icons/Icon_Weapon_Cannon_RED_16x16.png';
    this.iconSrcGreen = 'resources/images/ui_480x320/Icons/Icon_Weapon_Cannon_GREEN_16x16.png';
    this.iconSrcPurple = 'resources/images/ui_480x320/Icons/Icon_Weapon_Cannon_PURPLE_16x16.png';
    this.iconSrcPrimary = this.iconSrcRed;
    this.nameImgSrc = 'resources/images/ui_480x320/Text/ItemName_60-CAN_53x18.png';
  }
};

/* UNIVERSAL PROJECTILE CLASS
This class creates Projectile objects of many different varieties depending on the inputs passed to it by different weapons firing (creating) their various projectiles.

DI = Direct Input
CI = Calculated Input (based on direct inputs)
DOC = determined on creation
DOI = determined on impact

----------
- () 
  - Description: 
  - Expected Format: 
  
sourceWeaponName, ammoType, position, angle, speed, minRange, optRange, maxRange, distanceTraveled, hitRange, damage, damageType, splashDamage, splashRange, penetration, imgSrc, imgWidth, imgHeight, collisionIgnoreList
  
*/

class Projectile {
  constructor (sourceWeaponName, ammoType, position, angle, speed, minRange, optRange, maxRange, distanceTraveled, hitRange, damage, damageType, splashDamage, splashRange, penetration, imgSrc, imgWidth, imgHeight, collisionIgnoreList) {
    this.name = `projectile:${sourceWeaponName}`;
    
    this.img = new Image();
    this.img.src = imgSrc;
    //this.img.src = 'resources/images/sprites/weapons/Bullet1_8x8.png';
    this.width = imgWidth;
    this.height = imgHeight;
    
    this.sourceWeaponName = sourceWeaponName;
    this.ammoType = ammoType;
    
    this.position = position;
    this.angle = angle;
    this.speed = speed;
    this.minRange = minRange;
    this.optRange = optRange;
    this.maxRange = maxRange;
    this.distanceTraveled = distanceTraveled;
    
    this.hitRange = hitRange;
    this.damage = damage;
    this.damageType = damageType;
    this.splashDamage = splashDamage;
    this.splashRange = splashRange;
    this.penetration = penetration; 
    
    this.collisionIgnoreList = collisionIgnoreList;
    
  }
  
  hitTarget(target, projectileIndex) {
    target.health -= 1; // this.damage
    //console.log(target.health);
    this.delete(projectileIndex);
  }
  
  delete(projectileIndex) {
    gs.lm.currentProjectiles.splice(projectileIndex, 1);
  }
  
};


const templateWeapon = new Weapon('weaponName', 0, 0, 0, 0, 0, 0, 0, 0, 0, {
  // Weapon class takes in (name, wt, sps, ivi, rampUp, shotsPerMag, magReload, minSpread, maxSpread, spreadTime, ammoTypes)
  // Each object in ammoTypes has properties of (ammoNameFull, ammoNameShort, pps, damage, damageVariange, splashDamage, splashRange, optRange, minRange, maxRange, velocity)
  'ammoType1' : {
    'ammoNameShort' : '',
    'ammoNameFull' : '',
    'description' : '',
    'pps' : 0,
    'damage' : 0,
    'damageVariance' : 0,
    'damageType' : '',
    'penetration' : 0,
    'splashDamage' : 0,
    'splashRange' : 0,
    'optRange' : 0,
    'minRange' : 0,
    'maxRange' : 0,
    'projectileSpeed' : 0,
    'spreadMultiplier' : 1,
  },
});

const mcg10 = new Weapon('10-MCG', 10, 10, 0, 0, 1, 0, 10, 10, 0, {
  // Weapon class takes in (name, wt, sps, ivi, rampUp, shotsPerMag, magReload, minSpread, maxSpread, spreadTime, ammoTypes)
  // Each object in ammoTypes has properties of (ammoNameFull, ammoNameShort, pps, damage, damageVariange, splashDamage, splashRange, optRange, minRange, maxRange, velocity)
  'ammoType1' : {
    'ammoNameShort' : 'BA',
    'ammoNameFull' : 'Ball',
    'description' : 'A basic round designed to penetrate armor and deal damage.',
    'pps' : 1,
    'damage' : 10,
    'damageVariance' : 0.2,
    'damageType' : '',
    'penetration' : 10,
    'splashDamage' : 0,
    'splashRange' : 0,
    'optRange' : 10,
    'minRange' : 0,
    'maxRange' : 20,
    'projectileSpeed' : 20,
    'spreadMultiplier' : 1,
  }, 
  'ammoType2' : {
    'ammoNameShort' : 'HP',
    'ammoNameFull' : 'Hollow Point',
    'description' : 'An alternative round designed to deal higher damage at the cost of lower armor penetration.',
    'pps' : 1,
    'damage' : 12,
    'damageVariance' : 0.2,
    'damageType' : '',
    'penetration' : 7,
    'splashDamage' : 0,
    'splashRange' : 0,
    'optRange' : 9,
    'minRange' : 0,
    'maxRange' : 18,
    'projectileSpeed' : 18,
    'spreadMultiplier' : 0.9,
  },
});


// Weapon Data object
const wd = {
  mcg10: mcg10,
};

// Node export test
//module.exports = weaponData;

// ES6 export test default
//export default weaponData;

// ES6 export test named
//export { weaponData };