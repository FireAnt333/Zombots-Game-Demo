/*

ZOMBOTS DEMO V0.0.1 - In Progress

VERSION 0.0.1 REQUIREMENTS: 
- Game loads to start screen
- All menus are navigable, with placeholders in place of more complicated features (levels, tech tree, loadout editor, etc.)

TO DO: 
- Make loadScene() function this way, handling sectional arrays: 
  (X) - Takes in scene name
  (X) - Clears canvas
  (X) - Clears currentButtons array
  (~) - Adds all appropriate pre-defined buttons to currentButtons array
  ( ) - Here, pass handling in to the function that updates the canvas, so that drawing is done there and not in the loadScene() function itself
  ( ) - loadScene() handles the big scene changes (between start screen, menu and level), other functions handle sectional UI changes
    - Create arrays of art elements that make up the different UI sections (top, left, right, bottom) in the menu, then in the loadScene() function, pull in all the section arrays that make up the scene, and draw each element of each section: 
    - loadUITop(1) // 'start', 'menu', 'level'
    - loadUILeft(1) // 'levels', 'depotMEDUs', 'depotBuildings', 'techTreeCategories', '
    - loadUIRight(1) // 'level', 'MEDU', 'building', 'weapon', 'utility', 'editMEDU', 'editBuilding'
    - loadUIBottom(1, 2) // 'dialogue', 'message here' or 'statusDisplay', 'none'
  - Each of these load functions uses an array filled with variables, which in turn contain data for each of the buttons to be displayed in the scene or section. They iterate over the provided array and draw each of the buttons, plus somehow let the event listeners know which buttons are currently able to be clicked. 

- Make level load to a map made up of ground tiles/sprites
- Add player and basic functionality
  - Make player sprite display and face the direction the player moves
  - Make player able to move (8-direction)
    - If 1-2 of WASD keys are held, calculate direction; if more, continue with same direction as last frame/game loop cycle
  - Attach weapon sprite to player
  - Make weapon sprite properly rotate around mount point on player, pointing toward cursor
  - Make weapon create bullet objects with proper velocity upon mouse click and/or hold
  - Make player have a collision model (for now, only collide with walls and objective buildings)
- Make camera display only part of the map, centered on the player (see Technical Ideas for details)
- Add enemies and basic functionality
  - Make enemy sprite display and face the direction the enemy moves
  - Make enemy able to utilize basic pathfinding
    - Start with simple map, "move straight to objective" AI (for simplicity in testing other game basics)
    - Upgrade once other game basics are in place
  - Make enemy take damage when hit with a bullet
  - Make enemy deal damage to objective buildings when close
  - Make enemies spawn at certain intervals at certain points around the edges of the map
  - Create and display win condition (survive a certain time and/or kill a certain number of enemies)
  *** This should be good enough for the first playable build! :D


----- BASIC GAMEPLAY PSEUDOCODE -----

*** Learn how to rotate images

PRE-DEFINE:
- Define images for placeholder art

// TILE CODES: 
// 1 = GDG = Ground:Grass
// 2 = GDR = Ground:Rock
// 3 = GDS = Ground:Shrub
// 4 = WLL = Wall
// 5 = RD# = Radar(corner number 1-4)
const levelMap = [
//C00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R00
  [1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 3, 1, 1, 1, 2, 1], // R01
  [1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1, 1, 1], // R02
  [1, 2, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1], // R03
  [1, 1, 1, 4, 3, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1], // R04
  [1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1], // R05
  [1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1], // R06
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R07
  [1, 1, 1, 1, 1, 3, 1, 1, 1, 2, 1, 1, 1, 3, 1, 1], // R08
  [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R09
  [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R10
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3], // R11
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1], // R12
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1], // R13
  [1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1], // R14
  [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // R15
]

Upon calling loadScene('gameLevel'); ...

*** Draw loading page over whole screen
// Pre-draw 
for each row in levelMap, 
  for each column in the row, 
    if (tile code === 1 || 2 || 3)
      draw tile code at current tile index
    else if (tile code === 4 || 5): 
      draw tile code 1,
      draw tile code 4 || 5
      
*** Place player and enemies on the map
*** Once everything is done loading in, remove the loading screen and start the game loop/clock/timer


Gameplay Logic: 

Player movement: 
- when using WASD, image faces and moves that direction
- gun sticks to player, but faces mouse cursor
- on click, create bullet object at gun coordinates, traveling in direction gun is pointed; 










*/


