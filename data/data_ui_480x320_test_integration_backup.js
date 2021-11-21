/*
USER INTERFACE DATA

This file contains all information and data for all user interface elements in the game.

TO DO: 
- 

*/


const upscaleFactor = 2;


class UIElement {
  constructor (name, origin, width, height, border, toggle, show, imgSrc0, imgSrc1) {
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
    this.active = false;
    this.show = show; // true or false
  }

  toggleImage(setting) {
    // There are 4 "if" checks so that toggleImage() can be called to switch a button specifically to active or inactive, or just toggle to whichever setting it's not currently on by leaving out the "setting" argument
    if (setting === 1) {
      this.active = true;
      this.img.src = this.imgSrc1;
    } else if (setting === 0) {
      this.active = false;
      this.img.src = this.imgSrc0;
    } else if (this.active) {
      this.active = false;
      this.img.src = this.imgSrc0;
    } else if (!this.active) {
      this.active = true;
      this.img.src = this.imgSrc1;
    }
    console.log(`toggleImage() on ${this.name} changed this.active to: ${this.active}`);
  }
}

class Button extends UIElement {
  constructor(name, origin, width, height, border, toggle, show, imgSrc0, imgSrc1, clickMethod) {
    super(name, origin, width, height, border, toggle, show, imgSrc0, imgSrc1);
    this.clickMethod = clickMethod;
  }

  click() {
    this.clickMethod();
  }
};

// Take current UI section variables and make them into objects of the UISection class below, and simply give input of the existing UIElements and Buttons in the "elements" argument

// string, array, integer, integer, boolean, integer, integer, array
// 'UI Section A', [0, 0], 100, 100, true, 1, 10, [heading1, button1, button 2]
// name, origin, width, height, scrolling, scrollDirection, scrollDistance, elements
class UISection {
  constructor (name, origin, width, height, scrolling, scrollDirection, scrollDistance, elements) {
    // Name of the button for debugging purposes
    this.name = name;

    // Coordinates relative to the main canvas, where click handling is done
    this.mOrigin = [origin[0] * upscaleFactor, origin[1] * upscaleFactor];
    this.mWidth = width * upscaleFactor;
    this.mHeight = height * upscaleFactor;
    //this.mBorder = border * upscaleFactor;

    // Coordinates relative to the upscale canvas, where draw handling is done
    this.uOrigin = origin;
    this.uWidth = width;
    this.uHeight = height;
    //this.uBorder = border;

    this.scrolling = scrolling; // true or false, does this UI section scroll?
    this.scrollDirection = scrollDirection; // vertical or horizontal
    this.scrollDistance = scrollDistance; // pixels by which to increment
    this.currentScrollOffset = 0; 

    this.elements = elements;
  } 

  scroll(direction) {
    console.log(`this.scrolling`);
    if (this.scrolling) { // Move this check to the input source before calling UISection.scroll()
      if (direction === 'up') {
        let newScrollOffset = max(0, this.currentScrollOffset - this.scrollDistance);
        this.currentScrollOffset = newScrollOffset;
      } else if (direction === 'down') {
        let newScrollOffset = min(this.height, this.currentScrollOffset + this.scrollDistance);
        this.currentScrollOffset = newScrollOffset;
      }
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].uOriginY += newScrollOffset;
      }
    }
  }

  scrollReset() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].uOriginY -= currentScrollOffset;
      this.currentScrollOffset = 0; 
    }
  }

  showElement () {}
  hideElement () {}

}

// --------------------------------------------------
//             UI ELEMENT INITIALIZATION
// --------------------------------------------------

/* NEW UI ELEMENT FORMAT: 
const elementName = new UIElement(name, origin, width, height, toggle, show, imgSrc0, imgSrc1);
const elementName = new UIElement('', [0, 0], 0, 0, 0, false, true, '', '');
       name: string
     origin: array of 2 integers [uOriginX, uOriginY]
      width: integer (number of pixels)
     height: integer (number of pixels)
     border: integer (number of pixels)
     toggle: boolean
       show: boolean
    imgSrc0: string
    imgSrc1: string || null

*/


const titleZombots = new UIElement('Zombots Title', [150, 72], 180, 40, 1, false, true, 'resources/images/ui_480x320/Other UI Components/Zombots_Title_Card_Stylized_180x40.png');

