"use strict";

import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";

import { sidebar } from "./tv-sidebar.js";

import { createMovieCard } from "./tv-card.js";

import { search } from "./tv-search.js";

const movieId = window.localStorage.getItem("movieId");

const pageContent = document.querySelector("[page-content]");
const pageContent3 = document.querySelector("[page-content3]");

sidebar();

const getGenres = function (genreList) {
  const newGenreList = [];

  for (const { name } of genreList) newGenreList.push(name);
  return newGenreList.join(", ");
};

const getDirectors = function (dirList) {
  const newDirList = [];

  for (const { name } of dirList) newDirList.push(name);
  return newDirList.join(" , ");
};



// returns only trailers and teasers as array
const filterVideos = function (videoList) {
  return videoList.filter(
    ({ type, site }) =>
    (type === "Trailer" || type === "Teaser" && site === "Youtube") || (type === "Featurette" && site === "Youtube")
  );
};

// returns Reviews
const filterReview = function (reviewList) {
    return reviewList

  };


  
// returns Cast
const filterCast = function (castList) {
  return castList;
};
  


/*==============Details, poster, cast, trailer====================*/

fetchDataFromServer(
  `https://api.themoviedb.org/3/tv/${movieId}?api_key=${api_key}&append_to_response=casts,videos,images,releases`,
  function (movie) {
    const {
      backdrop_path,
      poster_path,
      title,
      seasons,
      first_air_date,
      tagline,
      status,
      vote_average,
     name,
     created_by,
      genres,
      networks,
      overview,
      videos: { results: videos },
    } = movie;

    console.log(movie);

    document.title = `${name} - Movio`;

    /*=============Movie Details===========*/

    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");
    movieDetail.innerHTML = `
                <div 
                class="backdrop-image" 
                style="background-image: url('${imageBaseURL}${
      "w1280" || "original"
    }${backdrop_path || poster_path}')">
                </div>

                <figure class="poster-box movie-poster">
                <img
                    src="${imageBaseURL}w342${poster_path}"
                    alt="${name} poster"
                    class="img-cover"
                />
                </figure>

                <div class="detail-box">
                <div class="detail-content">
                    <h1 class="heading">${name}</h1>
                    <h3 class="title-tagline">${tagline}</h3>
                    <div class="meta-list">
                    <div class="meta-item">
                        <img
                        src="Assets/Images/star.png"
                        width="22"
                        height="22"
                        alt="rating"
                        />
                        <span class="span">${vote_average.toFixed(1)}</span>
                    </div>

                    <div class="separator"></div>

                    <div class="meta-item">${seasons.length} Seasons</div>

                    <div class="separator"></div>

                    <div class="meta-item">${first_air_date.split("-")[0]}</div>

                    <div class="meta-item card-badge"> </div>
                    </div>

                    <p class="genre">${getGenres(genres)}</p>

                    <p class="overview">${overview}</p>

                    <ul class="detail-list">
                    <div class="list-item">
                        <p class="list-name">Created By:</p>
                        <p>${getDirectors(created_by)}</p>
                    </div>

                    <div class="list-item">
                        <p class="list-name">Network:</p>
                        <p>${networks[0].name}</p>
                    </div>

                    <div class="list-item">
                        <p class="list-name">Status:</p>
                        <p>${status}</p>
                    </div>
                    </ul>
                </div>

               

                
    `;

   

/*=====================Cast=================*/


fetchDataFromServer(
  `
https://api.themoviedb.org/3/tv/${movieId}/season/1/credits?api_key=${api_key}`,
  function (casts) {
    const { cast
    } = casts;




    /*=====================Cast================*/

    const movieCast = document.createElement("div");
    movieCast.classList.add("cast-con");

    movieCast.innerHTML = `  
    <div class="title-wrapper">
    <h3 class="title-large">Cast</h3>
</div>
<div class="slider-list">
    <div class="slider-inner">
  
    
    </div>
    </div>

`;

    for (const { name, profile_path } of filterCast(cast)) {
      const movieCastWrap = document.createElement("div");
      movieCastWrap.classList.add("cast-wrap");
      movieCastWrap.innerHTML = ` 
  <div class="cast-card">
        <div class="cast-img">
            <img src="${imageBaseURL}w342${profile_path}" alt="" title="${name}" loading="lazy">
        </div>
        <div class="cast-info">
            <p class="cast-name">${name}</p>
        </div>
    </div>`;
      movieCast.querySelector(".slider-inner").appendChild(movieCastWrap);
    }



    pageContent.appendChild(movieDetail);

    pageContent.appendChild(movieCast);

    pageContent.appendChild(movieTrail);


    
  }
);



     /*========================Trailers================*/

     const movieTrail = document.createElement("div");
     movieTrail.classList.add("movie-trail");
 
     movieTrail.innerHTML = `
 
     <div class="title-wrapper">
     <h3 class="title-large">Trailer and Clips</h3>
 </div>
     <div class="slider-list">
                     <div class="slider-inner"></div>
                 </div>
                 </div>`;
 
     for (const { key, name } of filterVideos(videos)) {
       const videoCard = document.createElement("div");
       videoCard.classList.add("video-card");
 
       videoCard.innerHTML = `
         <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0" frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
         `;
 
       movieTrail.querySelector(".slider-inner").appendChild(videoCard);
     }

/*=================Reviews=================*/
fetchDataFromServer(
  `
  https://api.themoviedb.org/3/tv/${movieId}/reviews?api_key=${api_key}&page=1`,
  function (review) {
    const { results,
     results: { author_details},
    } = review;


    const reviewListcon = document.createElement("div");
    reviewListcon.classList.add("review-list");

    reviewListcon.innerHTML = `

    <div class="title-wrapper">
    <h3 class="title-large">Reviews</h3>
</div>
    <div class="slider-list">
                    <div class="slider-inner"></div>
                </div>
                </div>`;

                

    for (const { author, content, created_at, author_details} of filterReview(results)) {
      const reviewListwrap = document.createElement("div");
      reviewListwrap.classList.add("review-w");

      reviewListwrap.innerHTML = `
<div class="review-card">
      <div class="review-head">
          <div class="review-img"> <img src="${imageBaseURL}${"w1280"}${author_details.avatar_path}" loading="lazy"></div>
          <div class="review-name">
              <p>${author}</p>
              <div class="r-rating">
              ${created_at.split("T")[0]}
                   </div>
          </div>
      </div>
      <div class="review-text">
          <p>${content}</p>
      </div>
  </div>`;
      reviewListcon.querySelector(".slider-inner").appendChild(reviewListwrap);
    }

/*=============Movie suggestions================*/
    
    const addSuggestedMovies = function ({ results: movieList }, title) {
      const movieListElem = document.createElement("section");
      movieListElem.classList.add("movie-list");
      movieListElem.ariaLabel = "You May Also Like";
    
      movieListElem.innerHTML = `
        <div class="title-wrapper">
          <h3 class="title-large">You May Also Like</h3>
        </div>
    
        <div class="slider-list">
    
          <div class="slider-inner"></div>
        </div>
      `;
    
      for (const movie of movieList) {
        // Called from movie_card.js
        const movieCard = createMovieCard(movie);
    
        movieListElem.querySelector(".slider-inner").appendChild(movieCard);
      }
      
      pageContent.appendChild(movieListElem);
      pageContent.appendChild(reviewListcon);
    };

    

    fetchDataFromServer(
      `https://api.themoviedb.org/3/tv/${movieId}/recommendations?api_key=${api_key}&page=1`,
      addSuggestedMovies
    );
  }
);


  }
);




search();





