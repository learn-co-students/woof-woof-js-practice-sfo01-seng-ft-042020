//1. fetch dogs from url
//2. create span element containing dog names
//3.span element onto dog-bar id
//4.show info for each dog dog on span click
//5.toggle isGoodDog

const dogBar = document.getElementById('dog-bar');

//1.fetch dogs from url
fetch("http://localhost:3000/pups")
.then(res => res.json())
.then(doggos => renderDoggos(doggos))


function renderDoggos(doggos) {
  //2.create span element with dog names
  doggos.forEach(doggo => {
    let dogSpan = document.createElement('span')
    dogSpan.setAttribute("id", `${doggo.id}`)
    dogSpan.innerText = doggo.name

    //3.span elements onto dog bar
    dogBar.append(dogSpan);
    
    //4.show info for each dog dog on span click
    dogSpan.addEventListener('click', () => {
      let doggoInfoContainer = document.querySelector('#dog-info')
      doggoInfoContainer.innerHTML = `
        <img src='${doggo.image}'>
        <h2>${doggo.name}</h2>
        <button id='toggleGoodDog'>${doggo.isGoodDog}</button>
      `
      //5.toggle isGoodDog
      let toggleButton = document.querySelector('#toggleGoodDog')
      
      toggleButton.innerText = doggo.isGoodDog ? "Good Dog!" : "Bad Dog!"

      toggleButton.addEventListener('click', () => {
        let toggleStatus = !doggo.isGoodDog
        let updateDogStatus = { isGoodDog: toggleStatus}
        fetch(`http://localhost:3000/pups/${doggo.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateDogStatus)
        })
        .then(resp => resp.json())
      });
    });
  });
}
  
