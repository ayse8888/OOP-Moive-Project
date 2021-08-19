//the API documentation site https://developers.themoviedb.org/3/

class App {
    static async run() {
      const movies = await APIService.fetchMovies()
      HomePage.renderMovies(movies);
      
      const actorNav = document.getElementsByClassName("actors-link")[0];
      actorNav.addEventListener("click", function () {
        // console.log("asdf")
        Actors.run()
      });
      const popular = document.getElementsByClassName("popular")[0];
      popular.addEventListener("click", function () {
        // console.log("clicked")
        Populars.run()
      })
      const topRated = document.getElementsByClassName("top-rated")[0];
      topRated.addEventListener("click", function () {
        // console.log("clicked")
        TopRatedMovies.run()
      })
      const upcoming = document.getElementsByClassName("upcoming")[0];
      upcoming.addEventListener("click", function () {
        // console.log("clicked")
        UpcomingMovies.run()
      })
      const nowPlaying = document.getElementsByClassName("now-playing")[0];
      nowPlaying.addEventListener("click", function () {
        // console.log("clicked")
        App.run();
      })
      const genres = document.getElementsByClassName("categories")[0];
      genres.addEventListener("click", function () {
        // console.log("clicked")
        Genres.run()
      })
      const about = document.getElementsByClassName("about")[0];
      about.addEventListener("click", function () {
        // console.log("clicked")
        About.run()
      })
      const searchButton = document.getElementsByClassName("search-button")[0]
      searchButton.addEventListener("submit", function(e){
        e.preventDefault()
        const search = document.getElementsByClassName("search-input")[0].value
        // console.log(search)
        SearchMoviesPage.run(search)
        SearchActorsPage.run(search)
      })
      
    }
  }
  
  
  
  class APIService {
    static TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    static async fetchMovies() {
      const url = APIService._constructUrl(`movie/now_playing`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      return data.results.map(movie => new Movie(movie))
    }
    static async fetchMovie(movieId) {
      const url = APIService._constructUrl(`movie/${movieId}`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      return new Movie(data)
    }
    static async fetchActors(movieId) {
      const url = APIService._constructUrl(`movie/${movieId}/credits`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      // return data.cast.slice(0,5).map(item => console.log(item))
      return data.cast.slice(0, 5)
    }
    static async fetchDirectors(movieId) {
      const url = APIService._constructUrl(`movie/${movieId}/credits`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data.crew)
      // return data.cast.slice(0,5).map(item => console.log(item))
      return data.crew.find(director => director.job === "Director")
    }
    static async fetchSimilarMovies(movieId) {
      const url = APIService._constructUrl(`movie/${movieId}/similar`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data.results)
      return data.results
    }
    static async fetchTrailer(movieId) {
      const url = APIService._constructUrl(`movie/${movieId}/videos`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data.results)
      return data.results
    }
    static async fetchActorsPage() {
      const url = APIService._constructUrl(`person/popular`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data);
      // console.log('burdayim')
      return data.results.map(actor => new Actor(actor))
    }
    static async fetchSingleActorsPage(person_id) {
      const url = APIService._constructUrl(`person/${person_id}`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      return new Actor(data)
    }
    static async fetchSingleActorMovies(person_id) {
      const url = APIService._constructUrl(`person/${person_id}/movie_credits`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      return data.cast.map(actorMovies => new Movie(actorMovies))
    }
    static async fetchPopularMovies() {
      const url = APIService._constructUrl(`movie/popular`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      return data.results.map(popular => new DropdownMovies(popular))
    }
    static async fetchTopRated() {
      const url = APIService._constructUrl(`movie/top_rated`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      return data.results.map(topRated => new DropdownMovies(topRated))
    }
    static async fetchUpcoming() {
      const url = APIService._constructUrl(`movie/upcoming`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      return data.results.map(upcoming => new DropdownMovies(upcoming))
    }
    static async fetchGenres() {
      const url = APIService._constructUrl(`genre/movie/list`)
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      return data.genres.map(genre => new Genre(genre))
    }
    static async fetchSearchMovies(query) {
      const url = APIService._constructUrl(`search/movie`)  + `&query=${query}`
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      // console.log(query)
      return data.results.map(movie => new Movie(movie))
    }
    static async fetchSearchActors(query) {
      const url = APIService._constructUrl(`search/person`)  + `&query=${query}`
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      // console.log(query)
      return data.results.map(movie => new Actor(movie))
    }
    static _constructUrl(path) {
      return `${this.TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`;
    }
  
  }
  APIService.fetchSearchMovies()
  
  class HomePage {
    static container = document.getElementById('container');
    static renderMovies(movies) {
      this.container.innerHTML = "";
      movies.forEach(movie => {
        const movieDiv = document.createElement("div");
        movieDiv.setAttribute("class", "movieDiv")
        const movieImage = document.createElement("img");
        movieImage.src = `${movie.backdropUrl}`;
        movieImage.setAttribute("class", "movieImage")
        const movieTitle = document.createElement("h3");
        movieTitle.textContent = `${movie.title}`;
        movieImage.addEventListener("click", function () {
          Movies.run(movie);
        });
        movieDiv.appendChild(movieTitle);
        movieDiv.appendChild(movieImage);
        this.container.appendChild(movieDiv);
      })
    }
  }
  
  
  class Movies {
    static async run(movie) {
      const movieData = await APIService.fetchMovie(movie.id)
      const actorsData = await APIService.fetchActors(movie.id)
      const directorsData = await APIService.fetchDirectors(movie.id)
      const similarMoviesData = await APIService.fetchSimilarMovies(movie.id)
      const trailerData = await APIService.fetchTrailer(movie.id)
      // pass the actor data to renderMovıeSectıon
      // and use ıt there to rener the actors
      // console.log(actorData, "Actor Data")
      MoviePage.renderMovieSection(movieData, actorsData, directorsData, similarMoviesData, trailerData);
  
    }
  }
  
  
  class MoviePage {
    static container = document.getElementById('container');
    static renderMovieSection(movie, actorsData, directorsData, similarMoviesData, trailerData) {
      MovieSection.renderMovie(movie, actorsData, directorsData, similarMoviesData, trailerData);
    }
  }
  
  
  class MovieSection {
    static renderMovie(movie, actors, directors, similarMovies, trailers) {
      // console.log(actor)
      MoviePage.container.innerHTML = `
      <div class="row">
        <div class="col-md-4">
          <img id="movie-backdrop" src=${movie.backdropUrl}> 
          <div class="my-5">${trailers.slice(0, 1).map(trailer => {
        return `<div>
            <iframe height="190px" class ="trailer" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`
      })}</div>
        </div>
        <div class="col-md-8 movie-info">
          <h2 id="movie-title">${movie.title}</h2>
          <p id="genres"><span>Movie Genre :</span> ${movie.genres.map(genre => genre.name)}</p>
          <p class="language"><span>Movie Language :</span> ${movie.original_language}</p>
          <p id="movie-release-date"><span>Movie Release Date :</span> ${movie.releaseDate}</p>
          <p id="movie-runtime"><span>Movie Runtime :</span> ${movie.runtime}</p>
          <p id="movie-runtime"><span>Movie Rating :</span>  ${movie.vote_average}</p>
          <p id="movie-runtime"><span>Movie Votes Counts :</span> ${movie.vote_count}</p>
          <p><span>Directors :</span> ${directors.name}</>
          <h3>Overview:</h3>
          <p id="movie-overview">${movie.overview}</p>
        </div>
      </div>
  
      <div class="row actors-section">
        <h3>Actors:</h3>
        <div class="col-sm-12 five-actors text-center">
          ${actors.map(actor => {
        return `
            <div>
              <img src=${Movie.BACKDROP_BASE_URL + actor.profile_path} class="actor-image">
              <p>${actor.name}</p>
              <p><span>Popularity : </span>${actor.popularity}</p>
            </div>  
            `
      }).join('')}
        </div>
      </div>
  
      <div class="row my-5 production-section">
        <h3>Production companies:</h3>
        <div class="col-sm-12 movie-production text-center">
            ${movie.production.slice(0, 4).map(production => `
            <div class="pt-5">
              <p>${production.name}</p>
              ${production.logo_path ? `
              <img src= ${Movie.BACKDROP_BASE_URL + production.logo_path} class="production-image">
              ` : `<img src="img/image-not-found.jpg" class="production-image">`}
            </div>
            `
      ).join('')}
        </div>
      </div>
  
      <div class="row similar-section">
        <h3>Similar Movies:</h3>
        <div class="col-sm-12 similar-movies">
          ${similarMovies.map(similarMovie => `
          <div class="row">
            ${similarMovie.poster_path ? `
            <p class="">${similarMovie.original_title}</p>
            <img src= ${Movie.BACKDROP_BASE_URL + similarMovie.poster_path} class="similar-movies-images">
            ` : ""}
          </div>
          `
      ).join('')}
        </div>
      </div>
  
    `;
      Array.from(document.getElementsByClassName("actor-image"))
        .forEach((item, index) => item.addEventListener("click", function () {
          // console.log(actorsPageData[index].id)
          // console.log("hey")
          SingleActors.run(actors[index].id)
        }))
    }
  }
  
  
  class Actors {
    static async run() {
      const actorsPageData = await APIService.fetchActorsPage()
      // console.log(actorsPageData)
      MoviePage.container.innerHTML = `
        <div class="row">
        <h3>Actors Page</h3>
        <div class="col-sm-12 all-actors text-center">
          ${actorsPageData.map(actor => {
        return `
            <div class="my-5">
              <img src=${Movie.BACKDROP_BASE_URL + actor.profilePath} class="actor-image">
              <p>${actor.name}</p>
              <p><span>Popularity : </span>${actor.popularity}</p>
            </div>  
            `
      }).join('')}
        </div>
      </div>
          `
      Array.from(document.getElementsByClassName("actor-image"))
        .forEach((item, index) => item.addEventListener("click", function () {
          // console.log(actorsPageData[index].id)
          // console.log("hey")
          SingleActors.run(actorsPageData[index].id);
        }))
    }
  }
  
  
  class SingleActors {
    static async run(person) {
      const singleActorsPageData = await APIService.fetchSingleActorsPage(person)
      const singleActorMoviesData = await APIService.fetchSingleActorMovies(person)
      // console.log(singleActorsPageData)
      // console.log(singleActorMoviesData)
      MoviePage.container.innerHTML = `
            <div class="single-actors">
              <img src=${Movie.BACKDROP_BASE_URL + singleActorsPageData.profilePath} class="single-actor-image">
              <div class="single-actor-description">
                <h4 class="mb-4">${singleActorsPageData.name}</h4>
                <p><span>Popularity : </span>${singleActorsPageData.popularity}</p>
                <p><span>Birthday : </span>${singleActorsPageData.birthday}</p>
                <p><span>Deathday : </span>${singleActorsPageData.deathday}</p>
                <p><span>Place of Birth : </span>${singleActorsPageData.place_of_birth}</p>
                <p><span>Biography : </span>${singleActorsPageData.biography}</p>
              </div>
            </div>
  
            <div class="row actor-movies-section">
              <h3 class="mt-5">Movies:</h3>
              <div class="col-sm-12 actor-movies">
                ${singleActorMoviesData.map(movie => `
                <div class="row">
                  ${movie.backdropUrl ? `
                  <p class="">${movie.title}</p>
                  <img src= ${movie.backdropUrl} id=${movie.id} width=100% class="actor-movies-images">
                  ` : ""}
                </div>
                `
      ).join('')}
              </div>
            </div>
          `
    }
  }
  
  
  class Populars {
    static async run() {
      const popularMoviesData = await APIService.fetchPopularMovies()
      // console.log(popularMoviesData)
      MoviePage.container.innerHTML = `
        <div class="row">
        <h3>Popular Movies</h3>
        <div class="col-sm-12 all-actors text-center">
          ${popularMoviesData.map(popular => {
        return `
            <div class="my-5">
              <img src=${Movie.BACKDROP_BASE_URL + popular.backdropPath} class="popular-movies-image" id=${popular.id}>
              <p class="popular-movies-title">${popular.title}</p>
              <p><span>Popularity : </span>${popular.popularity}</p>
            </div>  
            `
      }).join('')}
        </div>
      </div>
          `
      Array.from(document.getElementsByClassName("popular-movies-image"))
        .forEach((item, index) => item.addEventListener("click", function (e) {
          Movies.run(e.target);
        }))
      // const popularImages = document.getElementsByClassName("popular-movies-image")[0];
      // popularImages.addEventListener("click", function (e) {
      //   console.log("clicked")
      //   console.log(e.target.id)
      //   Movies.run(e.target)
      // })
    }
  }
  
  
  class TopRatedMovies {
    static async run() {
      const topRatedData = await APIService.fetchTopRated()
      // console.log(popularMoviesData)
      MoviePage.container.innerHTML = `
        <div class="row">
        <h3>Top Rated Movies</h3>
        <div class="col-sm-12 all-actors text-center">
          ${topRatedData.map(topRated => {
        return `
            <div class="my-5">
              <img src=${Movie.BACKDROP_BASE_URL + topRated.backdropPath} class="toprated-movies-image" id=${topRated.id}>
              <p class="toprated-movies-title">${topRated.title}</p>
              <p><span>Popularity : </span>${topRated.popularity}</p>
            </div>  
            `
      }).join('')}
        </div>
      </div>
          `
      Array.from(document.getElementsByClassName("toprated-movies-image"))
        .forEach((item, index) => item.addEventListener("click", function (e) {
          Movies.run(e.target);
        }))
    }
  }
  
  
  class UpcomingMovies {
    static async run() {
      const upcomingData = await APIService.fetchUpcoming()
      // console.log(popularMoviesData)
      MoviePage.container.innerHTML = `
        <div class="row">
        <h3>Upcoming Movies</h3>
        <div class="col-sm-12 all-actors text-center">
          ${upcomingData.map(upcoming => {
        return `
            <div class="my-5">
              <img src=${Movie.BACKDROP_BASE_URL + upcoming.backdropPath} class="upcoming-movies-image" id=${upcoming.id}>
              <p class="upcoming-movies-title">${upcoming.title}</p>
              <p><span>Popularity : </span>${upcoming.popularity}</p>
            </div>  
            `
      }).join('')}
        </div>
      </div>
          `
      Array.from(document.getElementsByClassName("upcoming-movies-image"))
        .forEach((item, index) => item.addEventListener("click", function (e) {
          Movies.run(e.target);
        }))
    }
  }
  
  
  class Genres {
    static async run() {
      const genres = await APIService.fetchGenres()
      // console.log(genres)
      const genreNames = document.getElementsByClassName("genres")[0]
      // console.log(genreNames)
      genreNames.innerHTML = `
          ${genres.map(genre => {
        return `
            <li class="genres-list"><a href="#" class="genres-link">${genre.name}</a></li>
            `
      }).join('')}
          `
    }
  }
  
  class About {
    static run() {
      MoviePage.container.innerHTML = `
      <div class="about-page">
      <h1 class="mb-5">Welcome to our website</h1>
      <p class="about-description">At our website, we want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV shows, movies and documentaries. Our members control what they want to watch, when they want it, with no ads, in one simple subscription. We’re streaming in more than 30 languages and 190 countries, because great stories can come from anywhere and be loved everywhere. We are the world’s biggest fans of entertainment, and we’re always looking to help you find your next favorite story.</p>
      </div>`
    }
  }
  
  class SearchMoviesPage {
    static async run(query) {
      const searchMovies = await APIService.fetchSearchMovies(query)
      // console.log(searchMovies)
      MoviePage.container.innerHTML = `
        <div class="row">
        <h3>Search Movies</h3>
        <div class="col-sm-12 search-movies text-center">
          ${searchMovies.map(search => {
        return `
            <div class="my-5">
            ${search.backdropPath ? `
            <img src=${Movie.BACKDROP_BASE_URL + search.backdropPath} class="search-movies-images" id=${search.id}>
            ` : `<img src="img/image-not-found.jpg" class="search-not-found-image">`}
              <p class="search-movies-title">${search.title}</p>
            </div>  
            `
      }).join('')}
        </div>
      </div>
          `
  
      Array.from(document.getElementsByClassName("search-movies"))
        .forEach((item, index) => item.addEventListener("click", function (e) {
        Movies.run(e.target);
      }))
    }
  }
  
  
  
  class SearchActorsPage {
    static async run(query) {
      const searchActors = await APIService.fetchSearchActors(query)
      // console.log(searchActors)
      const actorsDiv = document.createElement("div")
      actorsDiv.innerHTML = `
        <div class="row">
        <h3>Actors Page</h3>
        <div class="col-sm-12 all-actors text-center">
          ${searchActors.map(actor => {
        return `
            <div class="my-5">
              <img src=${Movie.BACKDROP_BASE_URL + actor.profilePath} class="actor-image">
              <p>${actor.name}</p>
              <p><span>Popularity : </span>${actor.popularity}</p>
            </div>  
            `
      }).join('')}
        </div>
      </div>
          `
        MoviePage.container.appendChild(actorsDiv)
    }
  }
  
  class Movie {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
      this.id = json.id;
      this.title = json.title;
      this.releaseDate = json.release_date;
      this.runtime = json.runtime + " minutes";
      this.overview = json.overview;
      this.backdropPath = json.backdrop_path;
      this.original_language = json.original_language;
      this.vote_average = json.vote_average;
      this.vote_count = json.vote_count;
      this.production = json.production_companies;
      this.genres = json.genres;
    }
  
    get backdropUrl() {
      return this.backdropPath ? Movie.BACKDROP_BASE_URL + this.backdropPath : "";
    }
  }
  
  class Actor {
    static PROFILE_PATH_URL = "http://image.tmdb.org/t/p/w780";
    constructor(json) {
      this.name = json.name;
      this.gender = json.gender;
      this.id = json.id;
      this.popularity = json.popularity;
      this.profilePath = json.profile_path;
      this.birthday = json.birthday;
      this.deathday = json.deathday;
      this.biography = json.biography;
      this.place_of_birth = json.place_of_birth;
    }
  
    get profileUrl() {
      return this.profilePath ? Actor.PROFILE_PATH_URL + this.profilePath : "";
    }
  }
  
  
  class DropdownMovies {
    static PROFILE_PATH_URL = "http://image.tmdb.org/t/p/w780";
    constructor(json) {
      this.name = json.name;
      this.title = json.title;
      this.gender = json.gender;
      this.id = json.id;
      this.popularity = json.popularity;
      this.backdropPath = json.backdrop_path;
    }
  
    get profileUrl() {
      return this.profilePath ? DropdownMovies.PROFILE_PATH_URL + this.profilePath : "";
    }
  }
  
  
  class Genre {
    static PROFILE_PATH_URL = "http://image.tmdb.org/t/p/w780";
    constructor(json) {
      this.name = json.name;
      this.id = json.id;
    }
  
    get profileUrl() {
      return this.profilePath ? Genres.PROFILE_PATH_URL + this.profilePath : "";
    }
  }
  
  
  document.addEventListener("DOMContentLoaded", App.run);