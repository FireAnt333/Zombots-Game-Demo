let mobDirection = 0;
function drawMobileObjects() {
  // Just drawing player for now; later, make it draw referencing a list of mobile objects
  //let mobImg = gs.lm.player.img;
  //let mobWidth = 16;
  //let mobHeight = 16;
  //let drawOriginX = gs.lm.player.position[0] - (mobWidth/2);
  //let drawOriginY = gs.lm.player.position[1] - (mobHeight/2);
  //let mobAngle = gs.lm.player.position[2];

  // Rotate/translate to proper angle
  for (let i = 0; i < gs.lm.currentMobiles.length; i++) {
    let mob = gs.lm.currentMobiles[i];
    let drawOriginX = mob.position[0] - (mob.width/2);
    let drawOriginY = mob.position[1] - (mob.height/2);
    //let mobDirection = 0; // 0-7

    //console.log(mob.name);
    //console.log(drawOriginX);
    //console.log(drawOriginY);

    //cu.drawImage(mob.img, drawOriginX, drawOriginY, mob.width, mob.height); // This DOES draw 
    //console.log(`Draw data: ${drawOriginX}, ${drawOriginY}, ${mob.width}, ${mob.height}`);

    //cu.translate(Math.floor((mob.position[0] + (mob.width/2))/upscaleFactor), Math.floor((mob.position[1] + (mob.height/2))/upscaleFactor)); // mob center; position + half of width/height
    //cu.translate(Math.floor((mob.position[0] + (mob.width/2))/upscaleFactor) - 32, Math.floor((mob.position[1] + (mob.height/2))/upscaleFactor) - 19);
    //cu.translate(Math.floor(mob.position[0]/upscaleFactor), Math.floor(mob.position[1]/upscaleFactor));
    cu.translate(mob.position[0], mob.position[1]);

    //cu.rotate(degreesToRadians(mobDirection));
    cu.rotate(directionToRadians(mobDirection));
    //cu.drawImage(mob.img, drawOriginX, drawOriginY, mob.width, mob.height); 
    cu.drawImage(mob.img, 0-(mob.width/2), 0-(mob.height/2), mob.width, mob.height); 
    console.log(`Draw data: ${drawOriginX}, ${drawOriginY}, ${mob.width}, ${mob.height}`);
    console.log(`Translation: ${Math.floor((mob.position[0] + (mob.width/2))/upscaleFactor)}, ${Math.floor((mob.position[1] + (mob.height/2))/upscaleFactor)}`); //WHEN TRANSLATING, DRAW IS OFF BY EXACTLY THIS AMOUNT
    
    // Reset the origin after drawing a mob
    //cu.rotate(degreesToRadians(-mobDirection));
    cu.rotate(-directionToRadians(mobDirection));
    //cu.translate(Math.ceil(-(mob.position[0] + (mob.width/2))/upscaleFactor), Math.ceil(-(mob.position[1] + (mob.height/2))/upscaleFactor));
    //cu.translate(Math.ceil(-(mob.position[0] + (mob.width/2))/upscaleFactor) + 32, Math.ceil(-(mob.position[1] + (mob.height/2))/upscaleFactor) + 19);
    //cu.translate(Math.ceil(-mob.position[0]/upscaleFactor), Math.ceil(-mob.position[1]/upscaleFactor));
    cu.translate(-mob.position[0], -mob.position[1]);
    
    //console.log('mob drawn');


    // The off-center draw issue is that I'm offsetting twice, using drawOriginX/Y and also using translate(). I need to concentrate that down to one operation. It also needs to happen with translate() instead of raw position numbers, so that I can also utilize rotate()
  }
  mobDirection++;

};


/* RELOAD CALCULATION
// The block below takes in the "reload" argument, a 2-index array of a number and a string, which allows and handles an input as either shots per second or seconds per shot. [10, 'sps'] would mean 10 shots per second (which translates to a 0.1-second reload), and [2, 'sr'] would mean 2-second reload (which translates to 0.5 shots per second). Basically, I just have to use a reciprocal, 10/1 SPS = 1/10 SR, and 2/1 SR = 1/2 SPS. Using that information, it assigns the proper values to both this.sps and this.shotReload.

this.reload = reload;
if (reload[1] === 'sps') {
  this.sps = reload[0];
  this.shotReload = 1/reload[0];
} else if (reload[1] === 'sr') {
  this.shotReload = reload[0];
  this.sps = 1/reload[0];
}
*/