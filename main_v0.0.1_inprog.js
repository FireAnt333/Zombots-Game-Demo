/*

ZOMBOTS DEMO V0.0.1 - In Progress

VERSION 0.0.1 REQUIREMENTS: 
- Game loads to start screen
- All menus are navigable, with placeholders in place of more complicated features (levels, tech tree, loadout editor, etc.)

TO DO: 
- Build sectional arrays of buttons/backgrounds (use new Art class for non-button art to be displayed)
  - UISecTopMain
  - UISecTopLevel
  - UISecLeftLevelModeSelect
  - UISecLeftDepotMEDUs
  - UISecLeftDepotBuildings
  - UISecLeftTechTreeCategories
  - UISecRightTitle (displays 1 of 5)
  - UISecRightEditor
  - UISecBottomDialogueBox
- Test navigation between more complicated menus
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



*/

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

const daDialogueBox = new UIElement('Dialogue Box', [49, 140], 142, 20, false, 'resources/images/ui_240x160/DisplayArea_DialogueBox_142x20.png', null);
const daMoneyXP = new UIElement('Money/XP Display', [189, 140], 51, 20, false, 'resources/images/ui_240x160/DisplayArea_MoneyXP_51x20.png', null);
const daSideLeft = new UIElement('Display Area: Left', [0, 17], 51, 125, false, 'resources/images/ui_240x160/DisplayArea_Side_51x125.png', null);
const daSideRight = new UIElement('Display Area: Right', [189, 17], 51, 125, false, 'resources/images/ui_240x160/DisplayArea_Side_51x125.png', null);

const bgStart = new UIElement('Background: Start Screen', [0, 0], 240, 160, false, 'resources/images/ui_240x160/MenuBackground_StartScreen_240x160.png', null);
const bgLeft = new UIElement('Background: Left', [0, 0], 51, 160, false, 'resources/images/ui_240x160/MenuBackground_Side_51x160.png', null);
const bgRight = new UIElement('Background: Right', [189, 0], 51, 160, false, 'resources/images/ui_240x160/MenuBackground_Side_51x160.png', null);
const bgBottom = new UIElement('Background: Bottom', [0, 140], 240, 20, false, 'resources/images/ui_240x160/MenuBackground_Bottom_240x20.png', null);

//NEEDS FACTORY FUNCTION TO GENERATE MULTIPLE
// const equipmentDisplayCard = new UIElement('Equipment Display Card', [], 51, 19, false, 'resources/images/ui_240x160/MEDU_Equipment_Display_Card_51x19.png', null);
const statusDisplay = new UIElement('MEDU Status Display', [49, 140], 142, 20, false, 'resources/images/ui_240x160/MEDU_Status_Display_142x20.png', null);

const titleBuildingStats = new UIElement('Building Stats', [189, 17], 51, 29, false, 'resources/images/ui_240x160/Title_BuildingStats_51x29.png', null);
const titleLevelStats = new UIElement('Level Stats', [189, 17], 51, 29, false, 'resources/images/ui_240x160/Title_LevelStats_51x29.png', null);
const titleMEDUStats = new UIElement('MEDU Stats', [189, 17], 51, 29, false, 'resources/images/ui_240x160/Title_MEDUStats_51x29.png', null);
const titleUtilityStats = new UIElement('Utility Stats', [189, 17], 51, 29, false, 'resources/images/ui_240x160/Title_UtilityStats_51x29.png', null);
const titleWeaponStats = new UIElement('Weapon Stats', [189, 17], 51, 29, false, 'resources/images/ui_240x160/Title_WeaponStats_51x29.png', null);


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
  switch(page) {
  case 'start': // load start menu UI/buttons
    currentScene = 'start';
    UICS = [UISecStartBackground, UISecStartMain];
    break;
  case 'depot': // load depot UI/buttons
    currentScene = 'depot';
    UICS = [UISecMenuBackground, UISecTopMain, UISecLeftDepot, UISecRightMain, UISecBottomDialogueBox, UISecMidDepotMain];
    break;
  case 'depotEditor': // load depot editor mode UI/buttons
    // Add editor buttons to the UICurrentElementsRight sectional array to be displayed
    currentScene = 'depotEditor';
    break;
    UICS = [UISecMenuBackground, UISecTopMain, UISecLeftTechTreeCategories, UISecRightMain, UISecRightDepotEditor, UISecBottomDialogueBox, UISecMidDepotEditor];
  case 'levelSelect': // load level select UI/buttons
    currentScene = 'levelSelect';
    UICS = [UISecMenuBackground, UISecTopMain, UISecLeftLevelModeSelect, UISecRightMain, UISecBottomDialogueBox, UISecMidLevelSelect];
    break;
  case 'techTree': // load tech tree UI/buttons
    currentScene = 'techTree';
    UICS = [UISecMenuBackground, UISecTopMain, UISecLeftTechTreeCategories, UISecRightMain, UISecBottomDialogueBox];
    break;
  case 'gameLevel': // load level UI/buttons
    currentScene = 'gameLevel';
    UICS = [UISecMenuBackground, UISecTopGameLevel, UISecLeftGameLevel, UISecBottomGameLevel];
    break;

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

  case 'test': // load test page
    currentScene = 'test';
    UICS = [];
    break;
  default:
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
 
