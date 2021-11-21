// Player data



class Player {
  constructor(name, position, width, height, direction, moveSpeed, imgSrc1, imgSrc2) {
    this.name = name;
    this.id = gs.gd.objIDIndex;
    gs.gd.objIDIndex++;

    this.imgSrc1 = imgSrc1;
    this.imgSrc2 = imgSrc2;
    this.img = new Image(); // Consider trying to initialize 2 different images to address the slight issue of the sprite disappearing for a frame the first few times the straight/diagonal sprites switch back and forth.
    this.img.src = imgSrc1;
    this.width = width;
    this.height = height;
    
    this.moveSpeed = moveSpeed;
    this.position = position;
    this.direction = direction;
    this.weaponAttachmentPoints = [{x:8, y:10}];
    this.hitRange = 7;
    this.loadout = {
      chassis: 'Test Wheeled',
      weapons: [new MCG10()],
      utilities: [],
    };
    // this.loadout = loadout; // add constructor parameter expecting an instance of the Loadout class
    // this.moveSpeed = 'equation from code_to_integrate, taking info from this.loadout';
    
    this.maxArmor = 100;
    this.maxStructure = 100;
    this.maxPower = 100;
    this.maxParts = 100;
    this.condition = {
      armor: 100,
      structure: 100,
      power: 100,
      parts: 100,
    };
    
    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;
  }

  checkMove() { // check for movement inputs, and if present, call move()
    //
  }
  
  move() {
    let moveUp = false;
    let moveDown = false;
    let moveLeft = false;
    let moveRight = false;

    if (keyWPressedThisFrame || keydownW) { // Use this kind of thing for mouseClickThisFrame || mouseDown
      keyWPressedThisFrame = false;
      moveUp = true;
    }
    if (keySPressedThisFrame || keydownS) {
      keySPressedThisFrame = false;
      moveDown = true;
    }
    if (keyAPressedThisFrame || keydownA) {
      keyAPressedThisFrame = false;
      moveLeft = true;
    }
    if (keyDPressedThisFrame || keydownD) {
      keyDPressedThisFrame = false;
      moveRight = true;
    }

  
    if (!moveUp && !moveRight && !moveDown && !moveLeft) {
      //console.log('No movement');
      null;
    } else if (moveUp && !moveRight && !moveDown && !moveLeft) { // if moving up
      this.direction = 0;
      this.img.src = this.imgSrc1;
      this.position.y -= this.moveSpeed;
      gs.lm.cameraPosition.y -= this.moveSpeed;
    } else if (moveUp && moveRight && !moveDown && !moveLeft) { // if moving up and right
      this.direction = 1;
      this.img.src = this.imgSrc2;
      this.position.x += this.moveSpeed*0.7;
      this.position.y -= this.moveSpeed*0.7;
      gs.lm.cameraPosition.x += this.moveSpeed*0.7;
      gs.lm.cameraPosition.y -= this.moveSpeed*0.7;
    } else if (!moveUp && moveRight && !moveDown && !moveLeft) { // if moving right
      this.direction = 2;
      this.img.src = this.imgSrc1;
      this.position.x += this.moveSpeed;
      gs.lm.cameraPosition.x += this.moveSpeed;
    } else if (!moveUp && moveRight && moveDown && !moveLeft) { // if moving right and down
      this.direction = 3;
      this.img.src = this.imgSrc2;
      this.position.x += this.moveSpeed*0.7;
      this.position.y += this.moveSpeed*0.7;
      gs.lm.cameraPosition.x += this.moveSpeed*0.7;
      gs.lm.cameraPosition.y += this.moveSpeed*0.7;
    } else if (!moveUp && !moveRight && moveDown && !moveLeft) { // if moving down
      this.direction = 4;
      this.img.src = this.imgSrc1;
      this.position.y += this.moveSpeed;
      gs.lm.cameraPosition.y += this.moveSpeed;
    } else if (!moveUp && !moveRight && moveDown && moveLeft) { // if moving down and left
      this.direction = 5;
      this.img.src = this.imgSrc2;
      this.position.x -= this.moveSpeed*0.7;
      this.position.y += this.moveSpeed*0.7;
      gs.lm.cameraPosition.x -= this.moveSpeed*0.7;
      gs.lm.cameraPosition.y += this.moveSpeed*0.7;
    } else if (!moveUp && !moveRight && !moveDown && moveLeft) { // if moving left
      this.direction = 6;
      this.img.src = this.imgSrc1;
      this.position.x -= this.moveSpeed;
      gs.lm.cameraPosition.x -= this.moveSpeed;
    } else if (moveUp && !moveRight && !moveDown && moveLeft) { // if moving up and left
      this.direction = 7;
      this.img.src = this.imgSrc2;
      this.position.x -= this.moveSpeed*0.7;
      this.position.y -= this.moveSpeed*0.7;
      gs.lm.cameraPosition.x -= this.moveSpeed*0.7;
      gs.lm.cameraPosition.y -= this.moveSpeed*0.7;
    } else {
      //console.log('Movement failed: more than 2 movement keys pressed');
      null;
    }

    if (moveUp || moveRight || moveDown || moveLeft) {
      //console.log(`CamPos: [${gs.lm.cameraPosition.x},${gs.lm.cameraPosition.y}]`);
      //console.log(`PlayerPos: [${this.position.x},${this.position.y}]`);
    }

  }

  checkFire(timestamp) { // check for fire input, and if present, call attemptFire()
    if (gs.gd.mouseClickThisFrame || gs.gd.mouseDown) {
      if (isWithinArea(
        {
        x: gs.gd.mousePos.x,  // X coordinate
        y: gs.gd.mousePos.y,  // Y coordinate
        }, 
        {
        left: gs.gd.playArea.border.left,     //   left X boundary
        right: gs.gd.playArea.border.right,   //  right X boundary
        top: gs.gd.playArea.border.top,       //    top Y boundary
        bottom: gs.gd.playArea.border.bottom, // bottom Y boundary
        })) {
        for (let i = 0; i < this.loadout.weapons.length; i++) {
          this.loadout.weapons[i].attemptFire(timestamp);
        }
      }
    }
  }
  
  //checkReloadInput(timestamp) {
  //  this.loadout.weapons[0].checkToStartReload(timestamp);
  //}

};

/*
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

    // Decide the specific icons and colors to be sent to the new LoadoutCard object created below (if base is a chassis, get purple icons for weapons, utilities and mods, green if it's a building)
    this.elements = [];

    this.loadoutCard = new LoadoutCard(this.base.name, origin, width, height, border, false, null, 0, this.elements, this.base, this.weapons, this.utilities);
  }
}
*/