// bg = Background
const bgStart = new UIElement('Background: Start Screen', [0, 0], 480, 320, 4, false, true, 'resources/images/ui_480x320/Backgrounds/Background_StartMenu_480x320.png', null);
const bgLeft = new UIElement('Background: Left', [0, 34], 100, 286, 2, false, true, 'resources/images/ui_480x320/Backgrounds/Background_Sidebar_100x286.png', null);
const bgRight = new UIElement('Background: Right', [380, 34], 100, 286, 2, false, true, 'resources/images/ui_480x320/Backgrounds/Background_Sidebar_100x286.png', null);
const bgBottom = new UIElement('Background: Bottom', [98, 280], 284, 40, 2, false, true, 'resources/images/ui_480x320/Backgrounds/Background_LowerCenter_284x40.png', null);
const bgCenterPanelPlainLeft = new UIElement('Background: Center Panel (Plain, Left)', [98, 34], 143, 248, 2, false, true, 'resources/images/ui_480x320/Backgrounds/Background_CenterPanel_Plain_143x248.png');
const bgCenterPanelPlainRight = new UIElement('Background: Center Panel (Plain, Right)', [239, 34], 143, 248, 2, false, true, 'resources/images/ui_480x320/Backgrounds/Background_CenterPanel_Plain_143x248.png');

const bgDepotArtwork = new UIElement('Background: Depot Artwork', [0, 34], 480, 286, 2, false, true, 'resources/images/ui_480x320/Backgrounds/Background_ArtworkComingSoon_480x286.png');
const bgSavedLoadouts = new UIElement('Background: Saved Loadouts', [98, 34], 143, 248, 2, false, true, 'resources/images/ui_480x320/Backgrounds/Background_CenterPanel_SavedLoadouts_143x248.png');

const bgLoadoutFilters = new UIElement('Background: Loadout Filters', [0, 34], 100, 286, 2, false, true, 'resources/images/ui_480x320/Backgrounds/Background_LoadoutFilters_100x286.png');

// tx = Text
const txDemoVersion = new UIElement('Demo Version', [3, 3], 130, 16, 1, false, true, 'resources/images/ui_480x320/Other UI Components/Zombots_Demo_V0.0.1_130x16.png');
const txSavedLoadouts = new UIElement('Text: Saved Loadouts', [100, 39], 139, 12, 0, false, true, 'resources/images/ui_480x320/Other UI Components/Text_CenterPanel_SavedLoadouts_139x12.png');
const txLoadoutFilters = new UIElement('Text: Loadout Filters', [0, 0], 0, 0, 0, false, true, '');
const txLoadoutStats = new UIElement('Text: Loadout Stats', [0, 0], 0, 0, 0, false, true, '');
const txItems = new UIElement('Text: Items', [0, 0], 0, 0, 0, false, true, '');
const txItemFilters = new UIElement('Text: Item Filters', [0, 0], 0, 0, 0, false, true, '');
const txItemStats = new UIElement('Text: Item Stats', [0, 0], 0, 0, 0, false, true, '');
const txActions = new UIElement('Text: Actions', [0, 0], 0, 0, 0, false, true, '');
const txBackToActions = new UIElement('Text: BackToActions', [0, 0], 0, 0, 0, false, true, '');
const txModifying = new UIElement('Text: Modifying', [0, 0], 0, 0, 0, false, true, '');

// dv = Divider
const dvCenterPanel1 = new UIElement('Divider: Center Panel V1', [0, 0], 0, 0, 0, false, true, '');

// da = Display Area
const daLoadoutDisplay = new UIElement('Loadout Display', [239, 34], 143, 248, 2, false, true, 'resources/images/ui_480x320/Other UI Components/Loadout_Display_143x248.png');
const daResourceDisplay = new UIElement('Resource Display', [380, 34], 100, 105, 2, true, true, 'resources/images/ui_480x320/Other UI Components/ResourceDisplayArea_ResourceNumbers_100x105.png', 'resources/images/ui_480x320/Other UI Components/ResourceDisplayArea_ResourceNames_100x105.png');
const daEquipmentDisplayCard1 = new UIElement('Equipment Display Card', [189, 0], 51, 19, 1, false, true, 'resources/images/ui_240x160/MEDU_Equipment_Display_Card_51x19.png', null);
const daStatusDisplay = new UIElement('MEDU Status Display', [49, 140], 142, 20, 1, false, true, 'resources/images/ui_240x160/MEDU_Status_Display_142x20.png', null);

