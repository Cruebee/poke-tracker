var pokemonRepository=function(){var e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150",n=document.querySelector("#modal-container");function o(){n.classList.remove("is-visible")}function i(e){pokemonRepository.loadDetails(e).then(function(){pokemonRepository.showModal(e.name,"Height: "+e.height+"\nType(s): "+e.types,e.imageUrl)})}function a(t){e.push(t)}return window.addEventListener("keydown",e=>{"Escape"===e.key&&n.classList.contains("is-visible")&&o()}),n.addEventListener("click",e=>{e.target===n&&o()}),{add:a,getAll:function(){return e},search:function(t){return e.filter(function(e){return-1!==e.name.toLowerCase().indexOf(t.toLowerCase())})},addListItem:function(e){var t=document.createElement("li"),n=document.createElement("button");n.innerText=e.name,n.classList.add("list-button"),t.appendChild(n),$pokemonList.appendChild(t),n.addEventListener("click",function(){i(e)})},loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){a({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:function(e){var t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.types=[];for(var n=0;n<t.types.length;n++)e.types.push(t.types[n].type.name)}).catch(function(e){console.error(e)})},showDetails:i,showModal:function(e,t,i){n.innerHTML="";var a=document.createElement("div");a.classList.add("modal");var s=document.createElement("button");s.classList.add("modal-close"),s.innerText="Close",s.addEventListener("click",o);var r=document.createElement("h1");r.innerText=e;var l=document.createElement("p");l.innerText=t,document.createElement("p").innerText=t;var c=document.createElement("img");c.src=i,c.classList.add("pokemon-image"),a.appendChild(s),a.appendChild(r),a.appendChild(l),a.appendChild(c),n.appendChild(a),n.classList.add("is-visible")},hideModal:o}}(),$pokemonList=document.querySelector(".pokemon-list");function pokemonSearch(){var e,t,n,o;for(e=document.getElementById("pokemon-search").value.toUpperCase(),t=document.getElementById("poke-list").getElementsByTagName("li"),o=0;o<t.length;o++)((n=t[o].getElementsByTagName("button")[0]).textContent||n.innerText).toUpperCase().indexOf(e)>-1?t[o].style.display="":t[o].style.display="none"}pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});