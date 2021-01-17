const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "3ccf54505404b39d4ebf190feb1c3002";

document.addEventListener("DOMContentLoaded", () => {      // Llama la función cuando la página este cargada. 
    renderNewsMovies();
    renderListMovies('popular', 'now-playing__list');
    renderListMovies('top_rated', 'top-rated-playing__list');
})

const getMovies = (type) => {
    const url = `${URL_PATH}/3/movie/${type}?api_key=${API_KEY}&language=es-ES&page=1`;

    return fetch(url)                       // Petición fetch.
        .then(response => response.json())  // Devuelve response transformado en JSON (películas).
        .then(result => result.results)     // Accede a la variables results de la consola. 
        .catch(error => console.log(error)) // Por si sale un error. 
}

const renderNewsMovies = async () => {
    const newMovies = await getMovies('now_playing');        // Petición de las películas
    let html = '';
    
    newMovies.forEach((movie, index) => {                    // Recorrer película por película e ir generando bloques.
        const { id, title, overview, backdrop_path } = movie;     // destructuring para sacar el contenido que necesitamos. 
        const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        html += `
            <div class="carousel-item ${index === 0 ? "active" : null}" style="background-image: url('${urlImage}')">
                <div class="carousel-caption">
                    <h5>${title}</h5>
                    <p>${overview}</p>
                    <a href="${urlMovie}" class="btn btn-primary">Más Informacion</a>
                </div>
            </div>
        `;                               // Añade el contenido dentro del html.
        
        
    });

    html += `
        <a class="carousel-control-prev" href="#carousel-news-movies" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Anterior</span>
        </a>
        <a class="carousel-control-next" href="#carousel-news-movies" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Siguiente</span>
        </a>
    `;

    document.getElementsByClassName('list-news-movies')[0].innerHTML = html;        // Mete el contenido en el html. 
}

const renderListMovies = async (type, classLoc) => {
    const movies = await getMovies(type);        // Guarda el valor 
    let html = "";
    movies.forEach((movie, index) => {
    
        const { id, title, poster_path } = movie;
        const movieCover = `https://image.tmdb.org/t/p/w500${poster_path}`;                  // Url de la imagen 
        const urlMovie = `../movie.html?id=${id}`;

        if(index < 5) {
            html += `
                <li class="list-group-item">
                    <img src="${movieCover}" alt="${title}">
                    <h3>${title}</h3>
                    <a href="${urlMovie}" class="btn btn-primary">Ver Más</a>
                 </li>
            `;
        }

        document.getElementsByClassName(classLoc)[0].innerHTML = html;

    })
}





