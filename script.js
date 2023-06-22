const api_url = "http://localhost:8000/api/v1/titles/";

// move the carousel to the right
for (arrow of document.getElementsByClassName("right--arrow")) {
  arrow.onclick = function () {
    // Code block executed when the right arrow is clicked

    let images = this.parentElement.getElementsByClassName("carousel__img");
    // Retrieve the image elements within the same parent element as the clicked arrow

    images[0].parentElement.style.display = "none";
    // Hide the parent element of the first image

    images[0].parentElement.parentElement.append(images[0].parentElement);
    // Move the parent element of the first image to the end of its grandparent element's children

    images[3].parentElement.style.display = "inline";
    // Display the parent element of the fourth image (assuming there are four images in total)
  };
}

// move the carousel to the left
for (arrow of document.getElementsByClassName("left--arrow")) {
  arrow.onclick = function () {
    // Code block executed when the left arrow is clicked

    let images = this.parentElement.getElementsByClassName("carousel__img");
    // Retrieve the image elements within the same parent element as the clicked arrow

    images[3].parentElement.style.display = "none";
    // Hide the parent element of the fourth image

    images[images.length - 1].parentElement.parentElement.prepend(
      images[images.length - 1].parentElement
    );
    // Move the parent element of the last image to the beginning of its grandparent element's children

    images[0].parentElement.style.display = "inline";
    // Display the parent element of the first image
  };
}

// Get the modal
function getModal() {
  const modal = document.getElementById("myModal");
  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("modal-content__close")[0];
  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
    modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  return modal;
}

// Get the datas movie from the API
function fillModal(id, pre) {
  fetch(api_url + id)
    .then((response) => response.json())
    .then((json) => {
      // Code executed after fetching and parsing the JSON response

      // Fill the title, image (cover), and description in the best movie section and modals
      document.getElementById(pre + "__title").innerHTML = json.title;
      document
        .getElementById(pre + "__img")
        .setAttribute("src", json.image_url);
      document.getElementById(pre + "__description").innerHTML =
        json.long_description;

      // Fill the modal from the best movie section
      if (pre == "best") {
        document.getElementById("info").id = json.id;
      }

      // Fill the modal with other data
      if (pre == "modal") {
        var attributes = [
          "genres",
          "date_published",
          "avg_vote",
          "imdb_score",
          "directors",
          "actors",
          "duration",
          "countries",
          "worldwide_gross_income",
        ];
        for (var attribute of attributes) {
          document.getElementById(pre + "__" + attribute).innerHTML =
            json[attribute];
        }
      }
    });
}

//When the user clicks on Info, open the modal
function displayModalBest() {
  const topButton = document.getElementById("info");
  topButton.onclick = function () {
    // Code block executed when the top button is clicked

    let modal = getModal();
    modal.style.display = "block";
    fillModal(this.id, "modal");
  };
}

// When the user clicks on a cover, open the modal
function displayModalCarousel() {
  for (
    let i = 0;
    i < document.getElementsByClassName("carousel__img").length;
    i++
  ) {
    document.getElementsByClassName("carousel__img")[i].onclick = function () {
      // Code block executed when a carousel image is clicked

      let modal = getModal();
      modal.style.display = "block";
      fillModal(this.id, "modal");
    };
  }
}

// Create the carousel with the cover of the movies from the category
function getCover(top, url, category, slice_start, slice_end, movies = []) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      // Code executed after fetching and parsing the JSON response

      for (movie of json.results) {
        movies.push([movie.id, movie.image_url]);
      }

      if (top - 5 > 0) {
        // Recursive call to get more cover images
        getCover(top - 5, json.next, category, slice_start, slice_end, movies);
        return [];
      }

      return movies;
    })
    .then((movies) => {
      // Code executed after all cover images are fetched and processed

      if (movies.length > 0) {
        // Loop through the movies and create HTML elements for each cover image

        for (movie of movies.slice(slice_start, slice_end)) {
          const img = document.createElement("img");
          img.id = movie[0];
          img.src = movie[1];
          img.className = "carousel__img";
          const link = document.createElement("a");
          link.href = "#";
          link.appendChild(img);
          let carousel = document.getElementById(category + "__carousel");
          carousel.appendChild(link);

          if (carousel.childNodes.length >= 6) {
            link.style.display = "none";
          }
        }

        if (category == "best-rating") {
          fillModal(movies[0][0], "best");
        }

        displayModalCarousel();
      }
    });
}

// Run the program
function main() {
  const cat1 = document.getElementById("cat1__title").textContent;
  const cat2 = document.getElementById("cat2__title").textContent;
  const cat3 = document.getElementById("cat3__title").textContent;

  // Fetch and display cover images for the "best-rating" category
  getCover(7, api_url + "?sort_by=-imdb_score", "best-rating", 1, 8);

  // Fetch and display cover images for the first category
  getCover(
    7,
    api_url + "?sort_by=-imdb_score&genre_contains=" + cat1,
    "first_category",
    0,
    7
  );

  // Fetch and display cover images for the second category
  getCover(
    7,
    api_url + "?sort_by=-imdb_score&genre_contains=" + cat2,
    "second-category",
    0,
    7
  );

  // Fetch and display cover images for the third category
  getCover(
    7,
    api_url + "?sort_by=-imdb_score&genre_contains=" + cat3,
    "third-category",
    0,
    7
  );
}

displayModalBest();
main();
