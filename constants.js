// Declare all constants here and import this file first

const canvasMain = document.getElementById('canvasMain');
const cm = canvasMain.getContext('2d');
const canvasUpscale = document.getElementById('canvasUpscale');
const cu = canvasUpscale.getContext('2d');
const canvasContainer = document.getElementById('container');

const canvasWidth = 960;
const canvasHeight = 640;
const upscaleFactor = 4;
const btnBorderOffset = 2*upscaleFactor;