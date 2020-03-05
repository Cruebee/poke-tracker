// JavaScript sheet
// Wrapping repository into an IIFE
var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// Create a list of items pulled from API
function addListItem(pokemon) {
  // assign a variable to ul list
  var $pokemonList = document.querySelector('.pokemon-list');
  // variable for list item
  var $listItem = document.createElement('li');
  //variable for button
  var $listButton = document.createElement('button');
  $listButton.innerText = pokemon.name;
  $listButton.classList.add('list-button');
  // $listItem is appended to the <ul> in the HTML doc and the $listButton is appended to the $listItem.
  $listItem.appendChild($listButton);
  $pokemonList.appendChild($listItem);
  $listButton.addEventListener('click', function(event) {
    showDetails(pokemon);
  });
}

// This function will allow each pokemon name to be logged in the console once called on by the event above.^^
  function showDetails(item){
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }
/* The loadList method will fetch data from the API, then add it to repository with the add function implemented earlier.
you want each item to have a name and a detailsUrl property. Use detailsUrl property to load detailed data for a given pokemon.
To do that add in the loadDetails() function (which has been added below loadList function) */
// This function loads the list of pokemon from the API:
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

// This function loads the details of each pokemon from the API:
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now add the details to the item.
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function (e) {
      console.error(e);
    });
  }

  // This function will allow for searching for a pokemon by name:
  function search(query){
    return repository.filter(function(creature){ // need to figure out how to pull up pokemon names now that repository is using an outside API to create pokemon buttons.
      return creature.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
  }

  // This function will add a pokemon to the pokemonRepository if the pokemon to be added fits the correct format set by the if else statements.
    function add(pokemon) {
      repository.push(pokemon);
      }

// This function will return the data within the repository:
    function getAll() {
      return repository;
    }


// Returns all previous functions so they can be used outside IIFE
  return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();
// END IIFE POKEDEX REPOSITORY


pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

  // In order to search for pokemon by name and have their name displayed in the console use this call:
  console.log(pokemonRepository.search('ivy').map(function(pokemon){
    return pokemon.name
  }))
