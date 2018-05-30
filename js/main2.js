var beerContainer = document.getElementById("beers-info");
var dropdown = document.getElementById('beer-dropdown');

dropdown.length = 0;

var defaultOption = document.createElement('option');
defaultOption.text = 'Choose Your type of Beer';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

var categoryUrl = 'http://apichallenge.canpango.com/categories/';
var beersUrl = 'http://apichallenge.canpango.com/beers/'; 

var request = new XMLHttpRequest();
request.open('GET', categoryUrl);
request.onload = function() {
  
    var data = JSON.parse(request.responseText);
    var option;
    for (let i = 0; i < data.length; i++) {
      option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].name;
      option.setAttribute('url', data[i].url); 
      dropdown.add(option);
    }
}
request.send();

///////////////////
dropdown.addEventListener('change', function(){
   var catEndpoint = dropdown.options[dropdown.selectedIndex].getAttribute('url');
   var request = new XMLHttpRequest();
   request.open('GET', beersUrl);
   request.onload = function() {
       var data = JSON.parse(request.responseText);
       ////Function to set condition on return type/used ot create new array based on filter
       var filteredData=data.filter(beer=>beer.category==catEndpoint);
       renderHTML(filteredData);
         };
   request.send();
   });
   function renderHTML(data){
       var beerString = "";
       var ul = document.createElement('ul');
       ul.setAttribute('id', 'beerlist');
       for (i=0; i<data.length; i++){
        var li = document.createElement('li');   
        var text = document.createTextNode(data[i].name);
           //add the text to the list item
           li.appendChild(text);
           li.setAttribute('url',data[i].url);
           ul.appendChild(li);
           beerContainer.appendChild(ul);
           //beerString += "<ul>" + data[i].name + "</ul>";
       }

       beerContainer.insertAdjacentHTML('beforeend', beerString);

//////////
var myBeerList = document.getElementById('beerlist');
myBeerList.addEventListener('click',function(event){
if(event.target && event.target.nodeName =='LI'){
   var beerInfoUrl =  event.target.getAttribute('url');
   var request = new XMLHttpRequest();
   request.open('GET', beerInfoUrl);
   request.onload = function() {
       var data = JSON.parse(request.responseText);
       document.getElementById('beerFullInfo').innerHTML=
       `Beer name:${data.name}
       <br>
       IBU:${data.ibu}
       <br>
       Calories:${data.calories}
       <br>
       ABV:${data.abv}
       <br>
       Beer Style:${data.style}
       <br>
       ${data.brewery_location}`;
     console.log(data.url,data.style);   
    }
   }
   request.send();

});
    };

/*//////////
var myBeerList = document.getElementById('beerlist');
myBeerList.addEventListener('click',function(event){
//
if(event.target && event.target.nodeName =='LI'){
   console.log('item was clicked');
};

});*/
