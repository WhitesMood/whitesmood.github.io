// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Get all language buttons and elements with language attributes
    const langButtons = document.querySelectorAll('.lang-btn');
    const langElements = document.querySelectorAll('[data-en][data-ru]');
    
    // Set default language (English)
    let currentLang = 'en';
    
    // Function to update content based on selected language
    function updateLanguage(lang) {
        langElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                // Check if element is an input or button
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
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
    }
    
    // Add click event to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'ru')) {
        updateLanguage(savedLang);
    }
    
    // Optional: Add language switcher based on browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('ru') && !savedLang) {
        updateLanguage('ru');
    }
});