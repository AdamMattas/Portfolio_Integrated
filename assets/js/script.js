var hangman = {
    title:"Star Trek Hangman Game",
    image:"assets/images/hangman_side.jpg",
    body:"This was the first JavaScript project I had for the Rutgers Coding Boot Camp. I am particularly proud of the way the final product came together. The languages used to create this game were HTML5, CSS3 & JavaScript. Event listeners in the JavaScript code were the key to making the videos and game function so well together. They allow for the timimg of the user's inputs to be unpredictable without the overlapping of videos. I hope that you enjoy playing this game as much as I enjoyed programming it.",
    link:"hangman/index.html",
    linkName:"Play Now"
},
rpg = {
    title:"Star Wars RPG Game",
    image:"assets/images/rpg_side.jpg",
    body:"This was the first jQuery project I had for the Rutgers Coding Boot Camp. The characters in the game all have a different combination of health, attack & counterattack attributes. Every time a character attacks, their health increases by its base number. The strategy of this game is to initially attack opponents that have the lowest counterattack. This allows you to build up your attack power before attacking the stronger opponents. The languages used to create this game were HTML5, CSS3, jQuery & JavaScript. The movement of characters was done by adding and removing CSS3 classes via jQuery while certain conditions exist. The jQuery animate capability was used to display the character's calculated health in the lightsaber health meter.",
    link:"rpg/index.html",
    linkName:"Play Now"
},
trivia = {
    title:"The Simpsons Trivia Game",
    image:"assets/images/simpsons_side.jpg",
    body:"Press the green arcade button to begin testing your Simpsons expertise. This project employs the use of timers to limit how long the user has to answer each trivia question. If the timer reaches zero, the guess is counted as incorrect and the program continues. HTML5 videos with JavaScript event listeners were used to enhance the user experience. The jQuery animate capability was used to show and hide the answer section as well as the score counters.",
    link:"simpsons/index.html",
    linkName:"Play Now"
},
giphy = {
    title:"Fate of the Union API",
    image:"assets/images/fate_side.jpg",
    body:"Regardless of political ideology we all love seeing political figures in hilarious animated gifs. This small application is powered by an API that allows you to search for animated gifs. I have hard coded a few options with some of the more current political icons. Feel free to add more options by typing a person's name in the input field. A new button will be dynamically added that will search the API for you. Click on any of the images returned to start the animation.",
    link:"giphy/index.html",
    linkName:"View Now"
},
trains = {
    title:"Firebase Train Schedule",
    image:"assets/images/trains_side.jpg",
    body:"Built with Bootstrap and powered by Firebase and Moment.js. This modest looking web app comes complete with user signup and authentication to access administrator capabilities. Authenticated users are authorized to edit and remove trains that have been added. Authentication is not required to add a new train to the table and store it in the database. The train times are precisely calculated using features of the Moment.js library and are constantly updated on the page.",
    link:"trains/index.html",
    linkName:"View Now"
},
travel = {
    title:"I Was Here",
    image:"assets/images/i_was_here_side.jpg",
    body:"testing testing testing testing testtesting test testing testing ",
    link:"travel/index.html",
    linkName:"View Now"
},
audio = {
    title:"AudioTheory.com",
    image:"assets/images/audio_side.jpg",
    body:"testing testing testing testing testtesting test testing testing ",
    link:"http://www.audiotheory.com/",
    linkName:"View Now"
},
mta = {
    title:"MTA Talent Agency",
    image:"assets/images/mtaTalent_side.jpg",
    body:"testing testing testing testing testtesting test testing testing ",
    link:"http://www.mtatalent.com/",
    linkName:"View Now"
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

    var sideLink = $('<a>'); //creates a new p element
    sideLink.attr('href', objName.link); //added src attribute from object
    sideLink.text(objName.linkName); //adds text from object
    sideLink.addClass('btn btn-danger side-button'); //added class to image

    $('.listener').empty();
    $('#listen').prepend(sideLink);//prepends dynamic element to listen div
    $('#listen').prepend(sideText);//prepends dynamic element to listen div
    $('#listen').prepend(sideImage);//prepends dynamic element to listen div
    $('#listen').prepend(sideTitle);//prepends dynamic element to listen div

  });

});