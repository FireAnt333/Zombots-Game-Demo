/*
ZOMBOTS DEMO V0.0.1 - In Progress

// Last edited: 09/30/22

// Git local repository directory path: cd Desktop/'Ideas and Plans'/Career/'Coding Projects'/'Personal Projects'/Zombots/'Zombots Canvas Project'
1) git add .
2) git commit -m ""
3) git push -u origin master


TO DO: 
- Implement cell-based collision pre-check to improve performance 
    (http://buildnewgames.com/broad-phase-collision-detection/)
- Add enemy functionality
  - Make enemy able to utilize basic pathfinding
    - Start with simple map, "move straight to objective" AI (for simplicity in testing other game basics)
    - Upgrade once other game basics are in place
  - Make enemy deal damage to objective buildings when close
  - Make enemies spawn at certain intervals at certain points around the edges of the map
- Create and display win condition (survive a certain time and/or kill a certain number of enemies)



----- BASIC GAMEPLAY PSEUDOCODE IDEAS -----




*/


const canvasMain = document.getElementById('canvasMain');
const cm = canvasMain.getContext('2d');
const canvasUpscale = document.getElementById('canvasUpscale');
const cu = canvasUpscale.getContext('2d');
const canvasContainer = document.getElementById('container');

const canvasWidth = 960; // 240 on downscaled canvas
const canvasHeight = 640; // 160 on downscaled canvas
//const upscaleFactor = 4; // Defined in UI data file

//const playAreaBorderLeft = 200 / upscaleFactor;
//const playAreaBorderRight = 760 / upscaleFactor;
//const playAreaBorderTop = 0 / upscaleFactor;
//const playAreaBorderBottom = 560 / upscaleFactor;
//const playAreaWidth = playAreaBorderRight - playAreaBorderLeft;
//const playAreaHeight = playAreaBorderBottom - playAreaBorderTop;

//const cameraOffset = {x: canvasWidth/upscaleFactor/2, // 120
//                      y: ((canvasHeight/upscaleFactor)-20) / 2} ; // 70
const cameraOffset = {x: 240, // 240
                      y: 160}; // 140
//const cameraOffsetX = (canvasWidth/upscaleFactor/2); // 120
//const cameraOffsetY = (((canvasHeight/upscaleFactor)-20) / 2); // 70
//let cameraPosition = {x:0, y:0};

// MOVE THESE DEFINITIONS AND ALL REFERENCES TO GS OBJECT
let firstClick = true;
let gamePaused = false;
let lastButtonAction = '';


// --------------------------------------------------
//                GAME STATE OBJECT
// --------------------------------------------------

// gs = Game State, the core object that holds data for the current state of the game, including global and level data
const gs = {
  gd: { // global data
    currentScene: 'clickToStart',
    UICS: [], // UICS: User Interface Current Sections, shorthand since it is used a lot to manipulate the UI
    UICLC: [], // UICLC: User Interface Current Loadout Cards
    UICIC: [], // UICIC: User Interface Current Item Cards
    currentButtons: [],
    customTextToDraw: [],
    mousePos: {x:0, y:0},
    clickPos: {x:0, y:0},
    mouseClickThisFrame: false,
    mouseDown: false,
    playArea: {
      border: {
        //left: 200 / upscaleFactor, 
        //right: 760 / upscaleFactor, 
        //top: 0 / upscaleFactor, 
        //bottom: 560 / upscaleFactor
        left: 100, 
        right: 380, 
        top: 36, 
        bottom: 280,
      },
      height: (760 / upscaleFactor) - (200 / upscaleFactor),
      width: (560 / upscaleFactor) - (0 / upscaleFactor)
    },
    objIDIndex: 0,

    loadoutLibrary: [whl200stock, trk300stock, swf40stock, swf100stock],
    loadoutsToDisplay: [],
    loadoutCards: [],
    loadoutFilters: {
      wheeled: {
        active: false,
        string: 'wheeled',
      },
      bipedal: {
        active: false,
        string: 'bipedal',
      },
      tracked: {
        active: false,
        string: 'tracked',
      },
      aerial: {
        active: false,
        string: 'aerial',
      },
      hexipedal: {
        active: false,
        string: 'hexipedal',
      },
      headquarters: {
        active: false,
        string: 'headquarters',
      },
      weaponframe: {
        active: false,
        string: 'weaponframe',
      },
      utilityframe: {
        active: false,
        string: 'utilityframe',
      },
      blueprints: {
        active: false,
        string: 'blueprints',
      },
      owned: {
        active: false,
        string: 'owned',
      },
    },
    loadoutSelected: null,

    loadoutDetailItemCards: [],

    
  }, 
  lm: { // level management
    level: null,
    levelStartFlag: false,
    levelStartTime: 0,
    levelElapsedTime: 0,
    gamePaused: false,
    cameraPosition: {x:0, y:0},
    currentMobiles: [],
    currentStatics: [],
    currentProjectiles: [],
    player: {},
    weaponsLocked: false,
  },
};

// --------------------------------------------------
//              UI MANAGEMENT FUNCTIONS
// --------------------------------------------------

function loadScene(page) {
  // STEP 1: Clear the currentButtons array
  gs.gd.currentButtons = [];
  gs.gd.customTextToDraw = [];

  // STEP 2: Decide which UI sections to draw, based on the current menu or level scene
  if (page === 'start') { // load start menu UI/buttons
    gs.gd.currentScene = 'start';
    gs.gd.UICS = [uiData.sections.startBackground, uiData.sections.startMain];
  } else if (page === 'depotHome') { // load depot home artwork and main button array
    gs.gd.currentScene = 'depotHome';
    gs.gd.UICS = [uiData.sections.topMain, uiData.sections.midDepotHome];
  } else if (page === 'depotLoadouts') { // load depot UI/buttons
    gs.gd.currentScene = 'depotLoadouts';
    gs.gd.UICS = [uiData.sections.menuBackground, uiData.sections.topMain, uiData.sections.leftDepotLoadouts, uiData.sections.rightResourceDisplay, uiData.sections.midDepotLoadoutList, uiData.sections.midRightDepotLoadouts];
    // , uiData.sections.loadoutCardTest, uiData.sections.loadoutCardTest2, uiData.sections.loadoutCardTest3
  } else if (page === 'depotEditor') { // load depot editor mode UI/buttons
    // Add editor buttons to the UICurrentElementsRight sectional array to be displayed
    gs.gd.currentScene = 'depotEditor';
    gs.gd.UICS = [uiData.sections.menuBackground, uiData.sections.topMain, uiData.sections.leftTechTreeCategories, uiData.sections.rightResourceDisplay, uiData.sections.rightDepotEditor, uiData.sections.midDepotEditor];
  } else if (page === 'levelSelect') { // load level select UI/buttons
    gs.gd.currentScene = 'levelSelect';
    gs.gd.UICS = [uiData.sections.menuBackground, uiData.sections.topMain, uiData.sections.rightResourceDisplay, uiData.sections.midLevelSelect]; // used to include now-unused sections: uiData.sections.leftLevelModeSelect
  } else if (page === 'labArmory') { // load tech tree UI/buttons
    gs.gd.currentScene = 'labArmory';
    gs.gd.UICS = [uiData.sections.menuBackground, uiData.sections.topMain, uiData.sections.rightResourceDisplay, uiData.sections.midLabArmoryHome]; // used to include now-unused section: uiData.sections.leftTechTreeCategories
  } else if (page === 'gameLevel') { // load level UI/buttons
    gs.gd.currentScene = 'gameLevel';
    gs.gd.UICS = [uiData.sections.menuBackground, uiData.sections.topGameLevel, uiData.sections.bottomGameLevel, uiData.sections.leftGameLevel, uiData.sections.rightGameLevel];
    gs.lm.level = levelData.testLevel;
    startLevel();
  } else if (page === 'test') { // load test page
    gs.gd.currentScene = 'test';
    gs.gd.UICS = [];
  } else { // give error message indicating invalid loadScene input
    console.log('error in loadScene(): invalid input');
  }

  // STEP 3: Add clickable UI elements to the currentButtons array
  for (let i = 0; i < gs.gd.UICS.length; i++) { // For each UI section to be displayed
    if (i === 0) {
      console.log(gs.gd.UICS);
    }
    for (let j = 0; j < gs.gd.UICS[i].elements.length; j++) { // For each element in the section to be displayed
      if (gs.gd.UICS[i].elements[j].clickMethod !== undefined) { // If UI element has a clickMethod, add it to currentButtons
        gs.gd.currentButtons.push(gs.gd.UICS[i].elements[j]);
      }
    }
  }

  // STEP 4: Decide which image to display for buttons that can toggle on and off

  // STEP 5: Draw each element of each UI section chosen above
  draw();

};

