/*
LEVEL DATA

This file contains all information and data for all levels in the game.

TO DO: 
- Set up module export/import connection with main script

*/


// --------------------------------------------------
//            INDIVIDUAL TILE DEFINITIONS
// --------------------------------------------------

/* TILE CLASS EXPECTED INPUTS: 
- name
  - Description: The name of the tile, including its tileset. (Ex: 'grass_ground1' or 'snow_rock1')
  - Expected Format: A string.
- tileSet
  - Description: The name of the tileset that the tile belongs to. (Ex: 'city' or 'space')
  - Expected Format: A string. 
- width
  - Description: The width of the tile in pixels (before modification by upscaling).
  - Expected Format: An integer.
- height
  - Description: The height of the tile in pixels (before modification by upscaling).
  - Expected Format: An integer. 
- image
  - Description: The file location of the art to be loaded for the tile. 
  - Expected Format: A string.
- animated
  - Description: Tells whether the tile is animated, and therefore has only one images, or multiple strung together.
  - Expected Format: A boolean.
- traversableBy
  - Description: A list of the traversal types types that can move over this tile.
  - Expected Format: An array of strings.

*/

class Tile {
  constructor(name, tileSet, width, height, image, animated, traversableBy) {
    this.name = name;
    this.tileSet = tileSet;
    this.width = width;
    this.height = height;
    this.img = new Image();
    this.img.src = image;
    this.animated = animated;
    this.traversableBy = traversableBy;
  }
};

const grass_ground1 = new Tile('grass_ground1', 'grass', 16, 16, 'resources/images/sprites/terrain/grass/grass_ground1_16x16.png', false, ['ground', 'air', 'amphibious']);
const grass_rock1 = new Tile('grass_rock1', 'grass', 16, 16, 'resources/images/sprites/terrain/grass/grass_ground1_16x16.png', false, ['ground', 'air', 'amphibious']);
const grass_shrub1 = new Tile('grass_shrub1', 'grass', 16, 16, 'resources/images/sprites/terrain/grass/grass_ground1_16x16.png', false, ['ground', 'air', 'amphibious']);


// --------------------------------------------------
//                TILESET DEFINITIONS
// --------------------------------------------------

const tileSet_grass = {
  ground1: grass_ground1,
  rock1: grass_rock1, 
  shrub1: grass_shrub1,
  basicGroundTiles: [grass_ground1],
  alternateGroundTiles: [grass_rock1, grass_shrub1],
};
const tileSet_snow = {};
const tileSet_tropical = {};
const tileSet_city = {};
const tileSet_space = {};


// --------------------------------------------------
//                 LEVEL DEFINITIONS
// --------------------------------------------------

/* LEVEL CLASS EXPECTED INPUTS: 
- levelName
  - Description: The title or codename of the mission. (Alternatively, a simple numbered level system, such as Level 1-1, Level 1-2, etc.)
  - Expected Input: A string.
- tileSet
  - Description: An indicator of what tile set to use when displaying the level, depending on the desired environment (grassy, snowy, tropical, city, space, etc.)
  - Expected Format: A string.
- tileMap
  - Description: A list of all tiles that make up the ground of the level.
  - Expected Format: A 2-dimensional array of integers.
- objectMap
  - Description: A list of all objects other than background tiles.
  - Expected Format: An array of objects, each containing information on their starting location in the level.
- playerSpawnPoint
  - Description: A set of tile coordinates (not canvas coordinates) on the level map where the player starts the mission.
  - Expected Format: An array of two integers.
- enemyEncounters
  - Description: A list of all individual enemies and groups that can appear from automated spawn points in the level.
  - Expected Format: An array of variables.
- missionType
  - Description: The type of mission (attack, defense, sabotage, etc.)
  - Expected Format: A string. 
- levelObjectives
  - Description: Information on objectives that need to be fulfilled to successfully complete the mission.
  - Expected Format: An array of objects.
- testForWin
  - Description: A function that evaluates the game state and decides whether the mission has been completed.
  - Expected Format: A function.
- testForLoss
  - Description: A function that evaluates the game state and decides whether the mission has been failed.
  - Expected Format: A function.
*/

class Level {
  constructor (levelName, tileSet, tileMap, objectMap, playerSpawnPoint, enemyEncounters, missionType, levelObjectives, testForWin, testForLoss) {
    // Add parameters: objectMap, enemySpawns, levelObjectives, testForWin, testForLoss
    this.levelName = levelName;
    this.tileSet = tileSet; 
    this.tileMap = tileMap; 
    this.objectMap = objectMap;
    this.playerSpawnPoint = playerSpawnPoint;
    this.enemyEncounters = enemyEncounters;
    this.missionType = missionType;
    this.levelObjectives = levelObjectives;
    this.testForWin = testForWin;
    this.testForLoss = testForLoss;
  }
};


const testLevelMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
  [1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const testLevelMap2 = [
  [1, 1, 1, 1, 1],
  [1, 2, 2, 2, 1],
  [1, 2, 3, 2, 1],
  [1, 2, 2, 2, 1],
  [1, 1, 1, 1, 1],
];



// Level class inputs: levelName, tileSet, tileMap, objectMap, playerSpawnPoint, enemyEncounters, missionType, levelObjectives, testForWin, testForLoss

//const testLevel = new Level(tileSet_grass, testLevelMap);
const testLevel = new Level('Test Level', tileSet_grass, testLevelMap, [], {x:160, y:160}, [], 'missionTypePlaceholder', 'levelObjectivePlaceholder', 'testForWinPlaceholder', 'testForLossPlaceholder');

// {x:80, y:80}
// [80, 80]





const levelData = {
  testLevel: testLevel,
};
//export { levelData };