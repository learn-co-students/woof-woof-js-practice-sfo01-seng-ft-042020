const ROOT_URL = "http://localhost:3000"



function fetchPups() {
  return fetch(`${ROOT_URL}/pups`)
  .then(res => res.json())
}

const fetchPup = (dog_id) => {
  fetch(`${ROOT_URL}/pups/${dog_id}`)
  .then(res => res.json())
  .then(obj => displayDog(obj))

}

const filterDogs = () => {
  const filter = document.querySelector('#good-dog-filter');
  
  // const state = filter.innerText.split(': ')[1];
  filter.addEventListener('click', (e) => {
    if(filter.innerText.includes("OFF")) {
      filter.innerText = "Filter good dogs: ON";
      updateDogNav();
    } else {
      filter.innerText = "Filter good dogs: OFF";
      updateDogNav();
    }
  })
}

const updateDogNav = () => {
  
  const navFilter = document.querySelector('#good-dog-filter');
  if(navFilter.innerText.includes("ON")) {
    let filter = true
    console.log("filter is on")
    
    fetchPups().then(dogs => renderPups(dogs, filter))
  } else {
    filter = false
    fetchPups().then(dogs => renderPups(dogs, filter))
  }

}
const displayDog = (dog) => {
  const dogContainer = document.querySelector('#dog-summary-container')
  dogContainer.innerHTML = ""
  const image = document.createElement('img');
  image.src = dog.image;
  image.style = "width: 500px";
  const name = document.createElement('h2');
  name.innerText = dog.name;


  const button = document.createElement('button');
  if(dog.isGoodDog) {
    buttonText = "Good Dog!"
  } else {
    buttonText = "Bad Dog!"
  }
  
  button.dataset.id = dog.id;
  button.addEventListener('click', e => {
    toggleDog(e)
  })
  

  button.innerText = buttonText;
  dogContainer.append(button, name, image);
  
}

const renderPups = (dogs, filter=false) => {
  const container = document.querySelector("#dog-bar");
  container.innerHTML = "";
  if(filter){
    console.log("FILTER ON")
    dogs = dogs.filter(dog => dog.isGoodDog)
    
  }

  
  dogs.forEach(dog => {
    displayDogBar(dog);

  })
  listenForDog();
}

const displayDogBar = (dog) => {
  const container = document.querySelector("#dog-bar");
  
  const name = document.createElement('span');
  name.innerText = dog.name;
  name.setAttribute("id", dog.id)
  container.appendChild(name)
}

const listenForDog = () => {
  let spans = document.querySelectorAll('span')
  spans.forEach(span => {
    span.addEventListener('click', (e) => {
        fetchPup(e.target.id)
      })
  })
  // 
}



const toggleDog = (e) => {
  let mood = {isGoodDog: false}
  if(e.target.innerText == "Bad Dog!"){
    mood = {isGoodDog: true}
  }
  fetch(`${ROOT_URL}/pups/${e.target.dataset.id}`, {
    method: "PATCH",
    header: {
      "content-type": "application/json"
    }, 
    body: JSON.stringify(mood)
  }).then(res => res.json())
  .then(obj => console.log(obj))
  // console.dir(e.target)
}

const init = () => {
  
  // fetchPups().then(obj => console.log(obj))
  fetchPups().then(renderPups);
  filterDogs();
  // listenForDog();
}

document.addEventListener('DOMContentLoaded', init)