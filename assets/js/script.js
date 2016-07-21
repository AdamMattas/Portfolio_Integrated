var hangman = {
    title:"Star Trek Hangman Game",
    image:"assets/images/hangman_side.jpg",
    body:"testing testing testing testing testtesting test testing testing ",
    link:"hangman/index.html"
},
rpg = {
    title:"Star Wars RPG Game",
    image:"assets/images/rpg_side.jpg",
    body:"testing testing testing testing testtesting test testing testing ",
    link:"rpg/index.html"
},
trivia = {
    title:"The Simpsons Trivia Game",
    image:"assets/images/simpsons_side.jpg",
    body:"testing testing testing testing testtesting test testing testing ",
    link:"simpsons/index.html"
},
giphy = {
    title:"Fate of the Union API",
    image:"assets/images/fate_side.jpg",
    body:"testing testing testing testing testtesting test testing testing ",
    link:"giphy/index.html"
},
trains = {
    title:"Firebase Train Schedule",
    image:"assets/images/trains_side.jpg",
    body:"testing testing testing testing testtesting test testing testing ",
    link:"trains/index.html"
},
travel = {
    title:"I Was Here",
    image:"assets/images/i_was_here_side.jpg",
    body:"testing testing testing testing testtesting test testing testing ",
    link:"travel/index.html"
},
audio = {
    title:"AudioTheory.com",
    image:"assets/images/audio_side.jpg",
    body:"testing testing testing testing testtesting test testing testing ",
    link:"http://www.audiotheory.com/"
},
mta = {
    title:"MTA Talent Agency",
    image:"assets/images/mtaTalent_side.jpg",
    body:"testing testing testing testing testtesting test testing testing ",
    link:"http://www.mtatalent.com/"
};

$(document).on("ready", function(){

  $('.image-wrapper').on('mouseenter', function(){
    
    var name = $(this).data('name');
    var objName = eval(name);

    var sideTitle = $('<h4>'); //creates a new h4 element
    sideTitle.text(objName.title); //adds text from object
    sideTitle.addClass('port-detail-bold'); //added class to image

    var sideImage = $('<img>'); //creates a new image element
    sideImage.attr('src', objName.image); //added src attribute from object
    sideImage.addClass('side-image'); //added class to image

    var sideText = $('<p>'); //creates a new p element
    sideText.text(objName.body); //adds text from object

    $('.listener').empty();
    $('#listen').prepend(sideText);//prepends dynamic element to listen div
    $('#listen').prepend(sideImage);//prepends dynamic element to listen div
    $('#listen').prepend(sideTitle);//prepends dynamic element to listen div

  });

});