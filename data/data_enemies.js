/*
ENEMY DATA

This file contains all information and data for all enemies in the game.

TO DO: 
- Define enemy "groups" that can spawn multiple units at the same place and time when the enemy has enough resources to do so.


*/

class ZombotBasic {
  constructor (position, id) {
    this.imgSrc1 = 'resources/images/sprites/enemies/Zombot_8x8.png';
    this.imgSrc2 = 'resources/images/sprites/enemies/Zombot_8x8_Rotated.png';
    this.img = new Image();
    this.img.src = this.imgSrc1;
    this.width = 8;
    this.height = 8;
    this.name = 'zombot basic';
    this.team = 'Zombots';
    this.id = gs.gd.objIDIndex;
    gs.gd.objIDIndex++;
    this.collisionIgnoreList = [];
    
    this.position = position;
    this.direction = 0;
    this.path = undefined;
    
    this.speed = 0.35;
    this.hitRange = 4; // Hitbox radius
    this.attackRange = 5;
    this.damage = 10;
    
    this.isReadyToAttack = true;
    this.health = 5;
    
    this.tola = 0; // Time Of Last Attack
    this.tsla = 0; // Time Since Last Attack
    this.attackRecharge = 2000;
    
  }
  
  checkDeath(mobIndex) {
    if (this.health <= 0) {
      this.delete(mobIndex);
    }
  }
  
  delete(mobIndex) {
    gs.lm.currentMobiles.splice(mobIndex, 1);
  }
  
  findPath() {}
  
  move1() { // WORKING: Simply moves toward player, stopping once it's in attack range
    let playerPos = gs.lm.player.position;
    let degrees = 0;
    let angleDegreesToPlayer = radiansToDegrees(cartesianToPolar(this.position, playerPos));
    
    if (angleDegreesToPlayer >= 337.5 && angleDegreesToPlayer <= 22.5) {
      degrees = 0;
    } else if (angleDegreesToPlayer >= 22.5 && angleDegreesToPlayer <= 67.5) {
      degrees = 45;
    } else if (angleDegreesToPlayer >= 67.5 && angleDegreesToPlayer <= 112.5) {
      degrees = 90;
    } else if (angleDegreesToPlayer >= 112.5 && angleDegreesToPlayer <= 157.5) {
      degrees = 135;
    } else if (angleDegreesToPlayer >= 157.5 && angleDegreesToPlayer <= 202.5) {
      degrees = 180;
    } else if (angleDegreesToPlayer >= 202.5 && angleDegreesToPlayer <= 247.5) {
      degrees = 225;
    } else if (angleDegreesToPlayer >= 247.5 && angleDegreesToPlayer <= 292.5) {
      degrees = 270;
    } else if (angleDegreesToPlayer >= 292.5 && angleDegreesToPlayer <= 337.5) {
      degrees = 315;
    } 
    
    this.direction = degrees/45;
    
    if (this.direction === 0 || this.direction === 2 || this.direction === 4 || this.direction === 6) {
      this.img.src = this.imgSrc1;
    } else if (this.direction === 1 || this.direction === 3 || this.direction === 5 || this.direction === 7) {
      this.img.src = this.imgSrc2;
    }
    
    if (getDistance(this.position, gs.lm.player.position) > this.attackRange + gs.lm.player.hitRange) {
      this.position.x += polarToCartesian(this.speed, degreesToRadians(degrees)).x;
      this.position.y += polarToCartesian(this.speed, degreesToRadians(degrees)).y;
    }
    
  }
  
