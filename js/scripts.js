// JavaScript sheet
// Wrapping repository into an IIFE
var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // This function will add a pokemon to the pokemonRepository if the pokemon to be added fits the correct format set by the if else statements.
    function add(pokemon) {
      repository.push(pokemon);
      }


    function getAll() {
      return repository;
    }

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


// Returns all previous functions so they can be used outside IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();
// END IIFE POKEDEX REPOSITORY

/* The loadList method will fetch data from the API, then add it to repository with the add function implemented earlier.
you want each item to have a name and a detailsUrl property. Use detailsUrl property to load detailed data for a given pokemon.
To do that add in the loadDetails() function */
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


// This function will allow each pokemon name to be logged in the console once called on by the event above.^^
  function showDetails(item){
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }


// Old forEach to iterate over repository array.
/*
pokemonRepository.getAll().forEach(function(currentItem){ // updates the forEach loop to use the .getAll function to print array.
  if (currentItem.height > 0.7 + 'm'){
  document.write('<p>' + currentItem.name + ' (height: ' + currentItem.height + ')' + ' -WOW! That\'s a bigg\'n.</p>');
  }else{
    document.write('<p>' + currentItem.name + ' (height: ' + currentItem.height + ')' );
  }
});
*/

// Create a for loop that iterates over each item in repository and use document.write() inside the loop's code to write the pokemon name on website.
/* Here is the longer (standard (for) loop method.) above is the shorter cleaner version
for (var i = 0; i < repository.length; i++){
  if (repository[i].height > 0.7){ // If height is greater than 0.7...
    document.write(repository[i].name + ' (height: ' + repository[i].height + ')' + ' -Wow!! That\'s a bigg\'n' + '<br>') // Write name and height with message -Wow!! That's a bigg'n.
  }else{ // If height is not greater than 0.7
    document.write(repository[i].name + ' (height: ' + repository[i].height + ')<br>') // Only write the name and height.
  }
}

Here is the Repository Created for building the inital app:

{name: 'Bulbasaur',
height: 0.7 + 'm',
type: ['grass', 'poison'],
evolution: 'at level' + 16},

{name: 'Ivysaur',
height: 1 + 'm',
type: ['grass', 'poison'],
evolution: 'at level' + 32},

{name: 'Venusaur',
height: 2 + 'm',
type: ['grass', 'poison'],
evolution: 'final evolution'},

{name: 'Charmander',
height: 0.6 + 'm',
type: ['fire'],
evolution: 'at level' + 16},

{name: 'Charmeleon',
height: 1.1 + 'm',
type: ['fire'],
evolution: 'at level' + 36},

{name: 'Charizard',
height: 1.7 + 'm',
type: ['fire', 'flying'],
evolution: 'final evolution'},

{name: 'Squirtle',
height: 0.5 + 'm',
type: ['water'],
evolution: 'at level' + 16},

{name: 'Wartortle',
height: 1 + 'm',
type: ['water'],
evolution: 'at level' + 36}, // Note the difference between this object's readablitity and the one below it.
// The more properties an object has the harder it will be to read if you keep them all on one line as seen below:
{name: 'Blastoise', height: 1.6 + 'm', type: ['water'], evolution: 'final evolution'}
];

// This function will add a pokemon to the pokemonRepository if the pokemon to be added fits the correct format set by the if else statements.
  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon).every(p => ['name', 'height', 'type', 'evolution'].includes(p))) { // The p inside the () on .every and .includes is a placeholder rep for "pokemon".
    repository.push(pokemon);
    }else{
        console.log('Unable to add Pokemon. Use format: [\'name\', \'height\', \'type\', \'evolution\'] .')
    }
  }

// This calls the add function to act on the pokemonRepository telling it to add a pokemon which fits the correct format.
// Note must be added before the forEach loop that iterates over all of the pokemon objects in the pokemonRepository array.
pokemonRepository.add({name: 'Pikachu', height: 0.4 + 'm', type: ['electric'], evolution: 'evolves with stone'});

var $pokemonList = document.querySelector('.pokemon-list');

// More concise and clean forEach method.
pokemonRepository.getAll().forEach(function(addListItem){
  pokemonRepository.addListItem(addListItem.name);
});
*/
