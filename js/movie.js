const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "3ccf54505404b39d4ebf190feb1c3002";
let MOVIE_ID = "";                                      // Almacena el ID de la película.

document.addEventListener("DOMContentLoaded", () => {   // Se ejecuta cuando la página ya se ha cargado. 
    MOVIE_ID = getUrlVars().id;
    renderMovieDetails(MOVIE_ID);
    
});

const getUrlVars = () => {                              // Recoger datos. 
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {  // Devuelve el ID de la URL.
        vars[key] = value;
    });                                
    return vars;
}

const getMovieDetails = (movieId) => {
    const url = `${URL_PATH}/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log(error))

}

const renderMovieDetails = async (movieId) => {
    const movieDetails = await getMovieDetails(movieId);
    const {backdrop_path, poster_path, title, overview, genres, release_date} = movieDetails;
    renderBackground(backdrop_path);
    renderPoster(poster_path, title);
    renderMovieData(title, overview, genres, release_date);
    getTeaser(movieId);
    
}

const renderBackground = (backdrop_path) => {
    const urlBackground = `https://image.tmdb.org/t/p/original/${backdrop_path}`;
    document.getElementsByClassName('movie-info')[0].style.backgroundImage = `url('${urlBackground}')`;

}

const renderPoster = (poster_path, title) => {
    const urlPoster = `https://image.tmdb.org/t/p/original/${poster_path}`; 
    const html = `<img src="${urlPoster}" class="img-fluid movie-info__poster-img" alto="${title}" /> `;

    document.getElementsByClassName('movie-info__poster')[0].innerHTML = html;

}

const renderMovieData = (title, overview, genres, release_date) => {
    const dataSplit = release_date.split('-');
    let htmlGenres = "";
    genres.forEach(genre => {
        htmlGenres += `<li>${genre.name}</li>`;
    })
    const html = `
        <h1>
            ${title};
            <span class="date-any">${dataSplit[0]}</span>
            <span class="teaser" data-toggle="modal" data-target="#video-teaser">
                <i class="fas fa-play">   Ver Trailer</i>
            </span>
        </h1>
        <h5>General</h5>
        <p>${overview}</p>
        <h5>Géneros</h5>
        <ul>
            ${htmlGenres}
        </ul>
    `;

    document.getElementsByClassName('movie-info__data')[0].innerHTML = html;
}

const getTeaser = (movieId) => {
    const url = `${URL_PATH}/3/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`;

    fetch(url)
        .then(response => response.json())
        .then(result => {renderTeaser(result)})
        .catch(error => console.log(error));
}

const renderTeaser = (objVideo) => {
    let keyVideo = "";

    objVideo.results.forEach(video => {
        if(video.type === "Teaser" && video.site === "Youtube") {
            keyVideo = video.key;                                   // video.key es el id del video en Youtube.
        }
    });

    let urlIframe = "";
    if(keyVideo !== "") {
        urlIframe = `
            <iframe "width=100%" height="440px" src="https://www.youtube.com/embed/${keyVideo}"
            frameborder="0" allow="accelerometer"; autoplay; encrypted-media;
            gryscope picture-in-picture" allowfullscreen></iframe>
        `;
    } else {
        urlIframe = "<div class='no-teaser'>La película no tiene trailer</div>"
    }

    document.getElementsByClassName('video-teaser-iframe')[0].innerHTML = urlIframe; 
}