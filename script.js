const typedText = document.getElementById('typed-text');
const cursor = document.getElementById('cursor');

const texts = ['Bayya Reddy','A Freelancer', 'A Developer']; 
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    const currentChar = currentText[charIndex];

    if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex - 1);
    } else {
        typedText.textContent = currentText.substring(0, charIndex + 1);
    }

    charIndex += isDeleting ? -1 : 1;

    if (charIndex >= currentText.length + 1) {
        isDeleting = true;
    }

    if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(type, isDeleting ? 50 : 200); 
}

type(); 


setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
}, 500);


const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuIcon.classList.toggle("open");
});
