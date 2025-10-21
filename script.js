// Music functionality
let audioPlayer;
let musicNotification;
let musicStarted = false;

// Game variables
let litCandles = 0;
const totalCandles = 5;
let allCandlesLit = false;
let letterOpened = false;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    createLoveBackground();
    initMusic();
    initPhotoEffects();
    
    // Show initial instructions
    document.getElementById('instructions').classList.add('show');
});

function initMusic() {
    musicNotification = document.getElementById('musicNotification');
    audioPlayer = document.getElementById('backgroundMusic');
    
    // Set volume (0.0 - 1.0)
    audioPlayer.volume = 0.7;
    
    showMusicNotification("Klik di mana saja untuk memulai musik romantis 🎵");
    
    // Add click event to start music on first user interaction
    document.addEventListener('click', startMusicOnFirstClick, { once: true });
    document.addEventListener('keydown', startMusicOnFirstClick, { once: true });
    document.addEventListener('touchstart', startMusicOnFirstClick, { once: true });
}

function startMusicOnFirstClick() {
    if (!musicStarted) {
        musicStarted = true;
        
        audioPlayer.play().then(() => {
            showMusicNotification("🎵 Musik romantis telah dimulai!");
            console.log("Music started successfully");
        }).catch(error => {
            console.log("Music play failed:", error);
            showMusicNotification("❌ Musik tidak dapat diputar. Coba periksa file lagu.");
        });
    }
}

// Show music notification
function showMusicNotification(message) {
    if (musicNotification) {
        musicNotification.textContent = message;
        musicNotification.classList.add('show');
        
        setTimeout(() => {
            musicNotification.classList.remove('show');
        }, 3000);
    }
}

// Photo effects
function initPhotoEffects() {
    const photos = document.querySelectorAll('.photo-frame');
    
    photos.forEach((photo, index) => {
        // Add click effect
        photo.addEventListener('click', function() {
            this.style.transform = 'rotate(0deg) scale(1.1)';
            this.style.zIndex = '20';
            
            setTimeout(() => {
                this.style.transform = `rotate(${this.style.getPropertyValue('--rotation')}) scale(1)`;
                this.style.zIndex = '1';
            }, 1000);
        });
        
        // Random slight movement
        setInterval(() => {
            if (!photo.matches(':hover')) {
                const currentRotation = parseFloat(photo.style.getPropertyValue('--rotation') || '0');
                const newRotation = currentRotation + (Math.random() - 0.5) * 2;
                photo.style.setProperty('--rotation', `${newRotation}deg`);
            }
        }, 3000 + index * 500);
    });
}

// Candle functionality
function lightCandle(candle) {
    if (!candle.classList.contains('lit')) {
        candle.classList.add('lit');
        litCandles++;
        
        if (litCandles === totalCandles && !allCandlesLit) {
            allCandlesLit = true;
            setTimeout(() => {
                document.getElementById('instructions').classList.remove('show');
                document.getElementById('blowInstruction').classList.add('show');
            }, 1000);
        }
    }
}

// Listen for spacebar (desktop) or tap/click (mobile)
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && allCandlesLit) {
        event.preventDefault();
        blowOutCandles();
    }
});

document.addEventListener('click', function(event) {
    if (allCandlesLit && !event.target.closest('.candle') && !event.target.closest('.photo-frame')) {
        blowOutCandles();
    }
});

function blowOutCandles() {
    const candles = document.querySelectorAll('.candle.lit');
    let delay = 0;
    
    // Blow out candles one by one
    candles.forEach(candle => {
        setTimeout(() => {
            candle.classList.remove('lit');
        }, delay);
        delay += 200;
    });
    
    // Hide blow instruction
    document.getElementById('blowInstruction').classList.remove('show');
    
    // Hide cake with animation
    setTimeout(() => {
        const cakeContainer = document.getElementById('cakeContainer');
        cakeContainer.classList.add('hide');
        
        // Show romantic message after cake disappears
        setTimeout(() => {
            document.getElementById('romanticMessage').classList.add('show');
            createHearts();
        }, 500);
    }, 1000);
}

function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    
    // Create falling hearts
    const heartInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 5000);
    }, 300);
    
    // Stop hearts after 30 seconds
    setTimeout(() => {
        clearInterval(heartInterval);
    }, 30000);
}

