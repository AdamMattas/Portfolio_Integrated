var hangman = {
    title:"Star Trek Hangman Game",
    image:"assets/images/hangman_side.jpg",
    body:"This was the first JavaScript project I had for the Rutgers Coding Boot Camp. I am particularly proud of the way the final product came together. The languages used to create this game were HTML5, CSS3 & JavaScript. Event listeners in the JavaScript code were the key to making the videos and game function so well together. They allow for the timimg of the user's inputs to be unpredictable without the overlapping of videos. I hope that you enjoy playing this game as much as I enjoyed programming it.",
    link:"hangman/index.html",
    linkName:"Play Now",
    rutgers: true,
    status: 1
},
rpg = {
    title:"Star Wars RPG Game",
    image:"assets/images/rpg_side.jpg",
    body:"This was the first jQuery project I had for the Rutgers Coding Boot Camp. The characters in the game all have a different combination of health, attack & counterattack attributes. Every time a character attacks, their health increases by its base number. The strategy of this game is to initially attack opponents that have the lowest counterattack. This allows you to build up your attack power before attacking the stronger opponents. The languages used to create this game were HTML5, CSS3, jQuery & JavaScript. The movement of characters was done by adding and removing CSS3 classes via jQuery while certain conditions exist. The jQuery animate capability was used to display the character's calculated health in the lightsaber health meter.",
    link:"rpg/index.html",
    linkName:"Play Now",
    rutgers: true,
    status: 1
},
trivia = {
    title:"The Simpsons Trivia Game",
    image:"assets/images/simpsons_side.jpg",
    body:"Press the green arcade button to begin testing your Simpsons expertise. This project employs the use of timers to limit how long the user has to answer each trivia question. If the timer reaches zero, the guess is counted as incorrect and the program continues. HTML5 videos with JavaScript event listeners were used to enhance the user experience. The jQuery animate capability was used to show and hide the answer section as well as the score counters.",
    link:"simpsons/index.html",
    linkName:"Play Now",
    rutgers: true,
    status: 1
},
giphy = {
    title:"Fate of the Union API",
    image:"assets/images/fate_side.jpg",
    body:"Regardless of political ideology we all love seeing political figures in hilarious animated gifs. This small application is powered by an API that allows you to search for animated gifs. I have hard coded a few options with some of the more current political icons. Feel free to add more options by typing a person's name in the input field. A new button will be dynamically added that will search the API for you. Click on any of the images returned to start the animation.",
    link:"giphy/index.html",
    linkName:"View Now",
    rutgers: true,
    status: 1
},
trains = {
    title:"Firebase Train Schedule",
    image:"assets/images/trains_side.jpg",
    body:"Built with Bootstrap and powered by Firebase and Moment.js. This modest looking web app comes complete with user signup and authentication to access administrator capabilities. Authenticated users are authorized to edit and remove trains that have been added. Authentication is not required to add a new train to the table and store it in the database. The train times are precisely calculated using features of the Moment.js library and are constantly updated on the page.",
    link:"trains/index.html",
    linkName:"View Now",
    rutgers: true,
    status: 1
},
travel = {
    title:"I Was Here",
    image:"assets/images/i_was_here_side.jpg",
    body:"I Was Here is a website for users to post and search for stories about travel. The stories posted on this site are complimented by 2 APIs. The Google Places API is used to search locations and return an image, address and checks for hours of operation to see if the location is currently open for business. Simultaneously, the latitude and longitude returned by Google Places is sent to the Weather Underground API, which returns the current weather for that location. Logged in users are able to post stories they would like to share and add keywords that are clickable and connected to the Google Places API. No user authentication is required to search for content on the site. Firebase was used for the user account creation and authentication, as well as to store posted content for the site.",
    link:"travel/index.html",
    linkName:"View Now",
    rutgers: true,
    status: 2
},
audio = {
    title:"AudioTheory.com",
    image:"assets/images/audio_side.jpg",
    body:"Audio Theory is a social networking site for musical artists and fans of music. Musicians will be able to upload their music and make the content available for purchase, streaming and or free download. This site is a personal project of mine and is currently under construction. At present, users can create accounts, change their encrypted password, log in to their personal profile, upload and change their profile picture, upload images to custom named categories in their photo gallery, send and receive fan requests, block communication and terminate fan status, send and receive instant messages, post, remove and reply to profile comments, share posts from other users and upload music to the server. I am currently designing the audio player and working on integrating it into the site for streaming songs and audio preview samples.",
    link:"http://www.audiotheory.com/",
    linkName:"View Now",
    rutgers: false,
    status: 2
},
mta = {
    title:"MTA Talent Agency",
    image:"assets/images/mtaTalent_side.jpg",
    body:"MTA is a SAG licensed, WGA (West Coast) franchised, full service talent agency. This site was built with administrator capabilities for adding new content and categories by the owner. This is done very simply by the owner and gives them total dynamic control over the content displayed on their site. The contact page has a simple interface that is capable of sending emails to the site owner without the user having to navigate to their own email service. This site is currently being finalized for mobile devices and will be receiving other minor implementations.",
    link:"http://www.mtatalent.com/",
    linkName:"View Now",
    rutgers: false,
    status: 3
};

$(document).on("ready", function(){

  $('#panel-portfolio').on('mouseenter', function(){

    $('.cover1').animate({ 'left': '-1000px', 'opacity': "0" }, 1000);
    $('.cover2').animate({ 'right': '-1500px', 'opacity': "0" }, 1000);
    $('.cover3').delay( 300 ).animate({ 'left': '-1000px', 'opacity': "0" }, 1000);
    $('.cover4').delay( 300 ).animate({ 'right': '-1500px', 'opacity': "0" }, 1000);
    $('.cover5').delay( 600 ).animate({ 'left': '-1000px', 'opacity': "0" }, 1000);
    $('.cover6').delay( 600 ).animate({ 'right': '-1500px', 'opacity': "0" }, 1000);
    $('.cover7').delay( 900 ).animate({ 'left': '-1000px', 'opacity': "0" }, 1000);
    $('.cover8').delay( 900 ).animate({ 'right': '-1500px', 'opacity': "0" }, 1000);
    $('.rutgers').animate({ 'opacity': 100 }, 30000);

  });

  $('.panel').on('mouseenter', function(){

    $('.bio-pic1').addClass('bio-pic-front');
    $('.bio-pic2').addClass('bio-pic-back');

  });

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