// JavaScript sheet
// Wrapping repository into an IIFE
var pokemonRepository = (function () {
  var repository = [
    {name: 'Bulbasaur', height: 0.7 + 'm', type: ['grass', 'poison'], evolution: 'at level' + 16},
    {name: 'Ivysaur', height: 1 + 'm', type: ['grass', 'poison'], evolution: 'at level' + 32},
    {name: 'Venusaur', height: 2 + 'm', type: ['grass', 'poison'], evolution: 'final evolution'},
    {name: 'Charmander', height: 0.6 + 'm', type: ['fire'], evolution: 'at level' + 16},
    {name: 'Charmeleon', height: 1.1 + 'm', type: ['fire'], evolution: 'at level' + 36},
    {name: 'Charizard', height: 1.7 + 'm', type: ['fire', 'flying'], evolution: 'final evolution'},
    {name: 'Squirtle', height: 0.5 + 'm', type: ['water'], evolution: 'at level' + 16},
    {name: 'Wartortle', height: 1 + 'm', type: ['water'], evolution: 'at level' + 36},
    {name: 'Blastoise', height: 1.6 + 'm', type: ['water'], evolution: 'final evolution'}
  ];

  function addListItem(pokemon) {
    var listItem = document.createElement('li');
    var listButton = document.createElement('button');
  listButton.innerText = pokemon;
  listButton.classList.add('list-button');

    listItem.appendChild(listButton);
  $pokemonList.appendChild(listItem);
  }

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

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

var $pokemonList = document.querySelector('.pokemon-list');

// More concise and clean forEach method.
pokemonRepository.getAll().forEach(function(addListItem){
  pokemonRepository.addListItem(addListItem.name);
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
*/
// NEED TO SPEND MORE TIME ON THE ABOVE TYPE OF CODE!!!!
