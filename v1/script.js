// iOS Weather App - Mock Data and Functionality

class WeatherApp {
    constructor() {
        this.currentLocation = 'San Francisco';
        this.initializeApp();
    }

    // Mock weather data
    getCurrentWeatherData() {
        return {
            location: 'San Francisco',
            currentTime: this.getCurrentTime(),
            temperature: 72,
            condition: 'Sunny',
            icon: '☀️',
            highTemp: 76,
            lowTemp: 63,
            humidity: 65,
            windSpeed: '8 mph NW',
            visibility: '10 mi',
            feelsLike: 74,
            pressure: '30.12 in',
            uvIndex: 6
        };
    }

    getHourlyForecastData() {
        const hours = [];
        const currentHour = new Date().getHours();
        
        const conditions = [
            { icon: '☀️', temp: 72, rain: 0 },
            { icon: '⛅', temp: 73, rain: 10 },
            { icon: '☀️', temp: 75, rain: 0 },
            { icon: '☀️', temp: 76, rain: 0 },
            { icon: '⛅', temp: 74, rain: 5 },
            { icon: '🌤️', temp: 73, rain: 15 },
            { icon: '⛅', temp: 71, rain: 20 },
            { icon: '🌧️', temp: 69, rain: 60 },
            { icon: '🌧️', temp: 67, rain: 80 },
            { icon: '⛅', temp: 66, rain: 30 },
            { icon: '🌤️', temp: 68, rain: 10 },
            { icon: '☀️', temp: 70, rain: 0 }
        ];

        for (let i = 0; i < 12; i++) {
            const hour = (currentHour + i + 1) % 24;
            const condition = conditions[i];
            
            hours.push({
                time: this.formatHour(hour),
                icon: condition.icon,
                temperature: condition.temp,
                rainChance: condition.rain
            });
        }

        return hours;
    }

    getWeeklyForecastData() {
        const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const conditions = [
            { icon: '☀️', high: 76, low: 63, rain: 0 },
            { icon: '⛅', high: 74, low: 61, rain: 10 },
            { icon: '🌧️', high: 68, low: 58, rain: 70 },
            { icon: '🌧️', high: 65, low: 55, rain: 85 },
            { icon: '⛅', high: 69, low: 57, rain: 25 },
            { icon: '☀️', high: 73, low: 60, rain: 5 },
            { icon: '☀️', high: 75, low: 62, rain: 0 }
        ];

        return days.map((day, index) => ({
            day,
            icon: conditions[index].icon,
            highTemp: conditions[index].high,
            lowTemp: conditions[index].low,
            rainChance: conditions[index].rain
        }));
    }

