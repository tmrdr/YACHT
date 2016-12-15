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





function endTurn() {
  if (turncount >= 7){
    endGame();
  }
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
  } else if (die.hasClass("active")){
    //slides
    die.animate({marginLeft: (Math.random()*2.3)* 100}, 130);
    //flips
    var timer = setInterval(function(){
      var roll = random(die);
      die.attr("data-value", roll);
      die.removeClass("face1 face2 face3 face4 face5 face6");
      die.addClass("face" + roll);
    }, 20);
    setTimeout(function(){
      clearInterval(timer);
    }, 250);

    //uh oh yacht bug
    
    // adds tilt
    if ($("#die1").hasClass("active")){
    $("#die1").addClass("rotate");
  }  if ($("#die3").hasClass("active")){
    $("#die3").addClass("rotate2");
  }  if ($("#die5").hasClass("active")){
    $("#die5").addClass("rotate3");
  }
    return roll;
  }
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
  if (die1.getAttribute("data-value") == die2.getAttribute("data-value") &&
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
  } else {
    $("#ones").text("");
  }

  if(twos > 0){
    $("#twos").text(twos);

  } else {
    $("#twos").text("");
  }

  if (threes > 0){
    $("#threes").text(threes);

  } else {
    $("#threes").text("");
  }

  if (fours > 0){
    $("#fours").text(fours);
  } else {
    $("#fours").text("");
  }

  if (fives > 0){
    $("#fives").text(fives);
  } else {
    $("#fives").text("");
  }

  if (sixes > 0){
    $("#sixes").text(sixes);
  } else {
    $("#sixes").text("");
  }

  if (yacht > 0){
    $("#yacht").text(yacht);
  } else {
    $("#yacht").text("");
  }

  if (total > 0){
    $("#total").text(total);
  }else{
    $("#total").text("");
  }

}


$(".inplay").click(function(event){
  if (event.target.textContent === "") {
    event.target.textContent = "0";
    endTurn();
    return;
  }
  console.log("inplay fired");
  lockin($(this)[0].id);
  endTurn();


});

function lockin(score){
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
  $("#ones").text("").addClass("inplay");
  $("#twos").text("").addClass("inplay");
  $("#threes").text("").addClass("inplay");
  $("#fours").text("").addClass("inplay");
  $("#fives").text("").addClass("inplay");
  $("#sixes").text("").addClass("inplay");
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
// fix 0'd out bug
// fix one behind with total score, or hide until end
// connect top score w local storage
// add yacht and other special sections