  move2() { // IN PROGRESS: Moves toward player if unobstructed, choosing any direction that brings it closer to the player, or otherwise staying still.
    //
    let player = gs.lm.player;
    let degrees = 0;
    let angleDegreesToPlayer = radiansToDegrees(cartesianToPolar(this.position, player.position));
    
    // use a for loop to iterate through directions, checking if the movement would run into another object, changing direction if it would.
    // for each direction
      // if direction gets closer to player && is unobstructed
        // Apply movement
        
    /*
    let testDirection = 0;
    let distancesArray = [];
    for (let i = 0; i < 8; i++) {
      testDirection = i;
      testDistance = getDistance({this.position.x + polarToCartesian(this.speed, degreesToRadians(testDirection*45)).x, this.position.y + polarToCartesian(this.speed, degreesToRadians(testDirection*45)).y}, player.position);
      distancesArray.push(testDistance);
    }
    
    let lastDistance = 0;
    for (let i = 0; distancesArray.length; i++) {
      // sort array by length
    }
    
    for (let i = 0; i < 4; i++) {
      // attempt moving in each of the 4 directions that will move closer to the player, breaking the loop if one move is successful
    }
    
    
    
    
    */
    
    if (angleDegreesToPlayer >= 337.5 || angleDegreesToPlayer <= 22.5) {
      degrees = 0;
    } else if (angleDegreesToPlayer >= 22.5 && angleDegreesToPlayer <= 67.5) {
      degrees = 45;
    } else if (angleDegreesToPlayer >= 67.5 && angleDegreesToPlayer <= 112.5) {
      degrees = 90;
    } else if (angleDegreesToPlayer >= 112.5 && angleDegreesToPlayer <= 157.5) {
      degrees = 135;
    } else if (angleDegreesToPlayer >= 157.5 && angleDegreesToPlayer <= 202.5) {
      degrees = 180;
    } else if (angleDegreesToPlayer >= 202.5 && angleDegreesToPlayer <= 247.5) {
      degrees = 225;
    } else if (angleDegreesToPlayer >= 247.5 && angleDegreesToPlayer <= 292.5) {
      degrees = 270;
    } else if (angleDegreesToPlayer >= 292.5 && angleDegreesToPlayer <= 337.5) {
      degrees = 315;
    } 
    
    this.direction = degrees/45;
    
    if (this.direction % 2 === 0) {
      this.img.src = this.imgSrc1;
    } else if (this.direction % 2 === 1) {
      this.img.src = this.imgSrc2;
    }
    
    
    let newPosition = {x: this.position.x + polarToCartesian(this.speed, degreesToRadians(degrees)).x, y: this.position.y + polarToCartesian(this.speed, degreesToRadians(degrees)).y};
    let newForwardBoundary = {x: newPosition.x + polarToCartesian(this.hitRange, degreesToRadians(degrees)).x, y: newPosition.y + polarToCartesian(this.hitRange, degreesToRadians(degrees)).y};
    
    let inAttackRange = getDistance(this.position, player.position) < this.attackRange + player.hitRange;
    let objectAtNewForwardBoundary = findObjectAtCoords(newForwardBoundary);
    
    //console.log(`pos: ${this.position.x},${this.position.y} - newPos: ${newPosition.x},${newPosition.y} - NFB: ${newForwardBoundary.x},${newForwardBoundary.y}`)
    console.log(`objectAtNewForwardBoundary: ${objectAtNewForwardBoundary}`);
    //console.log(`inAttackRange ${inAttackRange}`);
   
    
    if (!inAttackRange && !objectAtNewForwardBoundary) {
      this.position.x = newPosition.x;
      this.position.y = newPosition.y;
    }
    
    
    // ... && getDistance(this.position, findObjectAtCoordinates(newForwardBoundary).position) 
    
    // in above if statement, also test to make sure that getDistance(this.position, otherMobs.position) > this.hitRange + mobs.hitRange; that will make sure they're not overlapping
    
  }
  
  move3() { // IN PROGRESS, WORKING BUT SEVERE PERFORMANCE ISSUES: Moves toward player if unobstructed, choosing any direction that brings it closer to the player, or otherwise staying still.
    let startPos = {x: this.position.x, y: this.position.y};
    let playerPos = gs.lm.player.position;
    let degrees = 0;
    let angleDegreesToPlayer = radiansToDegrees(cartesianToPolar(this.position, playerPos));
    
    if (angleDegreesToPlayer >= 337.5 && angleDegreesToPlayer <= 22.5) {
      degrees = 0;
    } else if (angleDegreesToPlayer >= 22.5 && angleDegreesToPlayer <= 67.5) {
      degrees = 45;
    } else if (angleDegreesToPlayer >= 67.5 && angleDegreesToPlayer <= 112.5) {
      degrees = 90;
    } else if (angleDegreesToPlayer >= 112.5 && angleDegreesToPlayer <= 157.5) {
      degrees = 135;
    } else if (angleDegreesToPlayer >= 157.5 && angleDegreesToPlayer <= 202.5) {
      degrees = 180;
    } else if (angleDegreesToPlayer >= 202.5 && angleDegreesToPlayer <= 247.5) {
      degrees = 225;
    } else if (angleDegreesToPlayer >= 247.5 && angleDegreesToPlayer <= 292.5) {
      degrees = 270;
    } else if (angleDegreesToPlayer >= 292.5 && angleDegreesToPlayer <= 337.5) {
      degrees = 315;
    } 
    
    this.direction = degrees/45;
    
    if (this.direction === 0 || this.direction === 2 || this.direction === 4 || this.direction === 6) {
      this.img.src = this.imgSrc1;
    } else if (this.direction === 1 || this.direction === 3 || this.direction === 5 || this.direction === 7) {
      this.img.src = this.imgSrc2;
    }
    
    if (getDistance(this.position, gs.lm.player.position) > this.attackRange + gs.lm.player.hitRange) {
      this.position.x += polarToCartesian(this.speed, degreesToRadians(degrees)).x;
      this.position.y += polarToCartesian(this.speed, degreesToRadians(degrees)).y;
    }
    
    let mobs = gs.lm.currentMobiles;
    for (let i = 0; i < mobs.length; i++) {
      let mob = mobs[i];
      //console.log('checking collision...');
      //console.log(this);
      //console.log(mobs[i]);
      //console.log(`startPos: ${startPos.x},${startPos.y}`);
      //console.log(`  newPos: ${this.position.x},${this.position.y}`);
      if (checkCollision(this, mob)) {
        //console.log('moved and collided');
        this.position.x = startPos.x;
        this.position.y = startPos.y;
        break;
      } 
      //console.log(`finalPos: ${this.position.x},${this.position.y}`);
      //console.log('');
    }
    
  }
  