    // Utility functions
    getCurrentTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        return now.toLocaleDateString('en-US', options);
    }

    formatHour(hour) {
        if (hour === 0) return '12 AM';
        if (hour === 12) return '12 PM';
        if (hour < 12) return `${hour} AM`;
        return `${hour - 12} PM`;
    }

    // UI Update functions
    updateCurrentWeather() {
        const data = this.getCurrentWeatherData();
        
        document.getElementById('locationName').textContent = data.location;
        document.getElementById('currentTime').textContent = data.currentTime;
        document.getElementById('weatherIcon').textContent = data.icon;
        document.getElementById('currentTemp').textContent = `${data.temperature}°`;
        document.getElementById('weatherDescription').textContent = data.condition;
        document.getElementById('highTemp').textContent = `H:${data.highTemp}°`;
        document.getElementById('lowTemp').textContent = `L:${data.lowTemp}°`;
        
        // Update weather details
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('windSpeed').textContent = data.windSpeed;
        document.getElementById('visibility').textContent = data.visibility;
        document.getElementById('feelsLike').textContent = `${data.feelsLike}°`;
        document.getElementById('pressure').textContent = data.pressure;
        document.getElementById('uvIndex').textContent = data.uvIndex;

        // Update body class for background
        this.updateBackgroundTheme(data.condition);
    }

    updateHourlyForecast() {
        const hourlyData = this.getHourlyForecastData();
        const container = document.getElementById('hourlyForecast');
        
        container.innerHTML = '';
        
        hourlyData.forEach((hour, index) => {
            const hourElement = document.createElement('div');
            hourElement.className = 'hourly-item';
            hourElement.style.animationDelay = `${index * 0.1}s`;
            
            hourElement.innerHTML = `
                <div class="hourly-time">${hour.time}</div>
                <div class="hourly-icon">${hour.icon}</div>
                <div class="hourly-temp">${hour.temperature}°</div>
                ${hour.rainChance > 0 ? `<div class="hourly-rain">${hour.rainChance}%</div>` : ''}
            `;
            
            container.appendChild(hourElement);
        });
    }

    updateWeeklyForecast() {
        const weeklyData = this.getWeeklyForecastData();
        const container = document.getElementById('weeklyForecast');
        
        container.innerHTML = '';
        
        weeklyData.forEach((day, index) => {
            const dayElement = document.createElement('div');
            dayElement.className = 'weekly-item';
            dayElement.style.animationDelay = `${index * 0.05}s`;
            
            dayElement.innerHTML = `
                <div class="weekly-day">${day.day}</div>
                ${day.rainChance > 0 ? `<div class="weekly-rain">${day.rainChance}%</div>` : '<div class="weekly-rain"></div>'}
                <div class="weekly-icon">${day.icon}</div>
                <div class="weekly-temps">
                    <span class="weekly-low">${day.lowTemp}°</span>
                    <span class="weekly-high">${day.highTemp}°</span>
                </div>
            `;
            
            container.appendChild(dayElement);
        });
    }

    updateBackgroundTheme(condition) {
        document.body.className = '';
        
        switch(condition.toLowerCase()) {
            case 'sunny':
            case 'clear':
                document.body.classList.add('sunny');
                break;
            case 'cloudy':
            case 'overcast':
                document.body.classList.add('cloudy');
                break;
            case 'rainy':
            case 'rain':
                document.body.classList.add('rainy');
                break;
            case 'snowy':
            case 'snow':
                document.body.classList.add('snowy');
                break;
            default:
                document.body.classList.add('sunny');
        }
    }

    // Animation and interaction functions
    addInteractions() {
        // Add smooth scrolling for hourly forecast
        const hourlyContainer = document.getElementById('hourlyForecast');
        let isScrolling = false;
        
        hourlyContainer.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    // Add subtle animation feedback
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });

        // Add click interactions for cards
        const detailCards = document.querySelectorAll('.detail-card');
        detailCards.forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });

        // Add hover effects for weekly forecast items
        const weeklyItems = document.querySelectorAll('.weekly-item');
        weeklyItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = '';
            });
        });
    }

    // Simulate data refresh
    refreshData() {
        // Add loading state
        document.querySelectorAll('.forecast-section, .weather-details').forEach(section => {
            section.classList.add('loading');
        });

        setTimeout(() => {
            this.updateCurrentWeather();
            this.updateHourlyForecast();
            this.updateWeeklyForecast();
            
            // Remove loading state
            document.querySelectorAll('.forecast-section, .weather-details').forEach(section => {
                section.classList.remove('loading');
            });
            
            this.addInteractions();
        }, 500);
    }

    // Auto-refresh functionality
    startAutoRefresh() {
        // Update time every minute
        setInterval(() => {
            document.getElementById('currentTime').textContent = this.getCurrentTime();
        }, 60000);

        // Simulate weather data updates every 10 minutes
        setInterval(() => {
            this.refreshData();
        }, 600000);
    }

    // Initialize the app
    initializeApp() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadApp();
            });
        } else {
            this.loadApp();
        }
    }

    loadApp() {
        // Initial data load
        this.updateCurrentWeather();
        this.updateHourlyForecast();
        this.updateWeeklyForecast();
        
        // Add interactions
        this.addInteractions();
        
        // Start auto-refresh
        this.startAutoRefresh();

        // Add pull-to-refresh simulation (for mobile-like experience)
        let startY = 0;
        let currentY = 0;
        let pullDistance = 0;
        
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            pullDistance = currentY - startY;
            
            if (pullDistance > 100 && window.scrollY === 0) {
                // Show refresh indicator
                document.body.style.transform = `translateY(${Math.min(pullDistance * 0.5, 50)}px)`;
            }
        });

        document.addEventListener('touchend', () => {
            if (pullDistance > 100 && window.scrollY === 0) {
                this.refreshData();
            }
            
            document.body.style.transform = '';
            pullDistance = 0;
        });

        console.log('iOS Weather App initialized successfully!');
    }
}

// Create and initialize the weather app
const weatherApp = new WeatherApp();