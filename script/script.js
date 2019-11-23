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

// USER INPUT USED TO GET ASSOCIATED GENRE ID #
movieApp.getGenreId = function (movieGenre) {
    let userSelectedMovieGenre = movieGenre;
    let movieArray = movieApp.genreCodes;
    movieApp.selectedGenreID = movieArray[userSelectedMovieGenre];
}


// const movieResult = 
let apiImagePath = "https://image.tmdb.org/t/p/w500";

    // `https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&with_genres=${movieApp.selectedGenreID}`;

// API CALL TO GET MOVIES BASED ON GENRE =========================
// movieApp.getMovies = function () {

// // API PARAMS *WASN'T WORKING IN GLOBAL SCOPE* ===========
//     const apiKey = "20e7d413ebcc68553bf10a0da5428763";
//     // const apiUrl = `https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&with_genres=${movieApp.selectedGenreID}&include_adult=falseith_original_languwage='en-US'`;
//      const apiUrl = `https://api.themoviedb.org/3/discover/movie`;
    

//     return $.ajax({
//         url: apiUrl,
//         method: 'GET',
//         dataType: 'json',
//         data: {
//             api_key: apiKey,
//             format: 'json',
//             with_genres: `${movieApp.selectedGenreID}`,
//             include_adult: false,
//             with_original_language: 'en',
//             primary_release_year: movieApp.year
//         }
//     }).then(function(resultsObject) {
//         const movieResults = resultsObject; 
//         const resultLength = movieResults.results.length
//         const randomNumber = (Math.floor(Math.random() * resultLength));
//         const filteredResults = movieResults.results[randomNumber];
//         console.log(filteredResults);
//         movieApp.displayMovies(filteredResults);
//     });
// }; 

// API CALL TO GET MOVIES BASED ON NAME =========================
movieApp.getMovies = function () {

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
            // with_genres: `${movieApp.selectedGenreID}`,
            query: "Tom Cruise",
            include_adult: false,
            with_original_language: 'en',
            primary_release_year: movieApp.year
        }
    }).then(function (resultsObject) {
        const movieResults = resultsObject;
        const resultLength = movieResults.results.length
        const randomNumber = (Math.floor(Math.random() * resultLength));
        const filteredResults = movieResults.results[randomNumber];
        // console.log(filteredResults);
        movieApp.displayMovies(filteredResults);
    });
}; 



//DYNAMICALLY POPULATE MOVIE INFO 
//         //IMAGE OF MOVIE POSTER
//         //TITLE
//         //SUMMARY

movieApp.displayMovies = function(results) {
    
    $('.resultsContent').append(  
        `
        <div class="resultsInfo">
            <h2>${results.title}</h2>
            <p>${results.overview}</p>
            <img src="${apiImagePath}${results.poster_path}">
        </div>`
        ) 
        // console.log(results.poster_path);
}

// RESET PAGE
movieApp.resetPage = function() {
    let $reset = $('#selectedGenre');
    // console.log($reset);
    
    // reset genres drowp down
    $reset[0].selectedIndex = 0;

    // // reset results section
    // // remove current movie+info
    // $('.resultsInfo').remove();

    // call fxn to get new movie
    
}


// EVENT LISTENERS
movieApp.eventListeners = function () {
    // SUBMIT form
    // grab user input (selected drop-down menu option)
    $('form').on('submit', function (event) {
        event.preventDefault();
        // 
        movieApp.genre = $('#selectedGenre option:selected').text().toLowerCase();
        movieApp.year = $('#selectedYear').val();
        console.log(movieApp.year);
        
        // get back a genre as a string
        // reset results section
        // remove current movie+info
        $('.resultsInfo').remove();
        movieApp.resetPage();
        movieApp.getGenreId(movieApp.genre);
        movieApp.getMovies();
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
}
// DOC READY
$(function () {
    movieApp.init();
});