const canvasMain = document.getElementById('canvasMain');
const cm = canvasMain.getContext('2d');
const canvasUpscale = document.getElementById('canvasUpscale');
const cu = canvasUpscale.getContext('2d');
const canvasContainer = document.getElementById('container');

const canvasWidth = 960;
const canvasHeight = 640;
const upscaleFactor = 4;
const btnBorderOffset = 2*upscaleFactor;

let firstClick = true;
let gamePaused = false;
let lastButtonAction = '';

class UIElement {
  constructor (name, origin, width, height, toggle, imgSrc0, imgSrc1) {
    // Name of the button for debugging purposes
    this.name = name;

    // Coordinates relative to the main canvas, where click handling is done
    this.mOrigin = [origin[0] * upscaleFactor, origin[1] * upscaleFactor];
    this.mWidth = width * upscaleFactor;
    this.mHeight = height * upscaleFactor;

    // Coordinates relative to the upscale canvas, where draw handling is done
    this.uOrigin = origin;
    this.uWidth = width;
    this.uHeight = height;

    this.img = new Image();
    this.imgSrc0 = imgSrc0;
    this.imgSrc1 = imgSrc1;
    this.img.src = imgSrc0;
    this.toggle = toggle;
  }
}

class Button extends UIElement {
  constructor(name, origin, width, height, toggle, imgSrc0, imgSrc1, clickMethod) {
    super(name, origin, width, height, toggle, imgSrc0, imgSrc1);
    this.clickMethod = clickMethod;
  }

  click() {
    this.clickMethod();
  }

  toggle(setting) {
    // if img toggles on/off, switch to 'on' or 'off', or 'toggle' to whichever option is not currently selected
  }

};



// --------------------------------------------------
//             UI ELEMENT INITIALIZATION
// --------------------------------------------------

/*
NEW UI ELEMENT FORMAT: 
const btnName = new Button([uOriginX, uOriginY], width, height, toggle, imgSrc1, imgSrc2, clickMethod);
       name: string
   uOriginX: integer
   uOriginY: integer
      width: integer
     height: integer
     toggle: boolean
    imgSrc1: string
    imgSrc2: string || null
*/

// da = Display Area
const daDialogueBox = new UIElement('Dialogue Box', [49, 140], 142, 20, false, 'resources/images/ui_240x160/DisplayArea_DialogueBox_142x20.png', null);
const daMoneyXP = new UIElement('Money/XP Display', [189, 140], 51, 20, false, 'resources/images/ui_240x160/DisplayArea_MoneyXP_51x20.png', null);
const daSideLeft = new UIElement('Display Area: Left', [0, 17], 51, 125, false, 'resources/images/ui_240x160/DisplayArea_Side_51x125.png', null);
const daSideRight = new UIElement('Display Area: Right', [189, 17], 51, 125, false, 'resources/images/ui_240x160/DisplayArea_Side_51x125.png', null);

// bg = Background
const bgStart = new UIElement('Background: Start Screen', [0, 0], 240, 160, false, 'resources/images/ui_240x160/MenuBackground_StartScreen_240x160.png', null);
const bgLeft = new UIElement('Background: Left', [0, 0], 51, 160, false, 'resources/images/ui_240x160/MenuBackground_Side_51x160.png', null);
const bgRight = new UIElement('Background: Right', [189, 0], 51, 160, false, 'resources/images/ui_240x160/MenuBackground_Side_51x160.png', null);
const bgBottom = new UIElement('Background: Bottom', [0, 140], 240, 20, false, 'resources/images/ui_240x160/MenuBackground_Bottom_240x20.png', null);

//NEEDS FACTORY FUNCTION TO GENERATE MULTIPLE
//const equipmentDisplayCard = new UIElement('Equipment Display Card', [], 51, 19, false, 'resources/images/ui_240x160/MEDU_Equipment_Display_Card_51x19.png', null);
const statusDisplay = new UIElement('MEDU Status Display', [49, 140], 142, 20, false, 'resources/images/ui_240x160/MEDU_Status_Display_142x20.png', null);

