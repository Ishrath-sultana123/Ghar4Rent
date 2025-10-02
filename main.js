// Demo property data
const properties = [
    {
        id: 1,
        title: "2 BHK Apartment in Andheri",
        location: "Andheri, Mumbai",
        type: "rent",
        price: "₹35,000/month",
        details: "Spacious flat with amenities, near metro station."
    },
    {
        id: 2,
        title: "3 BHK Villa in Whitefield",
        location: "Whitefield, Bangalore",
        type: "buy",
        price: "₹1.2 Crore",
        details: "Luxury villa with garden, gated community."
    },
    {
        id: 3,
        title: "1 BHK Studio in Hinjewadi",
        location: "Hinjewadi, Pune",
        type: "rent",
        price: "₹18,000/month",
        details: "Ideal for singles, close to IT park."
    },
    {
        id: 4,
        title: "4 BHK Penthouse in Golf Course Road",
        location: "Golf Course Road, Gurgaon",
        type: "buy",
        price: "₹3.5 Crore",
        details: "Premium penthouse with city view."
    }
];

function renderProperties(list) {
    const container = document.getElementById('properties');
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p>No properties found.</p>';
        return;
    }
    list.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <h3><a href='property-details.html'>${prop.title}</a></h3>
            <div class="location">${prop.location}</div>
            <div class="type">${prop.type === 'rent' ? 'For Rent' : 'For Purchase'}</div>
            <div class="price">${prop.price}</div>
            <div class="details">${prop.details}</div>
        `;
        container.appendChild(card);
    });
}

function filterListings() {
    const type = document.getElementById('typeFilter').value;
    const location = document.getElementById('locationFilter').value.toLowerCase();
    let filtered = properties.filter(p => {
        const matchesType = type === 'all' || p.type === type;
        const matchesLocation = location === '' || p.location.toLowerCase().includes(location);
        return matchesType && matchesLocation;
    });
    renderProperties(filtered);
}

document.getElementById('typeFilter').addEventListener('change', filterListings);
document.getElementById('locationFilter').addEventListener('input', filterListings);

document.addEventListener('DOMContentLoaded', () => {
    renderProperties(properties);
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('contactResponse').textContent = 'Thank you for contacting us! We will get back to you soon.';
        this.reset();
    });
});