function btnActionLog(action) { 
  lastButtonAction = action;

  /*
  if (gs.gd.currentScene !== 'gameLevel') {
    cm.font = '24px Helvetica'
    cm.fillStyle = 'black';
    cm.fillText(action, 230, 618);
  } else {
    cm.font = '24px Helvetica'
    cm.fillStyle = 'black';
    cm.fillText(action, canvasWidth*0.5 - 75, canvasHeight*0.5 - 170);
  }
  */

/*
  if (gs.gd.currentScene !== 'gameLevel') {
    cm.fillStyle = 'green';
    cm.fillRect(208, 570, 250, 56);
    cm.font = '24px Helvetica'
    cm.fillStyle = 'black';
    cm.fillText('Last button action:', 230, 592);
    cm.fillText(action, 230, 618);
  } else {
    cm.fillStyle = 'green';
    cm.fillRect(10, canvasHeight*0.5 - 230, 220, 80);
    cm.font = '24px Helvetica'
    cm.fillStyle = 'black';
    cm.fillText('Button Action:', canvasWidth*0.5 - 75, canvasHeight*0.5 - 200);
    cm.fillText(action, canvasWidth*0.5 - 75, canvasHeight*0.5 - 170);
  }
*/
};

// --------------------------------------------------
//         DATA/OBJECT MANAGEMENT FUNCTIONS
// --------------------------------------------------

function addCustomText(text, font, origin, destination) {
  let imgArray = [];
  let imgSpacing = [];
  let fontHeight = 10;
  if (font === '7px Compact (Light Gray Background)') {
    fontHeight = 7;
  }

  for (let i = 0; i < text.length; i++) {
    switch (text[i]) {
      case '0':
        if (font === '7px Compact (Light Gray Background)') {
          imgArray.push(`resources/images/ui_480x320/Text/Fonts/7px Compact (Light Gray Background)/0.png`);
          imgSpacing.push(6);
        }
        break;
      case '1':
        if (font === '7px Compact (Light Gray Background)') {
          imgArray.push(`resources/images/ui_480x320/Text/Fonts/7px Compact (Light Gray Background)/1.png`);
          imgSpacing.push(4);
        }
        break;
      case '2':
        if (font === '7px Compact (Light Gray Background)') {
          imgArray.push(`resources/images/ui_480x320/Text/Fonts/7px Compact (Light Gray Background)/2.png`);
          imgSpacing.push(5);
        }
        break;
      case '3':
        if (font === '7px Compact (Light Gray Background)') {
          imgArray.push(`resources/images/ui_480x320/Text/Fonts/7px Compact (Light Gray Background)/3.png`);
          imgSpacing.push(5);
        }
        break;
      case '4':
        if (font === '7px Compact (Light Gray Background)') {
          imgArray.push(`resources/images/ui_480x320/Text/Fonts/7px Compact (Light Gray Background)/4.png`);
          imgSpacing.push(5);
        }
        break;
      case '5':
        if (font === '7px Compact (Light Gray Background)') {
          imgArray.push(`resources/images/ui_480x320/Text/Fonts/7px Compact (Light Gray Background)/5.png`);
          imgSpacing.push(5);
        }
        break;
      case '6':
        if (font === '7px Compact (Light Gray Background)') {
          imgArray.push(`resources/images/ui_480x320/Text/Fonts/7px Compact (Light Gray Background)/6.png`);
          imgSpacing.push(5);
        }
        break;
      case '7':
        if (font === '7px Compact (Light Gray Background)') {
          imgArray.push(`resources/images/ui_480x320/Text/Fonts/7px Compact (Light Gray Background)/7.png`);
          imgSpacing.push(5);
        }
        break;
      case '8':
        if (font === '7px Compact (Light Gray Background)') {
          imgArray.push(`resources/images/ui_480x320/Text/Fonts/7px Compact (Light Gray Background)/8.png`);
          imgSpacing.push(5);
        }
        break;
      case '9':
        if (font === '7px Compact (Light Gray Background)') {
          imgArray.push(`resources/images/ui_480x320/Text/Fonts/7px Compact (Light Gray Background)/9.png`);
          imgSpacing.push(5);
        }
        break;
      case '/':
        if (font === '7px Compact (Light Gray Background)') {
          imgArray.push(`resources/images/ui_480x320/Text/Fonts/7px Compact (Light Gray Background)/Slash.png`);
          imgSpacing.push(4);
        }
        break;
    }
  }

destination.push({
  origin: origin,
  imgArray: imgArray,
  imgSpacing: imgSpacing,
  fontHeight: fontHeight,
});

};

function startLevel() {
  gs.lm.gamePaused = false;
  gs.lm.levelStartFlag = true;
  gs.lm.weaponsLocked = true;
  spawnPlayer();
  //startGameLoop();
};

function spawnPlayer() {
  gs.lm.player = {};
  gs.lm.player = new Player(
    'player', // Name
    gs.lm.level.playerSpawnPoint, // Position, initialized to spawn location based on level
    32, // Width
    32, // Height
    0, // Direction (8-direction system)
    0.8, // Move speed
    //'resources/images/sprites/player/Player_MEDU_White_16x16.png', // Right-angle sprite
    //'resources/images/sprites/player/Player_MEDU_White_16x16_Rotated.png', // Diagonal sprite
    'resources/images/sprites/player/Player_MEDU_Gray_32x32.png', // Right-angle sprite
    'resources/images/sprites/player/Player_MEDU_Gray_32x32_Rotated.png', // Diagonal sprite
    );
  gs.lm.currentMobiles.push(gs.lm.player);

  //move camera to player position
  gs.lm.cameraPosition = {x: gs.lm.player.position.x, y: gs.lm.player.position.y};
  
  //[gs.lm.player.position.x, gs.lm.player.position.y];
  //console.log(`Spawn/start pos: ${gs.lm.level.playerSpawnPoint.x}, ${gs.lm.level.playerSpawnPoint.y}`);
  //console.log(`     Player pos: ${gs.lm.player.position.x}, ${gs.lm.player.position.y}`);
};

let id = 0;
function spawnZombot() {
  let num = Math.random()*10;
  console.log(`    Spawn ID: ${id}`);
  if (num > 10) {
    //gs.lm.currentMobiles.push(new ZombotMaxGoop({x: canvasToLevelCoords(gs.gd.mousePos).x, y: canvasToLevelCoords(gs.gd.mousePos).y}));
  } else if (num > 10) {
    //gs.lm.currentMobiles.push(new ZombotHuntingClown({x: canvasToLevelCoords(gs.gd.mousePos).x, y: canvasToLevelCoords(gs.gd.mousePos).y}));
  } else if (num > 10) {
    //gs.lm.currentMobiles.push(new ZombotCuteGoop({x: canvasToLevelCoords(gs.gd.mousePos).x, y: canvasToLevelCoords(gs.gd.mousePos).y}));
  } else {
    gs.lm.currentMobiles.push(new ZombotBasic({x: canvasToLevelCoords(gs.gd.mousePos).x, y: canvasToLevelCoords(gs.gd.mousePos).y}, id));
  }
  id++;
  //console.log(gs.lm.currentMobiles.length);
};

function spawnTurret() {
  console.log(`Spawn turret at: x: ${canvasToLevelCoords(gs.gd.mousePos).x}, y: ${canvasToLevelCoords(gs.gd.mousePos).y}`);
  gs.lm.currentStatics.push(new SWF40({x: canvasToLevelCoords(gs.gd.mousePos).x, y: canvasToLevelCoords(gs.gd.mousePos).y}, id));
  id++;
  console.log(gs.lm.currentStatics.length);
};

function createLoadout(name, base, structure, armor, engine, battery, storage, weapons, utilities) {
  //                    obj,       int,   int,    int,     int,     int,     arr,       arr
  gs.gd.loadoutLibrary.push(new Loadout(name, base, structure, armor, engine, battery, storage, weapons, utilities));
};

function deleteLoadout(index) {
  gs.gd.loadoutLibrary.splice(index, 1);
};

function updateLoadoutsToDisplay() {
  // Set up initial variables needed
  let buttons = gs.gd.currentButtons;
  let library = gs.gd.loadoutLibrary;
  let display = gs.gd.loadoutsToDisplay;
  display = [];
  let loadoutCards = gs.gd.loadoutCards;
  loadoutCards = [];
  gs.gd.UICLC = [];
  let activeFilters = [];

  // Remove all Loadout Card buttons
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].name === 'Loadout Card') {
      buttons.splice(i, 1);
      i -= 1;
    }
  }

  // Determine which filters are active and put them in an easily iterable format
  for (const filter in gs.gd.loadoutFilters) {
    if (gs.gd.loadoutFilters[filter].active) {
      activeFilters.push(gs.gd.loadoutFilters[filter].string);
    }
  }

  // Pick loadouts to display based on active filters
  if (activeFilters.length > 0) {
    for (let i = 0; i < library.length; i++) {
      for (let j = 0; j < activeFilters.length; j++) {
        if (library[i].base.class === activeFilters[j]) {
          display.push(library[i]);
        }
      }
    }
  }

  // Prepare loadout cards to be displayed
  for (let i = 0; i < display.length; i++) {
    loadoutCards.push(new LoadoutCard('Loadout Card', [103,58 + (44*i)], 133, 42, 1, false, null, 0, display[i]));
    gs.gd.UICLC.push(loadoutCards[i]);
    buttons.push(loadoutCards[i]);
    //buttons.push(new Button('Button: Loadout Card', [loadoutCards[i].uOrigin[0], loadoutCards[i].uOrigin[1]], loadoutCards[i].width, loadoutCards[i].height, loadoutCards[i].border, false, null, null, () => {
      //gs.gd.loadoutSelected = 0;
    //}));
  }
  

  // Could keep loadout "selected" indicator present through filter changes by searching the updated list of LoadoutCards to display. This would require finding the perfectly matching loadout, which may be an unreasonable amount of searching through lots of loadouts, but that's not an issue with a demo where you can't edit loadouts.

  
};