const titleBuildingStats = new UIElement('Building Stats', [189, 17], 51, 29, false, 'resources/images/ui_240x160/Title_BuildingStats_51x29.png', null);
const titleLevelStats = new UIElement('Level Stats', [189, 17], 51, 29, false, 'resources/images/ui_240x160/Title_LevelStats_51x29.png', null);
const titleMEDUStats = new UIElement('MEDU Stats', [189, 17], 51, 29, false, 'resources/images/ui_240x160/Title_MEDUStats_51x29.png', null);
const titleUtilityStats = new UIElement('Utility Stats', [189, 17], 51, 29, false, 'resources/images/ui_240x160/Title_UtilityStats_51x29.png', null);
const titleWeaponStats = new UIElement('Weapon Stats', [189, 17], 51, 29, false, 'resources/images/ui_240x160/Title_WeaponStats_51x29.png', null);



// --------------------------------------------------
//              BUTTON INITIALIZATION
// --------------------------------------------------

/*
NEW BUTTON FORMAT: 
const btnName = new Button([uOriginX, uOriginY], width, height, toggle, imgSrc1, imgSrc2, clickMethod);
       name: string
   uOriginX: integer
   uOriginY: integer
      width: integer
     height: integer
     toggle: boolean
    imgSrc1: string
    imgSrc2: string || null
clickMethod: function
*/
/*
const btnTempSwitchMenus = new Button('Switch Menus', [0, 24], 18, 18, false, 'resources/images/ui_240x160/Button_Back_18x18.png', null, () => {
  if (currentScene === 'gameLevel') {
    loadScene('depot');
  } else if (currentScene === 'depot') {
    loadScene('gameLevel');
  }
  btnActionPlaceholder('switch menus');
});
*/

const btnTempStartLevel = new Button('Start Levels', [111, 71], 18, 18, false, 'resources/images/ui_240x160/Button_BuildOptions_18x18.png', null, () => {
  loadScene('gameLevel');
  btnActionPlaceholder('build options');
});

