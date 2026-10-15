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

// Form Submission
function handleDownloadSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // Simulate processing
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "Baixando...";
    btn.disabled = true;

    setTimeout(() => {
        // Trigger download programmatically
        const link = document.createElement('a');
        link.href = 'flow-qa-install.zip';
        link.download = 'flow-qa-install.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("Download iniciado com sucesso!");
        closeModal('download-modal');
        
        btn.innerText = originalText;
        btn.disabled = false;
        form.reset();
    }, 800);
}

// Masks and Validation
const cnpjInput = document.getElementById('cnpj-input');
if (cnpjInput) {
    cnpjInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        if (value.length > 14) value = value.slice(0, 14);
        
        value = value.replace(/^([A-Z0-9]{2})([A-Z0-9])/, '$1.$2');
        value = value.replace(/^([A-Z0-9]{2})\.([A-Z0-9]{3})([A-Z0-9])/, '$1.$2.$3');
        value = value.replace(/\.([A-Z0-9]{3})([A-Z0-9])/, '.$1/$2');
        value = value.replace(/([A-Z0-9]{4})([A-Z0-9])/, '$1-$2');
        
        e.target.value = value;
    });
}

const phoneInput = document.getElementById('phone-input');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        }
        if (value.length > 9) {
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        } else if (value.length > 8) {
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        }
        
        e.target.value = value;
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function handlePurchaseSubmit(e) {
    e.preventDefault();
    const company = document.getElementById('company-input')?.value.trim() || 'Empresa';
    const cnpj = document.getElementById('cnpj-input')?.value.trim() || 'Não informado';
    const email = document.getElementById('email-input')?.value.trim() || '';
    const phone = document.getElementById('phone-input')?.value.trim() || 'Não informado';
    const teamSelect = document.getElementById('team-size-select');
    const teamSize = teamSelect && teamSelect.selectedIndex >= 0 ? teamSelect.options[teamSelect.selectedIndex].text : 'Não informado';

    if (!email || !isValidEmail(email)) {
        alert("Por favor, insira um e-mail corporativo válido.");
        document.getElementById('email-input')?.focus();
        return;
    }

    const subject = encodeURIComponent(`Solicitação de Licença Comercial - ${company}`);
    const body = encodeURIComponent(
        `Olá equipe Flow-QA,\n\n` +
        `Gostaria de solicitar informações de contratação e faturamento da licença comercial do Flow-QA.\n\n` +
        `📋 Dados da Empresa:\n` +
        `• Empresa: ${company}\n` +
        `• CNPJ: ${cnpj}\n` +
        `• E-mail para contato: ${email}\n` +
        `• Telefone para contato: ${phone}\n` +
        `• Tamanho da equipe: ${teamSize}\n\n` +
        `Aguardo retorno com as orientações de ativação.\n\n` +
        `Atenciosamente,`
    );

    // Direciona imediatamente para o cliente de e-mail padrão
    window.location.href = `mailto:qualityflowtest@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
        closeModal('purchase-modal');
    }, 600);
}
