"use strict";

import { imageBaseURL } from "./api.js";

// movie card

export function createMovieCard(tv) {
  const { poster_path, title, name, vote_average, first_air_date
    , id } = tv;

  const card = document.createElement("div");
  card.classList.add("movie-card");

  card.innerHTML = `
    <figure class="poster-box card-banner">
      <img
        src="${imageBaseURL}w342${poster_path}"
        alt="${name}"
        class="img-cover"
        loading="lazy"
      />
    </figure>

    <h4 class="title">${name}</h4>

    <div class="meta-list">
      <div class="meta-item">
        <img
          src="Assets/Images/star.png"
          width="20"
          height="20"
          loading="lazy"
          alt="rating"
        />
        <span class="span">${vote_average.toFixed(1)}</span>
      </div>

      <div class="card-badge">${first_air_date.split("-")[0]}</div>
    </div>

    <a href="./tv-detail.html" class="card-btn" title="${name}" onclick="getMovieDetail(${id})"></a>
  `;

  return card;
}
