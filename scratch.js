



// function lockin(score){
//   $(score).removeClass("inplay").addClass("checked"); //takes cell out of play and turns text black. also should add value and keep the number from being over written by roll
// }


if (total > $("#topScore").text){
  var best = total;
  $("#topScore").text(total);
  localStorage.setItem(best);
}


//check if yacht
// if ((roll[0] == roll[1] == roll[2] == roll[3] == roll[4] && roll[i] !== 0)){
//   $("#yachts").text(50).addClass("clicked");
// }else{}