function updateLoadoutDetailsDisplay() {
  UISecMidRightDepotLoadouts.elements = [];
  UISecMidRightDepotLoadouts.elements.push(daLoadoutDetails);
  let selected = gs.gd.loadoutSelected;

  addCustomText(JSON.stringify(selected.base.weight.max) + '/' + JSON.stringify(selected.base.weight.max), '7px Compact (Light Gray Background)', {x:263 + 4, y:87 + 2}, UISecMidRightDepotLoadouts.customText); // Add text for current weight compared to total weight limit
  addCustomText(JSON.stringify(selected.structure.current), '7px Compact (Light Gray Background)', {x:311 + 4, y:87 + 2}, UISecMidRightDepotLoadouts.customText); // Add text for weight of current structure

  if (selected.base.battery.max > 0) { // Add text for weight of current battery
    UISecMidRightDepotLoadouts.elements.push(daBattery);
    addCustomText(JSON.stringify(selected.battery.current), '7px Compact (Light Gray Background)', {x:daBattery.uOrigin[0] + 4, y:daBattery.uOrigin[1] + 3}, UISecMidRightDepotLoadouts.customText);
  }
  if (selected.base.storage.max > 0) { // Add text for weight of current parts storage
    UISecMidRightDepotLoadouts.elements.push(daStorage);
    addCustomText(JSON.stringify(selected.storage.current), '7px Compact (Light Gray Background)', {x:daStorage.uOrigin[0] + 4, y:daStorage.uOrigin[1] + 3}, UISecMidRightDepotLoadouts.customText);
  }
  if (selected.base.armor.max > 0) { // Add text for weight of current armor
    UISecMidRightDepotLoadouts.elements.push(daArmor);
    addCustomText(JSON.stringify(selected.armor.current), '7px Compact (Light Gray Background)', {x:daArmor.uOrigin[0] + 4, y:daArmor.uOrigin[1] + 3}, UISecMidRightDepotLoadouts.customText);
  }
  if (selected.base.engine.max > 0) { // Add text for weight of current engine
    UISecMidRightDepotLoadouts.elements.push(daEngine);
    addCustomText(JSON.stringify(selected.engine.current), '7px Compact (Light Gray Background)', {x:daEngine.uOrigin[0] + 4, y:daEngine.uOrigin[1] + 3}, UISecMidRightDepotLoadouts.customText);
  }


  // Reset arrays for Current Item Cards and cards to be displayed
  gs.gd.UICIC = [];
  let itemCardsToDisplay = [];

  // Add an item card for the base item of the loadout
  itemCardsToDisplay.push(new ItemCard('Item Card', [244, 58], 133, 18, 1, false, null, 0, selected.base));

  // For each weapon in the loadout, add its item card to be displayed
  for (let i = 0; i < selected.weaponsArray.length; i++) {
    if (selected.weaponsArray[i]) {
      itemCardsToDisplay.push(new ItemCard('Item Card', [244, 165+(19*i)], 133, 18, 1, false, null, 0, selected.weaponsArray[i]));
    }
  }

  // For each utility in the loadout, add its item card to be displayed
  for (let i = 0; i < selected.utilitiesArray.length; i++) {
    if (selected.utilitiesArray[i]) {
      itemCardsToDisplay.push(new ItemCard('Item Card', [244, 222+(19*i)], 133, 18, 1, false, null, 0, selected.utilitiesArray[i]));
    }
  }

  // For item card to be displayed, add it to the UICIC (User Interface: Current Item Cards) array to be drawn
  for (let i = 0; i < itemCardsToDisplay.length; i++) {
    gs.gd.UICIC.push(itemCardsToDisplay[i]);
  }

  

};

// --------------------------------------------------
//                GAME LOOP FUNCTIONS
// --------------------------------------------------

let maxFPS = 60;
let fpsToDisplay = 0;
let fpsLastUpdate = 0;
let framesLastSecond = 0;
let firstFrame = true;

let loopStartTime = 0;
let lastFrameTimestamp = 0;
let frameInterval = 1000/maxFPS;
let tslf = 0; // Time Since Last Frame; part of a "delta time" system for the loop
let delta = 0;
let loopRunning = false;

function startGameLoop() {
  loopRunning = true;
  requestAnimationFrame(gameLoopDelta);
};

function gameLoopBasic(timestamp) { // WORKING
  if (timestamp < lastFrameTimestamp + (1000/maxFPS)) {
    requestAnimationFrame(gameLoopBasic);
    return;
  };
  lastFrameTimestamp = timestamp;
  loopUpdate();
  draw();
  requestAnimationFrame(gameLoopBasic);
};

function gameLoopDelta(timestamp) { // WORKING, IN USE
//console.log(timestamp);
  console.log('Game loop ran a frame!');
  if (gs.lm.levelStartFlag) {
    gs.lm.levelStartTime = timestamp; // Establishes time of level start
    gs.lm.levelStartFlag = false;
  } else {
    gs.lm.levelElapsedTime = timestamp - gs.lm.levelStartTime; // If level is already in progress, update elapsed time
  }
  
  if (timestamp < lastFrameTimestamp + (1000/maxFPS)) {
    requestAnimationFrame(gameLoopDelta);
    return;
  };

  let tslf = timestamp - lastFrameTimestamp; // Time Since Last Frame
  delta += tslf;
  lastFrameTimestamp = timestamp;

  while (delta >= frameInterval) {
    loopUpdate(timestamp);
    delta -= frameInterval;
  }

  draw();
  framesLastSecond += 1;

  if (timestamp > fpsLastUpdate + 1000) {
    fpsToDisplay = framesLastSecond;
    framesLastSecond = 0;
    fpsLastUpdate = timestamp;
  }

  firstFrame = false;
  requestAnimationFrame(gameLoopDelta);
};

function loopUpdate(timestamp) {
  if (gs.lm.levelElapsedTime > 500) {
    gs.lm.weaponsLocked = false;
  }

  doMobBehavior(timestamp);
  doProjectileBehavior();
  // Call other game logic/behavior functions
  
  if (keyZPressedThisFrame) {
    spawnZombot();
  }
  if (keyTPressedThisFrame) {
    spawnTurret();
  }
  // ADD FUNCTION: function clearKeyPressesThisFrame() that resets all keys pressed this frame
  keyZPressedThisFrame = false;
  keyTPressedThisFrame = false;
  gs.gd.mouseClickThisFrame = false;
};

function doMobBehavior(timestamp) {
  doPlayerBehavior(timestamp);
  doEnemyBehavior(timestamp);
};

function doStaticBehavior(timestamp) {
  let statics = gs.lm.currentStatics;
  for (let i = 0; i < statics.length; i++) {
    // if item has a doBehavior, do it
  }
};

function doPlayerBehavior(timestamp) {
  if (!firstFrame && gs.gd.currentScene === "gameLevel") {
    let player = gs.lm.player;
    //console.log(`player.loadout.weapons[0].name: ${player.loadout.weapons[0].name}`);
    player.move();
    player.loadout.weapons[0].checkToStartReload(timestamp);
    player.loadout.weapons[0].checkToCompleteReload(timestamp);
    player.checkFire(timestamp);
    
    keyRPressedThisFrame = false;
  }
  
};

function doProjectileBehavior() {
  for (let i = 0; i < gs.lm.currentProjectiles.length; i++) {

    let hitTarget = false;
    let projectile = gs.lm.currentProjectiles[i];
    
    // Calculate and apply the projectile's change in position this frame
    let positionChange = polarToCartesian(projectile.speed, projectile.angle);
    projectile.position.x += positionChange.x;
    projectile.position.y += positionChange.y;
    projectile.distanceTraveled += projectile.speed;
    
    // If projectile has traveled past its max range, delete it
    if (projectile.distanceTraveled > projectile.maxRange) {
      projectile.delete(i)
      i -= 1;
    }

    // Do a collision check for the projectile and and apply the appropriate effect
    for (let j = 0; j < gs.lm.currentMobiles.length; j++) {
      let mob = gs.lm.currentMobiles[j];
      if (checkCollision(projectile, mob)) {
        //console.log(`Collision ID: ${mob.id}`);
        projectile.hitTarget(mob, i);
        hitTarget = true;
        if (gs.lm.currentProjectiles.length > 0) {
          i -= 1;
        }
        if (mob.checkDeath !== undefined) {
          mob.checkDeath(j);
        }
      }
      if (hitTarget) {
        break;
      }
    }
    
  }
};

