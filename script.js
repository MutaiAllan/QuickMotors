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
function addToDb(obj) {
    fetch(`http://localhost:3000/vehicles`, {
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
fetch(`http://localhost:3000/vehicles`)
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
        <p id="rating"><button id="thumbsup">👍<div id="tuBtn">0</div></button><button id="thumbsdown">👎<div id="tdBtn">0<div></button></p>`
        li.append(ul)

        // Event listeners to reactions.
        const thumbsUp = document.getElementById("thumbsup")
        console.log(thumbsUp)
        const thumbsDown = document.getElementsByName("thumbsdown")
        thumbsUp.addEventListener('click', (e) => {
            console.log(e.target)
        })
        
        // Removing a hired vehicle from the DOM.
        // Event listener to the hire button.
        var hireBtn = document.querySelector('#hire')
        hireBtn.addEventListener('click', removeVehicle)
        // Function to remove
        function removeVehicle() {
            fetch(`http://localhost:3000/vehicles/${vehicle.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
        }
    })
}
