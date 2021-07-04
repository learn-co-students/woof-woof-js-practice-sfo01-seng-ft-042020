document.addEventListener("DOMContentLoaded", () => {
    fetchDog();
    filterButtonListener();
})

function fetchDog() {
    fetch("http://localhost:3000/pups")
    .then((response) => response.json())
    .then((dogData) => renderDogs(dogData));
}

function renderDogs(dogData) {
    dogData.forEach((dog) => {
        addDogsToDogBar(dog);
    })
}

function addDogsToDogBar(dog) {
    // dog bar
    const dogBar = document.getElementById("dog-bar");
    const spanTag = document.createElement("span");
    spanTag.setAttribute("id", dog.id);
    spanTag.setAttribute("good-dog", dog.isGoodDog);
    spanTag.innerText = dog.name;
    dogBar.append(spanTag);
    
    dogBar.addEventListener("click", function(event) {
        if(event.target.id === `${dog.id}`) {
            // info div
            const dogInfo = document.getElementById("dog-info");
            
            // image
            const dogImg = document.createElement("IMG");
            dogImg.setAttribute("src", dog.image);
            dogInfo.append(dogImg);

            // name
            const dogName = document.createElement("h2");
            dogName.innerText = dog.name;
            dogInfo.append(dogName);

            // isGoodDog button
            const statusButton = document.createElement("BUTTON");
            statusButton.setAttribute("type", "button");
            // statusButton.setAttribute("id", "status");
            if (dog.isGoodDog === true) {
                statusButton.innerText = "Good Dog!";
            } else if (dog.isGoodDog === false) {
                statusButton.innerText = "Bad Dog!";
            }
            dogInfo.append(statusButton);

            // isGoodDog button click listener
            statusButton.addEventListener("click", function(event) {
                // update front-end
                if (event.target.innerText === "Good Dog!") {
                    event.target.innerText = "Bad Dog!";
                } else if (event.target.innerText === "Bad Dog!") {
                    event.target.innerText = "Good Dog!";
                }

                // fetch update back-end
                const url = `http://localhost:3000/pups/${dog.id}`;
                const obj = {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
                    body: JSON.stringify({
                      isGoodDog: !dog.isGoodDog
                    })
                  };

                fetch(url, obj)
            });            
        }
    });
}

function filterButtonListener() {
    const filterDiv = document.getElementById("filter-div");
    
    filterDiv.addEventListener("click", function(event) {
        let badDogArray = [];
        // find bad dogs
        const badDogs = document.querySelectorAll('[good-dog="false"]');
        // if button? and filter OFF
        if (event.target.tagName === "BUTTON" && event.target.innerText === "Filter good dogs: OFF") {
            // turn it on
            let switchToON = "Filter good dogs: ON";
            event.target.innerText = switchToON;
            // get each bad dogs
            badDogs.forEach((badDog) => {
                // get rid of bad dogs
                badDogArray.push(badDog);
                badDog.style.display = "none";
            })
        } else if (event.target.tagName === "BUTTON" && event.target.innerText === "Filter good dogs: ON") {
            // if filter ON - turn it off
            let switchToOFF = "Filter good dogs: OFF";
            event.target.innerText = switchToOFF;
            // get each bad dogs
            badDogs.forEach((badDog) => {
                // add bad dogs back to the DOM
                badDog.style.display = "inline";
            })
        }
    });
}