function doEnemyBehavior(timestamp) {
  let mobs = gs.lm.currentMobiles;
  for (let i = 0; i < mobs.length; i++) {
    let mob = mobs[i];
    if (mob.team === 'Zombots') {
      mob.move3();
      mob.checkAttack(timestamp, gs.lm.player);
    }
  }
};

// --------------------------------------------------
//                  DRAW FUNCTIONS
// --------------------------------------------------

function draw() {
  cm.clearRect(0, 0, canvasWidth, canvasHeight);
  cu.clearRect(0, 0, canvasWidth, canvasHeight);

  if (gs.gd.currentScene === 'gameLevel') {
    drawBackgroundArt(gs.lm.level);
  }

  if (loopRunning) {
    drawMobileObjects();
    drawStaticObjects();
    drawProjectiles();
  };

  drawUIArt();
  drawTestInfo();
  drawAuxMenu();
  drawCustomText();

};

function drawBackgroundArt(level) {
  // FOR EASE OF REFFERENCE: level === levelData.testLevel;
  let tileMap = level.tileMap;
  let tileImg = level.tileSet.ground1.img;
  let tileWidth = level.tileSet.ground1.width;
  let tileHeight = level.tileSet.ground1.height;

  //let tilesDrawn = 0;

  for (let i = 0; i < tileMap.length; i++) {
    for (let j = 0; j < tileMap[i].length; j++) {
      let drawOriginX =  Math.floor((tileWidth*j) + cameraOffset.x - gs.lm.cameraPosition.x); 
      let drawOriginY = Math.floor((tileHeight*i) + cameraOffset.y - gs.lm.cameraPosition.y);
      
      if (drawOriginX + tileWidth >= gs.gd.playArea.border.left &&
        drawOriginX <= gs.gd.playArea.border.right &&
        drawOriginY + tileHeight >= gs.gd.playArea.border.top &&
        drawOriginY <= gs.gd.playArea.border.bottom) { // Draw tile only if it appears in the display area
        if (tileMap[i][j] === 1) {
          tileImg = level.tileSet.ground1.img;
        } else if (tileMap[i][j] === 2) {
          tileImg = level.tileSet.rock1.img;
        } else if (tileMap[i][j] === 3) {
          tileImg = level.tileSet.shrub1.img;
        } else {
          tileImg = level.tileSet.ground1.img;
          console.log(`The number in tileMap at coordinates ${j},${i} has not been assigned in image`);
        }

        cu.drawImage(tileImg, drawOriginX, drawOriginY, tileWidth, tileHeight);
        //tilesDrawn++;
      }
    }
  }
  //console.log(`tilesDrawn: ${tilesDrawn}`);
};

function drawUIArt() {
  for (let i = 0; i < gs.gd.UICS.length; i++) { // For each UI section to be displayed
    for (let j = 0; j < gs.gd.UICS[i].elements.length; j++) { // For each element in the section to be displayed
      let element = gs.gd.UICS[i].elements[j];

      if (element.name === 'MEDU Status Display') {
        // Display health (structure/armor) status
        let player = gs.lm.player;
        if (player.condition.structure >= player.maxStructure*0.6) {
          cu.fillStyle = 'green';
        } else if (player.condition.structure >= player.maxStructure*0.3) {
          cu.fillStyle = 'yellow';
        } else if (player.condition.structure < player.maxStructure*0.3) {
          cu.fillStyle = 'red';
        }

        let playerHealthPercent = player.condition.structure/player.maxStructure;
        //cu.fillRect(102, 284, 120*playerHealthPercent, 15);
        cu.fillRect(102 + (120*(1-playerHealthPercent)), 284, 120*playerHealthPercent, 15);

        cm.font = '18px Helvetica'
        cm.fillStyle = 'black';
        cm.fillText(player.condition.structure, 285, 588);
        cm.fillText('/', 320, 588);
        cm.fillText(player.maxStructure, 330, 588);
      }

      cu.drawImage(element.img, element.uOrigin[0], element.uOrigin[1], element.uWidth, element.uHeight); // Draw the UI element
    }
  }

  //console.log('drawUIArt running');
  //console.log(`gs.gd.currentScene: ${gs.gd.currentScene}`);
  if (gs.gd.currentScene === 'depotLoadouts') { 
    //console.log('UICLC outside loop reached');
    for (let i = 0; i < gs.gd.UICLC.length; i++) { // For each LoadoutCard to be displayed
      //console.log('UICLC draw loop layer 1 reached');
      for (let j = 0; j < gs.gd.UICLC[i].elements.length; j++) { // For each element in the card to be displayed
        //console.log('UICLC draw loop layer 2 reached');
        let element = gs.gd.UICLC[i].elements[j];
        cu.drawImage(element.img, element.uOrigin[0], element.uOrigin[1], element.uWidth, element.uHeight); // Draw the UI element
      }
    }

    for (let i = 0; i < gs.gd.UICIC.length; i++) { // For each ItemCard to be displayed
      //console.log('UICLC draw loop layer 1 reached');
      for (let j = 0; j < gs.gd.UICIC[i].elements.length; j++) { // For each element in the card to be displayed
        //console.log('UICLC draw loop layer 2 reached');
        let element = gs.gd.UICIC[i].elements[j];
        cu.drawImage(element.img, element.uOrigin[0], element.uOrigin[1], element.uWidth, element.uHeight); // Draw the UI element
      }
    }

  }
  
  if (gs.gd.currentScene === 'gameLevel' && !firstFrame) {
    let player = gs.lm.player;
    
    // Display ammo/reload status
    // *** Needs loop for loadouts with multiple weapons
    //console.log(`player: ${player}`);
    //console.log(`player.loadout: ${player.loadout}`);
    //console.log(`player.loadout.weapons: ${player.loadout.weapons}`);
    //console.log(`player.loadout.weapons[0]: ${player.loadout.weapons[0]}`);
    let weapon = player.loadout.weapons[0];
    cu.fillStyle = 'white';
    if (weapon.currentShotsInMag > 0) {
      cu.fillRect(400, 57, 48*(weapon.currentShotsInMag/weapon.shotsPerMag), 10);
    } else if (weapon.currentShotsInMag === 0) {
      cu.fillRect(400, 57, 48*(weapon.tslmr/(weapon.magReload*1000)), 10);
    }
    cm.font = '24px Helvetica'
    cm.fillStyle = 'black';
    cm.fillText(player.loadout.weapons[0].name, 800, 96);
    cm.fillText(player.loadout.weapons[0].currentShotsInMag, 800, 132);
    cm.fillText('/', 840, 132);
    cm.fillText(player.loadout.weapons[0].shotsPerMag, 860, 132);
  }
  
  // Decide whether to draw a cursor or crosshair, then draw it
  if (gs.gd.currentScene === 'gameLevel' && isWithinArea(
    {
      x: gs.gd.mousePos.x,  // X coordinate
      y: gs.gd.mousePos.y,  // Y coordinate
    }, 
    {
    left: gs.gd.playArea.border.left,     //   left X boundary
    right: gs.gd.playArea.border.right,   //  right X boundary
    top: gs.gd.playArea.border.top,       //    top Y boundary
    bottom: gs.gd.playArea.border.bottom, // bottom Y boundary
    }
    )) {
    cu.drawImage(crosshairImg, Math.floor(gs.gd.mousePos.x/upscaleFactor)-8, Math.floor(gs.gd.mousePos.y/upscaleFactor)-8, 16, 16);
  } else {
    cu.drawImage(cursorImg, Math.floor(gs.gd.mousePos.x/upscaleFactor)-8, Math.floor(gs.gd.mousePos.y/upscaleFactor)-8, 16, 16);
  }
  
};

