/**
 * Ajit Rathod Portfolio - Core JavaScript Engine
 * Includes: Preloader, Typing Effect & Advanced Interactive Velocity-Based Cursor Trail
 */

// ==================== 1. FUTURISTIC PRELOADER ENGINE ====================
document.addEventListener("DOMContentLoaded", () => {
    const loadingBar = document.getElementById("loading-bar");
    const loaderStatus = document.getElementById("loader-status");
    const preloader = document.getElementById("preloader");

    // स्क्रीन रेकॉर्डिंगप्रमाणे बदलणारे प्रोग्रेसिव्ह मेसेजेस
    const statuses = [
        { progress: 20, text: "Initializing." },
        { progress: 45, text: "Building UI..." },
        { progress: 75, text: "Optimizing Microservices Framework..." },
        { progress: 95, text: "Welcome!" }
    ];

    let currentStep = 0;
    let width = 0;

    // स्मूथ प्रोग्रेस बार ॲनिमेशन टायमर
    const interval = setInterval(() => {
        if (currentStep < statuses.length) {
            const targetProgress = statuses[currentStep].progress;
            if(loaderStatus) loaderStatus.innerText = statuses[currentStep].text;

            if (width < targetProgress) {
                width += 1.5; // प्रोग्रेस स्पीड
                if(loadingBar) loadingBar.style.width = width + "%";
            } else {
                currentStep++;
            }
        } else {
            // जेव्हा १००% पूर्ण होईल
            if(loadingBar) loadingBar.style.width = "100%";
            clearInterval(interval);

            // हलक्याशा डिले नंतर प्रीloader गायब करणे आणि टायपिंग सुरू करणे
            setTimeout(() => {
                if(preloader) preloader.classList.add("preloader-hidden");
                // प्रीलोडर संपल्यावरच टायपिंग इफेक्ट चालू होईल
                typingEffect();
            }, 500);
        }
    }, 25);
});


// ==================== 2. DYNAMIC TYPING MATRIX ANIMATION ====================
const words = ["Java Full Stack Developer", "Spring Boot Developer", "Backend Engineer"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            const typingTextEl = document.querySelector('.typing-text');
            if(typingTextEl) typingTextEl.innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            const typingTextEl = document.querySelector('.typing-text');
            if(typingTextEl) typingTextEl.innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}


// ==================== 3. ADVANCED INTERACTIVE SPEEDS-BASED CURSOR TRAIL ENGINE ====================
const container = document.getElementById('cursor-particle-container');
let lastX = 0, lastY = 0;
let lastTime = Date.now();

window.addEventListener('mousemove', (e) => {
    let currentTime = Date.now();
    let timeDelta = currentTime - lastTime;
    
    if (timeDelta === 0) timeDelta = 1; // Division by zero check

    // Math calculation for Mouse Speed/Velocity
    let distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    let speed = distance / timeDelta; // Speed factor

    if (distance > 5) { 
        createParticle(e.clientX, e.clientY, speed);
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = currentTime;
    }
});

