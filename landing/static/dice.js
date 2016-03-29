/**
 * Created by ben on 3/15/16.
 */

var gameState = "open";  //valid states are "open", "loss", "win"
var currentPlayer = {};

//TODO Generalize Continents, treatment center, and CDC - or at least assess if it's worth it.
var infectionBag = {
  red: 12,
  blue: 12,
  black: 12,
  yellow: 12
};
var treatmentCenter = {
  red: 0,
  blue: 0,
  black: 0,
  yellow: 0
};
var cdc = {
  red: 0,
  blue: 0,
  black: 0,
  yellow: 0
};
var roles = [
  "Generalist",
  "Contingency Planner",
  "Scientist",
  "Medic",
  "Dispatcher",
  "Researcher",
  "Containment Specialist"
];

var outbreaks = 0;
var infectionRate = 0;

//Note, continents array is zero-indexed but continent ids start at 1
var continents = [];
var players = [];

var Continent = function Continent(num) {
  this.id = num;
  this.red = 0;
  this.blue = 0;
  this.black = 0;
  this.yellow = 0;
  this.players = [];
};

Continent.prototype.displayPlayers = function() {
  var str = "";
  if (this.players.length > 0) {
    for (var i = 0; i < this.players.length; i++) {
      str += "<span class='" + this.players[i].spanClass + "'>" + this.players[i].name + "</span> ";
    }
  } else {
    str = "Empty";
  }
  return str;
};

var Player = function Player(name, order, role) {
  this.name = name;
  this.playerNum = order + 1; //to keep track of zero-indexing
  this.role = role;
  this.spanClass = role.substring(0, 5).toLowerCase();
  this.actions = [];
  this.holding = [];
};

Player.prototype.displayHolding = function() {
  var str = "";
  if (this.holding.length > 0) {
    for (hold in holding) {  //this line doesnt make sense, Ben.  Wrong language.
      str += hold;
    }
  } else {
    str = "Nothing";
  }
  return str;
};

//Roll action dice for given role and resolve
var actionDice = function(role) {

  var numActions = role === "Generalist" ? 7 : 5;
  var ignoredHazard = false; //this is set to true once the generalist ignores their first hazard

  $("#currentRoll").empty();

  //draw action zones
  for (var i = 0; i < numActions; i++) {
    var actionElement = "<tr id='action" + (i+1) + "'>" +
      "<td><button class='use'>Use</button></td><td><span class='result'> </span></td></td><td><button class='reroll'>Re-roll</button></td></tr>";
    $("#currentRoll").append(actionElement);
  }

  $(".result").addClass(currentPlayer.spanClass);

  for (i = 0; i < numActions; i++) {

    rollAction(i);

    /*
    var action = currentPlayer.actions[Math.floor(Math.random() * 6)];
    $("#action" + (i+1) + " span").text(action);
    
    if (action === "hazard") {
      $("#action" + (i+1) + " button").hide();
      $("#action" + (i+1) + " span").addClass("hazard");
      if (currentPlayer.role === "Generalist" && ignoredHazard === false) {
        ignoredHazard = true;
      }
    } else {
      infectionRate++;
      //refreshValues(); do I need to here?  Somehow, draw the next infection rate, but maybe not all the values
    }
    */
  }

  $(".reroll").click(function() {
    rollAction(this.id +1);
  })
};

//player action dice
var assignActions = function(player) {
  switch (player.spanClass) {
    case ("conta"):
      player.actions = ["fly", "sample", "boat", "contain", "treat", "hazard"];
      break;
    case ("scien"):
      player.actions = ["boat", "sample", "treat", "boattreat", "boatsample", "hazard"];
      break;
    case ("medic"):
      player.actions = ["fly", "sample", "double", "triple", "flytreat", "hazard"];
      break;
    case ("dispa"):
      player.actions = ["fly", "sample", "boattreat", "sample", "chopper", "hazard"];
      break;
    case ("conti"):
      player.actions = ["fly", "sample", "boattreat", "cdc", "treat", "hazard"];
      break;
    case ("gener"):
      player.actions = ["fly", "sample", "treat", "treat", "boat", "hazard"];
      break;
    case ("resea"):
      player.actions = ["treat", "sample", "treat", "boat", "boatsample", "hazard"];
      break;  
  }
};

