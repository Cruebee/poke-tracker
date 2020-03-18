// JavaScript sheet
// Wrapping repository into an IIFE
var pokemonRepository = (function() {
  // whenever pokemonRepository is accessed, it will represent an object with the two keys: (add) (getAll).
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  // variable referencing the modal-container:
  var $modalContainer = document.querySelector('#modal-container');

  // This function should Load a list of pokemon from the selected API:
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now details are added to item:
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        // create a loop to show pokemon types:
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
      })
      .catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  // This function will add a lit item to the repository:
  function addListItem(pokemon) {
    // This function will have ONE parameter-it will represent a single Pokemon.
    // USE (addListItem)'s parameter to set the inner text NOT the parameter used in the forEach loop block.(you'll pass in the actual pokemon object returned in each loop once you call addlistItem)
    var $listItem = document.createElement('li');
    var $listButton = document.createElement('button');
    $listButton.innerText = pokemon.name;
    $listButton.classList.add('list-button');
    $listItem.appendChild($listButton);
    $pokemonList.appendChild($listItem);
    $listButton.addEventListener('click', function() {
      showDetails(pokemon); // Event listener parameter must be the same as addListItem
    });
  }

  // new function for showing a modal:

  function showModal(title, text, image) {
    // clear all existing modal content:
    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    // add new modal content:
    var closeModalButton = document.createElement('button');
    closeModalButton.classList.add('modal-close');
    closeModalButton.innerText = 'Close';
    closeModalButton.addEventListener('click', hideModal);

    var modalTitle = document.createElement('h1');
    modalTitle.innerText = title;

    var modalContentType = document.createElement('p');
    modalContentType.innerText = text;

    var modalContentHeight = document.createElement('p');
    modalContentHeight.innerText = text;

    var modalContentImage = document.createElement('img');
    modalContentImage.src = image;
    modalContentImage.classList.add('pokemon-image');

    // append content to modal:
    modal.appendChild(closeModalButton);
    modal.appendChild(modalTitle);
    modal.appendChild(modalContentType);
    modal.appendChild(modalContentImage);
    // append modal to modal-container:
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }

  // function to hide modal:
  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  }

  // add event listener to close modal when 'escape' key is pressed:
  window.addEventListener('keydown', e => {
    if (
      e.key === 'Escape' &&
      $modalContainer.classList.contains('is-visible')
    ) {
      hideModal();
    }
  });

  // add event listener to close modal when clicking outside modal
  $modalContainer.addEventListener('click', e => {
    // this is triggered even when clicking INSIDE modal
    // we only want this to close modal when clicking ouside modal:
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

  // new showDetails function after use of API, with introduction of a modal:
  // update function to show modal:
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      pokemonRepository.showModal(
        item.name,
        'Height: ' + item.height + '\n' + 'Type(s): ' + item.types,
        item.imageUrl
      );
    });
  }
  /* function became obsolete when API was used:
// this function will log the name of the clicked pokemon in the console and is used in the function above^^ and will need to be updated when data is pulled from API
  function showDetails(pokemon){
    console.log(pokemon)
  }
  */

  // Updated add function to compensate for API use:
  function add(creature) {
    repository.push(creature);
  }
  // This function will add a pokemon (creature) to the array above if it is an object and all the Object.keys fit the correct format.
  // This function's conditions are designed for the repository created to design the basic structure of the app and must be changed.
  /*
  function add(creature){
    if(typeof creature === 'object' && Object.keys(creature).every(c => ['name', 'height', 'type', 'evolution'].includes(c))){
      repository.push(creature);
    }else{
      console.log('Unable to add Pokemon!');
    };
  }
*/

  // This function allows you to search for pokemon by name (or by using a few letters returning each pokemon with those letters; ex: searching for 'b' will return "bulbasaur" and Blastoise )
  function search(query) {
    return repository.filter(function(creature) {
      return creature.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

  // This function returns the array of pokemon objects
  function getAll() {
    return repository;
  }

  // this return of all the function in the IIFE allow each of the returned values to be used outside the IIFE.
  return {
    // These two functions (add) & (getAll) will allow anything outside IIFE to interact with the repository variable within it (more functions can be added as needed EX: a remove function).
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})(); // End IIFE.

// Adding a new variable for referencing the (pokemon-list) on the HTML page:
var $pokemonList = document.querySelector('.pokemon-list');

// New repository loop after loading list of pokemon from API:
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// function for search functionality
// there is no error, this function is being called outside JS page via HTML (see input onkeyup)
/* eslint-disable no-unused-vars */
function pokemonSearch() {
  // Declare variables
  var input, filter, ul, li, button, i, txtValue;
  input = document.getElementById('pokemon-search');
  filter = input.value.toUpperCase();
  ul = document.getElementById('poke-list');
  li = ul.getElementsByTagName('li');

  // loop through list items, hide those which don't match search query:
  for (i = 0; i < li.length; i++) {
    button = li[i].getElementsByTagName('button')[0];
    txtValue = button.textContent || button.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}
/* eslint-enable no-unused-vars */
