let watchlistArr = JSON.parse(localStorage.getItem("watchlist")) || []
const watchlistContainer = document.getElementById("watchlist-container")

console.log(watchlistArr)

if (watchlistArr.length === 0) {
    watchlistContainer.innerHTML += `
    <div class="movie-container">
        <a href="/index.html"><p>Let's add some movies!</p></a>
    </div>
    `
}



for (let id of watchlistArr) {
        watchlistContainer.innerHTML = ""
            fetch(`https://www.omdbapi.com/?i=${id}&apikey=342302d7`)
                .then(res => res.json())
                .then(data => {
                    watchlistContainer.innerHTML += `
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
                                <p class="add-watchlist" onclick="removeFromWatchlist('${id}')">➖ Remove</p>
                            </div>
                            <p class="plot">${data.Plot}</p>
                        </div>
                    </div>
                    
                    `
                })          
}

function removeFromWatchlist(id) {
    watchlistArr = watchlistArr.filter(movieId => movieId !== id)
    localStorage.setItem("watchlist", JSON.stringify(watchlistArr))
    location.reload()
}