// JavaScript sheet
// Wrapping repository into an IIFE
var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function addListItem(pokemon) {
    var $listItem = document.createElement('li');
    var $listButton = document.createElement('button');
  $listButton.innerText = pokemon;
  $listButton.classList.add('list-button');
// $listItem is appended to the <ul> in the HTML doc and the $listButton is appended to the $listItem.
    $listItem.appendChild($listButton);
  $pokemonList.appendChild($listItem);
  $listButton.addEventListener('click', function(event) {
    showDetails(pokemon);
  })
  }
// This function will allow each pokemon name to be logged in the console once called on by the event above.^^
  function showDetails(pokemon){
    console.log(pokemon);
  }

// This function will add a pokemon to the pokemonRepository if the pokemon to be added fits the correct format set by the if else statements.
  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon).every(c => ['name', 'height', 'type', 'evolution'].includes(c))) { // The c inside the () on .every and .includes is a placeholder rep for "creature".
    repository.push(pokemon);
    }else{
        console.log('Unable to add Pokemon. Use format: [\'name\', \'height\', \'type\', \'evolution\'] .')
    }
  }

  function getAll() {
    return repository;
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
    })
  }

  return {
    add: add,
    getAll: getAll,
    search: search,
    loadList: loadList
  };
})();


pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    addListItem(pokemon);
  });
});





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

{name: 'Bulbasaur', height: 0.7 + 'm', type: ['grass', 'poison'], evolution: 'at level' + 16},
{name: 'Ivysaur', height: 1 + 'm', type: ['grass', 'poison'], evolution: 'at level' + 32},
{name: 'Venusaur', height: 2 + 'm', type: ['grass', 'poison'], evolution: 'final evolution'},
{name: 'Charmander', height: 0.6 + 'm', type: ['fire'], evolution: 'at level' + 16},
{name: 'Charmeleon', height: 1.1 + 'm', type: ['fire'], evolution: 'at level' + 36},
{name: 'Charizard', height: 1.7 + 'm', type: ['fire', 'flying'], evolution: 'final evolution'},
{name: 'Squirtle', height: 0.5 + 'm', type: ['water'], evolution: 'at level' + 16},
{name: 'Wartortle', height: 1 + 'm', type: ['water'], evolution: 'at level' + 36},
{name: 'Blastoise', height: 1.6 + 'm', type: ['water'], evolution: 'final evolution'}

// This calls the add function to act on the pokemonRepository telling it to add a pokemon which fits the correct format.
// Note must be added before the forEach loop that iterates over all of the pokemon objects in the pokemonRepository array.
pokemonRepository.add({name: 'Pikachu', height: 0.4 + 'm', type: ['electric'], evolution: 'evolves with stone'});

var $pokemonList = document.querySelector('.pokemon-list');

// More concise and clean forEach method.
pokemonRepository.getAll().forEach(function(addListItem){
  pokemonRepository.addListItem(addListItem.name);
});
*/
