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
    //console.log(`toggleImage() on ${this.name} changed this.active to: ${this.active}`);
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

class UISection {
            // string, array, integer, integer, boolean, integer, integer, array
            // 'UI Section A', [0, 0], 100, 100, true, 1, 10, [heading1, button1, button2]
            // name, origin, width, height, border, scrolling, scrollDirection, scrollDistance, elements
  constructor (name, origin, width, height, border, scrolling, scrollDirection, scrollDistance, elements) {
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

    this.scrolling = scrolling; // true or false, does this UI section scroll?
    this.scrollDirection = scrollDirection; // 'vertical' or 'horizontal'
    this.scrollDistance = scrollDistance; // pixels by which to increment
    this.currentScrollOffset = 0; 

    this.elements = elements;
    this.customText = [];
  } 

  // Working, but needs limits on how far to scroll
  scroll(direction) {
    if (direction === -1) { // Up or left, toward negative coordinates
      this.currentScrollOffset += this.scrollDistance;
    } else if (direction === 1) { // Down or right, toward positive coordinates
      this.currentScrollOffset -= this.scrollDistance;
    }
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].uOrigin[1] += (this.scrollDistance * -direction);
      this.elements[i].mOrigin[1] += (this.scrollDistance * -direction)*upscaleFactor;
    }
  }

  scrollReset() {
    console.log(`this.currentScrollOffset was: ${this.currentScrollOffset}`);
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].uOrigin[1] -= this.currentScrollOffset;
      this.elements[i].mOrigin[1] -= this.currentScrollOffset*upscaleFactor;
    }
    console.log(`this.currentScrollOffset now: ${this.currentScrollOffset}`);
    this.currentScrollOffset = 0; 
  }

  showElement(element) {
    element.show = true;
  }

  hideElement(element) {
    element.show = false;
  }

}

class ItemCard extends UISection {
  constructor(name, origin, width, height, border, scrolling, scrollDirection, scrollDistance, itemObj) {
    super(name, origin, width, height, border, scrolling, scrollDirection, scrollDistance);

    this.backgroundSrc = 'resources/images/ui_480x320/Other UI Components/ItemCard_Template_133x18.png';
    this.modIndicators = [
      [true, true, true, false, false], 
      [false, false, null, null, null]
    ]; 

    this.elements = [
      // name, origin, width, height, border, toggle, show, imgSrc0, imgSrc1
      new UIElement('Template: Item Card', [this.uOrigin[0], this.uOrigin[1]], 133, 18, 1, false, true, this.backgroundSrc, null),
      new UIElement(`Icon: ${itemObj.class}`, [this.uOrigin[0]+7, this.uOrigin[1]+1], 16, 16, 0, false, true, itemObj.iconSrcPrimary, null),
      new UIElement(`Item Name Text: ${itemObj.name}`, [this.uOrigin[0]+23, this.uOrigin[1]], 53, 18, 1, false, true, itemObj.nameImgSrc, null),

      // Add mod indicators later with a loop
      // Modify button
    ];

    // for each mod indicator, elements.push the appropriate newUIElement
  }
}

