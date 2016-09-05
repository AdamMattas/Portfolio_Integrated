// Object to populate Api Side Menu after click on About Page
var spotify = {
    title: "Spotify Music",
    image: "assets/images/spotify.png",
    placeholder: "Search Artist Name",
    id: "spotify-input",
    searchClass: "spotify-search"
},
nyt = {
    title: "The New York Times",
    image: "assets/images/nytimes.jpg",
    placeholder: "Search Articles",
    id: "nyt-input",
    searchClass: "nyt-search"
},
omdb = {
    title: "OMDb Movies",
    image: "assets/images/omdb.jpg",
    placeholder: "Search Movie Title",
    id: "omdb-input",
    searchClass: "omdb-search"
};

// Wrapping jQuery in Doc Ready function
$(document).on('ready', function(){

// =========================================
// BEGIN SPOTIFY API CODE

    // Adds song preview to Spotify audio player
    function spotifyPlayer(track){

        // Prevents duplicate players after multiple searches
        $('.player').remove();

        var playDiv = $('<div>'); //creates a new div element
        playDiv.addClass('player'); //adds player class to playDiv

        // Builds a Spotify player playing the parameter song. (NOTE YOU NEED TO BE LOGGED INTO SPOTIFY)
        var player = '<iframe class="spot-player" src="https://embed.spotify.com/?uri=spotify:track:' + track + '" frameborder="0" allowtransparency="true"></iframe>';

        // Append player to end of playDiv
        playDiv.append(player);

        // Prepends playDiv to main-api-panel (created dynamically during search submit)
        $(".main-api-panel").prepend(playDiv);

    }

    // Query spotify and build results divs
    function getArtistTrack(artist){

        // Run an initial search to identify the artist unique Spotify ID
        var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

            // Logs the entire object to console
            console.log(response);

            // Store the Artist ID from the Spotify Object
            var artistID = response.artists.items[0].id;

            // Build a SECOND URL to query another Spotify endpoint (this one for the tracks)
            var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID +"/top-tracks?country=US";

            // We then run a second AJAX call to get the tracks associated with that Spotify ID
            $.ajax({url: queryURLTracks, method: 'GET'}).done(function(trackResponse) {

                // Log the tracks to the console
                console.log(trackResponse);

                // Remove main-api-panel if it exists to clear the area for fresh results
                $('.main-api-panel').remove();

                var tracksContainer = $('<div>'); //creates a new div element
                tracksContainer.addClass('main-api-panel'); //adds classes to tracksContainer

                // Store response in variable
                var results = trackResponse.tracks;

                // Loop through the response
                for(var i = 0; i < results.length; i++){

                    var trackWrap = $('<div>'); //creates a new div element
                    trackWrap.addClass('col-md-4 track-container'); //adds classes to trackWrap

                    var trackImg = $('<img>'); //creates a new img element
                    trackImg.attr('src', results[i].album.images[1].url); //add img src from response
                    trackImg.data('id', results[i].id); //add data-id from results track id
                    trackImg.addClass('track-img'); //add track-img class to img element

                    var trackTitle = $('<p>'); //creates a new p element
                    trackTitle.text(results[i].album.name); //creates text node with album name

                    trackWrap.append(trackImg); //append trackImg to trackWrap
                    trackWrap.append(trackTitle); //append trackTitle to trackWrap

                    tracksContainer.append(trackWrap); //append trackWrap to tracksContainer

                }

                // Hide about Adam content
                $("#main-hidable").hide();

                // Appends the new dynamic content to main-panel div
                $("#main-panel").append(tracksContainer);

                // Call spotifyPlayer to add a new track to the audio player
                spotifyPlayer(trackResponse.tracks[0].id);
            })
        });     
    } // End of getArtistTrack function

    // Send a new track to the Spotify player when image is clicked
    $(document).on('click', '.track-img', function(){

        // Track ID is stored in the image's data-id
        var trackSend = $(this).data('id'); 

        // Call spotifyPlayer to add a new track to the audio player
        spotifyPlayer(trackSend);

    });

    // On Button Click for Artist Selection
    $(document).on('click', '#spotify-search', function(){

        // Grab the Artist Name
        var artist = $('#spotify-input').val().trim();

        // Run the Artist Player Function (Passing in the Artist as an Argument)
        getArtistTrack(artist);

        // Empty search area after submit
        $('#spotify-input').val('');

        // Prevents moving to the next page
        return false;
    });

