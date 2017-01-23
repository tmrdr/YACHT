var rollcounter = 0;
var turncount = 0;
var inPlay = {
  "ones": 0,
  "twos": 0,
  "threes": 0,
  "fours": 0,
  "fives": 0,
  "sixes": 0,
  "yacht": 0
};

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded");
  reset();
});

// if (turncount >= 1){
//   endGame();
// }



function endTurn() {

  rollcounter = 0;
  resetDie("#die1", "face1");
  resetDie("#die2", "face2");
  resetDie("#die3", "face3");
  resetDie("#die4", "face4");
  resetDie("#die5", "face5");
  $(".inplay").text("");
  $("#roll").prop("disabled",false);
  $("#roll").text("ROLL");
}

function endGame(){
  $("#roll").prop("disabled",true);
  $("#roll").text("Game Over");
}


///dice roll random numbers
function random(die){
  die = Math.ceil(Math.random() * 6);
  return die;
}

function rollDie(id) {
  var die = $(id);
  if (die.hasClass("held")){
    return parseInt(die.attr("data-value"), 10); //keeps held dice score
  } else if (!die.hasClass("active")){
    return;
  }

  die.animate({marginLeft: (Math.random()*2.3)* 100}, 130); //throws

  // adds tilt
  if ($("#die1").hasClass("active")){
    $("#die1").addClass("rotate");
  }  if ($("#die3").hasClass("active")){
    $("#die3").addClass("rotate2");
  }  if ($("#die5").hasClass("active")){
    $("#die5").addClass("rotate3");
  }

  var actualRoll = random(die); // real value
  var timer = setInterval(function(){ // scramble faces
    var roll = random(die);
    die.attr("data-value", roll);
    die.removeClass("face1 face2 face3 face4 face5 face6");
    die.addClass("face" + roll);
  }, 20);
  setTimeout(function(){
    clearInterval(timer);
    die.attr("data-value", actualRoll); /// /// / // / // // / // // // / // //  // /
    die.removeClass("face1 face2 face3 face4 face5 face6");
    die.addClass("face" + actualRoll);
  }, 250);

  return actualRoll;
}




/// roll button rolls dice
$("#roll").click(rollEachDie);

function rollEachDie() {
  rollcounter++;
  if (rollcounter == 1){
    $("#roll").text("2 rolls left");
  }
  if (rollcounter == 2){
    $("#roll").text("1 roll left");
  }
  if (rollcounter == 3){
    $("#roll").prop("disabled",true);
    $("#roll").text("No rolls left");
  }
  if (rollcounter > 3){
    console.log("turn ended");
    endTurn();
  } else {

    var rolls = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0};
    for (var i = 0; i < 6; i++) {
      var roll = rollDie("#die" + i);
      rolls[roll]++;
    }

    displayScores(rolls);
  }
}




function getLocked(number){
  return inPlay[number];
}


function setLocked(number, value){
  value = parseInt(value, 10);
  inPlay[number] = value;
}


