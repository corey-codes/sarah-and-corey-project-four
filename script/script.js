


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
movieApp.genre = "";
movieApp.selectedGenreID = "";


//     // movieApp.genre;
//     // movieApp.collectInfo = function () {
//     //     //GENRE (SET TO EXCLUDE PORN)
//     //     //YEAR
//     //     // let genre;


//     // }
// ​
//     //PASS ALONG USER PROVIDED SEARCH PARAMETERS 
//     movieApp.getInfo = function () {
//     }

//     //DYNAMICALLY POPULATE MOVIE INFO 
//         //IMAGE OF MOVIE POSTER
//         //TITLE
//         //SUMMARY
//     movieApp.displayInfo = function () {
//     }  



// function for event listeners
movieApp.eventListeners = function () {
    // console.log(`hiiii`);

    // grab user input (selected drop-down menu option)
    $('form').on('submit', function (event) {
        event.preventDefault();
        console.log('Helloooo');
        movieApp.genre = $('#selectedGenre option:selected').text().toLowerCase();
        console.log(movieApp.genre);
        // get back a genre as a string
        movieApp.getGenreId(movieApp.genre);
    });
    console.log("test")
}

// let genre2 = movieApp.genre;
movieApp.getGenreId = function (movieGenre) {
    // console.log(movieGenre);
    let userSelectedMovieGenre = movieGenre;
    let movieArray = movieApp.genreCodes;
    movieApp.selectedGenreID = movieArray[userSelectedMovieGenre];
    // console.log(movieApp.selectedGenreID);

    // console.log(movieApp.genreCodes);

    // movieApp.selectedGenreID = movieArray.userSelectedMovieGenre;
    // console.log(movieApp.selectedGenreID);
}
// ​
// START APP
movieApp.init = function () {
    movieApp.eventListeners();
    console.log(`initializing`);
}
// DOC READY
$(function () {
    movieApp.init();
    console.log("document is ready");

});