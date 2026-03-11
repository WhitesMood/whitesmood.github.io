// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Initializing website...");
    
    // ========== LANGUAGE SWITCHER ==========
    console.log("Setting up language switcher...");
    
    const langButtons = document.querySelectorAll('.lang-btn');
    const langElements = document.querySelectorAll('[data-en][data-ru]');
    
    console.log(`📊 Found ${langButtons.length} buttons and ${langElements.length} translatable elements`);
    
    // Function to update content based on selected language
    function updateLanguage(lang) {
        console.log(`🔄 Switching to: ${lang}`);
        
        langElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                // Update the content
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
    }
    
    // Add click event to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'ru')) {
        updateLanguage(savedLang);
    } else {
        // Auto-detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('ru')) {
            updateLanguage('ru');
        } else {
            updateLanguage('en');
        }
    }
    
    // ========== TAB NAVIGATION ==========
    console.log("Setting up tab navigation...");
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Function to show a section
    window.showSection = function(sectionId) {
        console.log(`📱 Switching to section: ${sectionId}`);
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
        } else {
            console.warn(`⚠️ Section not found: ${sectionId}`);
        }
        
        // Update navigation active state
        navLinks.forEach(link => {
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
    };
    
    // Add click event listeners directly to nav links (backup method)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Extract section ID from the onclick attribute or use href
            let sectionId = this.getAttribute('data-section');
            
            // If no data-section, try to parse from onclick
            if (!sectionId) {
                const onclickAttr = this.getAttribute('onclick');
                if (onclickAttr) {
                    const match = onclickAttr.match(/showSection\('([^']+)'\)/);
                    if (match) {
                        sectionId = match[1];
                    }
                }
            }
            
            // Default mapping if nothing else works
            if (!sectionId) {
                const text = this.textContent.toLowerCase();
                if (text.includes('home')) sectionId = 'home';
                else if (text.includes('portfolio')) sectionId = 'portfolio';
                else if (text.includes('about')) sectionId = 'about';
                else if (text.includes('contact')) sectionId = 'contact';
            }
            
            if (sectionId) {
                window.showSection(sectionId);
            }
        });
    });
    
    // ========== MODAL FUNCTIONS ==========
    console.log("Setting up modal...");
    
    window.openModal = function(imgElement) {
        console.log("🖼️ Opening modal");
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const captionText = document.getElementById('modalCaption');
        
        if (modal && modalImg) {
            modal.style.display = "block";
            modalImg.src = imgElement.src;
            
            // Find the caption from the parent portfolio item
            const portfolioItem = imgElement.closest('.portfolio-item');
            if (portfolioItem) {
                const title = portfolioItem.querySelector('h3').innerText;
                if (captionText) {
                    captionText.innerHTML = title;
                }
            }
        }
    };
    
    window.closeModal = function() {
        console.log("❌ Closing modal");
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.style.display = "none";
        }
    };
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('imageModal');
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Activate home section by default
    console.log("Activating home section by default");
    window.showSection('home');
    
    console.log("✨ Initialization complete!");
});