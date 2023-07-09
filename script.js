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
        owner:e.target.contact.value,
        thumbsup:0,
        thumbsdown:0
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
        <p id="rating"><button id="tuBtn">👍<span id="thumbsup">${vehicle.thumbsup}</span></button><button id="tdBtn">👎<span id="thumbsdown">${vehicle.thumbsdown}<span></button></p>`
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
        ul.querySelector('#tuBtn').addEventListener('click', () => {
            vehicle.thumbsup += 1
            ul.querySelector('#thumbsup').textContent = vehicle.thumbsup
            updateThumbsUp(vehicle)
        })
        // fetch to update thumbs up in db.
        async function updateThumbsUp(vehicleObj) {
            fetch(`${parentURL}/${vehicleObj.id}`, {
                method:'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vehicleObj)
            })
            .then(res => res.json())
            .then(vehicle => console.log(vehicle))
        }
        // Adding the number of thumb down when the thumbs down button is clicked.
        ul.querySelector('#tdBtn').addEventListener('click', () => {
            vehicle.thumbsdown += 1
            ul.querySelector('#thumbsdown').textContent = vehicle.thumbsdown
            updateThumbsDown(vehicle)
        })
        // Updating number of thumb downs in the db using fetch.
        async function updateThumbsDown(vehicleObj) {
            fetch(`${parentURL}/${vehicleObj.id}`, {
                method:'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vehicleObj)
            })
            .then(res => res.json())
            .then(vehicle => console.log(vehicle))
        }
        li.append(ul)
    })
}