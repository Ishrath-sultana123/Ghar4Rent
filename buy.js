document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    filterBuyCards();

    // Add event listeners to filters
    document.getElementById('buyTypeFilter').addEventListener('change', filterBuyCards);
    document.getElementById('buyBedroomFilter').addEventListener('change', filterBuyCards);
    document.getElementById('buyFurnishingFilter').addEventListener('change', filterBuyCards);
    document.getElementById('buyLocationFilter').addEventListener('input', filterBuyCards);
    document.getElementById('buyMinPrice').addEventListener('change', filterBuyCards);
    document.getElementById('buyMaxPrice').addEventListener('change', filterBuyCards);

    // Location search auto-suggestion
    const locationSearch = document.getElementById('buyLocationFilter');
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
                            filterBuyCards();
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

function filterBuyCards() {
    const buyProperties = properties.filter(p => p.status === 'buy');

    const type = document.getElementById('buyTypeFilter').value;
    const bedroom = document.getElementById('buyBedroomFilter').value;
    const furnishing = document.getElementById('buyFurnishingFilter').value;
    const location = document.getElementById('buyLocationFilter').value;
    const minPrice = parseInt(document.getElementById('buyMinPrice').value);
    const maxPrice = parseInt(document.getElementById('buyMaxPrice').value);

    let filtered = buyProperties.filter(p => {
        const matchesType = type === 'all' || p.type === type;
        const matchesBedroom = bedroom === 'all' || p.bedrooms === bedroom;
        const matchesFurnishing = furnishing === 'all' || p.furnishing === furnishing;
        const matchesLocation = location === 'all' || p.location.includes(location);
        const matchesMinPrice = isNaN(minPrice) || p.price >= minPrice;
        const matchesMaxPrice = isNaN(maxPrice) || p.price <= maxPrice;
        return matchesType && matchesBedroom && matchesFurnishing && matchesLocation && matchesMinPrice && matchesMaxPrice;
    });

    renderBuyCards(filtered);
}

function renderBuyCards(list) {
    const container = document.getElementById('buyPropertyList');
    container.innerHTML = '';

    // Show filter summary above cards
    const summary = document.createElement('div');
    summary.className = 'filter-summary';
    summary.style.cssText = 'grid-column:1/-1;text-align:left;font-size:1.15rem;font-weight:600;margin-bottom:10px;color:#263238;padding-left:4px;';
    summary.innerHTML = `<strong>Showing ${list.length} properties</strong>`;
    container.appendChild(summary);

    if (list.length === 0) {
        const noResults = document.createElement('p');
        noResults.className = 'no-results';
        noResults.textContent = 'No properties found. Try changing your filters.';
        container.appendChild(noResults);
        return;
    }

    list.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `<img src='${prop.img}' alt='${prop.title}' class='property-img'><h3>${prop.title}</h3><p class='location'>${prop.location}</p><p class='price'>₹${(prop.price/100000).toFixed(2)} Lakh</p><p>${prop.details}</p>`;
        container.appendChild(card);
    });
}