/* UNUSED OLD UI COMPONENTS
// da = Display Area
//const daDialogueBox = new UIElement('Dialogue Box', [49, 140], 142, 20, 1, false, 'resources/images/ui_240x160/DisplayArea_DialogueBox_142x20.png', null);
const daMoneyXP = new UIElement('Money/XP Display', [189, 140], 51, 20, 1, false, 'resources/images/ui_240x160/DisplayArea_MoneyXP_51x20.png', null);
const daSideLeft = new UIElement('Display Area: Left', [0, 17], 51, 125, 1, false, 'resources/images/ui_240x160/DisplayArea_Side_51x125.png', null);
const daSideRight = new UIElement('Display Area: Right', [189, 17], 51, 125, 1, false, 'resources/images/ui_240x160/DisplayArea_Side_51x125.png', null);

const titleBuildingStats = new UIElement('Building Stats', [189, 17], 51, 29, 1, false, 'resources/images/ui_240x160/Title_BuildingStats_51x29.png', null);
const titleLevelStats = new UIElement('Level Stats', [189, 17], 51, 29, 1, false, 'resources/images/ui_240x160/Title_LevelStats_51x29.png', null);
const titleMEDUStats = new UIElement('MEDU Stats', [189, 17], 51, 29, 1, false, 'resources/images/ui_240x160/Title_MEDUStats_51x29.png', null);
const titleUtilityStats = new UIElement('Utility Stats', [189, 17], 51, 29, 1, false, 'resources/images/ui_240x160/Title_UtilityStats_51x29.png', null);
const titleWeaponStats = new UIElement('Weapon Stats', [189, 17], 51, 29, 1, false, 'resources/images/ui_240x160/Title_WeaponStats_51x29.png', null);
*/


// --------------------------------------------------
//              BUTTON INITIALIZATION
// --------------------------------------------------

/* NEW BUTTON FORMAT: 
const btnName = new Button(name, origin, width, height, border, toggle, imgSrc0, imgSrc1, clickMethod);
const btnName = new Button('', [0, 0], 0, 0, 0, false, '', '', () => {});
       name: string
     origin: array of 2 integers [uOriginX, uOriginY]
      width: integer
     height: integer
     toggle: boolean
       show: boolean
    imgSrc1: string
    imgSrc2: string || null
clickMethod: function
*/

const btnToggleTest = new Button('Toggle Test', [20, 40], 106, 36, 2, true, true, 'resources/images/ui_480x320/Buttons/Button_Depot_INACTIVE_106x36.png', 'resources/images/ui_480x320/Buttons/Button_Depot_ACTIVE_106x36.png', () => {
  btnToggleTest.toggleImage();
}); 