class LoadoutCard extends UISection {
  constructor(name, origin, width, height, border, scrolling, scrollDirection, scrollDistance, loadoutObj) {
    super(name, origin, width, height, border, scrolling, scrollDirection, scrollDistance);

    this.backgroundSrc = 'resources/images/ui_480x320/Other UI Components/LoadoutCard_Template_133x42.png';
    this.selected = false;
    this.clickMethod = true; // workaround to get button detection system to see LoadoutCards as buttons
    this.loadoutObj = loadoutObj;

    // Decide what empty mount/slot icon should be displayed
    if (loadoutObj.base.type === 'chassis') {
      this.emptyWeaponSlotIconSrc = 'resources/images/ui_480x320/Icons/Icon_Empty_Weapon_Slot_PURPLE_16x16.png';
      this.emptyUtilitySlotIconSrc = 'resources/images/ui_480x320/Icons/Icon_Empty_Utility_Slot_PURPLE_16x16.png';
      this.selectedIndicator = 'resources/images/ui_480x320/Other UI Components/LoadoutCard_SelectedIndicator_PURPLE_137x46.png';
      this.iconColor = 'purple';
    } else if (loadoutObj.base.type === 'building') {
      this.emptyWeaponSlotIconSrc = 'resources/images/ui_480x320/Icons/Icon_Empty_Weapon_Slot_GREEN_16x16.png';
      this.emptyUtilitySlotIconSrc = 'resources/images/ui_480x320/Icons/Icon_Empty_Utility_Slot_GREEN_16x16.png';
      this.selectedIndicator = 'resources/images/ui_480x320/Other UI Components/LoadoutCard_SelectedIndicator_GREEN_137x46.png';
      this.iconColor = 'green';
    }

    // Decide what research/ownership status icon and "selected" indicator should be displayed
    if (this.iconColor === 'purple' && loadoutObj.inventoryStatus === 'owned') {
      this.researchIcon = 'resources/images/ui_480x320/Icons/Icon_Owned_PURPLE_16x16.png'; 
    } else if (this.iconColor === 'green' && loadoutObj.inventoryStatus === 'owned') {
      this.researchIcon = 'resources/images/ui_480x320/Icons/Icon_Owned_GREEN_16x16.png'; 
    } else if (this.iconColor === 'purple' && loadoutObj.inventoryStatus !== 'owned') {
      this.researchIcon = 'resources/images/ui_480x320/Icons/Icon_Developed_PURPLE_16x16.png'; 
    } else if (this.iconColor === 'green' && loadoutObj.inventoryStatus !== 'owned') {
      this.researchIcon = 'resources/images/ui_480x320/Icons/Icon_Developed_GREEN_16x16.png'; 
    } 

    // The individual images that make up the LoadoutCard
    this.elements = [
      // new UIElement template: (name, origin, width, height, border, toggle, show, imgSrc0, imgSrc1)
      new UIElement('Template: Loadout Card', [this.uOrigin[0], this.uOrigin[1]], 133, 42, 1, false, true, this.backgroundSrc, null),
      new UIElement('Icon: Owned', [this.uOrigin[0]+1, this.uOrigin[1]+1], 16, 16, 0, false, true, this.researchIcon, null),
      new UIElement(`Icon: ${loadoutObj.base.class}`, [this.uOrigin[0]+18, this.uOrigin[1]+1], 16, 16, 0, false, true, loadoutObj.base.iconSrc, null),
      new UIElement(`Base Name Text: ${loadoutObj.base.name}`, [this.uOrigin[0]+34, this.uOrigin[1]], 53, 18, 1, false, true, loadoutObj.base.nameImgSrc, null),
      // Add "Modify" button here
    ];

    // Add mod indicators to this.elements with a loop. For each mod indicator, elements.push the appropriate newUIElement
    this.modIndicators = [
      [true, true, false, false, false], 
      [null, null, null, null, null]
    ]; 

    // Add weapon icons to the LoadoutCard
    let iconSrcToAdd = '';
    for (let i = 0; i < loadoutObj.weaponsArray.length; i++) {
      if (loadoutObj.weaponsArray[i] !== null && loadoutObj.weaponsArray[i] !== false) {
        if (this.iconColor === 'purple') {
          iconSrcToAdd = loadoutObj.weaponsArray[i].iconSrcPurple; 
        } else if (this.iconColor === 'green') {
          iconSrcToAdd = loadoutObj.weaponsArray[i].iconSrcGreen; 
        }
        this.elements.push(new UIElement(`Weapon Mount ${i+1}`, [this.uOrigin[0]+3+(i*19), this.uOrigin[1]+23], 16, 16, 0, false, true, iconSrcToAdd, null));
      } else if (loadoutObj.weaponsArray[i] === false) {
        this.elements.push(new UIElement(`Weapon Mount ${i+1}`, [this.uOrigin[0]+3+(i*19), this.uOrigin[1]+23], 16, 16, 0, false, true, this.emptyWeaponSlotIconSrc, null));
      } 
    }

    // Add utility icons to the LoadoutCard
    for (let i = 0; i < loadoutObj.utilitiesArray.length; i++) {
      if (loadoutObj.utilitiesArray[i] !== null && loadoutObj.utilitiesArray[i] !== false) {
        if (this.iconColor === 'purple') {
          iconSrcToAdd = loadoutObj.utilitiesArray[i].iconSrcPurple; 
        } else if (this.iconColor === 'green') {
          iconSrcToAdd = loadoutObj.utilitiesArray[i].iconSrcGreen; 
        }
        this.elements.push(new UIElement(`Utility Mount ${i+1}`, [this.uOrigin[0]+70+(i*19), this.uOrigin[1]+23], 16, 16, 0, false, true, iconSrcToAdd, null));
      } else if (loadoutObj.utilitiesArray[i] === false) {
        this.elements.push(new UIElement(`Utility Mount ${i+1}`, [this.uOrigin[0]+70+(i*19), this.uOrigin[1]+23], 16, 16, 0, false, true, this.emptyUtilitySlotIconSrc, null));
      } 
    }
  }

