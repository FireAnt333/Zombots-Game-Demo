// Put all buttons and other UI elements in this JS file, to be accessed by the main file via exporting. 

/* Old button class
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

}; */

class Button {
  constructor(name, origin, width, height, toggle, imgSrc1, imgSrc2, clickMethod) {
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
    this.imgSrc1 = imgSrc1;
    this.imgSrc2 = imgSrc2;
    this.img.src = imgSrc1;
    this.toggle = toggle;

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