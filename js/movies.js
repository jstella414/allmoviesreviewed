

(function () {



  const movieRow = document.querySelector("#movie-row")
  const tvRow = document.querySelector("#TV-row")

  ///filter input targets
  const movieInput = document.querySelector("#Movie-Search-Type")
  const tvInput = document.querySelector("#tv-Search-Type")
  
  
  ////////
  const trendingImageBig = document.querySelector("#trending-image-big")
  const trendingDescription = document.querySelector("#trending-description")
  const trendingMovieTitle = document.querySelector("#trending-movie-title")
  const trendingMovierating = document.querySelector("#trending-movie-rating")
  const trendingSide = document.querySelector("#trending-side")



  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGE1NjQzZjJlMTk1NmZhZGEwYzdhMDQ2NWQyZDUxMCIsInN1YiI6IjY1OTQ1ZjNkZTAwNGE2NmQ2MzE4NjAzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PgQOwPHjvAsLrlFJwMBMDqZv-xOOSJVUJKjOQfnV0G0'
    }
  };

  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => {

      response.results.forEach((product, i) => {
        movieRow.innerHTML += `
    
        <div id = "poster-filter-div-${i}" class="col-6 col-sm-6 col-lg-2 col-md-4 mt-3 ">
            <div id = "movie-cards" class="card">
              <img data-bs-toggle="modal" data-bs-target="#exampleModal" id ="image-posters" class = "img-fluid" width = "100%" src="https://image.tmdb.org/t/p/w500${product.poster_path}">
              <div class="card-body">
                <h5 id = "movie-title" class="card-title">${product.title}</h5>
                <button id = "rating-button" type="button" class = "btn btn-light btn-sm " disabled>User Rating: ${product.vote_average}</button>
                <p class="card-text"></p>
               
              </div>
            
            </div>
          </div>`
      })

      
      
      
      let titles = document.querySelectorAll("#movie-title");

      // loop through movie titles
      titles.forEach((title, i) => {

        const moviedivID = document.querySelector(`#poster-filter-div-${i}`)

        movieInput.addEventListener("input", (event) => {
          if (title.textContent.toLowerCase().includes(movieInput.value.toLowerCase())) {
            moviedivID.style.display = 'block';

          } else {
            moviedivID.style.display = 'none';

          }

        })
      })

    })
    .catch(err => console.error(err));





  const trendingMovies = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGE1NjQzZjJlMTk1NmZhZGEwYzdhMDQ2NWQyZDUxMCIsInN1YiI6IjY1OTQ1ZjNkZTAwNGE2NmQ2MzE4NjAzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PgQOwPHjvAsLrlFJwMBMDqZv-xOOSJVUJKjOQfnV0G0'
    }
  };

  fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', trendingMovies)
    .then(response => response.json())
    .then(response => {

      let imageUrlTrending = "https://image.tmdb.org/t/p/w500" + response.results[0].backdrop_path;

      trendingDescription.textContent = response.results[0].overview
      trendingMovieTitle.textContent = response.results[0].title;
      trendingMovierating.textContent = response.results[0].release_date

      trendingImageBig.src = imageUrlTrending;


      ////////////// FOR SIDE BAR

      const poptrendingside = (product) => {

        trendingSide.innerHTML += `
  <div class="col-12">   
  <hr style ="color: white">
    <h1 id="trending-side-title">${product.title}</h1>
  <p id="trending-side-description">${product.overview}</p>
  <p id="trending-side-rating movie-rating">${product.vote_average}</p>
  </div>`

      }


      for (let i = 1; i < 4; i++) {
        poptrendingside(response.results[i])

      }

    }).catch(err => console.error(err));


  const shows = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGE1NjQzZjJlMTk1NmZhZGEwYzdhMDQ2NWQyZDUxMCIsInN1YiI6IjY1OTQ1ZjNkZTAwNGE2NmQ2MzE4NjAzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PgQOwPHjvAsLrlFJwMBMDqZv-xOOSJVUJKjOQfnV0G0'
    }
  };

  fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', shows)
    .then(response => response.json())
    .then(response => {
 
      response.results.forEach((show, i)=>{
        
      tvRow.innerHTML += `
        
        <div id = "tv-poster-filter-div-${i}" class="col-6 col-sm-6 col-lg-2  col-md-4 mt-3">
              <div id = "movie-cards" class="card TV">
                <img data-bs-toggle="modal" data-bs-target="#exampleModal" id ="image-posters" class = "img-fluid" width = "100%" src="https://image.tmdb.org/t/p/w500${show.poster_path}">
                <div class="card-body">
                  <h5 id = "show-title" class="card-title">${show.name}</h5>
                  <button id = "rating-button" type="button" class = "btn btn-light" disabled>User Rating:${show.vote_average}</button>
                  <p class="card-text"></p>
                 
                </div>
              
              </div>
            </div>
        `
      })


      const tvTitles = document.querySelectorAll("#show-title") 
      // loop through show titles

      tvTitles.forEach((title, i) => {
        
        const tvbdivID = document.querySelector(`#tv-poster-filter-div-${i}`)

        tvInput.addEventListener("input", (event) => {
          if (title.textContent.toLowerCase().includes(tvInput.value.toLowerCase())) {
            tvbdivID.style.display = 'block';

          } else {
            tvbdivID.style.display = 'none';

          }

        })
      })

     
    }


    ).catch(err => console.error(err));



})();



