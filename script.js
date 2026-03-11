// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Language switcher initializing...");
    
    // Get all language buttons and elements with language attributes
    const langButtons = document.querySelectorAll('.lang-btn');
    const langElements = document.querySelectorAll('[data-en][data-ru]');
    
    console.log(`📊 Found ${langButtons.length} buttons and ${langElements.length} translatable elements`);
    
    // Set default language (English)
    let currentLang = 'en';
    
    // Function to update content based on selected language
    function updateLanguage(lang) {
        console.log(`🔄 Switching to: ${lang}`);
        
        langElements.forEach((element, index) => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                // Store original content if not already stored
                if (!element.hasAttribute('data-original')) {
                    element.setAttribute('data-original', element.innerHTML);
                }
                
                // Update the content
                if (element.tagName === 'INPUT' || element.tagNAME === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.innerHTML = translation;
                }
            } else {
                console.warn(`⚠️ No translation found for ${lang} on element:`, element);
            }
        });
        
        // Update active button state
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
        currentLang = lang;
        console.log(`✅ Language switched to ${lang}`);
    }
    
    // Add click event to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            console.log(`👆 Button clicked: ${lang}`);
            updateLanguage(lang);
        });
    });
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    console.log(`💾 Saved language preference: ${savedLang}`);
    
    if (savedLang && (savedLang === 'en' || savedLang === 'ru')) {
        updateLanguage(savedLang);
    } else {
        // Optional: Auto-detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        console.log(`🌐 Browser language: ${browserLang}`);
        if (browserLang.startsWith('ru')) {
            updateLanguage('ru');
        } else {
            updateLanguage('en'); // Default to English
        }
    }
    
    console.log("✨ Language switcher ready!");
    
    // Activate home section by default
    showSection('home');
});

// Navigation function to switch between sections
function showSection(sectionId) {
    console.log(`📱 Switching to section: ${sectionId}`);
    
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Update navigation active state
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and highlight the clicked nav link
    const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== ENHANCED FULLSCREEN MODAL FUNCTIONS =====

let currentImageIndex = 0;
let portfolioImages = [];

// Open fullscreen modal
window.openFullscreen = function(imgElement) {
    console.log("🖼️ Opening fullscreen view");
    
    // Get all portfolio images
    portfolioImages = Array.from(document.querySelectorAll('.portfolio-image'));
    currentImageIndex = portfolioImages.indexOf(imgElement);
    
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    const modalCounter = document.querySelector('.modal-counter');
    
    // Update modal content
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modalImg.src = imgElement.src;
    
    // Find and display caption
    const portfolioItem = imgElement.closest('.portfolio-item');
    if (portfolioItem) {
        const title = portfolioItem.querySelector('h3').innerText;
        const description = portfolioItem.querySelector('p').innerText;
        captionText.innerHTML = `<strong>${title}</strong><br><span style="font-size: 1rem; opacity: 0.7;">${description}</span>`;
    }
    
    // Update counter
    if (modalCounter) {
        modalCounter.textContent = `${currentImageIndex + 1} / ${portfolioImages.length}`;
    }
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
};

// Close modal
window.closeFullscreen = function() {
    console.log("❌ Closing fullscreen view");
    document.getElementById('imageModal').style.display = "none";
    document.body.style.overflow = 'auto'; // Restore scrolling
};

// Navigate to previous image
window.prevImage = function() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = portfolioImages.length - 1; // Loop to last
    }
    updateModalImage();
};

// Navigate to next image
window.nextImage = function() {
    if (currentImageIndex < portfolioImages.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0; // Loop to first
    }
    updateModalImage();
};

// Update modal with current image
function updateModalImage() {
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    const modalCounter = document.querySelector('.modal-counter');
    
    if (portfolioImages[currentImageIndex]) {
        modalImg.src = portfolioImages[currentImageIndex].src;
        
        // Update caption
        const portfolioItem = portfolioImages[currentImageIndex].closest('.portfolio-item');
        if (portfolioItem) {
            const title = portfolioItem.querySelector('h3').innerText;
            const description = portfolioItem.querySelector('p').innerText;
            captionText.innerHTML = `<strong>${title}</strong><br><span style="font-size: 1rem; opacity: 0.7;">${description}</span>`;
        }
        
        // Update counter
        if (modalCounter) {
            modalCounter.textContent = `${currentImageIndex + 1} / ${portfolioImages.length}`;
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('imageModal');
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'Escape') {
            closeFullscreen();
        }
    }
});

// Filter functionality (optional)
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        const items = document.querySelectorAll('.portfolio-item');
        
        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});