// END SPOTIFY API CODE
// =========================================
// BEGIN THE NEW YORK TIMES API CODE

    // =========================================
    var authKey = "9d4a8986921972b65754ea0809d47c84:12:74623931";

    // Search Parameters
    var queryTerm   = "";
    var numResults  = 10;
    var startYear   = 0;
    var endYear     = 0;

    // URL Base
    var queryURLBase = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey; 

    // Variable to Track number of articles
    var articleCounter = 0;

    // FUNCTIONS
    // =========================================

    function runQuery(numArticles, queryURL){

        // AJAX Function
        $.ajax({url: queryURL, method: "GET"})
            .done(function(NYTData) {

                // Logging to Console
                console.log("------------------");
                console.log(queryURL);
                console.log("------------------");
                console.log(numArticles);
                console.log(NYTData);

                // Clear the wells from the previous run
                $('.main-api-panel').empty();

                var articleContainer = $('<div>'); //creates a new div element
                articleContainer.addClass('main-api-panel'); //adds classes to tracksContainer

                for (var i=0; i<numArticles; i++){

                    // Start Dumping to HTML Here
                    var articleWrap = $('<div>');
                    articleWrap.addClass("article-wrap");

                    var wellSection = $('<div>');
                    wellSection.addClass("article-well");
                    wellSection.attr('id', 'articleWell-' + i);

                    if(typeof NYTData.response.docs[i].multimedia[1] != "undefined") {
                        var wellBackground = $('<img>');
                        wellBackground.addClass('article-img');
                        wellBackground.attr('src', 'https://static01.nyt.com/' + NYTData.response.docs[i].multimedia[1].url);
                    }else{
                        var wellBackground = $('<img>');
                        wellBackground.addClass('article-img');
                        wellBackground.attr('src', 'assets/images/nytimes_lrg.jpg');    
                    }

                    // Check if things exist 
                    if(NYTData.response.docs[i].headline != "null") {
                        console.log(NYTData.response.docs[i].headline.main);
                        var articleTitle = $('<h3>');
                        articleTitle.addClass('relative-title');
                        articleTitle.text(NYTData.response.docs[i].headline.main);
                        //$(wellSection).append("<h3 class='relative-title'>" + NYTData.response.docs[i].headline.main +  "</h3>");
                    }

                    // Check if the byline 
                    if(NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")){
                        console.log(NYTData.response.docs[i].byline.original);
                        var articleByline = $('<h5>');
                        articleByline.addClass('relative');
                        articleByline.text(NYTData.response.docs[i].byline.original);
                        //$(wellSection).append("<h5 class='relative'>" + NYTData.response.docs[i].byline.original + "</h5>");
                    }

                    // Attach the content to the appropriate well
                    var sectionName = $('<h5>');
                    sectionName.addClass('relative');
                    sectionName.text(NYTData.response.docs[i].section_name);
                    //$(wellSection).append("<h5 class='relative'>" + NYTData.response.docs[i].section_name + "</h5>");
                    var articleDate = $('<h5>');
                    articleDate.addClass('relative');
                    articleDate.text(NYTData.response.docs[i].pub_date);
                    //$(wellSection).append("<h5 class='relative'>" + NYTData.response.docs[i].pub_date + "</h5>");

                    var articleLink = $('<a>');
                    articleLink.addClass('above');
                    articleLink.attr('href', NYTData.response.docs[i].web_url);
                    articleLink.attr('target', '_blank');
                    articleLink.text('VIEW');

                    // Hide about Adam content
                    $("#main-hidable").hide();

                    $(wellSection).append(wellBackground);
                    $(wellSection).append(articleTitle);
                    $(wellSection).append(articleByline);
                    $(wellSection).append(sectionName);
                    $(wellSection).append(articleDate);

                    $(articleWrap).append(articleLink);
                    $(articleWrap).append(wellSection);

                    $(articleContainer).append(articleWrap);

                    // Appends the new dynamic content to main-panel div
                    $("#main-panel").append(articleContainer);

                    console.log(NYTData.response.docs[i].section_name);
                    console.log(NYTData.response.docs[i].pub_date);
                    console.log(NYTData.response.docs[i].web_url);
                }


            })

    }

    // MAIN PROCESSES
    // =========================================

    $(document).on('click', '#nyt-search', function() {

        // Get Search Term
        queryTerm = $('#nyt-input').val().trim();

        // Add in the Search Term
        var newURL = queryURLBase + "&q=" + queryTerm;

        if (parseInt(startYear)) {

            // Add the necessary fields
            startYear = "20120101";

            // Add the date information to the URL
            newURL = newURL + "&begin_date=" + startYear;   
        }

        if(parseInt(endYear)){

            // Add the necessary fields
            endYear = "20160101";
            
            // Add the date information to the URL
            newURL = newURL + "&end_date=" + endYear;   
        } 

        // Send the AJAX Call the newly assembled URL 
        runQuery(numResults, newURL);

        $('#nyt-input').val('');

        return false;

    })

