/*
USER INTERFACE DATA

This file contains all information and data for all user interface elements in the game.

TO DO: 
- Set up module export/import connection with main script
- Move UI elements here out of main script

- When bringing all buttons here, shorten names to remove 'btn' prefix and make them all properties of a 'buttons' object

*/

//import { cd, gs, loadScene, btnActionLo } from '../main_v0.0.1_inprog.js';
//import { testFunct } from '../main_v0.0.1_inprog.js';
const upscaleFactor = 2;


class UIElement {
  constructor (name, origin, width, height, border, toggle, imgSrc0, imgSrc1) {
    // Name of the button for debugging purposes
    this.name = name;

    // Coordinates relative to the main canvas, where click handling is done
    this.mOrigin = [origin[0] * upscaleFactor, origin[1] * upscaleFactor];
    this.mWidth = width * upscaleFactor;
    this.mHeight = height * upscaleFactor;
    this.mBorder = border * upscaleFactor;

    // Coordinates relative to the upscale canvas, where draw handling is done
    this.uOrigin = origin;
    this.uWidth = width;
    this.uHeight = height;
    this.uBorder = border;

    this.img = new Image();
    this.imgSrc0 = imgSrc0;
    this.imgSrc1 = imgSrc1;
    this.img.src = imgSrc0;
    this.toggle = toggle;
  }
}