const btnBack = new Button('Back', [0, 0], 18, 18, false, 'resources/images/ui_240x160/Button_Back_18x18.png', null, () => {
  loadScene('start');
  btnActionPlaceholder('back');
});
const btnBack2 = new Button('Back', [111, 66], 18, 18, false, 'resources/images/ui_240x160/Button_Back_18x18.png', null, () => {
  gamePaused = false;
  loadScene('depot');
  btnActionPlaceholder('back2');
});
const btnBuildOptions = new Button('Build Options', [33, 0], 18, 18, false, 'resources/images/ui_240x160/Button_BuildOptions_18x18.png', null, () => {btnActionPlaceholder('build options');});
//NEEDS FACTORY FUNCTION TO GENERATE MULTIPLE
//const btnBuildingLoadoutListItem = new Button('Bldg LO List Item', [], w, h, t, 'resources/images/ui_240x160/', is2, () => {btnActionPlaceholder('x');}); // toggle
const btnBuildingLoadouts = new Button('Bldg LO List', [25, 17], 26, 13, true, 'resources/images/ui_240x160/Button_BuildingLoadouts_Inactive_26x13.png', 'resources/images/ui_240x160/Button_BuildingLoadouts_Active_26x13.ping', () => {btnActionPlaceholder('building loadouts');}); // toggle
const btnDepot = new Button('Depot', [82, 0], 47, 19, true, 'resources/images/ui_240x160/Button_Depot_Inactive_47x19.png', 'resources/images/ui_240x160/Button_Depot_Active_47x19.png', () => {
  loadScene('depot');
  btnActionPlaceholder('depot');
}); // toggle
const btnDontSaveStopEditing = new Button('Don\'t Save + Stop Editing', [50, 132], 87, 9, false, 'resources/images/ui_240x160/Button_DontSaveStopEditing_87x9.png', null, () => {
  loadScene('depot');
  btnActionPlaceholder('don\'t save + stop editing');
});
const btnEconomyDetails = new Button('Economy Details', [12, 0], 23, 18, false, 'resources/images/ui_240x160/Button_EconomyDetails_23x18.png', null, () => {btnActionPlaceholder('econ details');});
const btnEditLoadout = new Button('Edit Loadout', [50, 120], 59, 11, false, 'resources/images/ui_240x160/Button_EditLoadout_59x11.png', null, () => {
  loadScene('depotEditor');
  btnActionPlaceholder('edit loadout');
});
const btnFreePlay = new Button('Free Play', [0, 88], 51, 72, true, 'resources/images/ui_240x160/Button_FreePlay_Inactive_51x72.png', 'resources/images/ui_240x160/Button_FreePlay_Active_51x72.png', () => {btnActionPlaceholder('free play');}); // toggle
const btnInfoCredits = new Button('Info/Credits', [92, 101], 56, 11, false, 'resources/images/ui_240x160/Button_InfoCredits_56x11.png', null, () => {btnActionPlaceholder('info/credits');});
const btnLevels = new Button('Levels', [32, 0], 52, 19, true, 'resources/images/ui_240x160/Button_Levels_Inactive_52x19.png', 'resources/images/ui_240x160/Button_Levels_Active_52x19.png', () => {
  loadScene('levelSelect');
  btnActionPlaceholder('levels');
}); // toggle
//NEEDS FACTORY FUNCTION TO GENERATE MULTIPLE
//const btnMEDULoadoutListItem = new Button('MEDU LO List Item', [], w, h, t, 'resources/images/ui_240x160/', is2, () => {btnActionPlaceholder('x');}); // toggle
const btnMEDULoadouts = new Button('MEDU LO List', [0, 17], 27, 13, true, 'resources/images/ui_240x160/Button_MEDULoadouts_Inactive_27x13.png', 'resources/images/ui_240x160/Button_MEDULoadouts_Active_27x13.png', () => {btnActionPlaceholder('MEDU loadouts');}); // toggle
const btnMissionDetails = new Button('Mission Details', [0, 140], 51, 20, true, 'resources/images/ui_240x160/Button_MissionDetails_Show_51x20.png', 'resources/images/ui_240x160/Button_MissionDetails_Hide_51x20.png', () => {btnActionPlaceholder('mission details');}); // toggle
const btnNewLoadout = new Button('New Loadout', [50, 130], 59, 11, false, 'resources/images/ui_240x160/Button_NewLoadout_59x11.png', null, () => {
  loadScene('depotEditor');
  btnActionPlaceholder('new loadout');
});
const btnOptions = new Button('Options', [16, 0], 18, 18, false, 'resources/images/ui_240x160/Button_Options_18x18.png', null, () => {btnActionPlaceholder('options');});
const btnPause = new Button('Pause', [0, 0], 14, 18, false, 'resources/images/ui_240x160/Button_Pause_14x18.png', null, () => {
  // Temporary functionality:
  gamePaused = true;
  //cm.fillStyle = 'green';
  //cm.fillRect(canvasWidth*0.5 - 30, canvasHeight*0.5 - 120, 120, 150);
  cu.fillStyle = 'green';
  cu.fillRect(canvasWidth/upscaleFactor*0.5 - 30, canvasHeight/upscaleFactor*0.5 - 45, 60, 80);
  cu.drawImage(btnBack2.img, btnBack2.uOrigin[0], btnBack2.uOrigin[1], btnBack2.uWidth, btnBack2.uHeight);
  cm.fillStyle = 'black';
  cm.font = '24px Helvetica';
  cm.fillText('Game Paused', 400, 250);
  cm.fillText('Back to depot?', 395, 360);
  currentButtons.push(btnBack2);
  btnActionPlaceholder('pause');
});
const btnSaveKeepEditing = new Button('Save + Keep Editing', [50, 116], 87, 9, false, 'resources/images/ui_240x160/Button_SaveKeepEditing_87x9.png', null, () => {btnActionPlaceholder('save + keep editing');});
const btnSaveStopEditing = new Button('Save + Stop Editing', [50, 124], 87, 9, false, 'resources/images/ui_240x160/Button_SaveStopEditing_87x9.png', null, () => {
  loadScene('depot');
  btnActionPlaceholder('save + stop editing');
});
const btnStartGame = new Button('Start Game', [92, 75], 56, 11, false, 'resources/images/ui_240x160/Button_StartGame_56x11.png', null, () => {
  loadScene('depot');
  btnActionPlaceholder('start game');
});
const btnStatsLoadoutEditor = new Button('Stats (in Loadout Editor)', [189, 122], 51, 11, true, 'resources/images/ui_240x160/Button_StatsLoadoutEditor_Inactive_51x11.png', 'resources/images/ui_240x160/Button_StatsLoadoutEditor_Active_51x11.png', () => {btnActionPlaceholder('stats (in loadout editor)');}); // toggle
const btnStory = new Button('Story', [0, 17], 51, 72, true, 'resources/images/ui_240x160/Button_Story_Inactive_51x72.png', 'resources/images/ui_240x160/Button_Story_Active_51x72.png', () => {btnActionPlaceholder('story');}); // toggle
const btnTechTree = new Button('Tech Tree + Store', [127, 0], 113, 19, true, 'resources/images/ui_240x160/Button_TechTree_Inactive_113x19.png', 'resources/images/ui_240x160/Button_TechTree_Active_113x19.png', () => {
  loadScene('techTree');
  btnActionPlaceholder('tech tree');
}); // toggle
const btnCategoryBuildings = new Button('TT Cat. Buildings', [0, 122], 51, 38, true, 'resources/images/ui_240x160/Button_TechTreeCategoryBuildings_Inactive_51x38.png', 'resources/images/ui_240x160/Button_TechTreeCategoryBuildings_Active_51x38.png', () => {btnActionPlaceholder('tt cat. buildings');}); // toggle
const btnCategoryMEDUs = new Button('TT Cat. MEDUs', [0, 17], 51, 37, true, 'resources/images/ui_240x160/Button_TechTreeCategoryMEDUs_Inactive_51x37.png', 'resources/images/ui_240x160/Button_TechTreeCategoryMEDUs_Active_51x37.png', () => {btnActionPlaceholder('tt cat. MEDUs');}); // toggle
const btnCategoryUtilities = new Button('TT Cat. Utilities', [0, 87], 51, 37, true, 'resources/images/ui_240x160/Button_TechTreeCategoryUtilities_Inactive_51x37.png', 'resources/images/ui_240x160/Button_TechTreeCategoryUtilities_Active_51x37.png', () => {btnActionPlaceholder('tt cat. utilities');}); // toggle
const btnCategoryWeapons = new Button('TT Cat. Weapons', [0, 52], 51, 37, true, 'resources/images/ui_240x160/Button_TechTreeCategoryWeapons_Inactive_51x37.png', 'resources/images/ui_240x160/Button_TechTreeCategoryWeapons_Active_51x37.png', () => {btnActionPlaceholder('tt cat. weapons');}); // toggle
const btnTutorials = new Button('Tutorials', [92, 88], 56, 11, false, 'resources/images/ui_240x160/Button_Tutorials_56x11.png', null, () => {btnActionPlaceholder('tutorials');});
const btnVisualLoadoutEditor = new Button('Visual (in Loadout Editor)', [189, 131], 51, 11, true, 'resources/images/ui_240x160/Button_VisualLoadoutEditor_Inactive_51x11.png', 'resources/images/ui_240x160/Button_VisualLoadoutEditor_Active_51x11.png', () => {btnActionPlaceholder('visual (in loadout editor)');}); // toggle




