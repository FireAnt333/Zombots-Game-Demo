function loadScene(page) {
  // STEP 1: Clear the canvas and the currentButtons array
  cm.clearRect(0, 0, canvasWidth, canvasHeight);
  cu.clearRect(0, 0, canvasWidth, canvasHeight);
  UICurrentElementsTop = [];
  UICurrentElementsLeft = [];
  UICurrentElementsRight = [];
  UICurrentElementsBottom = [];
  currentButtons = [];

  // STEP 2: Decide which UI sections to draw, based on the current menu or level scene
  if (page === 'depot') { // load depot UI/buttons
    currentScene = 'depot';
    cm.font = '24px Helvetica';
    cm.fillStyle = 'black';
    cm.fillText('current scene:', canvasWidth*0.4, canvasHeight*0.8);
    cm.fillText(currentScene, canvasWidth*0.4, canvasHeight*0.85)

    currentButtons.push(btnTempSwitchMenus);

    cu.drawImage(btnTempSwitchMenus.img, btnTempSwitchMenus.uOrigin[0], btnTempSwitchMenus.uOrigin[1], btnTempSwitchMenus.uWidth, btnTempSwitchMenus.uHeight);

  } else if (page === 'levelSelect') { // load level select UI/buttons
    //
  } else if (page === 'techTree') { // load tech tree UI/buttons
    // 
  } else if (page === 'gameLevel') { // load level UI/buttons
    currentScene = 'gameLevel';
    cm.font = '24px Helvetica';
    cm.fillStyle = 'black';
    cm.fillText('current scene:', canvasWidth*0.4, canvasHeight*0.8);
    cm.fillText(currentScene, canvasWidth*0.4, canvasHeight*0.85)

    currentButtons.push(btnPause);
    currentButtons.push(btnEconomyDetails);
    currentButtons.push(btnBuildOptions);
    currentButtons.push(btnTempSwitchMenus);

    cu.drawImage(btnPause.img, btnPause.uOrigin[0], btnPause.uOrigin[1], btnPause.uWidth, btnPause.uHeight);
    cu.drawImage(btnEconomyDetails.img, btnEconomyDetails.uOrigin[0], btnEconomyDetails.uOrigin[1], btnEconomyDetails.uWidth, btnEconomyDetails.uHeight);
    cu.drawImage(btnBuildOptions.img, btnBuildOptions.uOrigin[0], btnBuildOptions.uOrigin[1], btnBuildOptions.uWidth, btnBuildOptions.uHeight);
    cu.drawImage(btnTempSwitchMenus.img, btnTempSwitchMenus.uOrigin[0], btnTempSwitchMenus.uOrigin[1], btnTempSwitchMenus.uWidth, btnTempSwitchMenus.uHeight);

  } else if (page === 'test') { // load test page
    // 
  } else if (page === 'pause') { // load pause menu
    //cm.fillStyle = 'green';
    //cm.fillRect(canvasWidth*0.5 - 100, canvasHeight*0.5 - 150, 200, 300);
  } else { // give error message indicating invalid loadScene input
    console.log('error in loadScene(): invalid input');
  }

  // STEP 3: Draw each element of each UI section chosen above
  /*
  for 

  */

};