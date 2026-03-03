// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Dynamic Offers Banner ---
    const offerText = localStorage.getItem('storeOfferBannerText');
    if (offerText) {
        // Create the banner element
        const banner = document.createElement('div');
        banner.style.cssText = "background-color: #ff9800; color: #fff; text-align: center; padding: 10px; font-weight: bold; overflow: hidden; white-space: nowrap;";

        // Make it marquee/scroll
        const marquee = document.createElement('marquee');
        marquee.scrollAmount = 8;
        marquee.textContent = offerText;
        banner.appendChild(marquee);

        // Insert it as the very first element in the body
        document.body.insertBefore(banner, document.body.firstChild);
    }

    // --- Dynamic Hero Slider ---
    const customSlides = JSON.parse(localStorage.getItem('customStoreSlides') || '[]');
    if (customSlides.length > 0) {
        const scrollingTrack = document.querySelector('.scrolling-track');
        if (scrollingTrack) {
            // Empty the default hardcoded static images
            scrollingTrack.innerHTML = '';

            // Generate the track twice for seamless infinite scrolling, just like the original HTML
            for (let i = 0; i < 2; i++) {
                customSlides.forEach(slide => {
                    const img = document.createElement('img');
                    img.src = slide.image;
                    img.className = 'scroll-img';
                    img.alt = 'Custom Hero Slide';
                    // Optional styling if the user didn't upload identical dimensions
                    img.style.objectFit = 'cover';
                    scrollingTrack.appendChild(img);
                });
            }
        }
    }

    // --- Dynamic Custom Navigation Categories Loader ---
    const customCategories = JSON.parse(localStorage.getItem('customStoreCategories') || '[]');
    const mainDropdownContent = document.getElementById('main-dropdown-content');

    if (mainDropdownContent) {
        customCategories.forEach(cat => {
            // Find existing submenu by its Title
            let targetSubmenu = null;
            const allSubmenus = mainDropdownContent.querySelectorAll('.dropdown-submenu');
            allSubmenus.forEach(sub => {
                const titleNode = sub.querySelector('.dropdown-submenu-title');
                if (titleNode && titleNode.textContent.trim().toLowerCase() === cat.menuName.toLowerCase()) {
                    targetSubmenu = sub;
                }
            });

            // If it doesn't exist, create a new top-level sub-menu block inside Our Products
            if (!targetSubmenu) {
                targetSubmenu = document.createElement('div');
                targetSubmenu.className = 'dropdown-submenu';
                targetSubmenu.innerHTML = `
                    <a href="javascript:void(0);" class="dropdown-submenu-title">${cat.menuName}</a>
                    <div class="dropdown-submenu-content"></div>
                `;
                mainDropdownContent.appendChild(targetSubmenu);
            }

            // Append the new brand link
            const submenuContent = targetSubmenu.querySelector('.dropdown-submenu-content');
            if (submenuContent) {
                // Ensure we don't accidentally add duplicates if it's somehow run multiple times
                if (!submenuContent.querySelector(`a[href="#${cat.id}"]`)) {
                    const brandLink = document.createElement('a');
                    brandLink.href = `#${cat.id}`;
                    brandLink.textContent = cat.brandName;
                    submenuContent.appendChild(brandLink);
                }
            }
        });
    }

    // --- Dynamic Custom Products Loader ---
    const customProducts = JSON.parse(localStorage.getItem('customStoreProducts') || '[]');
    customProducts.forEach(p => {
        let sectionHeading = document.getElementById(p.category);
        let gridToAppend = null;

        // If the section doesn't exist in the HTML yet (because it's a brand new custom category)
        if (!sectionHeading) {
            sectionHeading = document.createElement('div');
            sectionHeading.id = p.category;
            sectionHeading.style.cssText = "max-width: 1200px; margin: 40px auto 30px auto; text-align: left; padding-top: 40px; margin-top: -20px;";

            // Use saved categoryDisplayName or fallback to ID
            const headingTitle = p.categoryDisplayName || p.category.replace(/-/g, ' ');
            sectionHeading.innerHTML = `<h3 style="font-size: 24px; color: var(--primary-color); border-bottom: 2px solid #ddd; padding-bottom: 10px;">${headingTitle}</h3>`;

            gridToAppend = document.createElement('div');
            gridToAppend.className = 'product-grid';
            

            // Append it to the main 'All Products' bucket
            const allProductsContainer = document.getElementById('all-products') || document.querySelector('.products-section');
            if (allProductsContainer) {
                allProductsContainer.appendChild(sectionHeading);
                allProductsContainer.appendChild(gridToAppend);
            }
        }
        // If it existing, find the adjacent grid
        else if (sectionHeading.nextElementSibling && sectionHeading.nextElementSibling.classList.contains('product-grid')) {
            gridToAppend = sectionHeading.nextElementSibling;
        }

        if (gridToAppend) {
            let priceHtml = `₹${p.origPrice}`;
            if (p.offerPrice) {
                priceHtml = `<del style="color:#999; font-size:0.85em; margin-right:6px;">₹${p.origPrice}</del> <span class="current-price">₹${p.offerPrice}</span>`;
            }

            const newCard = document.createElement('div');
            newCard.className = 'product-card';
            newCard.innerHTML = `
                <img src="${p.image}" alt="${p.title}" onerror="this.src='cooker.png'">
                <div class="product-info" style="text-align: left;">
                    <h3 class="product-title">${p.title}</h3>
                    <p class="product-price">${priceHtml}</p>
                    <p class="product-desc">${p.desc}</p>
                </div>
            `;
            gridToAppend.appendChild(newCard);
        }
    });
    // --------------------------------------

    // --- Hide Default Items (Admin Configured) ---
    const hiddenCategories = JSON.parse(localStorage.getItem('hiddenStoreCategories') || '[]');
    hiddenCategories.forEach(catId => {
        // Hide the section header div
        const sectionDiv = document.getElementById(catId);
        if (sectionDiv) {
            sectionDiv.style.display = 'none';
            // Also hide the adjacent product grid for that category
            if (sectionDiv.nextElementSibling && sectionDiv.nextElementSibling.classList.contains('product-grid')) {
                sectionDiv.nextElementSibling.style.display = 'none';
            }
        }

        // Hide from dropdown menu navigation
        const navLink = document.querySelector(`a[href="#${catId}"]`);
        if (navLink) navLink.style.display = 'none';
    });

    const hiddenProducts = JSON.parse(localStorage.getItem('hiddenStoreProducts') || '[]');
    if (hiddenProducts.length > 0) {
        const allProductCards = document.querySelectorAll('.product-card');
        allProductCards.forEach(card => {
            const titleEl = card.querySelector('.product-title');
            if (titleEl) {
                // If the title contains any of the hidden terms (e.g. '3-Burner Gas Stove')
                const shouldHide = hiddenProducts.some(term => titleEl.textContent.includes(term));
                if (shouldHide) {
                    card.style.display = 'none';
                    // We also add a custom class so the AI Chatbot scraper knows to skip it
                    card.classList.add('admin-hidden-product');
                }
            }
        });
    }
    // ---------------------------------------------

    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate the fixed header height offset (approx 80px)
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Live Search Dropdown Functionality
    let globalNavProductCards = [];
    window.filterProducts = async function () {
        const searchInput = document.getElementById('navSearchInput');
        const dropdown = document.getElementById('searchResultsDropdown');
        if (!searchInput || !dropdown) return;

        const searchTerm = searchInput.value.toLowerCase().trim();

        // Clear previous results
        dropdown.innerHTML = '';
        if (searchTerm.length === 0) {
            dropdown.classList.remove('active');
            if (globalNavProductCards.length > 0) {
                globalNavProductCards.forEach(card => card.style.display = 'block');
            }
            return;
        }

        if (globalNavProductCards.length === 0) {
            let cards = Array.from(document.querySelectorAll('.product-card'));
            if (cards.length > 0) {
                globalNavProductCards = cards;
            } else {
                try {
                    const response = await fetch('all-products.html');
                    const text = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    globalNavProductCards = Array.from(doc.querySelectorAll('.product-card'));
                } catch (e) {
                    globalNavProductCards = [];
                }
            }
        }

        const productCards = globalNavProductCards;

        // Clear previous results
        dropdown.innerHTML = '';

        if (searchTerm.length === 0) {
            dropdown.classList.remove('active');

            // Re-show all product cards if they were previously hidden
            productCards.forEach(card => card.style.display = 'block');
            return;
        }

        let hasResults = false;

        // Use a Set to track unique product titles (to avoid duplicates from sections)
        const seenTitles = new Set();

        productCards.forEach((card, index) => {
            const titleEl = card.querySelector('.product-title');
            const descEl = card.querySelector('.product-desc');
            const priceEl = card.querySelector('.product-price');
            const imgEl = card.querySelector('img');

            const title = titleEl ? titleEl.textContent : '';
            const desc = descEl ? descEl.textContent.toLowerCase() : '';
            const price = priceEl ? priceEl.textContent : '';
            const imgSrc = imgEl ? imgEl.src : '';

            // Give the card an ID if it doesn't have one so we can scroll to it
            if (!card.id) {
                card.id = 'product-' + index + '-' + title.replace(/\s+/g, '-').toLowerCase();
            }

            // Restore visibility in the main page (optional: you could keep them filtered or leave them alone)
            card.style.display = 'block';

            if (!seenTitles.has(title) && title.toLowerCase().includes(searchTerm)) {
                hasResults = true;
                seenTitles.add(title);

                const itemDiv = document.createElement('a');
                const isAllProd = window.location.pathname.includes('all-products.html');
                itemDiv.href = (isAllProd ? '' : 'all-products.html') + '#' + card.id; // Link to specific product ID
                itemDiv.className = 'search-result-item';

                // Add click listener to scroll to products and close dropdown
                itemDiv.addEventListener('click', (e) => {
                    const isAllProd = window.location.pathname.includes('all-products.html');
                    if (!isAllProd) {
                        return; // Let the default anchor click nav us to the page
                    }
                    e.preventDefault();
                    dropdown.classList.remove('active');
                    searchInput.value = '';

                    const headerOffset = 80;
                    const elementPosition = card.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

                    const originalBg = card.style.backgroundColor;
                    const originalTransition = card.style.transition;
                    card.style.transition = 'background-color 0.5s ease';
                    card.style.backgroundColor = '#fff3e0';

                    setTimeout(() => {
                        card.style.backgroundColor = originalBg;
                        setTimeout(() => {
                            card.style.transition = originalTransition;
                        }, 500);
                    }, 1500);
                });

                itemDiv.innerHTML = `
                    <img src="${imgSrc}" class="search-result-img" alt="${title}">
                    <div class="search-result-info">
                        <span class="search-result-title">${title}</span>
                        <span class="search-result-price">${price}</span>
                    </div>
                `;

                dropdown.appendChild(itemDiv);
            }
        });

        if (!hasResults) {
            dropdown.innerHTML = '<div class="search-no-results">No products found for "' + searchTerm + '"</div>';
        }

        dropdown.classList.add('active');
    };

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
        const searchContainer = document.querySelector('.nav-search-container');
        const dropdown = document.getElementById('searchResultsDropdown');

        if (dropdown && searchContainer && !searchContainer.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });

    // --- Mobile Menu Accordion Handlers ---
    // Prevent default anchor jumping for # links, and handle mobile toggles safely for iOS.

    // 1. Toggle Our Products
    const productsToggle = document.getElementById('mobile-products-toggle');
    if (productsToggle) {
        productsToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const content = document.getElementById('main-dropdown-content');
            if (content) content.classList.toggle('mobile-open');
        });
    }

    // 2. Toggle Submenus
    const subMenuTitles = document.querySelectorAll('.dropdown-submenu-title');
    subMenuTitles.forEach(title => {
        title.addEventListener('click', (e) => {
            e.preventDefault();
            const submenuContent = title.nextElementSibling;
            if (submenuContent) submenuContent.classList.toggle('mobile-open');
        });
    });

    // 3. Close Menu on Link Click
    const closeTriggers = document.querySelectorAll('.nav-close-trigger, .nav-links > li > a:not(#mobile-products-toggle)');
    closeTriggers.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

});
