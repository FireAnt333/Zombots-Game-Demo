/*

ZOMBOTS IDEAS

RESOURCES: 
- Helpful stackoverflow post on mouse input, using both left and right mouse buttons: https://stackoverflow.com/questions/47737404/detecting-left-and-right-mouse-events-for-a-canvas-game


TO DO: 
- Test to make sure menu art and sprites of specific sizes display correctly
- Work on menu.js file, getting menu display and navigation working
- Work on tdshooter.js, implementing the basic functions of a top-down shooter game




JS FILES AND CONTENT (for organizational purposes)
- menus.js (menu data and navigation code)
- tdshooter.js (modularized, core top-down shooter functionality like movement, shooting, enemies, etc., but connected to additional player/enemy behavior in other files)
- medus.js (MEDU data and behavior code)
- enemies.js (enemy data and behavior code)
- buildings.js (building data and behavior code)
- main.js (code that connects the whole game together, manages art, etc.)



- Structure menu objects like this:

let UIToDisplay = menuDepot; // should always be one of the menu objects below, or the levelHUD
// MENU PAGES: display main nav buttons at top, plus dialogue box and money/XP at the bottom
// IN LEVEL: display levelHUD

const menuLevelSelect = {
  name: 'levelSelect',
  selectionArea: 'story/freePlay', // comes with buttons, set up separately
  statsAreaTitle: 'level',
  centralDisplay: 'regionSelect', // 'regionSelect' or 'levelSelect'; comes with buttons, set up separately
};
const menuDepot = {
  name: 'depot',
  selectionArea: 'loadoutListMEDUs', // 'loadoutListMEDUs' or 'loadoutListBuildings'; comes with buttons, set up separately
  statsAreaTitle: 'MEDU', // 'MEDU' or 'building'
  centralDisplay: 'depotDisplayMEDU', // 'depotDisplayMEDU' or 'depotDisplayBuilding'; comes with buttons, set up separately
};
const menuTechTree = {
  name: 'techTree',
  selectionArea: 'techTreeCategories', // comes with buttons, set up separately
  statsAreaTitle: 'MEDU', // 'MEDU', 'building', 'weapon', or 'utility'
  centralDisplay: 'viewTechTree', // 'viewTechTree', 'editMEDU' or 'editBuilding'; comes with buttons, set up separately
};
const levelHUD = {
  name: 'levelHUD',
  selectionArea: 'buildings' // 'buildings' or 'missionDetails'
  weapons: [MEDU.weapon1, MEDU.weapon2, MEDU.weapon3], 
  utilities: [MEDU.utility1, MEDU.utility2, MEDU.utility2],

  centralDisplay: //game area
};

// This function draws the appropriate things based on the state of the global variables UIToDisplay and the current menu object assigned to it
function drawUI() {
  if (UIToDisplay.name === 'levels') {
    // Draw current state of the menuLevelSelect object
  } else if (UIToDisplay.name === 'depot') {
    // Draw current state of the menuDepot object
  } else if (UIToDisplay.name === 'techTree') {
    // Draw current state of the menuTechTree object
  } else if (UIToDisplay.name === 'levelHUD') {
    // Draw current state of the levelHUD object
  }
};



// MEDU LOADOUT FACTORY FUNCTION: This function returns an object defining the parameters of the new MEDU loadout. It takes in the chassisType and weightLimit from an input (like a chassis selection in the tech tree) and finds the specifications of that loadout, defined elsewhere in the game code. 
function newMeduLoadoutFactory(chassisType, weightLimit) {
  // Find the MEDU chassis specified, then, based on whether the player wants to start with a stripped chassis or the standard loadout...
  // 1) return an object with only the chassisType and weightLimit, and everything else set to 0 or an empty array
  // 2) return an object with the standard loadout
  return {
    chassisType: 'unknown',
    weightLimit: 'unknown',
    weightTotal: 0,
    structure: 0, 
    armor: 0, 
    engine: 0, 
    weapons: [],
    utilities: [], 
  }
}



*/