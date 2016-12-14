 //&& ("#ones".hasClass("inplay")) //after if for display on scorecard

 $("#ones").click(lockin("#ones")); // inside if, after red text


function lockin(score){
  $(score).removeClass("inplay").addClass("checked"); //takes cell out of play and turns text black. also should add value and keep the number from being over written by roll
}
