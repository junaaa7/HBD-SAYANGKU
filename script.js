let litCandles = 0;
        const totalCandles = 5;
        let allCandlesLit = false;
        let letterOpened = false;

        createLoveBackground();

        // Show initial instructions
        document.getElementById('instructions').classList.add('show');

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

        // Listen for spacebar to blow out candles
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space' && allCandlesLit) {
                event.preventDefault();
                blowOutCandles();
            }
        });

        function blowOutCandles() {
            const candles = document.querySelectorAll('.candle.lit');
            let delay = 0;
            
            candles.forEach(candle => {
                setTimeout(() => {
                    candle.classList.remove('lit');
                }, delay);
                delay += 200;
            });
            
            // Hide blow instruction
            document.getElementById('blowInstruction').classList.remove('show');
            
            // Show romantic message after all candles are out
            setTimeout(() => {
                document.getElementById('romanticMessage').classList.add('show');
                createHearts();
            }, 1500);
        }

        function createHearts() {
            const heartsContainer = document.getElementById('hearts');
            
            setInterval(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
                heartsContainer.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    heart.remove();
                }, 5000);
            }, 300);
        }

        function createLoveBackground() {
            const loveContainer = document.getElementById('loveBackground');
            const loveSymbols = ['💕', '💖', '💗', '💝', '💘', '❤️', '💜', '🌹', '✨', '💫'];
            
            // Create floating love elements
            setInterval(() => {
                const love = document.createElement('div');
                love.classList.add('floating-love');
                love.innerHTML = loveSymbols[Math.floor(Math.random() * loveSymbols.length)];
                love.style.left = Math.random() * 100 + '%';
                love.style.animationDelay = Math.random() * 2 + 's';
                love.style.animationDuration = (Math.random() * 4 + 6) + 's';
                loveContainer.appendChild(love);
                
                setTimeout(() => {
                    love.remove();
                }, 10000);
            }, 800);

            // Create sparkle effects
            setInterval(() => {
                const sparkle = document.createElement('div');
                sparkle.classList.add('sparkle-love');
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.animationDelay = Math.random() * 3 + 's';
                loveContainer.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 6000);
            }, 400);

            // Create horizontal moving love elements
            setInterval(() => {
                const lovePulse = document.createElement('div');
                lovePulse.classList.add('love-pulse');
                lovePulse.innerHTML = '💖';
                lovePulse.style.top = Math.random() * 80 + 10 + '%';
                lovePulse.style.animationDelay = Math.random() * 2 + 's';
                loveContainer.appendChild(lovePulse);
                
                setTimeout(() => {
                    lovePulse.remove();
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
            this.classList.remove('show');
            // Reset the game
            setTimeout(() => {
                location.reload();
            }, 1000);
        });