  click() {
    // Remove all LoadoutCard buttons from gs.gd.currentButtons
    let buttons = gs.gd.currentButtons;
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].name === 'Loadout Card') {
        buttons[i].selected = false;
        for (let j = 0; j < buttons[i].elements.length; j++) {
          if (buttons[i].elements[j].name === 'Selected Indicator') {
            buttons[i].elements.splice(j,1);
          }
        }
      }
    }

    // If this isn't selected already, add the "selected" indicator to the list of elements to draw on the LoadoutCard
    if (!this.selected) {
      this.elements.push(new UIElement('Selected Indicator', [this.uOrigin[0]-2, this.uOrigin[1]-2], this.uWidth+4, this.uHeight+4, 0, false, true, this.selectedIndicator, null));
      this.selected = true;
      gs.gd.loadoutSelected = this.loadoutObj;
      //console.log(gs.gd.loadoutSelected);
    }
    
    // Clear and update elements (custom text and item cards) to be displayed in the loadout details section
    UISecMidRightDepotLoadouts.customText = [];
    updateLoadoutDetailsDisplay();
  }
}

class CustomText {
  constructor(text, font, origin) {
    this.text = text;
    this.font = font;
    this.origin = origin
  }
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
const daLoadoutDetails = new UIElement('Loadout Details', [239, 34], 143, 248, 2, false, true, 'resources/images/ui_480x320/Other UI Components/Loadout_Display_143x248.png');
const daBattery = new UIElement('Battery Weight Display Area', [265, 114], 23, 13, 1, false, true, 'resources/images/ui_480x320/Other UI Components/Loadout_Number_Display_23x13.png', null);
const daStorage = new UIElement('Storage Weight Display Area', [265, 134], 23, 13, 1, false, true, 'resources/images/ui_480x320/Other UI Components/Loadout_Number_Display_23x13.png', null);
const daArmor = new UIElement('Armor Weight Display Area', [333, 114], 23, 13, 1, false, true, 'resources/images/ui_480x320/Other UI Components/Loadout_Number_Display_23x13.png', null);
const daEngine = new UIElement('Engine Weight Display Area', [333, 134], 23, 13, 1, false, true, 'resources/images/ui_480x320/Other UI Components/Loadout_Number_Display_23x13.png', null);

const daResourceDisplay = new UIElement('Resource Display', [380, 34], 100, 105, 2, true, true, 'resources/images/ui_480x320/Other UI Components/ResourceDisplayArea_ResourceNumbers_100x105.png', 'resources/images/ui_480x320/Other UI Components/ResourceDisplayArea_ResourceNames_100x105.png');
// The UI needs multiple instances of EquipmentDisplayCard; either make multiple manual copies, or a class
const daEquipmentDisplayCard1 = new UIElement('Equipment Display Card', [189, 0], 51, 19, 1, false, true, 'resources/images/ui_240x160/MEDU_Equipment_Display_Card_51x19.png', null);
const daStatusDisplay = new UIElement('MEDU Status Display', [49, 140], 142, 20, 1, false, true, 'resources/images/ui_240x160/MEDU_Status_Display_142x20.png', null);


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

const btnToggleTest = new Button('BTN: Toggle Test', [20, 40], 106, 36, 2, true, true, 'resources/images/ui_480x320/Buttons/Button_Depot_INACTIVE_106x36.png', 'resources/images/ui_480x320/Buttons/Button_Depot_ACTIVE_106x36.png', () => {
  btnToggleTest.toggleImage();
}); 

const btnBack = new Button('BTN: Back', [0, 0], 36, 36, 2, false, true, 'resources/images/ui_480x320/Buttons/Button_Back_CurvedArrow_36x36.png', null, () => {
  if (gs.gd.currentScene === 'depotHome') {
    loadScene('start');
  }
  else {
    loadScene('depotHome');
  }
  btnActionLog('back');
});
const btnBuildOptions = new Button('BTN: Build Options', [33, 0], 18, 18, 2, false, true, 'resources/images/ui_240x160/Button_BuildOptions_18x18.png', null, () => {
  btnActionLog('build options');
});
const btnDepot = new Button('BTN: Depot', [186, 0], 106, 36, 2, true, true, 'resources/images/ui_480x320/Buttons/Button_Depot_INACTIVE_106x36.png', 'resources/images/ui_480x320/Buttons/Button_Depot_ACTIVE_106x36.png', () => {
  btnLevels.toggleImage(0);
  btnDepot.toggleImage(1);
  btnLabArmory.toggleImage(0);

  updateLoadoutsToDisplay();

  loadScene('depotLoadouts');
  btnActionLog('depot');
}); // toggle
const btnEconomyDetails = new Button('BTN: Economy Details', [12, 0], 23, 18, 2, false, true, 'resources/images/ui_240x160/Button_EconomyDetails_23x18.png', null, () => {
  btnActionLog('econ details');
});
const btnEditLoadout = new Button('BTN: Edit Loadout', [50, 120], 59, 11, 1, false, true, 'resources/images/ui_240x160/Button_EditLoadout_59x11.png', null, () => {
  loadScene('depotEditor');
  btnActionLog('edit loadout');
});
const btnInfoCredits = new Button('BTN: Info/Credits', [184, 201], 112, 22, 1, false, true, 'resources/images/ui_480x320/Buttons/Button_InfoCredits_112x22.png', null, () => {
  btnActionLog('info/credits');
});
const btnLabArmory = new Button('BTN: Lab + Armory', [290, 0], 190, 36, 2, true, true, 'resources/images/ui_480x320/Buttons/Button_LabArmory_INACTIVE_190x36.png', 'resources/images/ui_480x320/Buttons/Button_LabArmory_ACTIVE_190x36.png', () => {
  btnLevels.toggleImage(0);
  btnDepot.toggleImage(0);
  btnLabArmory.toggleImage(1);
  loadScene('labArmory');
  btnActionLog('lab + armory');
}); // toggle
const btnLevels = new Button('BTN: Levels', [68, 0], 120, 36, 2, true, true, 'resources/images/ui_480x320/Buttons/Button_Levels_INACTIVE_120x36.png', 'resources/images/ui_480x320/Buttons/Button_Levels_ACTIVE_120x36.png', () => {
  btnLevels.toggleImage(1);
  btnDepot.toggleImage(0);
  btnLabArmory.toggleImage(0);
  loadScene('levelSelect');
  btnActionLog('levels');
}); // toggle
const btnLoadoutFilterWheeled = new Button('BTN: Loadout Filter: Wheeled', [5, 58], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Wheeled_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Wheeled_ACTIVE_90x18.png', () => {
  btnLoadoutFilterWheeled.toggleImage();
  gs.gd.loadoutFilters.wheeled.active = !gs.gd.loadoutFilters.wheeled.active;
  updateLoadoutsToDisplay();
  btnActionLog('LO: Wheeled');
});
const btnLoadoutFilterBipedal = new Button('BTN: Loadout Filter: Bipedal', [5, 78], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Bipedal_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Bipedal_ACTIVE_90x18.png', () => {
  btnLoadoutFilterBipedal.toggleImage();
  gs.gd.loadoutFilters.bipedal.active = !gs.gd.loadoutFilters.bipedal.active;
  updateLoadoutsToDisplay();
  btnActionLog('LO: Bipedal');
});
const btnLoadoutFilterTracked = new Button('BTN: Loadout Filter: Tracked', [5, 98], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Tracked_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Tracked_ACTIVE_90x18.png', () => {
  btnLoadoutFilterTracked.toggleImage();
  gs.gd.loadoutFilters.tracked.active = !gs.gd.loadoutFilters.tracked.active;
  updateLoadoutsToDisplay();
  btnActionLog('LO: Tracked');
});
const btnLoadoutFilterAerial = new Button('BTN: Loadout Filter: Aerial', [5, 118], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Aerial_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Aerial_ACTIVE_90x18.png', () => {
  btnLoadoutFilterAerial.toggleImage();
  gs.gd.loadoutFilters.aerial.active = !gs.gd.loadoutFilters.aerial.active;
  updateLoadoutsToDisplay();
  btnActionLog('LO: Aerial');
});
const btnLoadoutFilterHexipedal = new Button('BTN: Loadout Filter: Hexipedal', [5, 138], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Hexipedal_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Hexipedal_ACTIVE_90x18.png', () => {
  btnLoadoutFilterHexipedal.toggleImage();
  gs.gd.loadoutFilters.hexipedal.active = !gs.gd.loadoutFilters.hexipedal.active;
  updateLoadoutsToDisplay();
  btnActionLog('LO: Hexipedal');
});
const btnLoadoutFilterHeadquarters = new Button('BTN: Loadout Filter: Headquarters', [5, 162], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Headquarters_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Headquarters_ACTIVE_90x18.png', () => {
  btnLoadoutFilterHeadquarters.toggleImage();
  gs.gd.loadoutFilters.headquarters.active = !gs.gd.loadoutFilters.headquarters.active;
  updateLoadoutsToDisplay();
  btnActionLog('LO: Headquarters');
});
const btnLoadoutFilterWeaponFrame = new Button('BTN: Loadout Filter: Weapon Frame', [5, 182], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_WeaponFrame_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_WeaponFrame_ACTIVE_90x18.png', () => {
  btnLoadoutFilterWeaponFrame.toggleImage();
  gs.gd.loadoutFilters.weaponframe.active = !gs.gd.loadoutFilters.weaponframe.active;
  updateLoadoutsToDisplay();
  btnActionLog('LO: Weapon Frame');
});
const btnLoadoutFilterUtilityFrame = new Button('BTN: Loadout Filter: Utlity Frame', [5, 202], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_UtilityFrame_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_UtilityFrame_ACTIVE_90x18.png', () => {
  btnLoadoutFilterUtilityFrame.toggleImage();
  gs.gd.loadoutFilters.utilityframe.active = !gs.gd.loadoutFilters.utilityframe.active;
  updateLoadoutsToDisplay();
  btnActionLog('LO: Utility Frame');
});
const btnLoadoutFilterBlueprints = new Button('BTN: Loadout Filter: Blueprints', [5, 228], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Blueprints_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Blueprints_ACTIVE_90x18.png', () => {
  btnLoadoutFilterBlueprints.toggleImage();
  gs.gd.loadoutFilters.blueprints.active = !gs.gd.loadoutFilters.blueprints.active;
  updateLoadoutsToDisplay();
  btnActionLog('LO: Blueprints');
});
const btnLoadoutFilterOwned = new Button('BTN: Loadout Filter: Owned', [5, 248], 90, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Filter_Owned_INACTIVE_90x18.png', 'resources/images/ui_480x320/Buttons/Button_Filter_Owned_ACTIVE_90x18.png', () => {
  btnLoadoutFilterOwned.toggleImage();
  gs.gd.loadoutFilters.owned.active = !gs.gd.loadoutFilters.owned.active;
  updateLoadoutsToDisplay();
  btnActionLog('LO: Owned');
});
const btnManageLoadouts = new Button('BTN: Manage Loadouts', [185, 39], 110, 16, 1, false, true, 'resources/images/ui_480x320/Buttons/Button_ManageLoadouts_110x16.png', null, () => {
  loadScene('depotLoadouts');
  btnActionLog('manage loadouts');
});
const btnNewLoadout = new Button('BTN: New Loadout', [50, 130], 59, 11, 1, false, true, 'resources/images/ui_240x160/Button_NewLoadout_59x11.png', null, () => {
  loadScene('depotEditor');
  btnActionLog('new loadout');
});
const btnOptions = new Button('BTN: Options', [34, 0], 36, 36, 2, false, true, 'resources/images/ui_480x320/Buttons/Button_Options_36x36.png', null, () => {
  btnActionLog('options');
});
const btnPause = new Button('BTN: Pause', [0, 0], 14, 18, 2, false, true, 'resources/images/ui_240x160/Button_Pause_14x18.png', null, () => {
  gs.lm.gamePaused = true;
  currentButtons.push(btnBack2);
  btnActionLog('pause');
});
const btnStartGame = new Button('BTN: Start Game', [184, 149], 112, 22, 1, false, true, 'resources/images/ui_480x320/Buttons/Button_StartGame_112x22.png', null, () => {
  loadScene('depotHome');
  btnActionLog('start game');

  // TEMPORARY SHORTCUT FOR DEVELOPING LEVEL GAMEPLAY:
  //loadScene('gameLevel');
  //btnActionLog('startLevel (temp)');
  //startLevel();
});
const btnToggleResourceDisplay = new Button('BTN: Toggle Resource Display', [461, 120], 18, 18, 1, true, true, 'resources/images/ui_480x320/Buttons/Button_Info_18x18.png', 'resources/images/ui_480x320/Buttons/Button_Hashtag_18x18.png', () => {
  btnToggleResourceDisplay.toggleImage();
  daResourceDisplay.toggleImage();
});
const btnTutorials = new Button('BTN: Tutorials', [184, 175], 112, 22, 1, false, true, 'resources/images/ui_480x320/Buttons/Button_Tutorials_112x22.png', null, () => {
  btnActionLog('tutorials');
});



