document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    filterRentCards();

    // Add event listeners to filters
    document.getElementById('rentTypeFilter').addEventListener('change', filterRentCards);
    document.getElementById('rentBedroomFilter').addEventListener('change', filterRentCards);
    document.getElementById('rentFurnishingFilter').addEventListener('change', filterRentCards);
    document.getElementById('rentLocationFilter').addEventListener('input', filterRentCards);
    document.getElementById('rentMinPrice').addEventListener('change', filterRentCards);
    document.getElementById('rentMaxPrice').addEventListener('change', filterRentCards);

    // Location search auto-suggestion
    const locationSearch = document.getElementById('rentLocationFilter');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    const locationSearchContainer = document.getElementById('locationSearchContainer');

    if (locationSearch) {
        const locations = [...new Set(properties.map(p => p.location.split(', ')[1]))];

        locationSearch.addEventListener('input', () => {
            const inputText = locationSearch.value.toLowerCase();
            suggestionsContainer.innerHTML = '';
            if (inputText.length > 0) {
                const suggestions = locations.filter(loc => loc.toLowerCase().startsWith(inputText));
                if (suggestions.length > 0) {
                    suggestions.forEach(s => {
                        const suggestionItem = document.createElement('div');
                        suggestionItem.className = 'suggestion-item';
                        suggestionItem.textContent = s;
                        suggestionItem.onclick = () => {
                            locationSearch.value = s;
                            suggestionsContainer.style.display = 'none';
                            filterRentCards();
                        };
                        suggestionsContainer.appendChild(suggestionItem);
                    });
                    suggestionsContainer.style.display = 'block';
                } else {
                    suggestionsContainer.style.display = 'none';
                }
            } else {
                suggestionsContainer.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (!locationSearchContainer.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }
});

function filterRentCards() {
    const rentProperties = properties.filter(p => p.status === 'rent');

    const type = document.getElementById('rentTypeFilter').value;
    const bedroom = document.getElementById('rentBedroomFilter').value;
    const furnishing = document.getElementById('rentFurnishingFilter').value;
    const location = document.getElementById('rentLocationFilter').value;
    const minPrice = parseInt(document.getElementById('rentMinPrice').value);
    const maxPrice = parseInt(document.getElementById('rentMaxPrice').value);

    let filtered = rentProperties.filter(p => {
        const matchesType = type === 'all' || p.type === type;
        const matchesBedroom = bedroom === 'all' || p.bedrooms === bedroom;
        const matchesFurnishing = furnishing === 'all' || p.furnishing === furnishing;
        const matchesLocation = location === 'all' || p.location.includes(location);
        const matchesMinPrice = isNaN(minPrice) || p.price >= minPrice;
        const matchesMaxPrice = isNaN(maxPrice) || p.price <= maxPrice;
        return matchesType && matchesBedroom && matchesFurnishing && matchesLocation && matchesMinPrice && matchesMaxPrice;
    });

    renderRentCards(filtered);
}

function renderRentCards(list) {
    const container = document.getElementById('rentPropertyList');
    container.innerHTML = '';

    // Update filter summary above the cards
    const summaryDiv = document.getElementById('rentFilterSummary');
    summaryDiv.innerHTML = `<strong>Showing ${list.length} properties</strong>`;

    if (list.length === 0) {
        container.innerHTML = '<p class="no-results">No properties found. Try changing your filters.</p>';
        return;
    }

    list.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `<img src='${prop.img}' alt='${prop.title}' class='property-img'><h3>${prop.title}</h3><p class='location'>${prop.location}</p><p class='price'>₹${prop.price.toLocaleString()}/month</p><p>${prop.details}</p>`;
        container.appendChild(card);
    });
}