  checkAttack(timestamp, target) {
    this.tsla = timestamp - this.tola;
    
    if (this.tsla >= this.attackRecharge && 
        this.attackRange >= getDistance(this.position, target.position) - target.hitRange) {
      this.isReadyToAttack = true;
    } else {
      this.isReadyToAttack = false;
    }
    
    if (this.isReadyToAttack) {
      this.attack(timestamp, target);
    }
  }
  
  attack(timestamp, target) {
    console.log('Attack!');
    this.tola = timestamp;
    target.condition.structure -= this.damage;
  }
  


  
};

class ZombotMaxGoop {
  constructor (position) {
    this.imgSrc1 = 'resources/images/sprites/enemies/MaxGoop_16x16.png';
    this.imgSrc2 = '';
    this.img = new Image();
    this.img.src = this.imgSrc1;
    
    this.width = 16;
    this.height = 16;
    
    this.name = 'Max Goop';
    this.team = 'Zombots';
    
    this.position = position;
    this.direction = 0;
    this.path = undefined;
    this.speed = 0.20;
    
    this.hitRange = 8;
    this.health = 8;
    
  }
  
  checkDeath(mobIndex) {
    if (this.health <= 0) {
      this.delete(mobIndex);
    }
  }
  
  delete(mobIndex) {
    gs.lm.currentMobiles.splice(mobIndex, 1);
  }
  
  movePlaceholder() {
    // Simply moves toward player if unobstructed
    let playerPos = gs.lm.player.position;
    let degrees = 0;
    let angleDegreesToPlayer = radiansToDegrees(cartesianToPolar(this.position, playerPos));
    
    if (angleDegreesToPlayer >= 337.5 && angleDegreesToPlayer <= 22.5) {
      degrees = 0;
    } else if (angleDegreesToPlayer >= 22.5 && angleDegreesToPlayer <= 67.5) {
      degrees = 45;
    } else if (angleDegreesToPlayer >= 67.5 && angleDegreesToPlayer <= 112.5) {
      degrees = 90;
    } else if (angleDegreesToPlayer >= 112.5 && angleDegreesToPlayer <= 157.5) {
      degrees = 135;
    } else if (angleDegreesToPlayer >= 157.5 && angleDegreesToPlayer <= 202.5) {
      degrees = 180;
    } else if (angleDegreesToPlayer >= 202.5 && angleDegreesToPlayer <= 247.5) {
      degrees = 225;
    } else if (angleDegreesToPlayer >= 247.5 && angleDegreesToPlayer <= 292.5) {
      degrees = 270;
    } else if (angleDegreesToPlayer >= 292.5 && angleDegreesToPlayer <= 337.5) {
      degrees = 315;
    } 
    
    this.direction = degrees/45;
    this.position.x += polarToCartesian(this.speed, degreesToRadians(degrees)).x;
    this.position.y += polarToCartesian(this.speed, degreesToRadians(degrees)).y;
    
  }
  
  //findPath()
  //move()
  //attack()
};

class ZombotCuteGoop {
  constructor (position) {
    this.imgSrc1 = 'resources/images/sprites/enemies/CuteGoop_8x8.png';
    this.imgSrc2 = '';
    this.img = new Image();
    this.img.src = this.imgSrc1;
    
    this.width = 8;
    this.height = 8;
    
    this.name = 'Cute Goop';
    this.team = 'Zombots';
    
    this.position = position;
    this.direction = 0;
    this.path = undefined;
    this.speed = 0.35;
    
    this.hitRange = 4;
    this.health = 5;
    
  }
  
