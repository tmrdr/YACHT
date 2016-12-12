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

  console.log(die1, die2, die3, die4, die5);

  for (i=1; i<7; i++){
    var die = $("#die" + i);
    var roll = dice["die" + i];

    if (roll == 1) {
      die.addClass("oneface");
    } else if (roll == 2) {
      die.addClass("twoface");
    } else if (roll == 3) {
      die.addClass("threeface");
    } else if (roll == 4) {
      die.addClass("fourface");
    } else if (roll == 5) {
      die.addClass("fiveface");
    } else if (roll == 6) {
      die.addClass("sixface");
    }


  }
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
}

//go to rules page
$("#rules").click(function(){
  location.href = "rules.html";
});

//go back
$("#back").click(function(){
  location.href = "index.html";
});