// --------------------------------------------------
//              UI SECTION INITIALIZATION
// --------------------------------------------------
// These arrays define different sections of the UI, made of up individual elements that are frequently used together

let UISecStartBackground = [bgStart];
let UISecStartMain = [btnStartGame, btnTutorials, btnInfoCredits];
let UISecMenuBackground = [bgLeft, bgRight];
let UISecTopMain = [btnBack, btnOptions, btnLevels, btnDepot, btnTechTree];
let UISecTopGameLevel = [btnPause, btnEconomyDetails, btnBuildOptions];
let UISecLeftLevelModeSelect = [btnStory, btnFreePlay];
let UISecLeftDepot = [btnMEDULoadouts, btnBuildingLoadouts];
let UISecLeftTechTreeCategories = [btnCategoryMEDUs, btnCategoryWeapons, btnCategoryUtilities, btnCategoryBuildings];
let UISecLeftGameLevel = [btnMissionDetails];
let UISecRightMain = [titleMEDUStats, daMoneyXP]; // displays 1 of 5 title cards, decided elsewhere
let UISecRightDepotEditor = [btnStatsLoadoutEditor, btnVisualLoadoutEditor];
let UISecBottomDialogueBox = [daDialogueBox];
let UISecBottomGameLevel = [bgBottom, statusDisplay];
let UISecMidDepotMain = [btnEditLoadout, btnNewLoadout];
let UISecMidDepotEditor = [btnSaveKeepEditing, btnSaveStopEditing, btnDontSaveStopEditing];
let UISecMidLevelSelect = [btnTempStartLevel];