//draw initial page
var drawPage = function() {
  for (i = 1; i <= 6; i++) {
    var newContinent = "<tr id='cont" + i + "'><td><strong>Continent " + i + " - </strong></td><br>" +
      "<td class='red'></td><br>" +
      "<td class='blue'></td><br>" +
      "<td class='black''></td><br>" +
      "<td class='yellow'></td><br>" +
      "<td class='pawns'></td></tr><br>";
    $("#continents").append(newContinent);
  }

  //draw Treatment Center
  $("#treatmentCenter").append("<tr><td><strong>Treatment Center - </strong></td><td class='red'></td><br>" +
    "<td class='blue'></td><br>" +
    "<td class='black'></td><br>" +
    "<td class='yellow'></td><br></tr>");

  //draw CDC
  $("#cdc").append("<tr><td><strong>CDC - </strong></td><td class='red'></td><br>" +
    "<td class='blue'></td><br>" +
    "<td class='black'></td><br>" +
    "<td class='yellow'></td><br></tr>");

  //draw players
  for (var i = 0; i < players.length; i++) {
    var newPlayer = "<tr id='player" + i + "'>" +
      "<td>Player " + players[i].playerNum + ": <strong>" + players[i].name + "</strong></td>" +
      "<td class='" + players[i].spanClass + "'> " + players[i].role + "</td><td>Holding: " + players[i].displayHolding() + "</td></tr>";
    $("#players").append(newPlayer);
    $(".roll").hide();
  }
};

//Pick 12 dice randomly from the Infection Bag and roll them onto the board
var initialInfect = function() {
  var firstRoll = pickDice(12);
  var red = firstRoll.red;
  var blue = firstRoll.blue;
  var black = firstRoll.black;
  var yellow = firstRoll.yellow;

  if (red > 0) {
    for (var r = 0; r < red; r++) {
      do {
        var resultRed = rollDie("red");
      } while (resultRed == 0 || continents[resultRed - 1].red >= 3);
      continents[resultRed - 1].red++;
    }
  }

  if (blue > 0) {
    for (var b = 0; b < blue; b++) {
      do {
        var resultBlue = rollDie("blue");
      } while (resultBlue == 0 || continents[resultBlue - 1].blue >= 3);
      continents[resultBlue - 1].blue++;
    }
  }

  if (black > 0) {
    for (var k = 0; k < black; k++) {
      do {
        var resultBlack = rollDie("black");
      } while (resultBlack == 0 || continents[resultBlack - 1].black >= 3);
      continents[resultBlack - 1].black++;
    }
  }

  if (yellow > 0) {
    for (var y = 0; y < yellow; y++) {
      do {
        var resultYellow = rollDie("yellow");
      } while (resultYellow == 0 || continents[resultYellow - 1].yellow >= 3);
      continents[resultYellow - 1].yellow++;
    }
  }
  refreshValues();
};

//The GAME
var mainLoop = function() {
  //this cant be a loop until you finish coding the loop, dolt.
  //while (gameState === "open") {
    $("#player" + (currentPlayer.playerNum - 1)).addClass("current");

    actionDice(currentPlayer.role);
  /*
    passSamples(currentPlayer);
    attemptCure(currentPlayer);
    infectRegions();
    */

    //advance player here
  //}
};

//Start a new game
var newGame = function() {
  resetGame();
  pickPlayers();
  drawPage();
  initialInfect();
  mainLoop();
};

//Pick given amount of dice from the Infection Bag
var pickDice = function(amount) {

  //Lose if bag empties
  var diceRemaining = infectionBag.red + infectionBag.blue + infectionBag.black + infectionBag.yellow;
  if (diceRemaining - amount <= 0) {
    gameState = "loss";
    console.log("YOU LOSE");
  }

  var pickedDice = {
    red: 0,
    blue: 0,
    black: 0,
    yellow: 0
  };

  for (var i = 0; i < amount; i++) {
    var rand = Math.floor(Math.random() * 4);
    switch (rand) {
      case 0:
        infectionBag.red--;
        pickedDice.red++;
        break;
      case 1:
        infectionBag.blue--;
        pickedDice.blue++;
        break;
      case 2:
        infectionBag.black--;
        pickedDice.black++;
        break;
      case 3:
        infectionBag.yellow--;
        pickedDice.yellow++;
        break;
    }
  }
  return pickedDice;
};

//TODO make this a page form, not prompts
//Assign each player a role, choose who goes first
var pickPlayers = function() {
  var availableRoles = roles.slice(0);
  do {
    var numPlayers = prompt("How Many Players? (2-5)");
  } while (typeof numPlayers != "number" && (numPlayers < 2 || numPlayers > 5));
  //TODO other selection preferences
  var selectPref = "random";
  /* $("#charpick").slideDown();
   $("#submitSelectionPref").click(function() {
   numPlayers = $("#numPlayers").val();
   selectPref = $("input:radio[name=selectPref]:checked").val();
   $("#charpick").slideUp();
   });*/
  for (var i = 0; i < numPlayers; i++) {
    if (selectPref = "random") {
      var name = prompt("Player " + (i + 1) + " Name: ");
      var roleIndex = Math.floor(Math.random() * availableRoles.length);
      var newPlayer = new Player(name, i, availableRoles[roleIndex]);
      assignActions(newPlayer);
      players.push(newPlayer);
      continents[0].players.push(players[i]);
      availableRoles.splice(roleIndex, 1);
    }
  }

  var firstTurn = Math.floor(Math.random() * players.length);
  currentPlayer = players[firstTurn];
};

