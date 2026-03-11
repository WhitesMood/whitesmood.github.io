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

// Modal functions for image enlargement
function openModal(imgElement) {
    console.log("🖼️ Opening modal for image");
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    
    modal.style.display = "block";
    modalImg.src = imgElement.src;
    
    // Find the caption from the parent portfolio item
    const portfolioItem = imgElement.closest('.portfolio-item');
    if (portfolioItem) {
        const title = portfolioItem.querySelector('h3').innerText;
        captionText.innerHTML = title;
    }
}

function closeModal() {
    console.log("❌ Closing modal");
    document.getElementById('imageModal').style.display = "none";
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        closeModal();
    }
}