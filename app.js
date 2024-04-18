class RenderManager {
  constructor() {
    this.parentDivFilm = document.querySelector("#movies");
    this.movieBlock = document.querySelector(".movieBlock");
  }
  renderBlockFilms(arr) {
    this.parentDivFilm.innerHTML = "";
    this.movieBlock.innerHTML = "";
    arr.forEach((element) => {
      this.parentDivFilm.insertAdjacentHTML(
        "beforeend",
        `
     <div class = 'filmCard'>
     <div class = 'image' ><img src="${element.Poster}" alt=""> </div>
     <div class = 'content'>
     <h3>${element.Title} </h3>
     <p>${element.Year}</p>
     <span class = 'type'>${element.Type}</span>
     <button class = 'details' data-imdbid="${element.imdbID}" >Details</button>
     </div> 
     </div>
    `
      );
    });
    this.parentDivFilm.classList.add("background");
  }

  renderBlockFilm(obj) {
    this.movieBlock.classList.add("bcolor");
    this.movieBlock.innerHTML = "";
    this.movieBlock.insertAdjacentHTML(
      "beforeend",
      `
      <div class = 'movieCart'>
       <div class = 'poster'><img src="${obj.Poster}" alt="" /></div>
      <div class="aboutFilm">
        <h3> <span>Title : </span> ${obj.Title}</h3>
        <p><span>Runtime :</span> ${obj.Runtime}</p>
        <p><span>Released : </span> ${obj.Released}</p>
        <p><span>Genre : </span> ${obj.Genre}</p>
        <p><span>Country : </span> ${obj.Country}</p>
        <p><span>Director : </span> ${obj.Director}</p>
        <p><span>Writer : </span> ${obj.Writer}</p>
        <p><span>Actors :</span> ${obj.Actors}</p>
        <p><span>Plot :</span> ${obj.Plot}</p>
        <p><span>Awards :</span> ${obj.Awards}</p>
        <p><span>BoxOffice : </span> ${obj.BoxOffice}</p>
      </div>
      </div>
     
   `
    );
  }

  renderBlockError() {
    this.parentDivFilm.insertAdjacentHTML(
      "beforeend",
      `
    <div class = 'error'> <h2>Movie not found!.</h2></div>
    `
    );
    this.parentDivFilm.classList.add("background");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const keyAPI = "d14b9c6e";
  let url = new URL("http://www.omdbapi.com");
  url.searchParams.set("apikey", keyAPI);
  let renderManager = new RenderManager();

  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("searchForm"));
    const nameVideo = formData.get("nameVideo").trim();
    const type = formData.get("typeVideo");
    url.searchParams.set("s", nameVideo);
    url.searchParams.set("type", type);
    try {
      if (!nameVideo) {
        throw new Error("The field cannot be empty");
      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => data.Search)
        .then((search) => {
          renderManager.renderBlockFilms(search);
          e.target.reset();
        })
        .catch((error) => renderManager.renderBlockError());
    } catch (error) {
      alert(error.message);
    }
  });

  document.querySelector("#movies").addEventListener("click", (e) => {
    let targetElement = e.target;
    if ((targetElement.tagName = "BUTTON")) {
      const id = targetElement.dataset.imdbid;
      url.searchParams.delete("s");
      url.searchParams.delete("type");
      url.searchParams.set("i", id);
      fetch(url)
        .then((response) => response.json())
        .then((data) => renderManager.renderBlockFilm(data));
    }
  });
});
