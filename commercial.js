document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    filterCommercialCards();

    // Add event listeners to filters
    document.getElementById('commercialBuyRentFilter').addEventListener('change', filterCommercialCards);
    document.getElementById('commercialTypeFilter').addEventListener('change', filterCommercialCards);
    document.getElementById('commercialAreaFilter').addEventListener('change', filterCommercialCards);
    document.getElementById('commercialFurnishingFilter').addEventListener('change', filterCommercialCards);
    document.getElementById('commercialLocationFilter').addEventListener('change', filterCommercialCards);
    document.getElementById('commercialMinPrice').addEventListener('change', filterCommercialCards);
    document.getElementById('commercialMaxPrice').addEventListener('change', filterCommercialCards);
});

function filterCommercialCards() {
    const commercialProperties = properties.filter(p => p.category === 'commercial');

    const buyRent = document.getElementById('commercialBuyRentFilter').value;
    const type = document.getElementById('commercialTypeFilter').value;
    const furnishing = document.getElementById('commercialFurnishingFilter').value;
    const location = document.getElementById('commercialLocationFilter').value;
    const minPrice = parseInt(document.getElementById('commercialMinPrice').value);
    const maxPrice = parseInt(document.getElementById('commercialMaxPrice').value);

    let filtered = commercialProperties.filter(p => {
        const matchesBuyRent = buyRent === 'all' || p.status === buyRent;
        const matchesType = type === 'all' || p.type === type;
        const matchesFurnishing = furnishing === 'all' || p.furnishing === furnishing;
        const matchesLocation = location === 'all' || p.location.includes(location);
        const matchesMinPrice = isNaN(minPrice) || p.price >= minPrice;
        const matchesMaxPrice = isNaN(maxPrice) || p.price <= maxPrice;
        return matchesBuyRent && matchesType && matchesFurnishing && matchesLocation && matchesMinPrice && matchesMaxPrice;
    });

    renderCommercialCards(filtered);
}

function renderCommercialCards(list) {
    const container = document.getElementById('commercialPropertyList');
    container.innerHTML = '';

    // Show filter summary
    const summary = document.createElement('div');
    summary.className = 'filter-summary';
    summary.innerHTML = `<strong>Showing ${list.length} properties</strong>`;
    container.appendChild(summary);

    if (list.length === 0) {
        container.innerHTML += '<p class="no-results">No properties found. Try changing your filters.</p>';
        return;
    }

    list.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `<a href="property-details.html?id=${prop.id}"><img src='${prop.img}' alt='${prop.title}' class='property-img'><h3>${prop.title}</h3><p class='location'>${prop.location}</p><p class='price'>₹${prop.price.toLocaleString()}/month</p><p>${prop.details}</p></a>`;
        container.appendChild(card);
    });
}