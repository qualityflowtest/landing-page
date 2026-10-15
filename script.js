document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Modal Logic
window.openModal = function(id) { 
    const el = document.getElementById(id);
    if (el) {
        el.classList.add('active'); 
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }
}
window.closeModal = function(id) { 
    document.getElementById(id).classList.remove('active'); 
}
window.addEventListener('click', function(e) { 
    if (e.target.classList.contains('modal-overlay')) { 
        e.target.classList.remove('active'); 
    } 
});

// Form Submission for Purchase / Contact
function handlePurchaseSubmit(e) {
    e.preventDefault();
    const messageInput = document.getElementById('purchase-message');
    const userMessage = messageInput ? messageInput.value.trim() : '';

    const subject = encodeURIComponent('Interesse em Licença Comercial - Flow-QA');
    const bodyContent = userMessage 
        ? `${userMessage}\n\n---\nEnviado através do site Flow-QA`
        : 'Olá equipe Flow-QA,\n\nGostaria de solicitar informações sobre a licença comercial do Flow-QA para minha empresa.\n\nAguardo retorno!';

    const body = encodeURIComponent(bodyContent);

    // Direciona imediatamente para o cliente de e-mail padrão
    window.location.href = `mailto:qualityflowtest@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
        closeModal('purchase-modal');
        if (messageInput) messageInput.value = '';
    }, 600);
}
