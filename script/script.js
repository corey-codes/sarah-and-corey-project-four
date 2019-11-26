// NAMESPACING =========================================================
const movieApp = {};

// CONVERT GENRE CHOICE INTO NUMBER CODE FOR API
movieApp.genreCodes = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    scifi: 878,
    thriller: 53,
    war: 10752,
    western: 37
}

// INITIALIZING VARIABLES
movieApp.genre = "";
movieApp.selectedGenreID = "";
movieApp.actorId = "";

// USER INPUT USED TO GET ASSOCIATED GENRE ID #
movieApp.getGenreId = function (movieGenre) {
    let userSelectedMovieGenre = movieGenre;
    let movieArray = movieApp.genreCodes;
    movieApp.selectedGenreID = movieArray[userSelectedMovieGenre];
}

// URL for movie posters
let apiImagePath = "https://image.tmdb.org/t/p/w500";

// Function used to GET MOVIES BASED ON GENRE AND YEAR (Discover)
movieApp.getMoviesDiscover = function () {
    // API PARAMS *WASN'T WORKING IN GLOBAL SCOPE* 
    let genreTime;
    let personId;
    // if the genre ID is equal to an empty string, set genreTime to be an empty string, otherwise set genreTime equal to the ID
    // converts it from undefined to ""
    if (movieApp.selectedGenreID === "") {
        genreTime = "";
    } else {
        genreTime = movieApp.selectedGenreID;
    }

    const apiKey = "20e7d413ebcc68553bf10a0da5428763";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie`;

    return $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: apiKey,
            format: 'json',
            // with_genres: `${movieApp.selectedGenreID}`,
            with_genres: genreTime,
            include_adult: false,
            with_original_language: 'en',
            primary_release_year: movieApp.year,
            with_cast: movieApp.actorId
        }
    }).then(function (resultsObject) {
        const movieResults = resultsObject;
        const resultLength = movieResults.results.length
        const randomNumber = (Math.floor(Math.random() * resultLength));
        const filteredResults = movieResults.results[randomNumber];
        console.log(filteredResults);
        // movieApp.displayMovies(filteredResults);

        // if there are no results
        if (resultsObject.total_results === 0) {
            console.log("No results for you!");

            // $('#searchArea').append(
            //     '<a haref=#resultsSection><i class="fas fa-arrow-circle-down"></i></a>'
            // )

            $('.resultsContent').append(
                `
                <div class="resultsInfo">
                    <div class="infoContainer">
                        <h2>No results for you!</h2>
                        <p>We couldn't find any movies that match your selection, please choose again!</p>
                    </div>
                    <div class="imageContainer">
                        <img src="./assets/noMovie.jpg">
                    </div>
                </div>`
            )
        } else {
            movieApp.displayMovies(filteredResults);
        }
    }).fail(function (error) {
        console.log(error);

    })
};

// Function used to GET MOVIES BASED ON ACTOR/ACTRESS NAME (Search) 
movieApp.getMoviesSearch = function () {

    // API PARAMS *WASN'T WORKING IN GLOBAL SCOPE* ===========
    const apiKey = "20e7d413ebcc68553bf10a0da5428763";
    const apiUrl = `https://api.themoviedb.org/3/search/person`;


    // let u = `https://api.themoviedb.org/3/search/person?api_key=20e7d413ebcc68553bf10a0da5428763&query=Tom%20Cruise`

    return $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        data: {
            api_key: apiKey,
            format: 'json',
            // query: "Tom Cruise",
            query: movieApp.name,
            include_adult: false,
            with_original_language: 'en',
            // primary_release_year: movieApp.year
        }
    }).then(function (resultsObject) {
        movieApp.actorId = resultsObject.results[0].id;
        console.log(movieApp.actorId);
        // console.log(resultsObject);

        // make another API call based on ID to get all that persons movies
        movieApp.getMoviesDiscover();


        // const movieResults = resultsObject;
        // const resultLength = movieResults.results.length
        // const randomNumber = (Math.floor(Math.random() * resultLength));
        // const filteredResults = movieResults.results[randomNumber];
        // // console.log(filteredResults);
        // movieApp.displayMovies(filteredResults);
    });
};



