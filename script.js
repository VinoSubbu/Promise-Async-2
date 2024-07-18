// script.js

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('breedForm');
  const breedSelect = document.getElementById('breedSelect');
  const dogContainer = document.getElementById('dogContainer');
  const dogBreed = document.getElementById('dogBreed');
  const dogImage = document.getElementById('dogImage');

  // Fetch list of breeds and populate the dropdown
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
      const breeds = Object.keys(data.message);
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
        breedSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching breed list:', error);
    });

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedBreed = breedSelect.value;
    if (selectedBreed) {
      fetchRandomDogImage(selectedBreed);
    }
  });

  /**
   * Fetches a random dog image for the specified breed.
   * @param {string} breed - The breed of the dog.
   */
  function fetchRandomDogImage(breed) {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayDogImage(breed, data.message);
      })
      .catch(error => {
        console.error('Error fetching dog image:', error);
      });
  }

  /**
   * Displays the fetched dog image and breed name on the webpage.
   * @param {string} breed - The breed of the dog.
   * @param {string} imageUrl - The URL of the dog image.
   */
  function displayDogImage(breed, imageUrl) {
    dogBreed.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
    dogImage.src = imageUrl;
    dogContainer.classList.remove('d-none');
  }
});