function drawTestInfo() {
  // TEMPORARY TESTING INFORMATION: Display click location
  //cm.fillStyle = 'red';
  //cm.fillRect(gs.gd.clickPos.x - 5, gs.gd.clickPos.y - 5, 10, 10);
  //cm.strokeStyle = 'black';
  //cm.lineWidth = 3;
  //cm.strokeRect(gs.gd.clickPos.x - 5, gs.gd.clickPos.y - 5, 10, 10);

  if (gs.gd.currentScene !== 'gameLevel') {
    // Green: displays last button action for testing purposes
    cm.fillStyle = 'green';
    cm.fillRect(208, 570, 250, 56);
    cm.font = '24px Helvetica'
    cm.fillStyle = 'black';
    cm.fillText('Last button action:', 230, 592);
    cm.fillText(lastButtonAction, 230, 618);

    // Yellow: displays current scene for testing purposes
    cm.fillStyle = 'yellow';
    cm.fillRect(500, 570, 250, 56);
    cm.font = '24px Helvetica';
    cm.fillStyle = 'black';
    cm.fillText('Current scene:', 530, 592);
    cm.fillText(gs.gd.currentScene, 530, 618);

    // Draw red boxes over all buttons to see if they're registering on the buttons list and show their rough area
    //for (let i = 0; i < gs.gd.currentButtons.length; i++) {
      //cm.fillStyle = 'red';
      //cm.fillRect(gs.gd.currentButtons[i].mOrigin[0] + 4, gs.gd.currentButtons[i].mOrigin[1] + 4, gs.gd.currentButtons[i].mWidth - 8, gs.gd.currentButtons[i].mHeight - 8);
      //console.log(`Draw params: ${gs.gd.currentButtons[i].mOrigin[0] + 4}, ${gs.gd.currentButtons[i].mOrigin[1] + 4}, ${gs.gd.currentButtons[i].mWidth - 8}, ${gs.gd.currentButtons[i].mHeight - 8}`);
    //}

  } else if (gs.gd.currentScene === 'gameLevel') {
    // Green: displays last button action for testing purposes
    cm.fillStyle = 'green';
    cm.fillRect(16, canvasHeight*0.5 - 230, 172, 80);
    cm.font = '18px Helvetica'
    cm.fillStyle = 'black';
    cm.fillText('Last button action:', 32, canvasHeight*0.5 - 200);
    cm.fillText(lastButtonAction, 32, canvasHeight*0.5 - 170);

    // Yellow: displays current scene for testing purposes
    cm.fillStyle = 'yellow';
    cm.fillRect(16, canvasHeight*0.5 - 150, 172, 80);
    cm.font = '18px Helvetica';
    cm.fillStyle = 'black';
    cm.fillText('current scene:', 32, canvasHeight*0.5 - 120);
    cm.fillText(gs.gd.currentScene, 32, canvasHeight*0.5 - 90)

    // Orange: displays current Frames Per Second
    cm.fillStyle = 'orange';
    cm.fillRect(16, canvasHeight*0.5 - 70, 172, 80);
    cm.font = '18px Helvetica';
    cm.fillStyle = 'black';
    cm.fillText('FPS:', 32, canvasHeight*0.5 - 40);
    cm.fillText(fpsToDisplay, 32, canvasHeight*0.5 - 10);
    
    // Red: displays player and mouse position
    cm.fillStyle = 'red';
    cm.fillRect(16, canvasHeight*0.5 + 10, 172, 80);
    cm.font = '18px Helvetica';
    cm.fillStyle = 'black';
    cm.fillText('Plyr Pos:', 32, canvasHeight*0.5 + 30);

    if (gs.lm.player.position) {
      cm.fillText(Math.floor(gs.lm.player.position.x), 110, canvasHeight*0.5 + 30);
      cm.fillText(',', 140, canvasHeight*0.5 + 30);
      cm.fillText(Math.floor(gs.lm.player.position.y), 150, canvasHeight*0.5 + 30);
    }
    
    cm.fillText('Ms Can:', 32, canvasHeight*0.5 + 55);
    cm.fillText(gs.gd.mousePos.x, 110, canvasHeight*0.5 + 55);
    cm.fillText(',', 140, canvasHeight*0.5 + 55);
    cm.fillText(gs.gd.mousePos.y, 150, canvasHeight*0.5 + 55);
    
    cm.fillText('Ms Lvl:', 32, canvasHeight*0.5 + 80);
    cm.fillText(Math.floor(canvasToLevelCoords(gs.gd.mousePos).x), 110, canvasHeight*0.5 + 80);
    cm.fillText(',', 140, canvasHeight*0.5 + 80);
    cm.fillText(Math.floor(canvasToLevelCoords(gs.gd.mousePos).y), 150, canvasHeight*0.5 + 80);

    // Red: indicates the corners of the level display area
    //cu.fillStyle = 'red';
    //cu.fillRect(gs.gd.playArea.border.left - 5, gs.gd.playArea.border.top - 5, 10, 10); // top left
    //cu.fillRect(gs.gd.playArea.border.right - 5, gs.gd.playArea.border.top - 5, 10, 10); // top right
    //cu.fillRect(gs.gd.playArea.border.left - 5, gs.gd.playArea.border.bottom - 5, 10, 10); // bottom left
    //cu.fillRect(gs.gd.playArea.border.right - 5, gs.gd.playArea.border.bottom - 5, 10, 10); // bottom right
  }
};

function drawAuxMenu() {
  if (gs.lm.gamePaused === true) {
    // TEMPORARY FUNCTIONALITY; create a proper pause menu that disappears and removes its buttons when you resume or return to an out-of-level menu.
    
    cu.fillStyle = 'black';
    cu.fillRect(canvasWidth/upscaleFactor*0.5 - 32, canvasHeight/upscaleFactor*0.5 - 47, 64, 84);
    cu.fillStyle = 'green';
    cu.fillRect(canvasWidth/upscaleFactor*0.5 - 30, canvasHeight/upscaleFactor*0.5 - 45, 60, 80);
    cu.drawImage(btnBack2.img, btnBack2.uOrigin[0], btnBack2.uOrigin[1], btnBack2.uWidth, btnBack2.uHeight);
    cm.fillStyle = 'black';
    cm.font = '24px Helvetica';
    cm.fillText('Game Paused', 400, 250);
    cm.fillText('Back to depot?', 395, 360);
  }
};

function drawObject(obj) {
  
  cu.translate(obj.position.x - gs.lm.cameraPosition.x + cameraOffset.x, obj.position.y - gs.lm.cameraPosition.y + cameraOffset.y); // Translate canvas origin to image's center
  
  // if drawing player with 8-directional system
  if (obj.direction) {
    let rotationDegrees = 0;
    if (obj.direction === 0 || obj.direction === 1) { // up or up/right
      rotationDegrees = 0;
    } else if (obj.direction === 2 || obj.direction === 3) { // right or down/right
      rotationDegrees = 90;
    } else if (obj.direction === 4 || obj.direction === 5) { // down or down/left
      rotationDegrees = 180;
    } else if (obj.direction === 6 || obj.direction === 7) { // left or up/left
      rotationDegrees = 270;
    }
    cu.rotate(degreesToRadians(rotationDegrees)); // Rotate canvas around the image's center
    cu.drawImage(obj.img, 0-(obj.width/2), 0-(obj.height/2), obj.width, obj.height); // Draw the image
    cu.rotate(-degreesToRadians(rotationDegrees)); // Reset the rotation
  }
  
  // if drawing other object with smooth rotation
  if (obj.angle) {
    cu.rotate(obj.angle); // Rotate canvas around the image's center
    cu.drawImage(obj.img, 0-(obj.width/2), 0-(obj.height/2), obj.width, obj.height); // Draw the image
    cu.rotate(-obj.angle); // Reset the rotation
  }
  
  cu.translate(-(obj.position.x - gs.lm.cameraPosition.x + cameraOffset.x), -(obj.position.y - gs.lm.cameraPosition.y + cameraOffset.y)); // Reset the translation
};

function drawCustomText() {
  // Custom text objects have these properties: origin, imgArray, imgSpacing, fontHeight
  let sections = gs.gd.UICS;
  let xOffset = 0;
  for (let i = 0; i < sections.length; i++) {
    let textObjects = sections[i].customText;
    for (let j = 0; j < textObjects.length; j++) {
      xOffset = 0;
      let imgArray = textObjects[j].imgArray;
      let imgSpacing = textObjects[j].imgSpacing;
      let origin = textObjects[j].origin;
      let fontHeight = textObjects[j].fontHeight;
      for (let k = 0; k < imgArray.length; k++) {
        let img = new Image();
        img.src = textObjects[j].imgArray[k];
        cu.drawImage(img, origin.x + xOffset, origin.y, imgSpacing[k]-1, fontHeight);
        xOffset += imgSpacing[k];
      }
    }
  }
};

// New drawMobileObjects() and drawProjectiles() functions: keep loops/organization, leave drawing to drawObject()
//function drawMobileObjects() {};
//function drawProjectiles() {};