// --------------------------------------------------
//              UI SECTION INITIALIZATION
// --------------------------------------------------
// These arrays define different sections of the UI, made of up individual elements that are frequently used together

// string, array, integer, integer, boolean, null/string, integer, array
// 'UI Section A', [0, 0], 100, 100, true, 'vertical', 10, [heading1, button1, button 2]
// new UISection('', [0, 0], 0, 0, true, 'vertical', 10, []);
// name, origin, width, height, scrolling, scrollDirection, scrollDistance, elements

let UISecStartBackground = new UISection('UI Sec: Start Background', [0, 0], 0, 0, 0, false, null, 0, [bgStart]);
let UISecStartMain = new UISection('UI Sec: Start Main', [184, 149], 112, 75, 0, false, null, 0, [titleZombots, txDemoVersion, btnStartGame, btnTutorials, btnInfoCredits]);
//let UISecStartMain = new UISection('UI Sec: Start Main', [184, 149], 112, 75, true, 'vertical', 10, [titleZombots, txDemoVersion, btnStartGame, btnTutorials, btnInfoCredits, btnToggleTest]);


let UISecMenuBackground = new UISection('UI Sec: Menu Background', [0, 0], 0, 0, 0, false, null, 0, [bgLeft, bgRight, bgBottom]);
let UISecTopMain = new UISection('UI Sec: Top Main', [0, 0], 0, 0, 0, false, null, 0, [btnBack, btnOptions, btnLevels, btnDepot, btnLabArmory]);
let UISecTopGameLevel = new UISection('UI Sec: Top Game Level', [0, 0], 0, 0, 0, false, null, 0, [btnPause, btnEconomyDetails, btnBuildOptions]);
let UISecLeftDepotLoadouts = new UISection('UI Sec: Left Depot Loadouts', [0, 0], 0, 0, 0, false, null, 0, [bgLoadoutFilters, btnLoadoutFilterWheeled, btnLoadoutFilterBipedal, btnLoadoutFilterTracked, btnLoadoutFilterAerial, btnLoadoutFilterHexipedal, btnLoadoutFilterHeadquarters, btnLoadoutFilterWeaponFrame, btnLoadoutFilterUtilityFrame, btnLoadoutFilterBlueprints, btnLoadoutFilterOwned]);
let UISecLeftGameLevel = new UISection('UI Sec: Left Game Level', [0, 0], 0, 0, 0, false, null, 0, []);
let UISecRightResourceDisplay = new UISection('UI Sec: Resource Display', [0, 0], 0, 0, 0, false, null, 0, [daResourceDisplay, btnToggleResourceDisplay]);
let UISecRightGameLevel = new UISection('UI Sec: Right Game Level', [0, 0], 0, 0, 0, false, null, 0, [daEquipmentDisplayCard1]);
let UISecBottomGameLevel = new UISection('UI Sec: Bottom Game Level', [0, 0], 0, 0, 0, false, null, 0, [bgBottom, daStatusDisplay]);
let UISecMidDepotHome = new UISection('UI Sec: Mid Depot Home', [0, 0], 0, 0, 0, false, null, 0, [bgDepotArtwork, btnManageLoadouts]);
//let UISecMidLeftDepotLoadouts = new UISection('UI Sec: Loadout Card Display Area', [0, 0], 0, 0, 0, false, null, 0, [bgSavedLoadouts]);
let UISecMidDepotLoadoutList = new UISection('UI Sec: Depot Loadout List', [0, 0], 0, 0, 0, true, 'vertical', 10, [bgSavedLoadouts]);
let UISecMidRightDepotLoadouts = new UISection('UI Sec: Loadout Detail Display Area', [0, 0], 0, 0, 0, false, null, 0, [daLoadoutDetails]);