const btnBack = new Button('Back', [0, 0], 36, 36, 2, false, true, 'resources/images/ui_480x320/Buttons/Button_Back_CurvedArrow_36x36.png', null, () => {
  if (gs.gd.currentScene === 'depotHome') {
    loadScene('start');
  }
  else {
    loadScene('depotHome');
  }
  btnActionLog('back');
});
const btnBuildOptions = new Button('Build Options', [33, 0], 18, 18, 2, false, true, 'resources/images/ui_240x160/Button_BuildOptions_18x18.png', null, () => {
  btnActionLog('build options');
});
const btnDepot = new Button('Depot', [186, 0], 106, 36, 2, true, true, 'resources/images/ui_480x320/Buttons/Button_Depot_INACTIVE_106x36.png', 'resources/images/ui_480x320/Buttons/Button_Depot_ACTIVE_106x36.png', () => {
  btnLevels.toggleImage(0);
  btnDepot.toggleImage(1);
  btnLabArmory.toggleImage(0);
  loadScene('depotLoadouts');
  btnActionLog('depot');
}); // toggle
const btnEconomyDetails = new Button('Economy Details', [12, 0], 23, 18, 2, false, true, 'resources/images/ui_240x160/Button_EconomyDetails_23x18.png', null, () => {
  btnActionLog('econ details');
});
const btnEditLoadout = new Button('Edit Loadout', [50, 120], 59, 11, 1, false, true, 'resources/images/ui_240x160/Button_EditLoadout_59x11.png', null, () => {
  loadScene('depotEditor');
  btnActionLog('edit loadout');
});
const btnInfoCredits = new Button('Info/Credits', [184, 201], 112, 22, 1, false, true, 'resources/images/ui_480x320/Buttons/Button_InfoCredits_112x22.png', null, () => {
  btnActionLog('info/credits');
});
const btnLabArmory = new Button('Lab + Armory', [290, 0], 190, 36, 2, true, true, 'resources/images/ui_480x320/Buttons/Button_LabArmory_INACTIVE_190x36.png', 'resources/images/ui_480x320/Buttons/Button_LabArmory_ACTIVE_190x36.png', () => {
  btnLevels.toggleImage(0);
  btnDepot.toggleImage(0);
  btnLabArmory.toggleImage(1);
  loadScene('labArmory');
  btnActionLog('lab + armory');
}); // toggle
const btnLevels = new Button('Levels', [68, 0], 120, 36, 2, true, true, 'resources/images/ui_480x320/Buttons/Button_Levels_INACTIVE_120x36.png', 'resources/images/ui_480x320/Buttons/Button_Levels_ACTIVE_120x36.png', () => {
  btnLevels.toggleImage(1);
  btnDepot.toggleImage(0);
  btnLabArmory.toggleImage(0);
  loadScene('levelSelect');
  btnActionLog('levels');
}); // toggle
const btnLoadoutFilterWheeled = new Button('Loadout Filter: Wheeled', [5, 58], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Wheeled_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Wheeled_ACTIVE_90x18.png', () => {
  btnLoadoutFilterWheeled.toggleImage();
  btnActionLog('LO: Wheeled');
});
const btnLoadoutFilterBipedal = new Button('Loadout Filter: Bipedal', [5, 78], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Bipedal_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Bipedal_ACTIVE_90x18.png', () => {
  btnLoadoutFilterBipedal.toggleImage();
  btnActionLog('LO: Bipedal');
});
const btnLoadoutFilterTracked = new Button('Loadout Filter: Tracked', [5, 98], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Tracked_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Tracked_ACTIVE_90x18.png', () => {
  btnLoadoutFilterTracked.toggleImage();
  btnActionLog('LO: Tracked');
});
const btnLoadoutFilterAerial = new Button('Loadout Filter: Aerial', [5, 118], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Aerial_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Aerial_ACTIVE_90x18.png', () => {
  btnLoadoutFilterAerial.toggleImage();
  btnActionLog('LO: Aerial');
});
const btnLoadoutFilterHexipedal = new Button('Loadout Filter: Hexipedal', [5, 138], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Hexipedal_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Hexipedal_ACTIVE_90x18.png', () => {
  btnLoadoutFilterHexipedal.toggleImage();
  btnActionLog('LO: Hexipedal');
});
const btnLoadoutFilterHeadquarters = new Button('Loadout Filter: Headquarters', [5, 162], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Headquarters_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Headquarters_ACTIVE_90x18.png', () => {
  btnLoadoutFilterHeadquarters.toggleImage();
  btnActionLog('LO: Headquarters');
});
const btnLoadoutFilterWeaponFrame = new Button('Loadout Filter: Weapon Frame', [5, 182], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_WeaponFrame_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_WeaponFrame_ACTIVE_90x18.png', () => {
  btnLoadoutFilterWeaponFrame.toggleImage();
  btnActionLog('LO: Weapon Frame');
});
const btnLoadoutFilterUtilityFrame = new Button('Loadout Filter: Utlity Frame', [5, 202], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_UtilityFrame_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_UtilityFrame_ACTIVE_90x18.png', () => {
  btnLoadoutFilterUtilityFrame.toggleImage();
  btnActionLog('LO: Utility Frame');
});
const btnLoadoutFilterBlueprints = new Button('Loadout Filter: Blueprints', [5, 228], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Blueprints_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Blueprints_ACTIVE_90x18.png', () => {
  btnLoadoutFilterBlueprints.toggleImage();
  btnActionLog('LO: Blueprints');
});
const btnLoadoutFilterOwned = new Button('Loadout Filter: Owned', [5, 248], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Owned_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Owned_ACTIVE_90x18.png', () => {
  btnLoadoutFilterOwned.toggleImage();
  btnActionLog('LO: Owned');
});
const btnManageLoadouts = new Button('Manage Loadouts', [185, 39], 110, 16, 1, false, true, 'resources/images/ui_480x320/Buttons/Button_ManageLoadouts_110x16.png', null, () => {
  loadScene('depotLoadouts');
  btnActionLog('manage loadouts');
});
const btnNewLoadout = new Button('New Loadout', [50, 130], 59, 11, 1, false, true, 'resources/images/ui_240x160/Button_NewLoadout_59x11.png', null, () => {
  loadScene('depotEditor');
  btnActionLog('new loadout');
});
const btnOptions = new Button('Options', [34, 0], 36, 36, 2, false, true, 'resources/images/ui_480x320/Buttons/Button_Options_36x36.png', null, () => {
  btnActionLog('options');
});
const btnPause = new Button('Pause', [0, 0], 14, 18, 2, false, true, 'resources/images/ui_240x160/Button_Pause_14x18.png', null, () => {
  gs.lm.gamePaused = true;
  currentButtons.push(btnBack2);
  btnActionLog('pause');
});
const btnStartGame = new Button('Start Game', [184, 149], 112, 22, 1, false, true, 'resources/images/ui_480x320/Buttons/Button_StartGame_112x22.png', null, () => {
  loadScene('depotHome');
  btnActionLog('start game');

  // TEMPORARY SHORTCUT FOR DEVELOPING LEVEL GAMEPLAY:
  //loadScene('gameLevel');
  //btnActionLog('startLevel (temp)');
  //startLevel();
});
const btnToggleResourceDisplay = new Button('Toggle Resource Display', [461, 120], 18, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Info_18x18.png', 'resources/images/ui_480x320/Buttons/Button_Hashtag_18x18.png', () => {
  btnToggleResourceDisplay.toggleImage();
  daResourceDisplay.toggleImage();
});
const btnTutorials = new Button('Tutorials', [184, 175], 112, 22, 1, false, true, 'resources/images/ui_480x320/Buttons/Button_Tutorials_112x22.png', null, () => {btnActionLog('tutorials');});








