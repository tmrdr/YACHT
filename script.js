document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded");
});
reset();

///dice roll random numbers
function random(die){
  die = Math.ceil(Math.random() * 6);
  return die;
}

function rollDie(id) {
  var die = $(id);
  if (die.hasClass("active")){
    die.removeClass("face1 face2 face3 face4 face5 face6");
    die.animate({marginLeft: (Math.random()*2.3)* 100}, 130);
    var roll = random(die);
    die.addClass("face" + roll);
    return roll;
  }
}

/// roll button rolls dice
$("#roll").click(rollEachDie);

function rollEachDie() {
  var rolls = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0};
  for (var i = 0; i < 6; i++) {
    var roll = rollDie("#die" + i);
    rolls[roll]++;
  }

  displayScores(rolls);

}


//check if yacht
if (die1 == die2 == die3 == die4 == die5){
  $("#yacht").text(50).addClass("redtext");
}else{}


//count up number of numbers and add dice faces
function displayScores(rolls) {
  var ones = rolls[1];
  var twos = (rolls[2] *2);
  var threes = (rolls[3] *3);
  var fours = (rolls[4] * 4);
  var fives = (rolls[5] * 5);
  var sixes = (rolls[6] * 6);
  console.log(ones, twos, threes, fours, fives, sixes);

//display on scorecard
  if(ones !== 0){
    $("#ones").text(ones).addClass("redtext");
  } else {
    $("#ones").text("");
  }

  if(twos !== 0){
    $("#twos").text(twos).addClass("redtext");
  } else {
    $("#twos").text("");
  }

  if (threes !== 0){
    $("#threes").text(threes).addClass("redtext");
  } else {
    $("#threes").text("");
  }

  if (fours !== 0){
    $("#fours").text(fours).addClass("redtext");
  } else {
    $("#fours").text("");
  }

  if (fives !== 0){
    $("#fives").text(fives).addClass("redtext");
  } else {
    $("#fives").text("");
  }

  if (sixes !== 0){
    $("#sixes").text(sixes).addClass("redtext");
  } else {
    $("#sixes").text("");
  }
}


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

  //reset dice
  resetDie("#die1", "face1");
  resetDie("#die2", "face2");
  resetDie("#die3", "face3");
  resetDie("#die4", "face4");
  resetDie("#die5", "face5");

  //reset board
  $("#ones").text("").removeClass("redtext");
  $("#twos").text("").removeClass("redtext");
  $("#threes").text("").removeClass("redtext");
  $("#fours").text("").removeClass("redtext");
  $("#fives").text("").removeClass("redtext");
  $("#sixes").text("").removeClass("redtext");
}

$(".dice").click(function(ev){
  var die = $(ev.target);
  if (die.hasClass("active")){
    die.removeClass("active");
    die.addClass("held");
    die.animate({marginLeft: 5});
  } else if(die.hasClass("held")){
    die.removeClass("held");
    die.addClass("active");
  }
});


/// TO DO tuesday:

/// add held function that will disable dice from being rolled

// able to click score to confirm, and will not be over written on  next roll
