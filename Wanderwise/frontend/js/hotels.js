const hotelData = [
    {
        name: "Taj Mahal Palace",
        location: "Mumbai",
        rating: 5,
        budget: "High",
        image: "https://source.unsplash.com/400x300/?luxury-hotel,mumbai"
    },
    {
        name: "The Grand Delhi",
        location: "Delhi",
        rating: 4,
        budget: "Medium",
        image: "https://source.unsplash.com/400x300/?hotel,delhi"
    },
    {
        name: "Cozy Stay Bangalore",
        location: "Bangalore",
        rating: 3,
        budget: "Low",
        image: "https://source.unsplash.com/400x300/?hotel,bangalore"
    }
];

document.getElementById("hotel-form").addEventListener("submit", function (e) {
    e.preventDefault();
    filterHotels();
});

function filterHotels() {
    const location = document.getElementById("location").value;
    const rating = parseFloat(document.getElementById("rating").value);
    const budget = document.getElementById("budget").value;

    const filteredHotels = hotelData.filter(hotel =>
        (!location || hotel.location === location) &&
        (!rating || hotel.rating >= rating) &&
        (!budget || hotel.budget === budget)
    );

    const hotelList = document.getElementById("hotel-list");
    hotelList.innerHTML = "";

    if (filteredHotels.length === 0) {
        hotelList.innerHTML = "<p>No hotels match your criteria.</p>";
        return;
    }

    filteredHotels.forEach(hotel => {
        const card = document.createElement("div");
        card.classList.add("hotel-card");

        card.innerHTML = `
            <img src="${hotel.image}" alt="${hotel.name}">
            <div class="info">
                <h3>${hotel.name}</h3>
                <p>${hotel.location} - ⭐ ${hotel.rating} Stars</p>
                <p>Budget: ${hotel.budget}</p>
            </div>
        `;

        hotelList.appendChild(card);
    });
}