//name, origin, width, height, border, scrolling, scrollDirection, scrollDistance, itemObj
//let itemCardTest = new ItemCard('Item Card Test', [103,58], 133, 18, 1, false, null, 0, new MCG30());

//name, origin, width, height, border, scrolling, scrollDirection, scrollDistance, loadoutObj
//let loadoutCardTest = new LoadoutCard('Loadout Card', [103,58], 133, 42, 1, false, null, 0, whl200stock);
//let loadoutCardTest2 = new LoadoutCard('Loadout Card', [103,102], 133, 42, 1, false, null, 0, trk300stock);
//let loadoutCardTest3 = new LoadoutCard('Loadout Card', [103,146], 133, 42, 1, false, null, 0, swf40stock);

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
    //itemCardTest: itemCardTest,
    //loadoutCardTest: loadoutCardTest,
    //loadoutCardTest2: loadoutCardTest2,
    //loadoutCardTest3: loadoutCardTest3,

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
    //midLeftDepotLoadouts: UISecMidLeftDepotLoadouts, 
    midDepotLoadoutList: UISecMidDepotLoadoutList,
    midRightDepotLoadouts: UISecMidRightDepotLoadouts, 
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
    //loadoutDetails: daLoadoutDetails,
    //statusDisplay: daStatusDisplay,

    //titleBuildingStats: titleBuildingStats,
    //titleLevelStats: titleLevelStats,
    //titleMEDUStats: titleMEDUStats,
    //titleUtilityStats: titleUtilityStats,
    //titleWeaponStats: titleWeaponStats, 
    // testElementDefinitionAtProperty: new UIElement('Testing definition on property', [100, 60], 51, 20, false, 'resources/images/ui_240x160/DisplayArea_MoneyXP_51x20.png', null);
  },
};