//Redraw correct values
var refreshValues = function() {

  //continents
  for (var i = 0; i < continents.length; i++) {
    if (continents[i].players.length > 0) {
      console.log("in continent" + i);
      $("#cont" + (i + 1) + " .pawns").append(" - " + continents[i].displayPlayers());
    } else {
      $("#cont" + (i + 1) + " .pawns").hide();
    }
    if (continents[i].red > 0) {
      $("#cont" + (i + 1) + " .red").text(continents[i].red);
    } else {
      $("#cont" + (i + 1) + " .red").hide();
    }
    if (continents[i].blue > 0) {
      $("#cont" + (i + 1) + " .blue").text(continents[i].blue);
    } else {
      $("#cont" + (i + 1) + " .blue").hide();
    }
    if (continents[i].black > 0) {
      $("#cont" + (i + 1) + " .black").text(continents[i].black);
    } else {
      $("#cont" + (i + 1) + " .black").hide();
    }
    if (continents[i].yellow > 0) {
      $("#cont" + (i + 1) + " .yellow").text(continents[i].yellow);
    } else {
      $("#cont" + (i + 1) + " .yellow").hide();
    }

    //treatment center
    if (treatmentCenter.red > 0) {
      $("#treatmentCenter" + (i + 1) + " .red").text(treatmentCenter.red);
    } else {
      $("#treatmentCenter" + (i + 1) + " .red").hide();
    }
    if (treatmentCenter.blue > 0) {
      $("#treatmentCenter" + (i + 1) + " .blue").text(treatmentCenter.blue);
    } else {
      $("#treatmentCenter" + (i + 1) + " .blue").hide();
    }
    if (treatmentCenter.black > 0) {
      $("#treatmentCenter" + (i + 1) + " .black").text(treatmentCenter.black);
    } else {
      $("#treatmentCenter" + (i + 1) + " .black").hide();
    }
    if (treatmentCenter.yellow > 0) {
      $("#treatmentCenter" + (i + 1) + " .yellow").text(treatmentCenter.yellow);
    } else {
      $("#treatmentCenter" + (i + 1) + " .yellow").hide();
    }
  }
};

//Zero all game variables
var resetGame = function() {
  //reset game variables
  gameState = "open";
  currentPlayer = {};
  players.splice(0, players.length);

  treatmentCenter.red = 0;
  treatmentCenter.blue = 0;
  treatmentCenter.black = 0;
  treatmentCenter.yellow = 0;

  cdc.red = 0;
  cdc.blue = 0;
  cdc.black = 0;
  cdc.yellow = 0;

  continents.splice(0, continents.length);

  for (i = 1; i <= 6; i++)
    continents.push(new Continent(i));

  //reset board
  $('table').empty();
};

//color is a string
var rollDie = function(color) {
  var roll = Math.floor(Math.random() * 6);
  var result;
  switch (color) {
    case "red":
      switch (roll) {
        case 0:
          result = 0;
          break;
        case 1:
        case 2:
          result = 1;
          break;
        case 3:
          result = 4;
          break;
        case 4:
        case 5:
          result = 6;
          break;
      }
      break;
    case "blue":
      switch (roll) {
        case 0:
          result = 0;
          break;
        case 1:
          result = 1;
          break;
        case 2:
          result = 2;
          break;
        case 3:
          result = 3;
          break;
        case 4:
        case 5:
          result = 6;
          break;
      }
      break;
    case "black":
      switch (roll) {
        case 0:
          result = 0;
          break;
        case 1:
        case 2:
        case 3:
          result = 3;
          break;
        case 4:
          result = 4;
          break;
        case 5:
          result = 5;
          break;
      }
      break;
    case "yellow":
      switch (roll) {
        case 0:
          result = 0;
          break;
        case 1:
        case 2:
          result = 2;
          break;
        case 3:
          result = 4;
          break;
        case 4:
        case 5:
          result = 5;
          break;
      }
      break;
  }
  return result;
};

var rollAction = function(i) {
  var action = currentPlayer.actions[Math.floor(Math.random() * 6)];

  $("#action" + (i+1) + " span").text(action);

  if (action === "hazard") {

    $("#action" + (i+1) + " button").hide();
    $("#action" + (i+1) + " span").addClass("hazard");

    if (currentPlayer.role === "Generalist" && ignoredHazard === false) {
      ignoredHazard = true;
    }

  } else {
    infectionRate++;
    //refreshValues(); do I need to here?  Somehow, draw the next infection rate, but maybe not all the values
  }
  return action;
};

$(document).ready(function() {
  $("#start").click(function() {
    newGame();
  });
});