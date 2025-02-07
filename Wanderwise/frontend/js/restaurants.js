const hotelData = [
    {
        name: "The Taj Mahal Palace",
        location: "Mumbai",
        rating: 4.8,
        budget: "High",
        amenities: "WiFi",
        image: "https://source.unsplash.com/400x300/?hotel,mumbai"
    },
    {
        name: "The Leela Palace",
        location: "Delhi",
        rating: 4.5,
        budget: "Medium",
        amenities: "Breakfast",
        image: "https://source.unsplash.com/400x300/?hotel,delhi"
    },
    {
        name: "ITC Gardenia",
        location: "Bangalore",
        rating: 4.3,
        budget: "Low",
        amenities: "Pool",
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
    const amenities = document.getElementById("amenities").value;

    const filteredHotels = hotelData.filter(hotel =>
        (!location || hotel.location === location) &&
        (!rating || hotel.rating >= rating) &&
        (!budget || hotel.budget === budget) &&
        (!amenities || hotel.amenities === amenities)
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
            <div>
                <h3>${hotel.name}</h3>
                <p>Location: ${hotel.location}</p>
                <p>Rating: ⭐${hotel.rating}</p>
                <p>Budget: ${hotel.budget}</p>
                <p>Amenities: ${hotel.amenities}</p>
            </div>
        `;

        hotelList.appendChild(card);
    });
}
