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

//animate rolling
$(die1).animate({marginLeft: (Math.random()*2)* 100});
$(die2).animate({marginLeft: (Math.random()*2)* 100});
$(die3).animate({marginLeft: (Math.random()*2)* 100});
$(die4).animate({marginLeft: (Math.random()*2)* 100});
$(die5).animate({marginLeft: (Math.random()*2)* 100});



  var dice = {
    die1: random(),
    die2: random(),
    die3: random(),
    die4: random(),
    die5: random()
  };

//check if yacht
if (die1 == die2 == die3 == die4 == die5){
  $("#yacht").text(50).addClass("redtext");
}else{}


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
  if(ones !== 0 ){
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

//lock in score
function lockin(){

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

  $(die1).animate({marginLeft: 5});
  $(die2).animate({marginLeft: 5});
  $(die3).animate({marginLeft: 5});
  $(die4).animate({marginLeft: 5});
  $(die5).animate({marginLeft: 5});

  $("#ones").text("").removeClass("redtext");
  $("#twos").text("").removeClass("redtext");
  $("#threes").text("").removeClass("redtext");
  $("#fours").text("").removeClass("redtext");
  $("#fives").text("").removeClass("redtext");
  $("#sixes").text("").removeClass("redtext");
}

//go to rules page
$("#rules").click(function(){
  location.href = "rules.html";
});

//go back
$("#back").click(function(){
  location.href = "index.html";
});


/// TO DO tuesday:

/// add held function that will disable dice from being rolled

// able to click score to confirm, and will not be over written on  next roll

//animate dice spinning