function drawMobileObjects() {
  // Draw each object in the currentMobiles list of objects
  for (let i = 0; i < gs.lm.currentMobiles.length; i++) {
    let mob = gs.lm.currentMobiles[i];

    // Decide how much to rotate the sprite based on the direction it's facing
    let rotationDegrees = 0;
    if (mob.direction === 0 || mob.direction === 1) { // up or up/right
      rotationDegrees = 0;
    } else if (mob.direction === 2 || mob.direction === 3) { // right or down/right
      rotationDegrees = 90;
    } else if (mob.direction === 4 || mob.direction === 5) { // down or down/left
      rotationDegrees = 180;
    } else if (mob.direction === 6 || mob.direction === 7) { // left or up/left
      rotationDegrees = 270;
    } 

    if (mob.name === 'player') {
      //console.log(`player.position: [x:${mob.position.x}, y: ${mob.position.y}]`);
      cu.translate(mob.position.x - gs.lm.cameraPosition.x + cameraOffset.x, mob.position.y - gs.lm.cameraPosition.y + cameraOffset.y); // Translate canvas origin to image's center
      cu.rotate(degreesToRadians(rotationDegrees)); // Rotate canvas around the image's center
      cu.drawImage(mob.img, 0-(mob.width/2), 0-(mob.height/2), mob.width, mob.height); // Draw the main mob sprite
      cu.rotate(-degreesToRadians(rotationDegrees)); // Reset the rotation
      cu.translate(-(mob.position.x - gs.lm.cameraPosition.x + cameraOffset.x), -(mob.position.y - gs.lm.cameraPosition.y + cameraOffset.y)); // Reset the translation
    } else {
      cu.translate(Math.floor(mob.position.x - gs.lm.cameraPosition.x + cameraOffset.x), Math.floor(mob.position.y - gs.lm.cameraPosition.y + cameraOffset.y)); // Translate canvas origin to image's center
      cu.rotate(degreesToRadians(rotationDegrees)); // Rotate canvas around the image's center
      cu.drawImage(mob.img, Math.floor(0-(mob.width/2)), Math.floor(0-(mob.height/2)), mob.width, mob.height); // Draw the main mob sprite
      cu.rotate(-degreesToRadians(rotationDegrees)); // Reset the rotation
      cu.translate(-(Math.floor(mob.position.x - gs.lm.cameraPosition.x + cameraOffset.x)), -(Math.floor(mob.position.y - gs.lm.cameraPosition.y + cameraOffset.y))); // Reset the translation
      
      // (Math.floor(mob.position.x) - gs.lm.cameraPosition.x + cameraOffset.x) +  Math.floor(0-(mob.width/2))
      // (Math.floor(mob.position.y) - gs.lm.cameraPosition.y + cameraOffset.y) + Math.floor(0-(mob.height/2))
      //console.log(`ZB origin: ${Math.floor(mob.position.x - gs.lm.cameraPosition.x + cameraOffset.x) +  Math.floor(0-(mob.width/2))},${Math.floor(mob.position.y - gs.lm.cameraPosition.y + cameraOffset.y) + Math.floor(0-(mob.height/2))}`);
      //console.log(`camPosX: ${gs.lm.cameraPosition.x}`);
    }

    // Draw any separate attachments
    if (mob.loadout) {
      for (let j = 0; j < mob.loadout.weapons.length; j++) {
        let attachment = mob.loadout.weapons[j];
        let mountOffset = {x: mob.weaponAttachmentPoints[j].x, y: mob.weaponAttachmentPoints[j].y};
        let corOffset = {x: attachment.centerOfRotation.x, y: attachment.centerOfRotation.y};
        
        // NEEDS UPDATES: this part functions only for the current low-res player object and low-resolution 16x16 sprite. mountOffset will need to be assigned using a calculation (instead of raw assignments) in order to make it work for multiple chassis types and other mobs. 
        if (mob.direction === 0) { // up
          mountOffset = {x: 0, y: 2};
        } else if (mob.direction === 1) { // up/right
          mountOffset = {x: -1.4, y: 1.4};
        } else if (mob.direction === 2) { // right
          mountOffset = {x: -2, y: 0};
        } else if (mob.direction === 3) { // down/right
          mountOffset = {x: -1.4, y: -1.4};
        } else if (mob.direction === 4) { // down
          mountOffset = {x: 0, y: -2};
        } else if (mob.direction === 5) { // down/left
          mountOffset = {x: 1.4, y: -1.4};
        } else if (mob.direction === 6) { // left
          mountOffset = {x: 2, y: 0};
        } else if (mob.direction === 7) { // up/left
          mountOffset = {x: 1.4, y: 1.4};
        } 
        
        
        // OLD WORKING VERSION BEFORE ADDING WEAPON COR FACTORS
        //cu.translate(mob.position.x - gs.lm.cameraPosition.x + cameraOffsetX, mob.position.y - gs.lm.cameraPosition.y + cameraOffsetY); // Translate canvas origin to image's center
        //cu.rotate(mob.loadout.weapons[j].angle); // Rotate canvas around the image's center
        //cu.drawImage(mob.loadout.weapons[j].img, 0-(mob.width/2), 0-(mob.height/2), mob.width, mob.height); // Draw the mob attachment
        //cu.rotate(-mob.loadout.weapons[j].angle); // Reset the rotation
        //cu.translate(-(mob.position.x - gs.lm.cameraPosition.x + cameraOffsetX), -(mob.position.y - gs.lm.cameraPosition.y + cameraOffsetY)); // Reset the translation
        
        // V2
        //cu.translate(mob.position.x - gs.lm.cameraPosition.x + cameraOffsetX + corOffset.x, mob.position.y - gs.lm.cameraPosition.y + cameraOffsetY + corOffset.y); // Translate canvas origin to image's center
        //cu.rotate(attachment.angle); // Rotate canvas around the image's center
        //cu.drawImage(attachment.img, 0 - corOffset.x - (attachment.width/2), 0 - corOffset.y - (attachment.height/2), attachment.width, attachment.height); // Draw the mob attachment
        //cu.rotate(-attachment.angle); // Reset the rotation
        //cu.translate(-(mob.position.x - gs.lm.cameraPosition.x + cameraOffsetX + corOffset.x), -(mob.position.y - gs.lm.cameraPosition.y + cameraOffsetY + corOffset.y)); // Reset the translation
        
        // V3, using single COR offset
        //cu.translate(mob.position.x - gs.lm.cameraPosition.x + cameraOffsetX + corOffset.x, mob.position.y - gs.lm.cameraPosition.y + cameraOffsetY + corOffset.y); // Translate canvas origin to image's center
        //cu.rotate(attachment.angle); // Rotate canvas around the image's center
        //cu.drawImage(attachment.img, 0 - corOffset.x - (attachment.width/2), 0 - corOffset.y - (attachment.height/2), attachment.width, attachment.height); // Draw the mob attachment
        //cu.fillStyle = 'red';
        //cu.fillRect(-1, -1, 2, 2);
        //cu.fillStyle = 'blue';
        //cu.fillRect(-5, -5, 2, 2);
        //cu.rotate(-attachment.angle); // Reset the rotation
        //cu.translate(-(mob.position.x - gs.lm.cameraPosition[0] + cameraOffsetX + corOffset.x), -(mob.position.y - gs.lm.cameraPosition[1] + cameraOffsetY + corOffset.y)); // Reset the translation
        
        // V4, WORKING! Weapon center of rotation properly attaches to chassis mount point
        cu.translate(mob.position.x - gs.lm.cameraPosition.x + cameraOffset.x + mountOffset.x, 
                    mob.position.y - gs.lm.cameraPosition.y + cameraOffset.y + mountOffset.y); // Translate canvas origin to image's center
        cu.rotate(attachment.angle); // Rotate canvas around the image's center
        cu.drawImage(attachment.img, 
                    //- corOffset.x - (attachment.width/2), 
                    //- corOffset.y - (attachment.height/2), 
                    - corOffset.x,
                    - corOffset.y,
                    attachment.width, 
                    attachment.height
                    ); // Draw the mob attachment
        //cu.fillStyle = 'red';
        //cu.fillRect(-1, -1, 2, 2);
        //cu.fillStyle = 'blue';
        //cu.fillRect(-5, -5, 2, 2);
        cu.rotate(-attachment.angle); // Reset the rotation
        cu.translate(-(mob.position.x - gs.lm.cameraPosition.x + cameraOffset.x + mountOffset.x), 
                    -(mob.position.y - gs.lm.cameraPosition.y + cameraOffset.y + mountOffset.y)); // Reset the translation
        
      }
    }
  }
};

