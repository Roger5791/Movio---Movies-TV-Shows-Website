"use strict";

import { api_key, fetchDataFromServer } from "./api.js";

export function sidebar() {
  // Fetch all genres then change genre format
  const genreList = {};

  fetchDataFromServer(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${api_key}`,
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreList[id] = name;
      }
      genreLink();
    }
  );

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  sidebarInner.innerHTML = `
    <div class="sidebar-inner">
      <div class="sidebar-list">
        <p class="title">Genre</p>
      </div>
      <div class="sidebar-list">
        <p class="title">Language</p>

        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=en", "English")'>English</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=de", "German")'>German</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=es", "Spanish")'>Spanish</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=fr", "French")'>French</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=it", "Italian")'>Italian</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=ko", "Korean")'>Korean</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=ja", "Japanese")'>Japanese</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=cn", "Chinese ")'>Chinese </a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=th", "Thai")'>Thai</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=hi", "Hindi")'>Hindi</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=bn", "Bengali")'>Bengali</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=ml", "Malayalam")'>Malayalam</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=ta", "Tamil")'>Tamil</a>
        <a href="./tv-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=kn", "Kannada")'>Kannada</a>

      </div>
      <div class="sidebar-footer">
        <p class="copyright">Copyright 2022</p>
        <a href="https://github.com/Roger5791" target="_blank" style="font-size:15px"><img src="https://img.icons8.com/ios-filled/25/ffffff/github.png" alt="github"/>Saurav Antony</a>
        <br/>
        <p class="copyright">Powered by</p>
        <a href="https://www.themoviedb.org/" target="_blank"><img
          src="Assets/Images/tmdb-logo.png"
          alt="the movie database logo"
          width="130"
          height="17"
        />
      </div>
    </div>
  `;

  const genreLink = function () {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", "./tv-list.html");
      link.setAttribute("menu-close", "");
      link.setAttribute(
        "onclick",
        `getMovieList("with_genres=${genreId}", "${genreName}")`
      );
      link.textContent = genreName;
      sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
    }

    const sidebar = document.querySelector("[sidebar]");
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);
  };

  const toggleSidebar = function (sidebar) {
    // Toggle sidebar in Mobile Screen
    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay = document.querySelector("[overlay]");

    addEventOnElements(sidebarTogglers, "click", function () {
      sidebar.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    addEventOnElements(sidebarClose, "click", function () {
      sidebar.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });
  };
}