  checkDeath(mobIndex) {
    if (this.health <= 0) {
      this.delete(mobIndex);
    }
  }
  
  delete(mobIndex) {
    gs.lm.currentMobiles.splice(mobIndex, 1);
  }
  
  movePlaceholder() {
    // Simply moves toward player if unobstructed
    let playerPos = gs.lm.player.position;
    let degrees = 0;
    let angleDegreesToPlayer = radiansToDegrees(cartesianToPolar(this.position, playerPos));
    
    if (angleDegreesToPlayer >= 337.5 && angleDegreesToPlayer <= 22.5) {
      degrees = 0;
    } else if (angleDegreesToPlayer >= 22.5 && angleDegreesToPlayer <= 67.5) {
      degrees = 45;
    } else if (angleDegreesToPlayer >= 67.5 && angleDegreesToPlayer <= 112.5) {
      degrees = 90;
    } else if (angleDegreesToPlayer >= 112.5 && angleDegreesToPlayer <= 157.5) {
      degrees = 135;
    } else if (angleDegreesToPlayer >= 157.5 && angleDegreesToPlayer <= 202.5) {
      degrees = 180;
    } else if (angleDegreesToPlayer >= 202.5 && angleDegreesToPlayer <= 247.5) {
      degrees = 225;
    } else if (angleDegreesToPlayer >= 247.5 && angleDegreesToPlayer <= 292.5) {
      degrees = 270;
    } else if (angleDegreesToPlayer >= 292.5 && angleDegreesToPlayer <= 337.5) {
      degrees = 315;
    } 
    
    this.direction = degrees/45;
    this.position.x += polarToCartesian(this.speed, degreesToRadians(degrees)).x;
    this.position.y += polarToCartesian(this.speed, degreesToRadians(degrees)).y;
    
  }
  
  
  //findPath()
  //move()
  //attack()

  
};

class ZombotHuntingClown {
  constructor (position) {
    this.imgSrc1 = 'resources/images/sprites/enemies/HuntingClown_24x24.png';
    this.imgSrc2 = '';
    this.img = new Image();
    this.img.src = this.imgSrc1;
    
    this.width = 24;
    this.height = 24;
    
    this.name = 'Hunting Clown';
    this.team = 'Zombots';
    
    this.position = position;
    this.direction = 0;
    this.path = undefined;
    this.speed = 0.20;
    
    this.hitRange = 8;
    this.health = 11;
    
  }
  
  checkDeath(mobIndex) {
    if (this.health <= 0) {
      this.delete(mobIndex);
    }
  }
  
  delete(mobIndex) {
    gs.lm.currentMobiles.splice(mobIndex, 1);
  }
  
  movePlaceholder() {
    // Simply moves toward player if unobstructed
    let playerPos = gs.lm.player.position;
    let degrees = 0;
    let angleDegreesToPlayer = radiansToDegrees(cartesianToPolar(this.position, playerPos));
    
    if (angleDegreesToPlayer >= 337.5 && angleDegreesToPlayer <= 22.5) {
      degrees = 0;
    } else if (angleDegreesToPlayer >= 22.5 && angleDegreesToPlayer <= 67.5) {
      degrees = 45;
    } else if (angleDegreesToPlayer >= 67.5 && angleDegreesToPlayer <= 112.5) {
      degrees = 90;
    } else if (angleDegreesToPlayer >= 112.5 && angleDegreesToPlayer <= 157.5) {
      degrees = 135;
    } else if (angleDegreesToPlayer >= 157.5 && angleDegreesToPlayer <= 202.5) {
      degrees = 180;
    } else if (angleDegreesToPlayer >= 202.5 && angleDegreesToPlayer <= 247.5) {
      degrees = 225;
    } else if (angleDegreesToPlayer >= 247.5 && angleDegreesToPlayer <= 292.5) {
      degrees = 270;
    } else if (angleDegreesToPlayer >= 292.5 && angleDegreesToPlayer <= 337.5) {
      degrees = 315;
    } 
    
    //this.direction = degrees/45;
    this.position.x += polarToCartesian(this.speed, degreesToRadians(degrees)).x;
    this.position.y += polarToCartesian(this.speed, degreesToRadians(degrees)).y;
    
  }
  
  //findPath()
  //move()
  //attack()
};

// INDIVIDUAL ENEMIES
//const zombotDamaged = new Enemy();
//const zombotBasic = new Enemy();

// GROUPED ENEMIES
//const zombotGroup = [[zombotDamaged, 5], [zombotBasic, 5]]; // Example: spawns 5 damaged zombots and 5 basic zombots

const enemyData = {};
//export { enemyData };