function drawStaticObjects() {
  // Draw each object in the currentStatics list of objects
  for (let i = 0; i < gs.lm.currentStatics.length; i++) {
    let obj = gs.lm.currentStatics[i];
    let rotationDegrees = 0;

    cu.translate(Math.floor(obj.position.x - gs.lm.cameraPosition.x + cameraOffset.x), Math.floor(obj.position.y - gs.lm.cameraPosition.y + cameraOffset.y)); // Translate canvas origin to image's center
    cu.rotate(degreesToRadians(rotationDegrees)); // Rotate canvas around the image's center
    cu.drawImage(obj.img, Math.floor(0-(obj.width/2)), Math.floor(0-(obj.height/2)), obj.width, obj.height); // Draw the main obj sprite
    cu.rotate(-degreesToRadians(rotationDegrees)); // Reset the rotation
    cu.translate(-(Math.floor(obj.position.x - gs.lm.cameraPosition.x + cameraOffset.x)), -(Math.floor(obj.position.y - gs.lm.cameraPosition.y + cameraOffset.y))); // Reset the translation

    if (obj.loadout) {
      for (let j = 0; j < obj.loadout.weapons.length; j++) {
        let attachment = obj.loadout.weapons[j];
        let mountOffset = {x: obj.weaponAttachmentPoints[j].x, y: obj.weaponAttachmentPoints[j].y};
        let corOffset = {x: attachment.centerOfRotation.x, y: attachment.centerOfRotation.y};
        
        // V4, WORKING! Weapon center of rotation properly attaches to chassis mount point
        cu.translate(obj.position.x - gs.lm.cameraPosition.x + cameraOffset.x + mountOffset.x, 
                     obj.position.y - gs.lm.cameraPosition.y + cameraOffset.y + mountOffset.y); // Translate canvas origin to image's center
        cu.rotate(attachment.angle); // Rotate canvas around the image's center
        cu.drawImage(attachment.img, 
                    - corOffset.x,
                    - corOffset.y,
                    attachment.width, 
                    attachment.height
                    ); // Draw the obj attachment
        cu.rotate(-attachment.angle); // Reset the rotation
        cu.translate(-(obj.position.x - gs.lm.cameraPosition.x + cameraOffset.x + mountOffset.x), 
                    -(obj.position.y - gs.lm.cameraPosition.y + cameraOffset.y + mountOffset.y)); // Reset the translation
        
      }
    }
  }
};

function drawProjectiles() {
  for (let i = 0; i < gs.lm.currentProjectiles.length; i++) {
    let projectile = gs.lm.currentProjectiles[i];
    
    cu.fillStyle = 'red';
    cu.fillRect(projectile.position.x - gs.lm.cameraPosition.x + cameraOffset.x - 2, projectile.position.y - gs.lm.cameraPosition.y + cameraOffset.y - 2, 4, 4);
    
    
    // ADD CHECK: Like tiles, only draw projectiles if they are in view
    
    cu.translate(projectile.position.x - gs.lm.cameraPosition.x + cameraOffset.x, projectile.position.y - gs.lm.cameraPosition.y + cameraOffset.y); // Translate canvas origin to image's center
    cu.rotate(projectile.angle); // Rotate canvas around the image's center
    cu.drawImage(projectile.img, 0-(projectile.width/2), 0-(projectile.height/2), projectile.width, projectile.height); // Draw the main projectile sprite
    cu.rotate(-projectile.angle); // Reset the rotation
    cu.translate(-(projectile.position.x - gs.lm.cameraPosition.x + cameraOffset.x), -(projectile.position.y - gs.lm.cameraPosition.y + cameraOffset.y)); // Reset the translation
  }
  
};

// --------------------------------------------------
//                 HELPER FUNCTIONS
// --------------------------------------------------

function checkCollision(obj1, obj2) {
  // obj1 should be the moving/acting object, obj2 should be the static/passive/receiving object
  let detectCollision = false;
  if (obj1.hitRange + obj2.hitRange >= getDistance(obj1.position, obj2.position)) {
    
    // Collision detected
    detectCollision = true;
    
    // If the detected object is self, ignore the collision
    if (obj1.id === obj2.id) {
      detectCollision = false;
    }
    
    // If detected object is on the colliding object's ignore list, ignore the collision
    for (let i = 0; i < obj1.collisionIgnoreList.length; i++) {
      if (obj1.collisionIgnoreList[i] === obj2.name) {
        detectCollision = false;
      } 
    }
  } 
  //console.log(detectCollision);
  //console.log(`CC ${obj1.name}/${obj2.name}: ${detectCollision}`);
  return detectCollision;
};

function getDistance(point1, point2) {
  let distance = Math.sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2);
  return distance;
};

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
};

function radiansToDegrees(radians) {
  return radians / (Math.PI / 180);
};

function directionToDegrees(direction) {
  switch (direction) {
    case 0: 
      return 0;
    case 1: 
      return 45;
    case 2: 
      return 90;
    case 3: 
      return 135;
    case 4: 
      return 180;
    case 5: 
      return 225;
    case 6: 
      return 270;
    case 7: 
      return 315;
  }

};

function directionToRadians(direction) {
  return degreesToRadians(directionToDegrees(direction));
};

function canvasToLevelCoords(canvasCoords) { 
  let levelCoords = {x:0, y:0};
  levelCoords.x = Math.ceil(gs.lm.cameraPosition.x - cameraOffset.x + (canvasCoords.x / upscaleFactor));
  levelCoords.y = Math.ceil(gs.lm.cameraPosition.y - cameraOffset.y + (canvasCoords.y / upscaleFactor));
  return levelCoords;
};

function levelToCanvasCoords(levelCoords) { // Not yet working as intended
  let canvasCoords = {x:0, y:0};
  canvasCoords.x = 0;
  canvasCoords.y = 0;
  return canvasCoords;
};

function isWithinArea(coords, boundaries) {
  /* USAGE TEMPLATE
  *** 2 arguments: 
  - An object containing x and y properties to represent 2-dimensional coordinates
  - An object with left, right, top and bottom properties, indicating the boundaries of the area

    {
      x: xCoordinate,  // X coordinate
      y: yCoordinate,  // Y coordinate
    }, 
    {
    left: leftBoundary,     //   left X boundary
    right: rightBoundary,   //  right X boundary
    top: topBoundary,       //    top Y boundary
    bottom: bottomBoundary, // bottom Y boundary
    }

  */

  if (coords.x/upscaleFactor > boundaries.left && 
      coords.x/upscaleFactor < boundaries.right && 
      coords.y/upscaleFactor > boundaries.top && 
      coords.y/upscaleFactor < boundaries.bottom) {
    return true;
  } else {
    return false;
  }
};

function getAngleRadians(startPoint, endPoint) { // DEPRECATED: Condensed into new function cartesianToPolar()
  // Math.atan2() gets angle between 0,0 and a point, so this adjusts that second point ("endPoint") back to the appropriate position to get an accurate output. 
  // *** In examples, Y coordinate is mirrored as canvas coordinates and Cartesian coordinates are mirrored on the Y axis.
  // Example: A start point of 3,3 and end point of 8,8 would yield 8-3,-(8-3) = 5,-5 = 45*
  // Example: A start point of -6,-6 and end point of -6,-2 would yield -6-(-6),-2-(-6) = 0,4 = 180*
  let result = Math.atan2(endPoint.x - startPoint.x, -(endPoint.y - startPoint.y));
  if (result < 0) {
    result = degreesToRadians(360 - radiansToDegrees(result * -1));
  }
  return result;
};

function getAngleDegrees(startPoint, endPoint) { // DEPRECATED: Condensed into new function cartesianToPolar()
  return radiansToDegrees(getAngleRadians(startPoint, endPoint));
};

function polarToCartesian(distance, angle) { // Returns an object with the change in X and Y coordinates
  let change = {x:0, y:0};
  let angleDegrees = radiansToDegrees(angle);
  
  if (angleDegrees >= 0 && angleDegrees <= 90) {
    change.x = Math.sin(angle) * distance;
    change.y = -Math.cos(angle) * distance;
  } else if (angleDegrees >= 90 && angleDegrees <= 180) {
    // Next 3 blocks subtract 90, 180 and 270 degrees so that calculations are effectively done in the +x/+y quadrant, then translated to the quadrant toward which the movement is to occur
    change.x = Math.cos(degreesToRadians(angleDegrees-90)) * distance; 
    change.y = Math.sin(degreesToRadians(angleDegrees-90)) * distance;
  } else if (angleDegrees >= 180 && angleDegrees <= 270) {
    change.x = -Math.sin(degreesToRadians(angleDegrees-180)) * distance;
    change.y = Math.cos(degreesToRadians(angleDegrees-180)) * distance;
  } else if (angleDegrees >= 270 && angleDegrees <= 360) {
    change.x = -Math.cos(degreesToRadians(angleDegrees-270)) * distance;
    change.y = -Math.sin(degreesToRadians(angleDegrees-270)) * distance;
  } 
  
  return change;
};

function cartesianToPolar(startPoint, endPoint) { // Returns a value in radians
  // Math.atan2() gets angle between 0,0 and a point, so this adjusts that second point ("endPoint") back to the appropriate position to get an accurate output. 
  // *** In examples, Y coordinate is mirrored as canvas coordinates and Cartesian coordinates are mirrored on the Y axis.
  // Example: A start point of 3,3 and end point of 8,8 would yield 8-3,-(8-3) = 5,-5 = 45*
  // Example: A start point of -6,-6 and end point of -6,-2 would yield -6-(-6),-2-(-6) = 0,4 = 180*
  let result = Math.atan2(endPoint.x - startPoint.x, -(endPoint.y - startPoint.y));
  if (result < 0) {
    result = degreesToRadians(360 - radiansToDegrees(result * -1));
  }
  return result;
};

function findObjectAtCoords(coords) { // Not working as intended
  let mobs = gs.lm.currentMobiles;
  for (let i = 0; i < mobs; i++) {
    let mob = mobs[i];
    if (getDistance(mob.position, coords) < mob.hitRange) {
      return mob;
    }
  }
  return false;
};

