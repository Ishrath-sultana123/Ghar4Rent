function renderRentCards(list) {
    const container = document.getElementById('rentPropertyList');
    if (!container) return;
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p>No properties found.</p>';
        return;
    }
    list.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `<a href="property-details.html?id=${prop.id}"><img src='${prop.img}' alt='${prop.title}' class='property-img'><h3>${prop.title}</h3><p class='location'>${prop.location}</p><p class='price'>₹${prop.price.toLocaleString()}/month</p><p>${prop.details}</p></a>`;
        container.appendChild(card);
    });
}

function renderBuyCards(list) {
    const container = document.getElementById('buyPropertyList');
    if (!container) return;
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p>No properties found.</p>';
        return;
    }
    list.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `<a href="property-details.html?id=${prop.id}"><img src='${prop.img}' alt='${prop.title}' class='property-img'><h3>${prop.title}</h3><p class='location'>${prop.location}</p><p class='price'>₹${(prop.price/100000).toFixed(2)} Lakh</p><p>${prop.details}</p></a>`;
        container.appendChild(card);
    });
}

function renderNewProjects(list) {
    const container = document.getElementById('newProjectsList');
    if (!container) return;
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p>No new projects found.</p>';
        return;
    }
    list.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `<a href="property-details.html?id=${prop.id}"><img src='${prop.img}' alt='${prop.title}' class='property-img'><h3>${prop.title}</h3><p class='location'>${prop.location}</p><p class='price'>${prop.price.toLocaleString()}</p><p>${prop.details}</p></a>`;
        container.appendChild(card);
    });
}

function renderFeaturedProperties(list) {
    const container = document.getElementById('featuredPropertiesList');
    if (!container) return;
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p>No featured properties found.</p>';
        return;
    }
    list.forEach(prop => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `<a href="property-details.html?id=${prop.id}"><img src='${prop.img}' alt='${prop.title}' class='property-img'><h3>${prop.title}</h3><p class='location'>${prop.location}</p><p class='price'>${prop.price.toLocaleString()}</p><p>${prop.details}</p></a>`;
        container.appendChild(card);
    });
}

function renderTopLocalities(list) {
    const container = document.getElementById('topLocalitiesList');
    if (!container) return;
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<p>No top localities found.</p>';
        return;
    }
    list.forEach(locality => {
        const card = document.createElement('div');
        card.className = 'locality-card';
        card.innerHTML = `<h3>${locality}</h3>`;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if properties array exists
    if (typeof properties !== 'undefined') {
        const rentProperties = properties.filter(p => p.status === 'rent');
        const buyProperties = properties.filter(p => p.status === 'buy');
        const newProjects = properties.slice(-3); // Get last 3 properties as "new"
        const featuredProperties = properties.filter(p => p.id % 2 === 0).slice(0,3); // Example: feature even ID properties
        const topLocalities = [...new Set(properties.map(p => p.location.split(', ')[1]))].slice(0, 5);

        // Check if the containers exist before rendering
        if (document.getElementById('rentPropertyList')) {
            renderRentCards(rentProperties.slice(0,3));
        }
        if (document.getElementById('buyPropertyList')) {
            renderBuyCards(buyProperties.slice(0,3));
        }
        if (document.getElementById('newProjectsList')) {
            renderNewProjects(newProjects);
        }
        if (document.getElementById('featuredPropertiesList')) {
            renderFeaturedProperties(featuredProperties);
        }
        if (document.getElementById('topLocalitiesList')) {
            renderTopLocalities(topLocalities);
        }
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const contactResponse = document.getElementById('contactResponse');
            if(contactResponse) {
                contactResponse.textContent = 'Thank you for contacting us! We will get back to you soon.';
            }
            this.reset();
        });
    }

    // Go to top button logic
    const goToTopBtn = document.getElementById("goToTopBtn");
    const header = document.querySelector('header');

    window.onscroll = function() {
        // Go to top button visibility
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            goToTopBtn.style.display = "block";
        } else {
            goToTopBtn.style.display = "none";
        }

        // Sticky header
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    goToTopBtn.addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
});