// END THE NEW YORK TIMES API CODE
// =========================================

    // API selection
    $('.api-button').on('click', function(){

        var width = $(document).width() - $('#squares-bottom-1').width();

        $('#squares-top-1').animate({ 'right': '0' }, 1500);
        $('#squares-bottom-1').animate({ 'left': width + 'px' }, 1500, function(){
            $('#squares-bottom-1').removeClass('squares-bottom').addClass('squares-bottom-animated').removeAttr("style")    
        });
    
        var name = $(this).data('name');
        var apiName = eval(name);

        var sideDiv = $('<div>');
        sideDiv.attr('id', 'api-search');

        var sideTitle = $('<h3>'); //creates a new h3 element
        sideTitle.text(apiName.title); //adds text from object
        sideTitle.addClass('api-title'); //added class to image

        var sideImage = $('<img>'); //creates a new image element
        sideImage.attr('src', apiName.image); //added src attribute from object
        sideImage.addClass('api-button'); //added class to image

        var sideForm = $('<form>'); //creates a new form element

        var sideText = $('<input>'); //creates a new input element
        sideText.attr('id', apiName.id); //adds an id to input
        sideText.attr('type', 'text'); //adds text type to input
        sideText.addClass('form-control api-input'); //adds classes to input element
        sideText.attr('placeholder', apiName.placeholder); //adds text from object

        var sideLink = $('<button>'); //creates a new p element
        sideLink.attr('id', apiName.searchClass); //added src attribute from object
        sideLink.text('Submit'); //adds text from object
        sideLink.addClass('btn btn-primary api-search-button'); //added class to image

        var sideClose = $('<button>'); //creates a new p element
        sideClose.text('Go Back'); //adds text from object
        sideClose.addClass('btn btn-danger api-restore'); //added class to image

        (sideDiv).append(sideTitle); //appends dynamic element to sideDiv
        (sideDiv).append(sideImage); //appends dynamic element to sideDiv
        (sideForm).append(sideText); //appends dynamic element to sideForm
        (sideForm).append(sideLink); //appends dynamic element to sideForm
        (sideDiv).append(sideForm); //appends dynamic element to sideDiv
        (sideDiv).append(sideClose); //appends dynamic element to sideDiv

        $('#api-hidable').hide();

        $('#api-listen').prepend(sideDiv);//prepends dynamic element to listen div

    }); // End of api selection

    // Restores content to the way it was before api searches and selection
    $(document).on('click', '.api-restore', function(){

        var width = $(document).width() - $('#squares-bottom-1').width();

        $('#squares-top-1').animate({ 'right': width + 'px' }, 1500, function(){
            $('#squares-top-1').removeAttr("style")    
        });
        $('#squares-bottom-1').animate({ 'right': width + 'px' }, 1500, function(){
            $('#squares-bottom-1').removeClass('squares-bottom-animated').addClass('squares-bottom').removeAttr("style")    
        });

        $('#api-search').hide();
        $('#api-hidable').show();
        $('.main-api-panel').hide();
        $("#main-hidable").show();

    });

});