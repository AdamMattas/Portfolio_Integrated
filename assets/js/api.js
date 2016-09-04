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
                tracksContainer.addClass('col-md-12 main-api-panel'); //adds classes to tracksContainer

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

        // Prevents moving to the next page
        return false;
    });

    // API selection
    $('.api-button').on('click', function(){
    
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

        var sideText = $('<input>'); //creates a new p element
        sideText.attr('id', apiName.id);
        sideText.attr('type', 'text');
        sideText.addClass('form-control api-input');
        sideText.attr('placeholder', apiName.placeholder); //adds text from object

        var sideLink = $('<button>'); //creates a new p element
        sideLink.attr('id', apiName.searchClass); //added src attribute from object
        sideLink.text('Submit'); //adds text from object
        sideLink.addClass('btn btn-primary api-search-button'); //added class to image

        var sideClose = $('<button>'); //creates a new p element
        sideClose.text('Go Back'); //adds text from object
        sideClose.addClass('btn btn-danger api-restore'); //added class to image

        (sideDiv).append(sideTitle);//appends dynamic element to sideDiv
        (sideDiv).append(sideImage);//appends dynamic element to sideDiv
        (sideDiv).append(sideText);//appends dynamic element to sideDiv
        (sideDiv).append(sideLink);//appends dynamic element to sideDiv
        (sideDiv).append(sideClose);//appends dynamic element to sideDiv

        $('#api-hidable').hide();

        $('#api-listen').prepend(sideDiv);//prepends dynamic element to listen div

    }); // End of api selection

    // Restores content to the way it was before api searches and selection
    $(document).on('click', '.api-restore', function(){

        $('#api-search').hide();
        $('#api-hidable').show();
        $('.main-api-panel').hide();
        $("#main-hidable").show();

    });

});