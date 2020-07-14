// Put all buttons and other UI elements in this JS file, to be accessed by the main file via exporting. 


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