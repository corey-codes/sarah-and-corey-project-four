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

const movieResult = 

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

//     

// API CALL =========================
movieApp.getMovies = function () {

// API PARAMS *WASN'T WORKING IN GLOBAL SCOPE* ===========
    const apiKey = "20e7d413ebcc68553bf10a0da5428763";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie/?api_key=${apiKey}&with_genres=${movieApp.selectedGenreID}`;

    return $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        // data: {
        //     api_key: apiKey,
        //     format: 'json'
        // }

    }).then(function(resultsObject) {
        // console.log('we have results!');
        movieApp.displayMovies(resultsObject);
        
        const movieResults = resultsObject; 
         
        const resultLength = movieResults.results.length
                 
        const randomNumber = (Math.floor(Math.random() * resultLength));
         
        const filteredResults = movieResults.results[randomNumber];
        console.log(filteredResults, 'yay!');

        // NEED TO ADD FILTERS FOR PORN AND ENGLISH
       
    }); 
}; 

//DYNAMICALLY POPULATE MOVIE INFO 
//         //IMAGE OF MOVIE POSTER
//         //TITLE
//         //SUMMARY

movieApp.displayMovies = function(Result) {
    console.log('display our movie!!', Result);

  
    
    
    // $('.resultsContent').append(`
    //         <div class="resultsCopy">
    //             <h2>${movieResult.original_title}</h2>
    //             <p>${artPiece.principalOrFirstMaker}</p>
    //             <img src="${artPiece.webImage.url}">
    //        </div>`
    // )
}


// function for event listeners
movieApp.eventListeners = function () {
    // grab user input (selected drop-down menu option)
    $('form').on('submit', function (event) {
        event.preventDefault();
        console.log('Helloooo');
        movieApp.genre = $('#selectedGenre option:selected').text().toLowerCase();
        console.log(movieApp.genre);
        // get back a genre as a string
        movieApp.getGenreId(movieApp.genre);
        console.log(movieApp.getMovies);
        movieApp.getMovies();
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