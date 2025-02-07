// Image slider configuration
const images = [
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070',  // Luxury hotel lobby
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=2070',  // Modern hotel room
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2070',  // Infinity pool
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=2070',  // Luxury restaurant
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2070'   // Beachfront resort
];

let currentImage = 0;
const slider = document.querySelector('.slider');

// Initialize Lucide icons
lucide.createIcons();

// Create slides
images.forEach((image, index) => {
    const slide = document.createElement('div');
    slide.className = `slide ${index === 0 ? 'active' : ''}`;
    
    const img = document.createElement('img');
    img.src = image;
    img.alt = `Slide ${index + 1}`;
    
    slide.appendChild(img);
    slider.appendChild(slide);
});

// Slider controls
function showImage(index) {
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    document.querySelectorAll('.slide')[index].classList.add('active');
}

function nextImage() {
    currentImage = (currentImage + 1) % images.length;
    showImage(currentImage);
}

function prevImage() {
    currentImage = (currentImage - 1 + images.length) % images.length;
    showImage(currentImage);
}

// Auto-advance slider
setInterval(nextImage, 5000);

// Modal functionality
function toggleLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.toggle('active');
}

// Close modal when clicking outside
document.getElementById('loginModal').addEventListener('click', (e) => {
    if (e.target.id === 'loginModal') {
        toggleLoginModal();
    }
});

// Login handlers
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Here you would typically handle the login logic
    console.log('Login attempt:', { email, password });
}

function handleGoogleLogin() {
    // Here you would typically handle Google login
    console.log('Google login clicked');
}

// Handle dropdowns
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const button = dropdown.querySelector('.nav-button');
    
    // Toggle dropdown on hover
    dropdown.addEventListener('mouseenter', () => {
        // Close all other dropdowns
        document.querySelectorAll('.dropdown').forEach(d => {
            if (d !== dropdown) {
                d.classList.remove('active');
            }
        });
        dropdown.classList.add('active');
    });
    
    dropdown.addEventListener('mouseleave', () => {
        dropdown.classList.remove('active');
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Close dropdowns when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        // Also close the login modal
        const modal = document.getElementById('loginModal');
        if (modal.classList.contains('active')) {
            toggleLoginModal();
        }
    }
});

// Initialize all Lucide icons after dynamic content is loaded
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});