// --------------------------------------------------
//                 EVENT HANDLERS
// --------------------------------------------------

function mouseMoveHandler(mousePosInput) {
  gs.gd.mousePos.x = mousePosInput.x - canvasMain.offsetLeft - canvasContainer.offsetLeft + document.scrollingElement.scrollLeft;
  gs.gd.mousePos.y = mousePosInput.y - canvasMain.offsetTop - canvasContainer.offsetTop + document.scrollingElement.scrollTop;
  
  if (!loopRunning && gs.gd.currentScene !== 'clickToStart') {
    draw();
  }
  
  if (loopRunning && gs.gd.currentScene === 'gameLevel') {
    for (let i = 0; i < gs.lm.player.loadout.weapons.length; i++) {
      // For each weapon, rotate it to point toward the mouse location
      gs.lm.player.loadout.weapons[i].angle = cartesianToPolar(
        {x: gs.lm.player.position.x, y: gs.lm.player.position.y}, 
        {x: canvasToLevelCoords(gs.gd.mousePos).x, y: canvasToLevelCoords(gs.gd.mousePos).y}
      );
    }
  }
  
};

function clickOnCanvas(event) {
  if (firstClick) {
    canvasMain.style.cursor = 'none';
    canvasUpscale.style.cursor = 'none';
    loadScene('start')
    firstClick = false;
    startGameLoop();
    return;
  } else {
    gs.gd.clickPos.x = event.clientX - canvasMain.offsetLeft - canvasContainer.offsetLeft + document.scrollingElement.scrollLeft;
    gs.gd.clickPos.y = event.clientY - canvasMain.offsetTop - canvasContainer.offsetTop + document.scrollingElement.scrollTop;

    let buttonClickedIndex = detectButtonClicked(gs.gd.clickPos.x, gs.gd.clickPos.y);
    //console.log(`buttonClickedIndex: ${buttonClickedIndex}`);
    if (buttonClickedIndex !== null) {
      let buttonClicked = gs.gd.currentButtons[buttonClickedIndex];
      buttonClicked.click();
      //console.log('Button clicked');
    }

    if (loopRunning) {
      gs.gd.mouseClickThisFrame = true;
    }
    if (!loopRunning) {
      draw();
    }
  }
};

// Refactor to use isWithinArea()
function detectButtonClicked(clickX, clickY) {
  let foundButton = false;
  for (let i = 0; i < gs.gd.currentButtons.length; i++) {
    let withinX = false;
    let withinY = false;

    //btnBorderOffset is now: currentButtons[i].mBorder
    //console.log('--------------------');
    //console.log(`Testing button: ${gs.gd.currentButtons[i].name}`);
    //console.log(`X range: ${gs.gd.currentButtons[i].mOrigin[0]}-${gs.gd.currentButtons[i].mOrigin[0] + gs.gd.currentButtons[i].mWidth}`);
    //console.log(`Y range: ${gs.gd.currentButtons[i].mOrigin[1]}-${gs.gd.currentButtons[i].mOrigin[1] + gs.gd.currentButtons[i].mHeight}`);
    //console.log(`Button area: TLC: ${gs.gd.currentButtons[i].mOrigin[0]},${gs.gd.currentButtons[i].mOrigin[1]}  BRC: ${gs.gd.currentButtons[i].mOrigin[0] + gs.gd.currentButtons[i].mWidth},${gs.gd.currentButtons[i].mOrigin[1] + gs.gd.currentButtons[i].mHeight}`);
    //console.log(`Click location: ${clickX}, ${clickY}`);
    //console.log(`gs.gd.currentButtons[i].mBorder: ${gs.gd.currentButtons[i].mBorder}`);
    //console.log('--------------------');
    if (clickX >= gs.gd.currentButtons[i].mOrigin[0] + gs.gd.currentButtons[i].mBorder && clickX <= gs.gd.currentButtons[i].mOrigin[0] + gs.gd.currentButtons[i].mWidth - gs.gd.currentButtons[i].mBorder) {
      withinX = true;
    }
    if (clickY >= gs.gd.currentButtons[i].mOrigin[1] + gs.gd.currentButtons[i].mBorder && clickY <= gs.gd.currentButtons[i].mOrigin[1] + gs.gd.currentButtons[i].mHeight - gs.gd.currentButtons[i].mBorder) {
      withinY = true;
    }
    if (withinX && withinY) {
      return i;
    } 
  }

  if (!foundButton) {
    return null;
  }
};

let keydownW = false;
let keyWPressedThisFrame = false;
let keydownS = false;
let keySPressedThisFrame = false;
let keydownA = false;
let keyAPressedThisFrame = false;
let keydownD = false;
let keyDPressedThisFrame = false;
let keydownR = false;
let keyRPressedThisFrame = false;
let keydownZ = false;
let keyZPressedThisFrame = false;
let keydownT = false;
let keyTPressedThisFrame = false;

function keyDownHandler(key) {
  if (key.code === 'KeyM') { // Scroll reset testing
    console.log('KeyM pressed');
    for (let i = 0; i < gs.gd.UICS.length; i++) {
      console.log('Loop activated');
      gs.gd.UICS[i].scrollReset();
    }
  }
  if (key.code === 'KeyN') { // Testing button relocation upon scrolling
    console.log('KeyN pressed');
    for (let i = 0; i < gs.gd.currentButtons.length; i++) {
      console.log(`${gs.gd.currentButtons[i].name} origin: ${gs.gd.currentButtons[i].mOrigin}`);
    }
  }

  if (gs.gd.currentScene === 'gameLevel') {
    if (key.code === 'KeyW') { // W key
      keydownW = true;
      keyWPressedThisFrame = true;
    }
    if (key.code === 'KeyS') { // S key
      keydownS = true;
      keySPressedThisFrame = true;
    }
    if (key.code === 'KeyA') { // A key
      keydownA = true;
      keyAPressedThisFrame = true;
    }
    if (key.code === 'KeyD') { // D key
      keydownD = true;
      keyDPressedThisFrame = true;
    }
    if (key.code === 'KeyR' && gs.gd.currentScene === 'gameLevel') { // R key
      keydownR = true;
      keyRPressedThisFrame = true;
    }
    if (key.code === 'KeyZ') {
      keydownZ = true;
      keyZPressedThisFrame = true;
    }
    if (key.code === 'KeyT') {
      keydownT = true;
      keyTPressedThisFrame = true;
    }
  }
  
};

function keyUpHandler(key) {
  if (key.code === 'KeyW') {
    keydownW = false;
  }
  if (key.code === 'KeyS') {
    keydownS = false;
  }
  if (key.code === 'KeyA') {
    keydownA = false;
  }
  if (key.code === 'KeyD') {
    keydownD = false;
  }
  if (key.code === 'KeyR') {
    keydownR = false;
  }
  if (key.keyCode === 'KeyZ') {
    keydownZ = false;
  }
  if (key.keyCode === 'KeyT') {
    keydownT = false;
  }
  
      
};

function mouseDownHandler() {
  gs.gd.mouseDown = true;
};

function mouseUpHandler() {
  gs.gd.mouseDown = false;
};

function mouseWheelHandler() {
  event.preventDefault();
  for (let i = 0; i < gs.gd.UICS.length; i++) {
    let section = gs.gd.UICS[i];

    if (section.scrolling && isWithinArea(    
      {
        x: gs.gd.mousePos.x,  // X coordinate
        y: gs.gd.mousePos.y,  // Y coordinate
      }, 
      {
        left: section.uOrigin[0],                     //   left X boundary
        right: section.uOrigin[0] + section.uWidth,   //  right X boundary
        top: section.uOrigin[1],                      //    top Y boundary
        bottom: section.uOrigin[1] + section.uHeight, // bottom Y boundary
      }
      )) {
      let scrollDirection;
      if (event.deltaY < 0) {
        scrollDirection = -1;
        scrollDirectionString = 'up';
      } else if (event.deltaY > 0) {
        scrollDirection = 1;
        scrollDirectionString = 'down';
      }

      section.scroll(scrollDirection);
    }
  }
};

// --------------------------------------------------
//                 EVENT LISTENERS
// --------------------------------------------------

canvasMain.addEventListener('mousedown', mouseDownHandler, false);
canvasMain.addEventListener('mouseup', mouseUpHandler, false);
canvasMain.addEventListener('mousemove', mouseMoveHandler, false);
canvasMain.addEventListener('click', clickOnCanvas, false);

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

canvasMain.addEventListener('wheel', mouseWheelHandler, false);

// --------------------------------------------------
//               INITIAL CANVAS SETUP
// --------------------------------------------------

cm.fillStyle = 'black';
cm.font = '36px Helvetica';
cm.fillText('Click to start!', canvasWidth*0.4, canvasHeight*0.5);


// --------------------------------------------------
//                 START GAME LOOP
// --------------------------------------------------

//startGameLoop();

// --------------------------------------------------
//                    OTHER STUFF
// --------------------------------------------------









