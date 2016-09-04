var spotify = {
    title: "Search Spotify",
    image: "assets/images/spotify.png",
    placeholder: "Search Artist Name",
    id: "spotify-input",
    searchClass: "spotify-search"
},
nyt = {
    title: "Search New York Times",
    image: "assets/images/nytimes.jpg",
    placeholder: "Search Articles",
    id: "nyt-input",
    searchClass: "nyt-search"
},
omdb = {
    title: "Search Movie Titles",
    image: "assets/images/omdb.jpg",
    placeholder: "Search Movie Title",
    id: "omdb-input",
    searchClass: "omdb-search"
};

$(document).on('ready', function(){

    function buildArtistArea(trackInfo){

        var results = trackInfo.tracks;

        for(var i=0; i < results.length; i++){

            console.log('ID: ', results[i].album.id);
            console.log('Image: ', results[i].album.images[1].url);
            console.log('Name: ', results[i].album.name);

        }

    }

    function getArtistTrack(artist){

        // Run an initial search to identify the artist unique Spotify ID
        var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

            // Prints the entire object to console
            console.log(response);

            // Prints the Artist ID from the Spotify Object to console.
            var artistID = response.artists.items[0].id;

            // Then we build a SECOND URL to query another Spotify endpoint (this one for the tracks)
            var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID +"/top-tracks?country=US";

            // We then run a second AJAX call to get the tracks associated with that Spotify ID
            $.ajax({url: queryURLTracks, method: 'GET'}).done(function(trackResponse) {

                // Gets the tracks
                console.log(trackResponse);

                buildArtistArea(trackResponse);

                // Builds a Spotify player playing the top song associated with the artist. (NOTE YOU NEED TO BE LOGGED INTO SPOTIFY)
                var player = '<iframe class="spot-player" src="https://embed.spotify.com/?uri=spotify:track:' + trackResponse.tracks[0].id + '" frameborder="0" allowtransparency="true"></iframe>';

                $("#main-panel").empty();

                // Appends the new player into the HTML
                $("#main-panel").prepend(player)
            })
        });     
    }

    // On Button Click for Artist Selection
    $(document).on('click', '#spotify-search', function(){

        // Grab the Artist Name
        var artist = $('#spotify-input').val().trim();

        // Run the Artist Player Function (Passing in the Artist as an Argument)
        getArtistTrack(artist);

        // Prevents moving to the next page
        return false;
    });

    $('.api-button').on('click', function(){
    
        var name = $(this).data('name');
        var apiName = eval(name);

        var sideTitle = $('<h4>'); //creates a new h4 element
        sideTitle.text(apiName.title); //adds text from object
        sideTitle.addClass('port-detail-bold'); //added class to image

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

        $('.api-listener').empty();
        $('#api-listen').prepend(sideLink);//prepends dynamic element to listen div
        $('#api-listen').prepend(sideText);//prepends dynamic element to listen div
        $('#api-listen').prepend(sideImage);//prepends dynamic element to listen div
        $('#api-listen').prepend(sideTitle);//prepends dynamic element to listen div

    });

});