function displayScores(rolls) {
  var ones = getLocked("ones") <= 0 ? rolls[1] : getLocked("ones");
  var twos = getLocked("twos") <= 0 ? (rolls[2] *2) : getLocked("twos");
  var threes = getLocked("threes") <= 0 ? (rolls[3] *3) :getLocked("threes");
  var fours = getLocked("fours") <= 0 ? (rolls[4] * 4): getLocked("fours");
  var fives = getLocked("fives") <= 0 ? (rolls[5] * 5): getLocked("fives");
  var sixes = getLocked("sixes") <= 0 ? (rolls[6] * 6): getLocked("sixes");
  var yacht = getLocked("yacht") <= 0 ? 0 : getLocked("yacht");

  console.log(die1.getAttribute("data-value"), die2.getAttribute("data-value"), die3.getAttribute("data-value"),die4.getAttribute("data-value"),die5.getAttribute("data-value"));
//check for YACHT
  if (die1.getAttribute("data-value") !== null &&
      die1.getAttribute("data-value") !== 0 &&
      die1.getAttribute("data-value") == die2.getAttribute("data-value") &&
      die1.getAttribute("data-value") == die3.getAttribute("data-value") &&
      die1.getAttribute("data-value") == die4.getAttribute("data-value") &&
      die1.getAttribute("data-value") == die5.getAttribute("data-value")){
        console.log("if statement rached");
  yacht = 50;
  }
  console.log(yacht);
  var total = (getLocked("ones") + getLocked("twos") + getLocked("threes") + getLocked("fours") + getLocked("fives") + getLocked("sixes")) + getLocked("yacht");

//display on scorecard
  if(ones > 0){ // & card is in play
    $("#ones").text(ones);
  }else if ((ones === 0) && (rollcounter == 3)){
    $("#ones").text(0);
  } else {
    $("#ones").text("");
  }

  if(twos > 0){
    $("#twos").text(twos);
  }else if ((twos === 0) && (rollcounter == 3)){
    $("#twos").text(0);
  } else {
    $("#twos").text("");
  }

  if (threes > 0){
    $("#threes").text(threes);
  }else if ((threes === 0) && (rollcounter == 3)){
    $("#threes").text(0);
  } else {
    $("#threes").text("");
  }

  if (fours > 0){
    $("#fours").text(fours);
  }else if ((fours === 0) && (rollcounter == 3)){
    $("#fours").text(0);
  } else {
    $("#fours").text("");
  }

  if (fives > 0){
    $("#fives").text(fives);
  }else if ((fives === 0) && (rollcounter == 3)){
    $("#fives").text(0);
  } else {
    $("#fives").text("");
  }

  if (sixes > 0){
    $("#sixes").text(sixes);
  }else if ((sixes === 0) && (rollcounter == 3)){
    $("#sixes").text(0);
  } else {
    $("#sixes").text("");
  }

  if (yacht > 0){
    $("#yacht").text(yacht);
  }else if ((yacht === 0) && (rollcounter == 3)){
    $("#yacht").text(0);
  } else {
    $("#yacht").text("");
  }

  if (total > 0){
    $("#total").text(total);
  }else if (total === 0){
    $("#total").text(0);
  } else {
    $("#total").text("");
  }

}


$(".inplay").click(function(event){
  if (event.target.textContent === "") {
    return;
  }
  console.log("inplay fired");
  lockin($(this)[0].id);
  endTurn();


});

function lockin(score){
  if ($("#" + score).hasClass("checked")){
    return;
  }
  rollcounter = 0;
  turncount++;
  $("#" + score).removeClass("inplay").addClass("checked");
  var currentscore = $("#" + score)[0].innerHTML;
  setLocked(score, currentscore);
  var currenttotal = $("#total")[0].innerHTML;

  console.log(currenttotal);

  if (currenttotal !== "" && !isNaN(currenttotal)){
    currenttotal = parseInt(currenttotal);
    console.log("below isNaN");
  } else {
    currenttotal = 0;
  }
  if (currentscore !== "" && !isNaN(currentscore)){
    currentscore = parseInt(currentscore);
    console.log("below isNaN");
  } else {
    currentscore = 0;
  }
  var total = currenttotal + currentscore;
  $("#total").text(total);
}

   //takes cell out of play and turns text black. also should add value and keep the number from being over written by roll





function resetDie(id, dieFace) {
  var die = $(id);
  die.removeClass("face1 face2 face3 face4 face5 face6 rotate rotate2 rotate3 held");
  die.addClass(dieFace);
  die.addClass("active");
  die.animate({marginLeft: 5});
}

//reset
$("#reset").click(reset);
function reset(){
  console.log("reset");
  rollcounter = 0;
  $("#total").text("");
  inPlay = {
    "ones": 0,
    "twos": 0,
    "threes": 0,
    "fours": 0,
    "fives": 0,
    "sixes": 0,
    "yacht": 0
  };

  $("#roll").prop("disabled",false);
  $("#roll").text("ROLL");

  //reset dice
  resetDie("#die1", "face1");
  resetDie("#die2", "face2");
  resetDie("#die3", "face3");
  resetDie("#die4", "face4");
  resetDie("#die5", "face5");

  //reset board
  $("#ones").text("").removeClass("checked").addClass("inplay");
  $("#twos").text("").removeClass("checked").addClass("inplay");
  $("#threes").text("").removeClass("checked").addClass("inplay");
  $("#fours").text("").removeClass("checked").addClass("inplay");
  $("#fives").text("").removeClass("checked").addClass("inplay");
  $("#sixes").text("").removeClass("checked").addClass("inplay");
}

$(".dice").click(function(ev){
  var die = $(ev.target);
  if (die.hasClass("active")){
    die.removeClass("active rotate rotate2 rotate3");
    die.addClass("held");
    die.animate({marginLeft: 5});
  } else if(die.hasClass("held")){
    die.removeClass("held");
    die.addClass("active");
  }
});







// TO DO:


//endgame function

// connect top score w local storage
