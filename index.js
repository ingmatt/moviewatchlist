const searchBtn = document.getElementById("search-btn")
const movieInput = document.getElementById("movie")
const movieContainer = document.getElementById("movie-container")
let searchedMovies = []
let movieList = []
let watchlistArr = []


watchlistArr = JSON.parse(localStorage.getItem("watchlist")) || []


searchBtn.addEventListener("click", async function(){
    
    movieContainer.innerHTML = ""
    
   const res = await fetch(`https://www.omdbapi.com/?s=${movieInput.value}&apikey=342302d7`)
   const data = await res.json() 
        if (!data.Search) {
            movieContainer.innerHTML = `<h1 class="nothing">Unable to find what you’re looking for. Please try another search.</h1>`
            return
        }
        
        searchedMovies = data.Search.map(movie => movie.imdbID)
        
        for (let id of searchedMovies) {
            const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=342302d7`)
            const data = await res.json()
                    movieList.push(data)
                    console.log(movieList)  
                    movieContainer.innerHTML += `
                    <div class="movie-container">
                        <div class="movie-poster">
                            <img width="120px" src=${data.Poster} >
                        </div>
                        <div class="movie-data">
                            <p class="title">${data.Title}</p>
                            <p class="rating">⭐️ ${data.imdbRating}</p>
                            <div class="runtime-genre">
                                <p class="runtime">${data.Runtime}</p>
                                <p class="genre">${data.Genre}</p>
                                <p class="add-watchlist" onclick="addToWatchlist('${id}')">➕ Watchlist</p>
                            </div>
                            <p class="plot">${data.Plot}</p>
                        </div>
                    </div>
                    `
                
                }
        }
)

function addToWatchlist(id) {
    if (!watchlistArr.includes(id)){
        watchlistArr.push(id)
        localStorage.setItem("watchlist", JSON.stringify(watchlistArr))
    }
    console.log(watchlistArr)
}