function createLoveBackground() {
    const loveContainer = document.getElementById('loveBackground');
    const loveSymbols = ['💕', '💖', '💗', '💝', '💘', '❤️', '💜', '🌹', '✨', '💫'];
    
    // Create floating love elements
    const floatInterval = setInterval(() => {
        const love = document.createElement('div');
        love.classList.add('floating-love');
        love.innerHTML = loveSymbols[Math.floor(Math.random() * loveSymbols.length)];
        love.style.left = Math.random() * 100 + '%';
        love.style.animationDelay = Math.random() * 2 + 's';
        love.style.animationDuration = (Math.random() * 4 + 6) + 's';
        loveContainer.appendChild(love);
        
        setTimeout(() => {
            if (love.parentNode) {
                love.remove();
            }
        }, 10000);
    }, 800);

    // Create sparkle effects
    const sparkleInterval = setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle-love');
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        loveContainer.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 6000);
    }, 400);

    // Create horizontal moving love elements
    const pulseInterval = setInterval(() => {
        const lovePulse = document.createElement('div');
        lovePulse.classList.add('love-pulse');
        lovePulse.innerHTML = '💖';
        lovePulse.style.top = Math.random() * 80 + 10 + '%';
        lovePulse.style.animationDelay = Math.random() * 2 + 's';
        loveContainer.appendChild(lovePulse);
        
        setTimeout(() => {
            if (lovePulse.parentNode) {
                lovePulse.remove();
            }
        }, 10000);
    }, 1500);
}

function openLetter() {
    if (!letterOpened) {
        letterOpened = true;
        document.getElementById('envelopeFlap').classList.add('open');
        setTimeout(() => {
            document.getElementById('letter').classList.add('show');
        }, 600);
    }
}

// Add click event to romantic message to close it
document.getElementById('romanticMessage').addEventListener('click', function(e) {
    if (e.target.closest('.letter')) {
        return;
    }
    
    // Hide romantic message
    this.classList.remove('show');
    
    // Reset envelope and letter
    document.getElementById('envelopeFlap').classList.remove('open');
    document.getElementById('letter').classList.remove('show');
    
    // Wait a bit then reset game
    setTimeout(() => {
        // Show cake again
        const cakeContainer = document.getElementById('cakeContainer');
        cakeContainer.classList.remove('hide');
        
        // Reset all candles
        const candles = document.querySelectorAll('.candle');
        candles.forEach(candle => {
            candle.classList.remove('lit');
        });
        
        // Reset game state
        litCandles = 0;
        allCandlesLit = false;
        letterOpened = false;
        
        // Show initial instructions
        document.getElementById('instructions').classList.add('show');
        document.getElementById('blowInstruction').classList.remove('show');
        
        // Show success notification
        showMusicNotification("🎮 Game direset! Main lagi yuk! 💕");
        
    }, 500);
});

// Additional utility functions
function getRandomRotation() {
    return (Math.random() * 10 - 5); // -5 to 5 degrees
}

function getRandomDelay() {
    return Math.random() * 0.5; // 0 to 0.5 seconds
}

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Adjust photo positions on resize
    const photos = document.querySelectorAll('.photo-frame');
    photos.forEach(photo => {
        if (window.innerWidth <= 768) {
            photo.style.margin = '5px';
        }
    });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Gambar tidak ditemukan:', this.src);
            this.style.display = 'none';
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // R key to reset game
    if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        location.reload();
    }
    
    // M key to toggle music
    if (event.key === 'm' || event.key === 'M') {
        event.preventDefault();
        if (musicStarted) {
            if (audioPlayer.paused) {
                audioPlayer.play();
                showMusicNotification("🎵 Musik dilanjutkan");
            } else {
                audioPlayer.pause();
                showMusicNotification("⏸️ Musik dijeda");
            }
        }
    }
});

// Prevent right-click context menu on images
document.addEventListener('contextmenu', function(event) {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});

// Add loading state
window.addEventListener('load', function() {
    console.log('Halaman ulang tahun telah dimuat sepenuhnya! 🎉');
    showMusicNotification("Selamat datang! Klik untuk mulai 🎵");
});

// Export functions for global access (if needed)
window.lightCandle = lightCandle;
window.openLetter = openLetter;
window.blowOutCandles = blowOutCandles;