class Button extends UIElement {
  constructor(name, origin, width, height, border, toggle, imgSrc0, imgSrc1, clickMethod) {
    super(name, origin, width, height, border, toggle, imgSrc0, imgSrc1);
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
const elementName = new UIElement(name, origin, width, height, toggle, imgSrc0, imgSrc1);
       name: string
     origin: array of 2 integers [uOriginX, uOriginY]
      width: integer
     height: integer
     toggle: boolean
    imgSrc1: string
    imgSrc2: string || null
*/

// da = Display Area
const daDialogueBox = new UIElement('Dialogue Box', [49, 140], 142, 20, 1, false, 'resources/images/ui_240x160/DisplayArea_DialogueBox_142x20.png', null);
const daMoneyXP = new UIElement('Money/XP Display', [189, 140], 51, 20, 1, false, 'resources/images/ui_240x160/DisplayArea_MoneyXP_51x20.png', null);
const daSideLeft = new UIElement('Display Area: Left', [0, 17], 51, 125, 1, false, 'resources/images/ui_240x160/DisplayArea_Side_51x125.png', null);
const daSideRight = new UIElement('Display Area: Right', [189, 17], 51, 125, 1, false, 'resources/images/ui_240x160/DisplayArea_Side_51x125.png', null);

// bg = Background
const bgStart = new UIElement('Background: Start Screen', [0, 0], 240, 160, 1, false, 'resources/images/ui_240x160/MenuBackground_StartScreen_240x160.png', null);
const bgLeft = new UIElement('Background: Left', [0, 0], 51, 160, 1, false, 'resources/images/ui_240x160/MenuBackground_Side_51x160.png', null);
const bgRight = new UIElement('Background: Right', [189, 0], 51, 160, 1, false, 'resources/images/ui_240x160/MenuBackground_Side_51x160.png', null);
const bgBottom = new UIElement('Background: Bottom', [0, 140], 240, 20, 1, false, 'resources/images/ui_240x160/MenuBackground_Bottom_240x20.png', null);

const equipmentDisplayCard1 = new UIElement('Equipment Display Card', [189, 0], 51, 19, 1, false, 'resources/images/ui_240x160/MEDU_Equipment_Display_Card_51x19.png', null);
const statusDisplay = new UIElement('MEDU Status Display', [49, 140], 142, 20, 1, false, 'resources/images/ui_240x160/MEDU_Status_Display_142x20.png', null);

const titleBuildingStats = new UIElement('Building Stats', [189, 17], 51, 29, 1, false, 'resources/images/ui_240x160/Title_BuildingStats_51x29.png', null);
const titleLevelStats = new UIElement('Level Stats', [189, 17], 51, 29, 1, false, 'resources/images/ui_240x160/Title_LevelStats_51x29.png', null);
const titleMEDUStats = new UIElement('MEDU Stats', [189, 17], 51, 29, 1, false, 'resources/images/ui_240x160/Title_MEDUStats_51x29.png', null);
const titleUtilityStats = new UIElement('Utility Stats', [189, 17], 51, 29, 1, false, 'resources/images/ui_240x160/Title_UtilityStats_51x29.png', null);
const titleWeaponStats = new UIElement('Weapon Stats', [189, 17], 51, 29, 1, false, 'resources/images/ui_240x160/Title_WeaponStats_51x29.png', null);



// --------------------------------------------------
//              BUTTON INITIALIZATION
// --------------------------------------------------

/*
NEW BUTTON FORMAT: 
const btnName = new Button(name, origin, width, height, toggle, imgSrc0, imgSrc1, clickMethod);
       name: string
     origin: array of 2 integers [uOriginX, uOriginY]
      width: integer
     height: integer
     toggle: boolean
    imgSrc1: string
    imgSrc2: string || null
clickMethod: function
*/

const btnStartLevelTemp = new Button('Start Levels', [111, 71], 18, 18, 2, false, 'resources/images/ui_240x160/Button_BuildOptions_18x18.png', null, () => {
  loadScene('gameLevel');
  btnActionLog('startLevel (temp)');
  startLevel();
});

const btnBack = new Button('Back', [0, 0], 18, 18, 2, false, 'resources/images/ui_240x160/Button_Back_18x18.png', null, () => {
  loadScene('start');
  btnActionLog('back');
});
const btnBack2 = new Button('Back', [111, 66], 18, 18, 2, false, 'resources/images/ui_240x160/Button_Back_18x18.png', null, () => {
  gs.lm.gamePaused = false;
  loadScene('depot');
  btnActionLog('back2');
});
const btnBuildOptions = new Button('Build Options', [33, 0], 18, 18, 2, false, 'resources/images/ui_240x160/Button_BuildOptions_18x18.png', null, () => {btnActionLog('build options');});
//NEEDS FACTORY FUNCTION TO GENERATE MULTIPLE
//const btnBuildingLoadoutListItem = new Button('Bldg LO List Item', [], w, h, t, 'resources/images/ui_240x160/', is2, () => {btnActionLo('x');}); // toggle
const btnBuildingLoadouts = new Button('Bldg LO List', [25, 17], 26, 13, 2, true, 'resources/images/ui_240x160/Button_BuildingLoadouts_Inactive_26x13.png', 'resources/images/ui_240x160/Button_BuildingLoadouts_Active_26x13.ping', () => {btnActionLog('building loadouts');}); // toggle
const btnCategoryBuildings = new Button('TT Cat. Buildings', [0, 122], 51, 38, 2, true, 'resources/images/ui_240x160/Button_TechTreeCategoryBuildings_Inactive_51x38.png', 'resources/images/ui_240x160/Button_TechTreeCategoryBuildings_Active_51x38.png', () => {btnActionLog('tt cat. buildings');}); // toggle
const btnCategoryMEDUs = new Button('TT Cat. MEDUs', [0, 17], 51, 37, 2, true, 'resources/images/ui_240x160/Button_TechTreeCategoryMEDUs_Inactive_51x37.png', 'resources/images/ui_240x160/Button_TechTreeCategoryMEDUs_Active_51x37.png', () => {btnActionLog('tt cat. MEDUs');}); // toggle
const btnCategoryUtilities = new Button('TT Cat. Utilities', [0, 87], 51, 37, 2, true, 'resources/images/ui_240x160/Button_TechTreeCategoryUtilities_Inactive_51x37.png', 'resources/images/ui_240x160/Button_TechTreeCategoryUtilities_Active_51x37.png', () => {btnActionLog('tt cat. utilities');}); // toggle
const btnCategoryWeapons = new Button('TT Cat. Weapons', [0, 52], 51, 37, 2, true, 'resources/images/ui_240x160/Button_TechTreeCategoryWeapons_Inactive_51x37.png', 'resources/images/ui_240x160/Button_TechTreeCategoryWeapons_Active_51x37.png', () => {btnActionLog('tt cat. weapons');}); // toggle
const btnDepot = new Button('Depot', [82, 0], 47, 19, 2, true, 'resources/images/ui_240x160/Button_Depot_Inactive_47x19.png', 'resources/images/ui_240x160/Button_Depot_Active_47x19.png', () => {
  loadScene('depot');
  btnActionLog('depot');
}); // toggle
const btnDontSaveStopEditing = new Button('Don\'t Save + Stop Editing', [50, 132], 87, 9, 1, false, 'resources/images/ui_240x160/Button_DontSaveStopEditing_87x9.png', null, () => {
  loadScene('depot');
  btnActionLog('don\'t save + stop editing');
});
const btnEconomyDetails = new Button('Economy Details', [12, 0], 23, 18, 2, false, 'resources/images/ui_240x160/Button_EconomyDetails_23x18.png', null, () => {btnActionLog('econ details');});
const btnEditLoadout = new Button('Edit Loadout', [50, 120], 59, 11, 1, false, 'resources/images/ui_240x160/Button_EditLoadout_59x11.png', null, () => {
  loadScene('depotEditor');
  btnActionLog('edit loadout');
});
const btnFreePlay = new Button('Free Play', [0, 88], 51, 72, 2, true, 'resources/images/ui_240x160/Button_FreePlay_Inactive_51x72.png', 'resources/images/ui_240x160/Button_FreePlay_Active_51x72.png', () => {btnActionLog('free play');}); // toggle
const btnInfoCredits = new Button('Info/Credits', [92, 101], 56, 11, 2, false, 'resources/images/ui_240x160/Button_InfoCredits_56x11.png', null, () => {btnActionLog('info/credits');});
const btnLevels = new Button('Levels', [32, 0], 52, 19, 2, true, 'resources/images/ui_240x160/Button_Levels_Inactive_52x19.png', 'resources/images/ui_240x160/Button_Levels_Active_52x19.png', () => {
  loadScene('levelSelect');
  btnActionLog('levels');
}); // toggle
//NEEDS FACTORY FUNCTION TO GENERATE MULTIPLE
//const btnMEDULoadoutListItem = new Button('MEDU LO List Item', [], w, h, t, 'resources/images/ui_240x160/', is2, () => {btnActionLo('x');}); // toggle
const btnMEDULoadouts = new Button('MEDU LO List', [0, 17], 27, 13, 2, true, 'resources/images/ui_240x160/Button_MEDULoadouts_Inactive_27x13.png', 'resources/images/ui_240x160/Button_MEDULoadouts_Active_27x13.png', () => {btnActionLog('MEDU loadouts');}); // toggle
const btnMissionDetails = new Button('Mission Details', [0, 140], 51, 20, 2, true, 'resources/images/ui_240x160/Button_MissionDetails_Show_51x20.png', 'resources/images/ui_240x160/Button_MissionDetails_Hide_51x20.png', () => {btnActionLog('mission details');}); // toggle
const btnNewLoadout = new Button('New Loadout', [50, 130], 59, 11, 1, false, 'resources/images/ui_240x160/Button_NewLoadout_59x11.png', null, () => {
  loadScene('depotEditor');
  btnActionLog('new loadout');
});
const btnOptions = new Button('Options', [16, 0], 18, 18, 2, false, 'resources/images/ui_240x160/Button_Options_18x18.png', null, () => {btnActionLog('options');});
const btnPause = new Button('Pause', [0, 0], 14, 18, 2, false, 'resources/images/ui_240x160/Button_Pause_14x18.png', null, () => {
  gs.lm.gamePaused = true;
  currentButtons.push(btnBack2);
  btnActionLog('pause');
});
const btnSaveKeepEditing = new Button('Save + Keep Editing', [50, 116], 87, 9, 1, false, 'resources/images/ui_240x160/Button_SaveKeepEditing_87x9.png', null, () => {btnActionLog('save + keep editing');});
const btnSaveStopEditing = new Button('Save + Stop Editing', [50, 124], 87, 9, 1, false, 'resources/images/ui_240x160/Button_SaveStopEditing_87x9.png', null, () => {
  loadScene('depot');
  btnActionLog('save + stop editing');
});
const btnStartGame = new Button('Start Game', [92, 75], 56, 11, 1, false, 'resources/images/ui_240x160/Button_StartGame_56x11.png', null, () => {
  //loadScene('depot');
  //btnActionLog('start game');

  // TEMPORARY SHORTCUT FOR DEVELOPING LEVEL GAMEPLAY
  //console.log('SGB clicked');
  loadScene('gameLevel');
  //console.log('SGB: loadScene(gameLevel) finished');
  btnActionLog('startLevel (temp)');
  //console.log('SGB: btnActionLog() finished');
  startLevel();
  //console.log('SGB: startLevel() finished');
});
const btnStatsLoadoutEditor = new Button('Stats (in Loadout Editor)', [189, 122], 51, 11, 2, true, 'resources/images/ui_240x160/Button_StatsLoadoutEditor_Inactive_51x11.png', 'resources/images/ui_240x160/Button_StatsLoadoutEditor_Active_51x11.png', () => {btnActionLog('stats (in loadout editor)');}); // toggle
const btnStory = new Button('Story', [0, 17], 51, 72, 2, true, 'resources/images/ui_240x160/Button_Story_Inactive_51x72.png', 'resources/images/ui_240x160/Button_Story_Active_51x72.png', () => {btnActionLog('story');}); // toggle
const btnTechTree = new Button('Tech Tree + Store', [127, 0], 113, 19, 2, true, 'resources/images/ui_240x160/Button_TechTree_Inactive_113x19.png', 'resources/images/ui_240x160/Button_TechTree_Active_113x19.png', () => {
  loadScene('techTree');
  btnActionLog('tech tree');
}); // toggle
const btnTutorials = new Button('Tutorials', [92, 88], 56, 11, 2, false, 'resources/images/ui_240x160/Button_Tutorials_56x11.png', null, () => {btnActionLog('tutorials');});
const btnVisualLoadoutEditor = new Button('Visual (in Loadout Editor)', [189, 131], 51, 11, 2, true, 'resources/images/ui_240x160/Button_VisualLoadoutEditor_Inactive_51x11.png', 'resources/images/ui_240x160/Button_VisualLoadoutEditor_Active_51x11.png', () => {btnActionLog('visual (in loadout editor)');}); // toggle


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
let UISecRightGameLevel = [equipmentDisplayCard1];
let UISecBottomDialogueBox = [daDialogueBox];
let UISecBottomGameLevel = [bgBottom, statusDisplay];
let UISecMidDepotMain = [btnEditLoadout, btnNewLoadout];
let UISecMidDepotEditor = [btnSaveKeepEditing, btnSaveStopEditing, btnDontSaveStopEditing];
let UISecMidLevelSelect = [btnStartLevelTemp];


let crosshairImg = new Image();
crosshairImg.src = 'resources/images/ui_240x160/Crosshair_1_16x16.png';

let cursorImg = new Image();
cursorImg.src = 'resources/images/ui_240x160/Cursor_1_16x16.png';


const uiData = {
  elements: {
    daDialogueBox: daDialogueBox, // da = display area
    daMoneyXP: daMoneyXP, 
    daSideLeft: daSideLeft,
    daSideRight: daSideRight,
    bgStart: bgStart, // bd = background
    bgLeft: bgLeft,
    bgRight: bgRight,
    bgBottom: bgBottom,
    statusDisplay: statusDisplay,
    titleBuildingStats: titleBuildingStats,
    titleLevelStats: titleLevelStats,
    titleMEDUStats: titleMEDUStats,
    titleUtilityStats: titleUtilityStats,
    titleWeaponStats: titleWeaponStats, 
    // testElementDefinitionAtProperty: new UIElement('Testing definition on property', [100, 60], 51, 20, false, 'resources/images/ui_240x160/DisplayArea_MoneyXP_51x20.png', null);
  },
  buttons: {
    startLevelTemp: btnStartLevelTemp,
    back: btnBack,
    back2: btnBack2,
    buildOptions: btnBuildOptions,
    buildingLoadouts: btnBuildingLoadouts,
    categoryBuildings: btnCategoryBuildings,
    categoryMEDUs: btnCategoryMEDUs,
    categoryUtilities: btnCategoryUtilities,
    categoryWeapons: btnCategoryWeapons,
    depot: btnDepot,
    dontSaveStopEditing: btnDontSaveStopEditing,
    economyDetails: btnEconomyDetails,
    editLoadout: btnEditLoadout,
    freePlay: btnFreePlay,
    infoCredits: btnInfoCredits,
    levels: btnLevels,
    MEDULoadouts: btnMEDULoadouts,
    missionDetails: btnMissionDetails,
    newLoadout: btnNewLoadout,
    options: btnOptions,
    pause: btnPause,
    saveKeepEditing: btnSaveKeepEditing,
    saveStopEditing: btnSaveStopEditing,
    startGame: btnStartGame,
    statsLoadoutEditor: btnStatsLoadoutEditor,
    story: btnStory,
    techTree: btnTechTree,
    tutorials: btnTutorials,
    visualLoadoutEditor: btnVisualLoadoutEditor,
  },
  sections: {
    startBackground: UISecStartBackground,
    startMain: UISecStartMain, 
    menuBackground: UISecMenuBackground, 
    topMain: UISecTopMain, 
    topGameLevel: UISecTopGameLevel, 
    leftLevelModeSelect: UISecLeftLevelModeSelect, 
    leftDepot: UISecLeftDepot, 
    leftTechTreeCategories: UISecLeftTechTreeCategories, 
    leftGameLevel: UISecLeftGameLevel, 
    rightMain: UISecRightMain, 
    rightDepotEditor: UISecRightDepotEditor, 
    rightGameLevel: UISecRightGameLevel,
    bottomDialogueBox: UISecBottomDialogueBox, 
    bottomGameLevel: UISecBottomGameLevel, 
    midDepotMain: UISecMidDepotMain, 
    midDepotEditor: UISecMidDepotEditor, 
    midLevelSelect: UISecMidLevelSelect,
  },
};
//export { uiData };