//DYNAMICALLY POPULATE MOVIE INFO 
//         //IMAGE OF MOVIE POSTER
//         //TITLE
//         //SUMMARY

movieApp.displayMovies = function (results) {

    $('.resultsContent').append(
        `
        <div class="resultsInfo">
            <div class="resultsText">
                <h2>${results.title}</h2>
                <p>${results.overview}</p>
            </div>
            <img class="resultsImg" src="${apiImagePath}${results.poster_path}">
        </div>`
    )
    // console.log(results.poster_path);
}

// Function to RESET PAGE
movieApp.resetPage = function () {
    let $resetGenre = $('#selectedGenre');
    let $resetYear = $('#selectedYear');
    let $resetName = $('#selectedName');
    // console.log($reset);

    // reset genres drop down to say "Genre:"
    $resetGenre[0].selectedIndex = 0;

    // reset year input 
    $resetYear.val('');

    // reset name input
    $resetName.val('');

    // // reset results section
    // // remove current movie+info
    // $('.resultsInfo').remove();
    $('.resultsInfo').remove();

    // call fxn to get new movie

    // re-initialize variables
    movieApp.actorId = "";

    // after page is reset, call fxn that will determine which API call should be made (depends on which inputs are used by user)
    movieApp.determineApiCall();
}

// Function to determine which API call should be made
movieApp.determineApiCall = function () {
    // if the user slected from ALL THREE inputs, then make two API calls (Discover & Search)
    if (
        movieApp.genre != "movie genre:" && movieApp.year != "" && movieApp.name != "" ||
        movieApp.year != "" && movieApp.name != "" ||
        movieApp.genre != "movie genre:" && movieApp.name != "" ||
        movieApp.name != "") {
        console.log("I picked a movie and a year and a person!");
        movieApp.getMoviesSearch();

        // else if the user selected from ONLY the genre and(or) year inputs, then make one API call (Discover) 
        // genre, year, genre/year
    } else if (movieApp.genre != "movie genre:" || movieApp.year != "" || movieApp.genre != "movie genre:" && movieApp.year != "") {
        console.log("I picked a genre and a year!");
        movieApp.getMoviesDiscover();
    }
}


// EVENT LISTENERS
movieApp.eventListeners = function () {
    // SUBMIT form
    // grab user input (selected drop-down menu option)
    $('form').on('submit', function (event) {
        event.preventDefault();
        console.log(`clicked button`);


        // save user input to variabes
        // GENRE (use the genre to get associated ID#)
        movieApp.genre = $('#selectedGenre option:selected').text().toLowerCase();
        console.log(movieApp.genre);
        movieApp.getGenreId(movieApp.genre);
        // YEAR
        movieApp.year = $('#selectedYear').val();
        console.log(movieApp.year);
        // ACTOR/ACTRESS NAME
        movieApp.name = $('#selectedName').val();
        console.log(movieApp.name);

        // get back a genre as a string
        // reset results section
        // remove current movie+info
        // $('.resultsInfo').remove();
        // movieApp.resetPage();
        // movieApp.getGenreId(movieApp.genre);
        // movieApp.getMovies();

        $(".resultsScroll").toggleClass('hide');
        movieApp.resetPage();
  
    });

    $(".resultsScroll").on('click', () => {
        $('.resultsScroll').toggleClass('hide');
        console.log('click!');
    });

    // event listener for reset button
    // $('.resetBtn').on('click', function() {
    //     // console.log("clicked");
    //     movieApp.resetPage();
    // })
}

// INITALIZE APP
movieApp.init = function () {
    movieApp.eventListeners();
    console.log("initialized");

}
// DOC READY
$(function () {
    movieApp.init();
    console.log("doc ready");

});