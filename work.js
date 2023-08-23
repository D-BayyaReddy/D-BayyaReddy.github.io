
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementById('close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        modalContent.innerHTML = item.innerHTML;
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
modal.addEventListener('click', event => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


const animateElements = document.querySelectorAll('.animate');

function animateOnScroll() {
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.8) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
