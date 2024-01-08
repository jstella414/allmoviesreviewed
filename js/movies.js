

(function () {



  const image1 = document.querySelector("#image-1")
  const movieTitle = document.querySelector("#movie-title-1")
  const movieRow = document.querySelector("#movie-row")
  const movieModal = document.querySelector("#movie-modal")


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
      console.log(response)
      const createRow = (product) =>{
       
      movieRow.innerHTML +=`
      <div class="col-6 col-sm-6 col-lg-2  col-md-6 mt-3">
          <div id = "movie-cards" class="card">
            <img data-bs-toggle="modal" data-bs-target="#exampleModal" id ="image-posters" class = "img-fluid" width = "100%" src="https://image.tmdb.org/t/p/w500${product.poster_path}">
            <div class="card-body">
              <h5 id = "movie-title-1" class="card-title">${product.title}</h5>
              <button id = "rating-button" type="button" class = "btn btn-light" disabled>${product.vote_average}</button>
              <p class="card-text"></p>
             
            </div>
          
          </div>
        </div>`
      };
     


      for(product of response.results){
        createRow(product);
        console.log()
      }
      
      
      const imagePath = response.results[0].poster_path;
      let imageUrl = "https://image.tmdb.org/t/p/w500" + imagePath;
      let title =  response.results[0].poster_path
      
      
    let posters =  document.querySelectorAll("#image-posters")
      
      
  
for(let i = 0; i < response.results.length; i++){
   posters[i].addEventListener("click", ()=>{
    ModalMaker(response.results[i])
   })
      
  };

const ModalMaker = (movie) =>{
  movieModal.innerHTML = `
  <P>${movie.title}</P>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 style = "color:black" class="modal-title fs-5" id="exampleModalLabel">${movie.title}</h1>
          
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img id ="image-big-model" class = "img-fluid" width = "100%" src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}">
        <p style = "color:black">${movie.release_date}</p>

        <p style = "color:black">${movie.overview}</p>
        <p style = "color:black">Rating ${movie.vote_average}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  `

}



    })
    .catch(err => console.error(err));


////////
const trendingImageBig = document.querySelector("#trending-image-big")
const trendingDescription = document.querySelector("#trending-description")
const trendingMovieTitle = document.querySelector("#trending-movie-title")
const trendingMovierating = document.querySelector("#trending-movie-rating")
const trendingSide = document.querySelector("#trending-side")


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

    trendingDescription.textContent = response.results[0].overview
    trendingMovieTitle.textContent = response.results[0].title;
    trendingMovierating.textContent = response.results[0].release_date


    trendingImageBig.src = imageUrlTrending;


////////////// FOR SIDE BAR

const poptrendingside = (product) =>{

  trendingSide.innerHTML += `
  <div class="col-12">   
  <hr style ="color: white">
    <h1 id="trending-side-title">${product.title}</h1>
  <p id="trending-side-description">${product.overview}</p>
  <p id="trending-side-rating movie-rating">${product.vote_average}</p>
  </div>`

}
//I want greater then the first result less then the 4 result
// if 
  for(let i = 1; i < 4; i++){
  poptrendingside(response.results[i]) 
    //console.log(response.results[i])

  }

}).catch(err => console.error(err));



})();