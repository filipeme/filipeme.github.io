// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.testimonial-slide');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => {
            filterBtn.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonial Slider
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide testimonials
let currentSlide = 0;
function autoSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(autoSlide, 5000);

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-level');
const skillSection = document.querySelector('.skills');

function animateSkills() {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('style').match(/width: (\d+)%/)[1];
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
        
        window.removeEventListener('scroll', animateSkills);
    }
}

window.addEventListener('scroll', animateSkills);

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For demonstration, we'll just log it and show an alert
    console.log({name, email, subject, message});
    
    // Show success message
    alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
    
    // Reset form
    contactForm.reset();
});

// Sticky navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        // navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '15px 0';
        // navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Reveal animations on scroll
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Show first testimonial
    showSlide(0);
    
    // Add revealed class to visible sections
    revealOnScroll();
});

// Scroll event to change navbar styles and logo
let navBar = document.querySelector('#header');
let logoImage = document.querySelector('.logo img');
let logoText = document.querySelector('#outline-text');  // Seleciona corretamente a tag com o id 'outline-text'

document.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;

    if (scrollTop > 0) {
        navBar.classList.add('roll');

        // Mudar a cor dos links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.style.color = '#ff914d'; // Cor primária
        });

        // Mudar a cor do texto do logo053B
        logoText.style.color = '#ff914d'; // Cor primária

        // Trocar a imagem do logo
        logoImage.src = '/portfolio/logoF_.png'; // Novo logo
    } else {
        navBar.classList.remove('roll');

        // Reverter a cor dos links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.style.color = '#fff'; // Cor inicial (branco)
        });

        // Reverter a cor do texto do logo
        logoText.style.color = '#fff'; // Cor inicial (branco)

        // Voltar para a imagem original do logo
        logoImage.src = '/portfolio/logoF.png'; // Logo original
    }
});


// Seleciona todos os links de navegação
const menuLinks = document.querySelectorAll('.nav-links li a');

// Seleciona todas as seções que correspondem aos IDs dos links
const sections = document.querySelectorAll('section[id]');

// Função para remover a classe 'active' de todos os links
function removeActiveClass() {
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });
}

// Função para adicionar a classe 'active' ao link correspondente à seção atual
function addActiveClass(currentSection) {
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Função para monitorar o scroll e identificar a seção visível
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    let currentActiveSection = '';
    
    // Verifica cada seção para ver se está visível
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;  // Ajuste para quando a seção começar a aparecer
        const sectionHeight = section.offsetHeight;
        
        // Verifica se o scroll está dentro dos limites da seção atual
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentActiveSection = section.getAttribute('id');
        }
    });
    
    if (currentActiveSection !== '') {
        removeActiveClass();  // Remove a classe de todos os links
        addActiveClass(currentActiveSection);  // Adiciona a classe ao link da seção visível
    } else if (scrollPosition < 100) {
        // Se estiver próximo ao topo, ative o link "home"
        removeActiveClass();
        addActiveClass('home');
    }
});

// Inicializa o estado ativo para a seção atual quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition < 100) {
        removeActiveClass();
        addActiveClass('home');
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const currentSection = section.getAttribute('id');
                removeActiveClass();
                addActiveClass(currentSection);
            }
        });
    }
});