/* UNUSED OLD BUTTONS
const btnStartLevelTemp = new Button('Start Levels', [111, 71], 18, 18, 2, false, 'resources/images/ui_240x160/Button_BuildOptions_18x18.png', null, () => {
  loadScene('gameLevel');
  btnActionLog('startLevel (temp)');
  startLevel();
});

const btnBack2 = new Button('Back', [111, 66], 18, 18, 2, false, 'resources/images/ui_240x160/Button_Back_18x18.png', null, () => {
  gs.lm.gamePaused = false;
  loadScene('depot');
  btnActionLog('back2');
});

//NEEDS FACTORY FUNCTION TO GENERATE MULTIPLE
//const btnBuildingLoadoutListItem = new Button('Bldg LO List Item', [], w, h, t, 'resources/images/ui_240x160/', is2, () => {btnActionLog('building loadout item');}); // toggle

const btnBuildingLoadouts = new Button('Bldg LO List', [25, 17], 26, 13, 2, true, 'resources/images/ui_240x160/Button_BuildingLoadouts_Inactive_26x13.png', 'resources/images/ui_240x160/Button_BuildingLoadouts_Active_26x13.ping', () => {btnActionLog('building loadouts');}); // toggle

const btnCategoryBuildings = new Button('TT Cat. Buildings', [0, 122], 51, 38, 2, true, 'resources/images/ui_240x160/Button_TechTreeCategoryBuildings_Inactive_51x38.png', 'resources/images/ui_240x160/Button_TechTreeCategoryBuildings_Active_51x38.png', () => {btnActionLog('tt cat. buildings');}); // toggle

const btnCategoryMEDUs = new Button('TT Cat. MEDUs', [0, 17], 51, 37, 2, true, 'resources/images/ui_240x160/Button_TechTreeCategoryMEDUs_Inactive_51x37.png', 'resources/images/ui_240x160/Button_TechTreeCategoryMEDUs_Active_51x37.png', () => {btnActionLog('tt cat. MEDUs');}); // toggle

const btnCategoryUtilities = new Button('TT Cat. Utilities', [0, 87], 51, 37, 2, true, 'resources/images/ui_240x160/Button_TechTreeCategoryUtilities_Inactive_51x37.png', 'resources/images/ui_240x160/Button_TechTreeCategoryUtilities_Active_51x37.png', () => {btnActionLog('tt cat. utilities');}); // toggle

const btnCategoryWeapons = new Button('TT Cat. Weapons', [0, 52], 51, 37, 2, true, 'resources/images/ui_240x160/Button_TechTreeCategoryWeapons_Inactive_51x37.png', 'resources/images/ui_240x160/Button_TechTreeCategoryWeapons_Active_51x37.png', () => {btnActionLog('tt cat. weapons');}); // toggle

const btnDontSaveStopEditing = new Button('Don\'t Save + Stop Editing', [50, 132], 87, 9, 1, false, 'resources/images/ui_240x160/Button_DontSaveStopEditing_87x9.png', null, () => {
  loadScene('depot');
  btnActionLog('don\'t save + stop editing');
});

const btnFreePlay = new Button('Free Play', [0, 88], 51, 72, 2, true, 'resources/images/ui_240x160/Button_FreePlay_Inactive_51x72.png', 'resources/images/ui_240x160/Button_FreePlay_Active_51x72.png', () => {btnActionLog('free play');}); // toggle

//NEEDS FACTORY FUNCTION TO GENERATE MULTIPLE
//const btnMEDULoadoutListItem = new Button('MEDU LO List Item', [], w, h, t, 'resources/images/ui_240x160/', is2, () => {btnActionLo('x');}); // toggle

const btnMEDULoadouts = new Button('MEDU LO List', [0, 17], 27, 13, 2, true, 'resources/images/ui_240x160/Button_MEDULoadouts_Inactive_27x13.png', 'resources/images/ui_240x160/Button_MEDULoadouts_Active_27x13.png', () => {btnActionLog('MEDU loadouts');}); // toggle

const btnMissionDetails = new Button('Mission Details', [0, 140], 51, 20, 2, true, 'resources/images/ui_240x160/Button_MissionDetails_Show_51x20.png', 'resources/images/ui_240x160/Button_MissionDetails_Hide_51x20.png', () => {btnActionLog('mission details');}); // toggle

const btnSaveKeepEditing = new Button('Save + Keep Editing', [50, 116], 87, 9, 1, false, 'resources/images/ui_240x160/Button_SaveKeepEditing_87x9.png', null, () => {btnActionLog('save + keep editing');});

const btnSaveStopEditing = new Button('Save + Stop Editing', [50, 124], 87, 9, 1, false, 'resources/images/ui_240x160/Button_SaveStopEditing_87x9.png', null, () => {
  loadScene('depot');
  btnActionLog('save + stop editing');
});

const btnStatsLoadoutEditor = new Button('Stats (in Loadout Editor)', [189, 122], 51, 11, 2, true, 'resources/images/ui_240x160/Button_StatsLoadoutEditor_Inactive_51x11.png', 'resources/images/ui_240x160/Button_StatsLoadoutEditor_Active_51x11.png', () => {btnActionLog('stats (in loadout editor)');}); // toggle

const btnStory = new Button('Story', [0, 17], 51, 72, 2, true, 'resources/images/ui_240x160/Button_Story_Inactive_51x72.png', 'resources/images/ui_240x160/Button_Story_Active_51x72.png', () => {btnActionLog('story');}); // toggle

const btnVisualLoadoutEditor = new Button('Visual (in Loadout Editor)', [189, 131], 51, 11, 2, true, 'resources/images/ui_240x160/Button_VisualLoadoutEditor_Inactive_51x11.png', 'resources/images/ui_240x160/Button_VisualLoadoutEditor_Active_51x11.png', () => {btnActionLog('visual (in loadout editor)');}); // toggle
*/