/* OLD: UNUSED BUTTONS

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

/* OLD: UNUSED UI COMPONENTS

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

/* OLD: UNUSED UI SECTION ARRAYS

let UISecStartBackground_OldFormat = [bgStart];
let UISecStartMain_OldFormat = [titleZombots, txDemoVersion, btnStartGame, btnTutorials, btnInfoCredits, btnToggleTest];
let UISecMenuBackground_OldFormat = [bgLeft, bgRight, bgBottom];
let UISecTopMain_OldFormat = [btnBack, btnOptions, btnLevels, btnDepot, btnLabArmory];
let UISecTopGameLevel_OldFormat = [btnPause, btnEconomyDetails, btnBuildOptions];
let UISecLeftDepotLoadouts_OldFormat = [bgLoadoutFilters, btnLoadoutFilterWheeled, btnLoadoutFilterBipedal, btnLoadoutFilterTracked, btnLoadoutFilterAerial, btnLoadoutFilterHexipedal, btnLoadoutFilterHeadquarters, btnLoadoutFilterWeaponFrame, btnLoadoutFilterUtilityFrame, btnLoadoutFilterBlueprints, btnLoadoutFilterOwned];
let UISecLeftGameLevel_OldFormat = [];
let UISecRightResourceDisplay_OldFormat = [daResourceDisplay, btnToggleResourceDisplay];
let UISecRightGameLevel_OldFormat = [daEquipmentDisplayCard1];
let UISecBottomGameLevel_OldFormat = [bgBottom, daStatusDisplay];
let UISecMidDepotHome_OldFormat = [bgDepotArtwork, btnManageLoadouts];
let UISecMidDepotLoadouts_OldFormat = [bgSavedLoadouts, daLoadoutDetails];
*/

