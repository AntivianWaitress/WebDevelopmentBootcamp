// $("h1").css("color", "red");

// $("h1").toggleClass("big-title yellow");

// var classYellowIntegrated = $("h1").hasClass("yellow");
//
// if (classYellowIntegrated === true){
//   $("h1").text("This h1 has the class 'yellow'.");
//   $("h1").toggleClass("big-title");
// };
//
// $("button").html("<em>Hey</em>");
//
// $("img").attr("src");
//
// $("a").attr("href", "http://www.bing.com");

// $("h1").click(function() {
//   $("h1").toggleClass("yellow");
// });


$("button").click(function() {
  $("h1").slideUp().slideDown().animate({opacity: 0.5});
});
//
// $("input").keypress(function(event){
//   console.log(event.key);
// });

// $(document).keypress(function(event){
//   $("h1").text(event.key);
// });

// $("h1").on("mouseover", function() {
//   $("h1").css("color", "purple");
// });
