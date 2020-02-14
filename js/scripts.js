// JavaScript sheet
var repository = [
  {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'], evolution: 'at level' + 16},
  {name: 'Ivysaur', height: 1, type: ['grass', 'poison'], evolution: 'at level' + 32},
  {name: 'Venusaur', height: 2, type: ['grass', 'poison'], evolution: 'final evolution'},
  {name: 'Charmander', height: 0.6, type: ['fire'], evolution: 'at level' + 16},
  {name: 'Charmeleon', height: 1.1, type: ['fire'], evolution: 'at level' + 36},
  {name: 'Charizard', height: 1.7, type: ['fire', 'flying'], evolution: 'final evolution'},
  {name: 'Squirtle', height: 0.5, type: ['water'], evolution: 'at level' + 16},
  {name: 'Wartortle', height: 1, type: ['water'], evolution: 'at level' + 36},
  {name: 'Blastoise', height: 1.6, type: ['water'], evolution: 'final evolution'}
];

// More concise and clean forEach method.
repository.forEach(function(currentItem){
  if (currentItem.height > 0.7 + 'm'){
  document.write('<p>' + currentItem.name + ' (height: ' + currentItem.height + ')' + ' -WOW! That\'s a bigg\'n.</p>');
  }else{
    document.write('<p>' + currentItem.name + ' (height: ' + currentItem.height + ')' );
  }
});


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
