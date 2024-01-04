


(function () {




  const image1 = document.querySelector("#image-1")
  const movieTitle = document.querySelector("#movie-title-1")
  const movieRow = document.querySelector("#movie-row")



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

      const createRow = (product) =>{
       
      movieRow.innerHTML +=`
      <div class=" col-sm-6 col-lg-2  col-md-6 mt-3">
          <div class="card">
            <img id ="image-posters" class = "img-fluid" width = "100%" src="https://image.tmdb.org/t/p/w500${product.poster_path}" >
            <div class="card-body">
              <h5 id = "movie-title-1" class="card-title">${product.title}</h5>
              <h5 id = "movie-title-1" class="card-title">${product.vote_average}</h5>
              <p class="card-text"></p>
             
            </div>
          
          </div>
        </div>`
      };


      for(product of response.results){
        createRow(product);
      
      }

      
      console.log(response.results[0]);
      const imagePath = response.results[0].poster_path;
      let imageUrl = "https://image.tmdb.org/t/p/w500" + imagePath;
      let title =  response.results[0].poster_path
      
      //image1.src = imageUrl;
      
      //movieTitle.textContent = response.results[0].title;

    })
    .catch(err => console.error(err));


////////
const trendingImageBig = document.querySelector("#trending-image-big")

const trendingMovies = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGE1NjQzZjJlMTk1NmZhZGEwYzdhMDQ2NWQyZDUxMCIsInN1YiI6IjY1OTQ1ZjNkZTAwNGE2NmQ2MzE4NjAzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PgQOwPHjvAsLrlFJwMBMDqZv-xOOSJVUJKjOQfnV0G0'
  }
};

fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', trendingMovies)
  .then(response => response.json())
  .then(response =>{
    
    let imageUrlTrending = "https://image.tmdb.org/t/p/w500" + response.results[0].backdrop_path;
    
    console.log(imageUrlTrending)
    trendingImageBig.src = imageUrlTrending;
  }
  )
  .catch(err => console.error(err));







  })();