// UICS: User Interface Current Sections, shorthand since it is used a lot to manipulate the UI
let UICS = [];
let currentButtons = [];
let currentScene = 'start';


// --------------------------------------------------
//              UI MANAGEMENT FUNCTIONS
// --------------------------------------------------

function loadScene(page) {
  // STEP 1: Clear the canvas and the currentButtons array
  cm.clearRect(0, 0, canvasWidth, canvasHeight);
  cu.clearRect(0, 0, canvasWidth, canvasHeight);
  currentButtons = [];

  // STEP 2: Decide which UI sections to draw, based on the current menu or level scene
  if (page === 'start') { // load start menu UI/buttons
    currentScene = 'start';
    UICS = [UISecStartBackground, UISecStartMain];
  } else if (page === 'depot') { // load depot UI/buttons
    currentScene = 'depot';
    UICS = [UISecMenuBackground, UISecTopMain, UISecLeftDepot, UISecRightMain, UISecBottomDialogueBox, UISecMidDepotMain];
  } else if (page === 'depotEditor') { // load depot editor mode UI/buttons
    // Add editor buttons to the UICurrentElementsRight sectional array to be displayed
    currentScene = 'depotEditor';
    UICS = [UISecMenuBackground, UISecTopMain, UISecLeftTechTreeCategories, UISecRightMain, UISecRightDepotEditor, UISecBottomDialogueBox, UISecMidDepotEditor];
  } else if (page === 'levelSelect') { // load level select UI/buttons
    currentScene = 'levelSelect';
    UICS = [UISecMenuBackground, UISecTopMain, UISecLeftLevelModeSelect, UISecRightMain, UISecBottomDialogueBox, UISecMidLevelSelect];
  } else if (page === 'techTree') { // load tech tree UI/buttons
    currentScene = 'techTree';
    UICS = [UISecMenuBackground, UISecTopMain, UISecLeftTechTreeCategories, UISecRightMain, UISecBottomDialogueBox];
  } else if (page === 'gameLevel') { // load level UI/buttons
    currentScene = 'gameLevel';
    UICS = [UISecMenuBackground, UISecTopGameLevel, UISecLeftGameLevel, UISecBottomGameLevel];

    /*
    currentScene = 'gameLevel';
    cm.font = '24px Helvetica';
    cm.fillStyle = 'black';

    currentButtons.push(btnPause);
    currentButtons.push(btnEconomyDetails);
    currentButtons.push(btnBuildOptions);
    currentButtons.push(btnTempSwitchMenus);

    cu.drawImage(btnPause.img, btnPause.uOrigin[0], btnPause.uOrigin[1], btnPause.uWidth, btnPause.uHeight);
    cu.drawImage(btnEconomyDetails.img, btnEconomyDetails.uOrigin[0], btnEconomyDetails.uOrigin[1], btnEconomyDetails.uWidth, btnEconomyDetails.uHeight);
    cu.drawImage(btnBuildOptions.img, btnBuildOptions.uOrigin[0], btnBuildOptions.uOrigin[1], btnBuildOptions.uWidth, btnBuildOptions.uHeight);
    cu.drawImage(btnTempSwitchMenus.img, btnTempSwitchMenus.uOrigin[0], btnTempSwitchMenus.uOrigin[1], btnTempSwitchMenus.uWidth, btnTempSwitchMenus.uHeight);
    */

  } else if (page === 'test') { // load test page
    currentScene = 'test';
    UICS = [];
  } else { // give error message indicating invalid loadScene input
    console.log('error in loadScene(): invalid input');
  }

  // STEP 3: Decide which image to display for buttons that can toggle on and off

  // STEP 4: Draw each element of each UI section chosen above
  for (let i = 0; i < UICS.length; i++) { // For each UI section to be displayed
    for (let j = 0; j < UICS[i].length; j++) { // For each element in the section to be displayed
      cu.drawImage(UICS[i][j].img, UICS[i][j].uOrigin[0], UICS[i][j].uOrigin[1], UICS[i][j].uWidth, UICS[i][j].uHeight); // Draw the UI element
      //console.log(UICS[i][j].name);

      if (UICS[i][j].clickMethod !== undefined) { // If it's a button, add it to currentButtons
        currentButtons.push(UICS[i][j]);
      }
    }
  }

};

