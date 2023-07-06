const parentURL = `http://localhost:3000/vehicles`
// Adding an event listener to the submit button.
const submitBtn = document.getElementById('uploadVehicle')
submitBtn.addEventListener('submit', upload)

// Uploads the submitted vehicle to the db.
function upload (e) {
    e.preventDefault()
    console.log(e.target.VehicleName.value)
    let obj = {
        name:e.target.VehicleName.value,
        image:e.target.photo.value,
        description:e.target.Description.value,
        payment:e.target.price.value,
        location:e.target.location.value,
        owner:e.target.contact.value
    }
    addToDb(obj)
}

// function with fetch for uploading vehicle to the db using POST.
async function addToDb(obj) {
    fetch(parentURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(obj)
    })
    .then(res => res.json())
}

// Displaying all the vehicles in the db to the user.
// fetching data.
fetch(parentURL)
.then((res) => res.json())
.then((data) => {
    displayToDOM(data)
});
// Function to add data to DOM.
function displayToDOM(vehicles) {
    const li = document.querySelector('li')
    vehicles.forEach(vehicle => {
        var ul = document.createElement('ul')
        ul.innerHTML = `
        <h3>${vehicle.name}</h3>
	    <img class="img" src="${vehicle.image}" alt="${vehicle.name}">
    	<p>Description: ${vehicle.description}</p>
	    <p>Location: ${vehicle.location}</p>
    	<p>Price per month: ${vehicle.payment}</p>
	    <p>Contact: ${vehicle.owner}</p>
    	<button id="hire">HIRE VEHICLE!</button>
        <p id="rating"><button id="tuBtn">👍<div id="thumbsup">0</div></button><button id="tdBtn">👎<div id="thumbsdown">0<div></button></p>`
        // Selecting the hire button.
        ul.querySelector('#hire').addEventListener('click',() => {
            deleteVehicle(vehicle.id)
        })
        // function to delete vehicle from the db when it's hired.
        function deleteVehicle(vehicleId) {
            fetch(`${parentURL}/${vehicleId}`, {
                method: 'DELETE',
                header: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(vehicle)
            })
            .then(res => res.json())
        }

        // Adding the number of thumbs up when the thumbs up button is clicked.
        ul.querySelector('#tuBtn').addEventListener('click', (e) => {
            total = parseInt(e.target.textContent)
            total += 1
            e.target.textContent = total
        })
        // Adding the number of thumb down when the thumbs down button is clicked.
        ul.querySelector('#tdBtn').addEventListener('click', (e) => {
            total = parseInt(e.target.textContent)
            total += 1
            e.target.textContent = total
        })
        li.append(ul)
    })
}

// Event listeners to reactions.
// fetch to retrieve data.

async function fetchData() {
    fetch(parentURL, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    }).then((res) => res.json())
    .then((data) => {
        data.forEach(vehicle => {
            const thumbsUp = document.querySelector("#thumbsup")
            const thumbsDown = document.getElementsByName("thumbsdown")
            thumbsUp.addEventListener('click', (e) => {
            })
        })
    })
    .catch((error) => {
        console.log(error)
    })
}
fetchData()
//const thumbsUp = document.getElementById("thumbsup")
//const thumbsDown = document.getElementsByName("thumbsdown")
//thumbsUp.addEventListener('click', (e) => {
    //console.log(e.target)
//})