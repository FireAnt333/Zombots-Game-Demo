<!DOCTYPE html>

<html>
  <head>
    <title>Zombots Demo</title>
    <link href="resources/css/index_v0.0.1_inprog.css" type="text/css" rel="stylesheet">
  </head>
  <body id='body'>
    <h1>Zombots Demo V0.0.1 - In Progress</h1>
    <p>This build is in development.</p>

    <div id="container">
      <canvas class="canvas" id="canvasMain" width="960" height="640" oncontextmenu="return false;"></canvas>
      <canvas class="canvas" id="canvasUpscale" width="240" height="160" oncontextmenu="return false;"></canvas>
    </div>

    <table>
      <tr>
        <th colspan="2">
          <h2>Controls</h2>
        </th>
      </tr>
      <tr>
        <td>
          <p>W/A/S/D</p>
        </td>
        <td>
          <p>Move up, left, down and right</p>
        </td>
      </tr>
      <tr>
        <td>
          <p>Left Click</p>
        </td>
        <td>
          <p>Select/Fire</p>
        </td>
      </tr>
      <tr>
        <td>
          <p>Right Click</p>
        </td>
        <td>
          <p>Build</p>
        </td>
      </tr>
      <tr>
        <td>
          <p>R</p>
        </td>
        <td>
          <p>Reload</p>
        </td>
      </tr>
      <tr>
        <td>
          <p>Z</p>
        </td>
        <td>
          <p>Spawn Enemy (TEMP)</p>
        </td>
      </tr>
    </table>

  </body>

  <!--
  <script type="module" src="./f1.js"></script>
  <script type="module" src="./f2.js"></script>

  <script type="module" src="./main_v0.0.1_inprog.js"></script>
  <script type="module" src="./data/data_chassis.js"></script>
  <script type="module" src="./data/data_enemies.js"></script>
  <script type="module" src="./data/data_levels.js"></script>
  <script type="module" src="./data/data_ui.js"></script>
  <script type="module" src="./data/data_utilities.js"></script>
  <script type="module" src="./data/data_weapons.js"></script>
  -->

  <script src="./data/data_chassis.js"></script>
  <script src="./data/data_enemies.js"></script>
  <script src="./data/data_levels.js"></script>
  <script src="./data/data_player.js"></script>
  <script src="./data/data_ui.js"></script>
  <script src="./data/data_utilities.js"></script>
  <script src="./data/data_weapons.js"></script>
  
  <script src="./main_v0.0.1_inprog.js"></script>

</html>