function loadAuxMenu() {
  // Take in either 'pause' or 'options' and open that menu as an overlay on top of whatever is behind it
};

function switchLoadoutList(submenu) {
  // Take in either 'MEDU' or 'building' and switch the list to display either the list of MEDU loadouts or building loadouts
};

function switchEditorViewMode(editorViewMode) {
  // Take in either 'stats' or 'visual' and switch the display to the appropriate kind
};

function drawLoadoutList(submenu) {
  // Take in either 'MEDU' or 'building' and draw the appropriate list of the player's loadouts based on saved data
};

// --------------------------------------------------
//                 EVENT HANDLERS
// --------------------------------------------------

function clickOnCanvas(event) {
  if (!firstClick) {
    let mouseX = event.clientX - canvasMain.offsetLeft - canvasContainer.offsetLeft + document.scrollingElement.scrollLeft;
    let mouseY = event.clientY - canvasMain.offsetTop - canvasContainer.offsetTop + document.scrollingElement.scrollTop;
    //console.log(`Click at canvas: ${mouseX}, ${mouseY}`);

    cm.clearRect(0, 0, canvasWidth, canvasHeight);

    //if (!gamePaused) {
      let buttonClickedIndex = detectButtonClicked(mouseX, mouseY);
      if (buttonClickedIndex !== null) {
        let buttonClicked = currentButtons[buttonClickedIndex];
        buttonClicked.click();
      }
    //}

    // TEMPORARY FOR TESTING: Display click location and current scene on screen
    cm.fillStyle = 'red';
    cm.fillRect(mouseX - 5, mouseY - 5, 10, 10);
    cm.strokeStyle = 'black';
    cm.lineWidth = 3;
    cm.strokeRect(mouseX - 5, mouseY - 5, 10, 10);
  } else {
    loadScene(currentScene)
    firstClick = false;
  } 

  if (currentScene !== 'gameLevel') {
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
    cm.fillText(currentScene, 530, 618);

  } else {
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
    cm.fillText(currentScene, 32, canvasHeight*0.5 - 90)
  }
};

function detectButtonClicked(clickX, clickY) {
  let foundButton = false;
  for (let i = 0; i < currentButtons.length; i++) {
    let withinX = false;
    let withinY = false;
    if (clickX >= currentButtons[i].mOrigin[0] + btnBorderOffset && clickX <= currentButtons[i].mOrigin[0] + currentButtons[i].mWidth - btnBorderOffset) {
      withinX = true;
    }
    if (clickY >= currentButtons[i].mOrigin[1] + btnBorderOffset && clickY <= currentButtons[i].mOrigin[1] + currentButtons[i].mHeight - btnBorderOffset) {
      withinY = true;
    }
    if (withinX && withinY) {
      //console.log(`button at index ${i}: ${currentButtons[i].name}`);
      return i;
    }
  }

  if (!foundButton) {
    return null;
  }
};

function btnActionPlaceholder(action) {
  lastButtonAction = action;

  /*
  if (currentScene !== 'gameLevel') {
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
  if (currentScene !== 'gameLevel') {
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
//                 EVENT LISTENERS
// --------------------------------------------------

canvasMain.addEventListener('click', clickOnCanvas, false);



// --------------------------------------------------
//               INITIAL CANVAS SETUP
// --------------------------------------------------

cm.fillStyle = 'black';
cm.font = '36px Helvetica';
cm.fillText('Click to start!', canvasWidth*0.4, canvasHeight*0.5);







// --------------------------------------------------
//                    OTHER STUFF
// --------------------------------------------------
 
