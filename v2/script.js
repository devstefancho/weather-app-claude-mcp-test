// Weather App JavaScript with Animations
class AnimatedWeatherApp {
    constructor() {
        this.currentHour = new Date().getHours();
        this.weatherData = this.generateMockWeatherData();
        this.particleCount = 0;
        this.maxParticles = 50;
        
        this.init();
    }

    init() {
        this.updateCurrentTime();
        this.displayMainWeather();
        this.displayHourlyForecast();
        this.drawTemperatureChart();
        this.updateSunPosition();
        this.startAnimations();
        this.setupEventListeners();
        
        // Update time every minute
        setInterval(() => this.updateCurrentTime(), 60000);
        
        // Update weather animations every 5 seconds
        setInterval(() => this.updateWeatherAnimations(), 5000);
    }

    generateMockWeatherData() {
        const conditions = ['sunny', 'cloudy', 'partly-cloudy', 'rainy', 'stormy'];
        const baseTemp = 20;
        const hourlyData = [];

        for (let i = 0; i < 24; i++) {
            const hour = i;
            const temp = baseTemp + Math.sin((i - 6) * Math.PI / 12) * 8 + Math.random() * 4 - 2;
            const condition = this.getConditionForHour(hour);
            
            hourlyData.push({
                hour: hour,
                time: this.formatHour(hour),
                temperature: Math.round(temp),
                condition: condition,
                icon: this.getWeatherIcon(condition),
                humidity: 40 + Math.random() * 40,
                windSpeed: 5 + Math.random() * 20,
                precipitation: condition.includes('rain') ? Math.random() * 100 : 0
            });
        }

        return {
            current: hourlyData[this.currentHour],
            hourly: hourlyData,
            sunrise: '6:24',
            sunset: '19:42',
            location: 'San Francisco, CA'
        };
    }

    getConditionForHour(hour) {
        if (hour >= 6 && hour <= 8) return 'sunny';
        if (hour >= 9 && hour <= 11) return 'partly-cloudy';
        if (hour >= 12 && hour <= 14) return 'cloudy';
        if (hour >= 15 && hour <= 17) return 'partly-cloudy';
        if (hour >= 18 && hour <= 20) return 'sunset';
        if (hour >= 21 || hour <= 5) return 'clear-night';
        return 'partly-cloudy';
    }

    getWeatherIcon(condition) {
        const icons = {
            'sunny': '☀️',
            'partly-cloudy': '⛅',
            'cloudy': '☁️',
            'rainy': '🌧️',
            'stormy': '⛈️',
            'snowy': '❄️',
            'clear-night': '🌙',
            'sunset': '🌅'
        };
        return icons[condition] || '☀️';
    }

    formatHour(hour) {
        if (hour === 0) return '12 AM';
        if (hour === 12) return '12 PM';
        if (hour < 12) return `${hour} AM`;
        return `${hour - 12} PM`;
    }

    updateCurrentTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        document.getElementById('currentTime').textContent = timeString;
    }

    displayMainWeather() {
        const current = this.weatherData.current;
        const high = Math.max(...this.weatherData.hourly.map(h => h.temperature));
        const low = Math.min(...this.weatherData.hourly.map(h => h.temperature));

        // Update main weather display
        document.getElementById('currentTemp').textContent = `${current.temperature}°`;
        document.getElementById('highTemp').textContent = `${high}°`;
        document.getElementById('lowTemp').textContent = `${low}°`;
        document.getElementById('weatherCondition').textContent = this.getConditionText(current.condition);
        document.getElementById('feelsLike').textContent = `${current.temperature + Math.round(Math.random() * 4 - 2)}°`;

        // Update weather details
        document.getElementById('humidity').textContent = `${Math.round(current.humidity)}%`;
        document.getElementById('windSpeed').textContent = `${Math.round(current.windSpeed)} km/h`;
        document.getElementById('visibility').textContent = '10 km';
        document.getElementById('pressure').textContent = `${1013 + Math.round(Math.random() * 20 - 10)} hPa`;

        // Update sunrise/sunset
        document.getElementById('sunriseTime').textContent = this.weatherData.sunrise;
        document.getElementById('sunsetTime').textContent = this.weatherData.sunset;

        // Update main weather icon
        const iconElement = document.querySelector('.icon-element');
        iconElement.textContent = current.icon;

        // Apply weather-specific background
        this.updateBackground(current.condition);
    }

    getConditionText(condition) {
        const texts = {
            'sunny': 'Sunny',
            'partly-cloudy': 'Partly Cloudy',
            'cloudy': 'Cloudy',
            'rainy': 'Rainy',
            'stormy': 'Stormy',
            'snowy': 'Snowy',
            'clear-night': 'Clear Night',
            'sunset': 'Beautiful Sunset'
        };
        return texts[condition] || 'Pleasant';
    }

    displayHourlyForecast() {
        const container = document.getElementById('hourlyContainer');
        container.innerHTML = '';

        // Show next 12 hours
        for (let i = 0; i < 12; i++) {
            const hourIndex = (this.currentHour + i) % 24;
            const hourData = this.weatherData.hourly[hourIndex];

            const hourlyItem = document.createElement('div');
            hourlyItem.className = 'hourly-item';
            hourlyItem.style.animationDelay = `${i * 0.1}s`;

            hourlyItem.innerHTML = `
                <div class="hourly-time">${hourData.time}</div>
                <div class="hourly-icon">${hourData.icon}</div>
                <div class="hourly-temp">${hourData.temperature}°</div>
                <div class="hourly-condition">${this.getConditionText(hourData.condition)}</div>
            `;

            // Add click animation
            hourlyItem.addEventListener('click', () => {
                hourlyItem.style.animation = 'none';
                hourlyItem.offsetHeight; // Trigger reflow
                hourlyItem.style.animation = 'hourly-slide-in 0.3s ease-out';
            });

            container.appendChild(hourlyItem);
        }
    }

    drawTemperatureChart() {
        const canvas = document.getElementById('temperatureChart');
        const ctx = canvas.getContext('2d');
        const data = this.weatherData.hourly.slice(this.currentHour, this.currentHour + 12);

        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        const width = rect.width;
        const height = rect.height;
        const padding = 40;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate min/max temperatures
        const temps = data.map(d => d.temperature);
        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);
        const tempRange = maxTemp - minTemp || 1;

        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw temperature curve
        ctx.beginPath();
        ctx.strokeStyle = '#ffeaa7';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const points = [];
        data.forEach((item, index) => {
            const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
            const y = height - padding - ((item.temperature - minTemp) / tempRange) * (height - 2 * padding);
            points.push({ x, y, temp: item.temperature });

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Draw glow effect
        ctx.shadowColor = '#ffeaa7';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw temperature points and labels
        points.forEach((point, index) => {
            // Draw point
            ctx.beginPath();
            ctx.fillStyle = '#ffeaa7';
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.fill();

            // Draw temperature label
            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${point.temp}°`, point.x, point.y - 15);

            // Draw time label
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '10px Arial';
            ctx.fillText(data[index].time, point.x, height - 10);
        });

        // Animate chart drawing
        this.animateChart(ctx, points, width, height);
    }

    animateChart(ctx, points, width, height) {
        let progress = 0;
        const duration = 2000; // 2 seconds
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            progress = Math.min((now - startTime) / duration, 1);

            // Clear and redraw with progress
            ctx.clearRect(0, 0, width, height);
            
            // Redraw background
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Draw animated curve
            ctx.beginPath();
            ctx.strokeStyle = '#ffeaa7';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            const visiblePoints = Math.floor(points.length * progress);
            points.slice(0, visiblePoints + 1).forEach((point, index) => {
                if (index === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            });
            ctx.stroke();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Draw final chart with all details
                this.drawTemperatureChart();
            }
        };

        animate();
    }

    updateSunPosition() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour + currentMinute / 60;

        // Sunrise at 6:24, sunset at 19:42
        const sunriseTime = 6 + 24/60;
        const sunsetTime = 19 + 42/60;
        const dayLength = sunsetTime - sunriseTime;

        let sunProgress = 0;
        if (currentTime >= sunriseTime && currentTime <= sunsetTime) {
            sunProgress = (currentTime - sunriseTime) / dayLength;
        } else if (currentTime < sunriseTime) {
            sunProgress = 0;
        } else {
            sunProgress = 1;
        }

        // Update sun position on the arc
        const sunPosition = document.getElementById('sunPosition');
        if (sunPosition) {
            const angle = sunProgress * Math.PI; // 0 to π radians
            const radius = 97; // Slightly less than the arc radius
            const centerX = 100; // Center of the 200px wide arc
            const centerY = 97; // Bottom of the arc

            const x = centerX + radius * Math.cos(Math.PI - angle);
            const y = centerY - radius * Math.sin(Math.PI - angle);

            sunPosition.style.left = `${x}px`;
            sunPosition.style.top = `${y}px`;
        }
    }

    updateBackground(condition) {
        const app = document.querySelector('.weather-app');
        app.className = 'weather-app'; // Reset classes

        const hour = new Date().getHours();
        if (hour >= 6 && hour < 18) {
            if (condition.includes('rain') || condition.includes('storm')) {
                app.classList.add('rainy');
            } else if (condition.includes('cloud')) {
                app.classList.add('cloudy');
            } else if (condition.includes('snow')) {
                app.classList.add('snowy');
            } else {
                app.classList.add('sunny');
            }
        } else {
            app.classList.add('night');
        }
    }

    createParticleEffect(type) {
        const container = document.querySelector('.particles-container');
        
        if (this.particleCount >= this.maxParticles) {
            return;
        }

        const particle = document.createElement('div');
        particle.className = `${type}-particle`;
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        
        container.appendChild(particle);
        this.particleCount++;

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particleCount--;
            }
        }, 3000);
    }

    startAnimations() {
        // Start particle effects based on weather
        const condition = this.weatherData.current.condition;
        
        if (condition.includes('rain') || condition.includes('storm')) {
            setInterval(() => {
                if (Math.random() < 0.7) {
                    this.createParticleEffect('rain');
                }
            }, 100);
        } else if (condition.includes('snow')) {
            setInterval(() => {
                if (Math.random() < 0.5) {
                    this.createParticleEffect('snow');
                }
            }, 200);
        }

        // Animate clouds more dynamically
        this.animateClouds();
        
        // Start sun position updates
        setInterval(() => this.updateSunPosition(), 60000);
    }

    animateClouds() {
        const clouds = document.querySelectorAll('.cloud');
        clouds.forEach((cloud, index) => {
            const speed = 20 + Math.random() * 10;
            const delay = index * 5;
            cloud.style.animationDuration = `${speed}s`;
            cloud.style.animationDelay = `${delay}s`;
        });
    }

    updateWeatherAnimations() {
        // Randomly change weather conditions for demonstration
        if (Math.random() < 0.1) { // 10% chance to change
            const conditions = ['sunny', 'partly-cloudy', 'cloudy', 'rainy'];
            const newCondition = conditions[Math.floor(Math.random() * conditions.length)];
            this.weatherData.current.condition = newCondition;
            this.weatherData.current.icon = this.getWeatherIcon(newCondition);
            
            // Update display
            document.querySelector('.icon-element').textContent = this.weatherData.current.icon;
            document.getElementById('weatherCondition').textContent = this.getConditionText(newCondition);
            this.updateBackground(newCondition);
            
            // Add animation to the main weather card
            const card = document.querySelector('.main-weather-card');
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = 'fade-in-up 0.5s ease-out';
        }

        // Update temperature slightly
        const tempElement = document.getElementById('currentTemp');
        const currentTemp = parseInt(tempElement.textContent);
        const newTemp = currentTemp + (Math.random() > 0.5 ? 1 : -1);
        tempElement.textContent = `${newTemp}°`;
        
        // Add pulse animation
        tempElement.style.animation = 'none';
        tempElement.offsetHeight; // Trigger reflow
        tempElement.style.animation = 'temp-pulse 1s ease-in-out';
    }

    setupEventListeners() {
        // Add hover effects to weather details
        const detailItems = document.querySelectorAll('.detail-item');
        detailItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click effect to main weather icon
        const weatherIcon = document.querySelector('.animated-weather-icon');
        weatherIcon.addEventListener('click', () => {
            weatherIcon.style.animation = 'none';
            weatherIcon.offsetHeight; // Trigger reflow
            weatherIcon.style.animation = 'icon-float 0.5s ease-in-out, temp-pulse 0.5s ease-in-out';
            
            // Create burst effect
            this.createBurstEffect(weatherIcon);
        });

        // Add touch support for mobile
        if ('ontouchstart' in window) {
            document.addEventListener('touchstart', (e) => {
                if (e.target.closest('.hourly-item')) {
                    e.target.closest('.hourly-item').style.transform = 'scale(0.95)';
                }
            });
            
            document.addEventListener('touchend', (e) => {
                if (e.target.closest('.hourly-item')) {
                    e.target.closest('.hourly-item').style.transform = 'scale(1)';
                }
            });
        }
    }

    createBurstEffect(element) {
        const burst = document.createElement('div');
        burst.style.position = 'absolute';
        burst.style.top = '50%';
        burst.style.left = '50%';
        burst.style.width = '10px';
        burst.style.height = '10px';
        burst.style.background = 'radial-gradient(circle, #ffeaa7, transparent)';
        burst.style.borderRadius = '50%';
        burst.style.transform = 'translate(-50%, -50%)';
        burst.style.animation = 'burst 0.6s ease-out forwards';
        burst.style.pointerEvents = 'none';
        burst.style.zIndex = '1000';

        element.appendChild(burst);

        // Add burst keyframes if not already added
        if (!document.querySelector('#burst-keyframes')) {
            const style = document.createElement('style');
            style.id = 'burst-keyframes';
            style.textContent = `
                @keyframes burst {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 600);
    }
}

// Initialize the weather app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimatedWeatherApp();
});

// Add viewport height fix for mobile
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);