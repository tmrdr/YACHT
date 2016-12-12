document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded");
});

///dice roll random numbers
function random(){
  var output = Math.random() * 10;
  if (output <= (10/6)){
    output = 1;
    return output;
  } else if (output <= ((10/6)*2)) {
    output = 2;
    return output;
  }else if (output <= ((10/6)*3)) {
    output = 3;
    return output;
  } else if (output <= ((10/6)*4)) {
    output = 4;
    return output;
  } else if (output <= ((10/6)*5)) {
    output = 5;
    return output;
  } else if (output <= ((10/6)*6)){
    output = 6;
    return output;
  }
}

/// roll button rolls dice
$("#roll").click(rollDice);
function rollDice(){
  console.log("rolled");
  var die1 = $("#die1").removeClass("oneface twoface threeface fourface fiveface sixface");
  var die2 = $("#die2").removeClass("oneface twoface threeface fourface fiveface sixface");
  var die3 = $("#die3").removeClass("oneface twoface threeface fourface fiveface sixface");
  var die4 = $("#die4").removeClass("oneface twoface threeface fourface fiveface sixface");
  var die5 = $("#die5").removeClass("oneface twoface threeface fourface fiveface sixface");

  var dice = {
    die1: random(),
    die2: random(),
    die3: random(),
    die4: random(),
    die5: random()
  };


//count up number of numbers and add dice faces
  var ones = 0;
  var twos = 0;
  var threes = 0;
  var fours = 0;
  var fives = 0;
  var sixes = 0;

  for (i=1; i<6; i++){
    var die = $("#die" + i);
    var roll = dice["die" + i];

    if (roll == 1) {
      die.addClass("oneface");
      ones++;
    } else if (roll == 2) {
      die.addClass("twoface");
      twos++;
    } else if (roll == 3) {
      die.addClass("threeface");
      threes++;
    } else if (roll == 4) {
      die.addClass("fourface");
      fours++;
    } else if (roll == 5) {
      die.addClass("fiveface");
      fives++;
    } else if (roll == 6) {
      die.addClass("sixface");
      sixes++;
    }
  }
  twos = (twos *2);
  threes = (threes *3);
  fours = (fours * 4);
  fives = (fives * 5);
  sixes = (sixes * 6);
  console.log(ones, twos, threes, fours, fives, sixes);

//display on scorecard

  $("#ones").text(ones).addClass("redtext");
  $("#twos").text(twos).addClass("redtext");
  $("#threes").text(threes).addClass("redtext");
  $("#fours").text(fours).addClass("redtext");
  $("#fives").text(fives).addClass("redtext");
  $("#sixes").text(sixes).addClass("redtext");
}



//reset
$("#reset").click(reset);
function reset(){
  console.log("reset");
  var die1 = $("#die1").removeClass("twoface threeface fourface fiveface sixface").addClass("oneface");
  var die2 = $("#die2").removeClass("oneface threeface fourface fiveface sixface").addClass("twoface");
  var die3 = $("#die3").removeClass("oneface twoface fourface fiveface sixface").addClass("threeface");
  var die4 = $("#die4").removeClass("oneface twoface threeface fiveface sixface").addClass("fourface");
  var die5 = $("#die5").removeClass("oneface twoface threeface fourface sixface").addClass("fiveface");

  $("#ones").text("0").removeClass("redtext");
  $("#twos").text("0").removeClass("redtext");
  $("#threes").text("0").removeClass("redtext");
  $("#fours").text("0").removeClass("redtext");
  $("#fives").text("0").removeClass("redtext");
  $("#sixes").text("0").removeClass("redtext");
}

//go to rules page
$("#rules").click(function(){
  location.href = "rules.html";
});

//go back
$("#back").click(function(){
  location.href = "index.html";
});