// --------------------------------------------------
//              UI SECTION INITIALIZATION
// --------------------------------------------------
// These arrays define different sections of the UI, made of up individual elements that are frequently used together

// string, array, integer, integer, boolean, integer, integer, array
// 'UI Section A', [0, 0], 100, 100, true, 1, 10, [heading1, button1, button 2]
// new UISection('', [0, 0], 0, 0, true, 1, 10, []);
// name, origin, width, height, scrolling, scrollDirection, scrollDistance, elements

let UISecStartBackground1 = new UISection('UI Sec: Start Background', [0, 0], 0, 0, false, 0, 0, [bgStart]);
let UISecStartMain1 = new UISection('', [0, 0], 0, 0, true, 1, 10, [titleZombots, txDemoVersion, btnStartGame, btnTutorials, btnInfoCredits, btnToggleTest]);
let UISecMenuBackground1 = new UISection('', [0, 0], 0, 0, true, 1, 10, [bgLeft, bgRight, bgBottom]);
let UISecTopMain1 = new UISection('', [0, 0], 0, 0, true, 1, 10, [btnBack, btnOptions, btnLevels, btnDepot, btnLabArmory]);
let UISecTopGameLevel1 = new UISection('', [0, 0], 0, 0, true, 1, 10, [btnPause, btnEconomyDetails, btnBuildOptions]);
let UISecLeftDepotLoadouts1 = new UISection('', [0, 0], 0, 0, true, 1, 10, [bgLoadoutFilters, btnLoadoutFilterWheeled, btnLoadoutFilterBipedal, btnLoadoutFilterTracked, btnLoadoutFilterAerial, btnLoadoutFilterHexipedal, btnLoadoutFilterHeadquarters, btnLoadoutFilterWeaponFrame, btnLoadoutFilterUtilityFrame, btnLoadoutFilterBlueprints, btnLoadoutFilterOwned]);
let UISecLeftGameLevel1 = new UISection('', [0, 0], 0, 0, true, 1, 10, []); [];
let UISecRightResourceDisplay1 = new UISection('', [0, 0], 0, 0, true, 1, 10, [daResourceDisplay, btnToggleResourceDisplay]);
let UISecRightGameLevel1 = new UISection('', [0, 0], 0, 0, true, 1, 10, [daEquipmentDisplayCard1]);
let UISecBottomGameLevel1 = new UISection('', [0, 0], 0, 0, true, 1, 10, [bgBottom, daStatusDisplay]);
let UISecMidDepotHome1 = new UISection('', [0, 0], 0, 0, true, 1, 10, [bgDepotArtwork, btnManageLoadouts]);
let UISecMidDepotLoadouts1 = new UISection('', [0, 0], 0, 0, true, 1, 10, [bgSavedLoadouts, daLoadoutDisplay]);

