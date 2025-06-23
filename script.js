document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignore empty hash links
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get the height of the fixed navigation bar
                const navHeight = document.querySelector('nav').offsetHeight;
                // Scroll to the target element, offset by the nav height
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight - 20, // Added extra padding
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
                if (mobileNavOverlay && mobileNavOverlay.classList.contains('open')) {
                    mobileNavOverlay.classList.remove('open');
                }
            }
        });
    });

    // --- Animate Elements on Scroll ---
    const animateOnScroll = () => {
        // Select elements with .animate class that are NOT testimonial cards and not yet visible
        const elements = document.querySelectorAll('.animate:not(.visible):not(.testimonial-card)'); 
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2; // Trigger when 80% of element is visible
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible'); // Add 'visible' class to trigger CSS animation
            }
        });

        // Add nav scrolled class
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) { // When scrolled down 50px
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load to animate elements already in viewport

    // --- Animate Resume Mockup Sections ---
    const resumeMockup = document.querySelector('.resume-preview');
    if (resumeMockup) {
        // Define resume sections with their heights and base colors
        const sections = [
            { height: '15%', bg: '#6c63ff' }, // Primary color for header
            { height: '10%', bg: '#f7fafc' }, // Light background
            { height: '25%', bg: '#e2e8f0' }, // Gray background
            { height: '20%', bg: '#f7fafc' },
            { height: '30%', bg: '#e2e8f0' }
        ];
        
        let html = '';
        sections.forEach((section, index) => {
            // Create a div for each section with a specific height, background, and animation delay
            html += `<div class="resume-section" 
                        style="height: ${section.height}; background: ${section.bg}; 
                        transition-delay: ${index * 0.15}s;"></div>`; // Shorter delay for quicker reveal
        });
        
        resumeMockup.innerHTML = html;

        // Trigger animation for resume sections after they are added to the DOM
        // Use a small timeout to ensure elements are rendered before animating
        setTimeout(() => {
            const resumeSections = resumeMockup.querySelectorAll('.resume-section');
            resumeSections.forEach(section => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }, 100); // Small delay to allow DOM render
    }
    
    // --- Floating Icons Animation (improved randomness) ---
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        // Randomize initial position
        const randomX = Math.random() * 70 + 15; // 15% to 85% range
        const randomY = Math.random() * 70 + 15; // 15% to 85% range
        // Get base delay from CSS variable or default to 0
        const baseDelay = parseFloat(icon.style.getPropertyValue('--delay')) || 0;
        // Add additional random delay for more varied animation
        const randomDelay = baseDelay + Math.random() * 1.5; // Add up to 1.5s random delay
        
        icon.style.left = `${randomX}%`;
        icon.style.top = `${randomY}%`;
        icon.style.animationDelay = `${randomDelay}s`;

        // Randomize animation duration slightly
        icon.style.animationDuration = `${6 + Math.random() * 2}s`; // 6s to 8s
    });

    // --- Dynamic Testimonial Generation and Marquee Setup ---
    const testimonialsTrack = document.getElementById('testimonials-track');
    const testimonialsData = [
        {
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            quote: "I got 3 interview calls within a week of using my ResumeCraft resume! The professional template made all the difference. Highly recommend it!",
            name: "Sarah Johnson",
            title: "Product Manager at Google"
        },
        {
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            quote: "The ATS optimization feature helped me get past the screening process for the first time. It's a game-changer for job applications.",
            name: "Michael Chen",
            title: "Software Engineer at Amazon"
        },
        {
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            quote: "Using ResumeCraft was incredibly easy and fast. I built a stunning resume in less than an hour and landed my dream marketing job!",
            name: "Emily Rodriguez",
            title: "Marketing Specialist at Nike"
        },
        {
            avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
            quote: "The content suggestions are brilliant! They helped me articulate my experience much better, resulting in more callbacks.",
            name: "David Lee",
            title: "Data Scientist at Microsoft"
        },
        {
            avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
            quote: "This platform is a lifesaver! The drag-and-drop interface made customizing my resume a breeze. My resume never looked this good before.",
            name: "Jessica White",
            title: "UX Designer at Apple"
        },
        {
            avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
            quote: "ResumeCraft is intuitive and powerful. I appreciate the multiple download formats, which made applying to different companies effortless.",
            name: "Chris Evans",
            title: "Financial Analyst at Goldman Sachs"
        }
    ];

    if (testimonialsTrack) {
        // Function to create a testimonial card element
        const createTestimonialCard = (testimonial, index) => {
            const card = document.createElement('div');
            card.classList.add('testimonial-card');
            // Apply RTL to every third testimonial for demonstration
            if ((index + 1) % 3 === 0) {
                card.classList.add('rtl-testimonial');
            }

            card.innerHTML = `
                <div class="user-avatar" style="background-image: url('${testimonial.avatar}')"></div>
                <div class="testimonial-content">
                    <p>"${testimonial.quote}"</p>
                    <div class="user-info">
                        <h4>${testimonial.name}</h4>
                        <span>${testimonial.title}</span>
                    </div>
                </div>
            `;
            return card;
        };

        // Populate the testimonials track with multiple copies for seamless looping
        // Duplicate the testimonials a few times (e.g., 3-4 times)
        const numCopies = 3; 
        for (let i = 0; i < numCopies; i++) {
            testimonialsData.forEach((testimonial, index) => {
                const card = createTestimonialCard(testimonial, index);
                testimonialsTrack.appendChild(card);
            });
        }
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavLinks = document.querySelector('.mobile-nav-links');

    if (menuToggle && mobileNavOverlay && closeMenu && mobileNavLinks) {
        menuToggle.addEventListener('click', () => {
            mobileNavOverlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });

        closeMenu.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('open');
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close menu when a link is clicked
        mobileNavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }
});