function createParticle(x, y, speed) {
    if (!container) return;
    
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    let randomColor;
    
    // SPEED TRIGGER LOGIC: Fast move kelyavar completely different vibrant neon colors yeil!
    if (speed > 2.5) {
        // High Speed Colors Matrix: Energetic Neon Orange, Hot Pink, Gold
        const fastColors = ['#ff9f43', '#f9a7ae', '#ff1493', '#ffa500'];
        randomColor = fastColors[Math.floor(Math.random() * fastColors.length)];
        
        // Fast move kelyavar trail cha size pan thoda motha ani heavy hoil
        const size = Math.random() * 12 + 10; 
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
    } else {
        // Normal Speed Colors Matrix: Cool Blue, Premium Neon Cyan, Purple, Soft White
        const normalColors = ['#00f2fe', '#9b51e0', '#00d2ff', '#ffffff'];
        randomColor = normalColors[Math.floor(Math.random() * normalColors.length)];
        
        const size = Math.random() * 8 + 5; 
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
    }
    
    particle.style.setProperty('--particle-glow', randomColor);
    container.appendChild(particle);

    // Garbage collector to keep code execution super fast
    setTimeout(() => {
        particle.remove();
    }, 600);
}
// ==================== 4. NAVIGATION SCROLL SPY ENGINE ====================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // युझर सध्या स्क्रीनवर कोणत्या सेक्शनवर आहे हे ट्रॅक करणे
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});
// ==================== 6. MOUSE CURSOR 3D TILT MATRIX EFFECT ====================
document.querySelectorAll('.modern-cert-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // कर्सरचे कार्डमधील आडवे अंतर
        const y = e.clientY - rect.top;  // कर्सरचे कार्डमधील उभे अंतर
        
        // मध्यभागापासूनची मोजणी
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // झुकण्याचा अँगल निश्चित करणे
        const rotateX = ((centerY - y) / centerY) * 10; 
        const rotateY = ((x - centerX) / centerX) * 10;
        
        // ३D रोटेशन अप्लाय करणे
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });
    
    // माऊस बाहेर गेल्यावर कार्ड मूळ स्थितीत येईल
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});
// ==================== ABOUT STATS BOXES 3D TILT ENGINE ====================
document.querySelectorAll('.about-stat-box').forEach(box => {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // डब्बा कर्सरकडे झुकण्याचा अँगल (१० डिग्री मॅक्स)
        const rotateX = ((centerY - y) / centerY) * 10; 
        const rotateY = ((x - centerX) / centerX) * 10;
        
        box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });
    
    // माऊस डब्यातून बाहेर पडताच डब्बा पूर्वस्थितीत सरळ होईल
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});
// ==================== PRELOADER TO HOME PAGE SMOOTH TRANSITION ====================
window.addEventListener('load', () => {
    // समजा तुझा प्रीलोडर साधारण २ ते २.५ सेकंद चालतो
    // प्रीलोडर पूर्ण गायब झाल्यावर बॉडीला 'reveal-active' क्लास देणे
    setTimeout(() => {
        document.body.classList.add('reveal-active');
    }, 2200); // जर प्रीलोडर लवकर संपत असेल तर हा टाईम २२०० वरून १५०० करू शकतोस
});
// ==================== BUG-FREE PRELOADER ENGINE ====================
window.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("custom-bar");
    const percentText = document.getElementById("loader-percentage");
    const statusText = document.getElementById("loader-dynamic-text");
    const preloader = document.getElementById("custom-cyber-preloader");

    const statusMessages = [
        "Initializing Systems...",
        "Connecting Database...",
        "Loading Tech Stack...",
        "Injecting Neon Core...",
        "Compiling Assets...",
        "Ready!"
    ];

    let width = 0;
    
    // एकदम सेफ इंटरव्हल जो 0% वरून पुढे नेईलच
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            
            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add("preloader-hidden");
                }
                document.body.classList.add('reveal-active');
            }, 500);
        } else {
            width += Math.floor(Math.random() * 5) + 2; // प्रत्येक वेळी २ ते ७ टक्क्यांनी वाढेल
            if (width > 100) width = 100;
            
            // DOM घटक अस्तित्वात आहेत की नाही ते तपासून व्हॅल्यू सेट करणे (जेणेकरून एरर येणार नाही)
            if (progressBar) progressBar.style.width = width + "%";
            if (percentText) percentText.innerText = width + "%";
            
            if (statusText) {
                if (width < 20) statusText.innerText = statusMessages[0];
                else if (width < 40) statusText.innerText = statusMessages[1];
                else if (width < 65) statusText.innerText = statusMessages[2];
                else if (width < 85) statusText.innerText = statusMessages[3];
                else if (width < 95) statusText.innerText = statusMessages[4];
                else statusText.innerText = statusMessages[5];
            }
        }
    }, 30); 
});
// ==================== DYNAMIC CYBER PRELOADER MATRIX ENGINE ====================
document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("custom-bar");
    const percentText = document.getElementById("loader-percentage");
    const statusText = document.getElementById("loader-dynamic-text");
    const preloader = document.getElementById("custom-cyber-preloader");

    // लोडिंग दरम्यान बदलणारे कोडिंग मेसेज
    const statusMessages = [
        "Initializing Systems...",
        "Connecting Database...",
        "Loading Tech Stack...",
        "Injecting Neon Core...",
        "Compiling Assets...",
        "Ready!"
    ];

    let width = 0;
    
    // एक स्मूथ टाईम इंटरव्हल जो प्रोग्रेस बार पुढे नेईल
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            
            // १००% झाल्यावर अर्ध्या सेकंदाचा होल्ड देऊन गायब करणे
            setTimeout(() => {
                if(preloader) {
                    preloader.classList.add("preloader-hidden");
                }
                // मगाशी दिलेला होम पेजचा रिव्हील क्लास इथे ट्रिगर करणे
                document.body.classList.add('reveal-active');
            }, 500);
        } else {
            width += Math.floor(Math.random() * 4) + 1; // रँडमलायझर जेणेकरून नॅचरल वाटेल
            if (width > 100) width = 100;
            
            // बार आणि टक्केवारी अपडेट करणे
            if(progressBar) progressBar.style.width = width + "%";
            if(percentText) percentText.innerText = width + "%";
            
            // टक्क्यांनुसार कोडिंग मेसेजेस बदलणे
            if (width < 20) statusText.innerText = statusMessages[0];
            else if (width < 40) statusText.innerText = statusMessages[1];
            else if (width < 65) statusText.innerText = statusMessages[2];
            else if (width < 85) statusText.innerText = statusMessages[3];
            else if (width < 95) statusText.innerText = statusMessages[4];
            else statusText.innerText = statusMessages[5];
        }
    }, 40); // लोडिंगचा स्पीड (कमी-जास्त करू शकतोस)
});