let UISecStartBackground = [bgStart];
let UISecStartMain = [titleZombots, txDemoVersion, btnStartGame, btnTutorials, btnInfoCredits, btnToggleTest];
let UISecMenuBackground = [bgLeft, bgRight, bgBottom];
let UISecTopMain = [btnBack, btnOptions, btnLevels, btnDepot, btnLabArmory];
let UISecTopGameLevel = [btnPause, btnEconomyDetails, btnBuildOptions];
let UISecLeftDepotLoadouts = [bgLoadoutFilters, btnLoadoutFilterWheeled, btnLoadoutFilterBipedal, btnLoadoutFilterTracked, btnLoadoutFilterAerial, btnLoadoutFilterHexipedal, btnLoadoutFilterHeadquarters, btnLoadoutFilterWeaponFrame, btnLoadoutFilterUtilityFrame, btnLoadoutFilterBlueprints, btnLoadoutFilterOwned];
let UISecLeftGameLevel = [];
let UISecRightResourceDisplay = [daResourceDisplay, btnToggleResourceDisplay];
let UISecRightGameLevel = [daEquipmentDisplayCard1];
let UISecBottomGameLevel = [bgBottom, daStatusDisplay];
let UISecMidDepotHome = [bgDepotArtwork, btnManageLoadouts];
let UISecMidDepotLoadouts = [bgSavedLoadouts, daLoadoutDisplay];


let crosshairImg = new Image();
crosshairImg.src = 'resources/images/ui_240x160/Crosshair_1_16x16.png';

let cursorImg = new Image();
cursorImg.src = 'resources/images/ui_240x160/Cursor_1_16x16.png';


const uiData = {
  buttons: {
    //startLevelTemp: btnStartLevelTemp,
    back: btnBack,
    //back2: btnBack2,
    buildOptions: btnBuildOptions,
    //buildingLoadouts: btnBuildingLoadouts,
    //categoryBuildings: btnCategoryBuildings,
    //categoryMEDUs: btnCategoryMEDUs,
    //categoryUtilities: btnCategoryUtilities,
    //categoryWeapons: btnCategoryWeapons,
    depot: btnDepot,
    //dontSaveStopEditing: btnDontSaveStopEditing,
    economyDetails: btnEconomyDetails,
    editLoadout: btnEditLoadout,
    //freePlay: btnFreePlay,
    infoCredits: btnInfoCredits,
    labArmory: btnLabArmory,
    levels: btnLevels,
    loadoutFilterWheeled: btnLoadoutFilterWheeled,
    loadoutFilterBipedal: btnLoadoutFilterBipedal, 
    loadoutFilterTracked: btnLoadoutFilterTracked, 
    loadoutFilterAerial: btnLoadoutFilterAerial, 
    loadoutFilterHexipedal: btnLoadoutFilterHexipedal, 
    loadoutFilterHeadquarters: btnLoadoutFilterHeadquarters,
    loadoutFilterWeaponFrame: btnLoadoutFilterWeaponFrame, 
    loadoutFilterUtilityFrame: btnLoadoutFilterUtilityFrame, 
    loadoutFilterBlueprints: btnLoadoutFilterBlueprints,
    loadoutFilterOwned: btnLoadoutFilterOwned,
    manageLoadouts: btnManageLoadouts,
    //MEDULoadouts: btnMEDULoadouts,
    //missionDetails: btnMissionDetails,
    newLoadout: btnNewLoadout,
    options: btnOptions,
    pause: btnPause,
    //saveKeepEditing: btnSaveKeepEditing,
    //saveStopEditing: btnSaveStopEditing,
    startGame: btnStartGame,
    //statsLoadoutEditor: btnStatsLoadoutEditor,
    //story: btnStory,
    tutorials: btnTutorials,
    //visualLoadoutEditor: btnVisualLoadoutEditor,
  },
  sections: {
    startBackground: UISecStartBackground,
    startMain: UISecStartMain, 
    menuBackground: UISecMenuBackground, 
    topMain: UISecTopMain, 
    topGameLevel: UISecTopGameLevel, 
    //leftLevelModeSelect: UISecLeftLevelModeSelect, 
    leftDepotLoadouts: UISecLeftDepotLoadouts, 
    //leftTechTreeCategories: UISecLeftTechTreeCategories, 
    leftGameLevel: UISecLeftGameLevel, 
    rightResourceDisplay: UISecRightResourceDisplay, 
    //rightDepotEditor: UISecRightDepotEditor, 
    //rightDepotLoadouts: UISecRightDepotLoadouts,
    rightGameLevel: UISecRightGameLevel,
    //bottomDialogueBox: UISecBottomDialogueBox, 
    bottomGameLevel: UISecBottomGameLevel, 
    midDepotHome: UISecMidDepotHome,
    //midDepotEditor: UISecMidDepotEditor, 
    midDepotLoadouts: UISecMidDepotLoadouts, 
    //midLevelSelect: UISecMidLevelSelect,
  },
  elements: { // Apparently not in use
    //daDialogueBox: daDialogueBox, // da = display area
    //daMoneyXP: daMoneyXP, 
    //daSideLeft: daSideLeft,
    //daSideRight: daSideRight,

    //bgStart: bgStart, // bg = background
    //bgLeft: bgLeft,
    //bgRight: bgRight,
    //bgBottom: bgBottom,
    //bgCenterPanelPlainLeft: bgCenterPanelPlainLeft,
    //bgCenterPanelPlainRight: bgCenterPanelPlainRight,
    //bgDepotArtwork: bgDepotArtwork,
    //loadoutDisplay: daLoadoutDisplay,
    //statusDisplay: daStatusDisplay,

    //titleBuildingStats: titleBuildingStats,
    //titleLevelStats: titleLevelStats,
    //titleMEDUStats: titleMEDUStats,
    //titleUtilityStats: titleUtilityStats,
    //titleWeaponStats: titleWeaponStats, 
    // testElementDefinitionAtProperty: new UIElement('Testing definition on property', [100, 60], 51, 20, false, 'resources/images/ui_240x160/DisplayArea_MoneyXP_51x20.png', null);
  },
};
//export { uiData };