const activities = {
  indoor: {
    relaxing: [
      { text: "Time for a cozy movie marathon! 🎬", icon: "🎬" },
      { text: "Perfect day to catch up on your reading! 📚", icon: "📚" },
      { text: "How about some indoor yoga or meditation? 🧘‍♀️", icon: "🧘‍♀️" },
      { text: "Great time to start that puzzle! 🧩", icon: "🧩" },
      { text: "Cook something warm and comforting! 🍲", icon: "🍲" }
    ],
    active: [
      { text: "Try an indoor workout session! 💪", icon: "💪" },
      { text: "Perfect time for some dancing! 💃", icon: "💃" },
      { text: "How about indoor rock climbing? 🧗‍♀️", icon: "🧗‍♀️" },
      { text: "Visit a local museum or art gallery! 🏛️", icon: "🏛️" }
    ]
  },
  outdoor: {
    relaxing: [
      { text: "Perfect weather for a picnic! 🧺", icon: "🧺" },
      { text: "Take a peaceful nature walk! 🌿", icon: "🌿" },
      { text: "Great day for photography! 📸", icon: "📸" },
      { text: "Try some gardening! 🌱", icon: "🌱" }
    ],
    active: [
      { text: "Perfect weather to go for a run! 🏃‍♂️", icon: "🏃‍♂️" },
      { text: "Great conditions for cycling! 🚴‍♀️", icon: "🚴‍♀️" },
      { text: "How about a hiking adventure? ⛰️", icon: "⛰️" },
      { text: "Perfect day for outdoor yoga! 🧘‍♂️", icon: "🧘‍♂️" }
    ]
  },
  water: {
    activities: [
      { text: "Perfect day for swimming! 🏊‍♂️", icon: "🏊‍♂️" },
      { text: "Go surfing or paddleboarding! 🏄‍♂️", icon: "🏄‍♂️" },
      { text: "Visit the beach! 🏖️", icon: "🏖️" },
      { text: "Try some kayaking! 🛶", icon: "🛶" }
    ]
  },
  snow: {
    activities: [
      { text: "Perfect day for skiing! ⛷️", icon: "⛷️" },
      { text: "Build a snowman! ⛄", icon: "⛄" },
      { text: "Go sledding! 🛷", icon: "🛷" },
      { text: "Have a snowball fight! ❄️", icon: "❄️" }
    ]
  }
};

export const getRecommendations = (weatherData) => {
  if (!weatherData) return [];

  const temp = Math.round(weatherData.main.temp);
  const condition = weatherData.weather[0].main.toLowerCase();
  const windSpeed = weatherData.wind.speed;
  const humidity = weatherData.main.humidity;
  const hour = new Date().getHours();

  let recommendations = [];

  // Temperature-based recommendations
  if (temp <= 0) {
    recommendations.push(...activities.indoor.relaxing);
    if (condition.includes('snow')) {
      recommendations.push(...activities.snow.activities);
    }
  } else if (temp > 0 && temp < 10) {
    recommendations.push(...activities.indoor.active);
    recommendations.push(...activities.outdoor.active.slice(0, 2));
  } else if (temp >= 10 && temp <= 25) {
    recommendations.push(...activities.outdoor.active);
    recommendations.push(...activities.outdoor.relaxing);
  } else if (temp > 25) {
    recommendations.push(...activities.water.activities);
    if (hour < 10 || hour > 17) {
      recommendations.push(...activities.outdoor.active);
    }
  }

  // Weather condition specific recommendations
  if (condition.includes('rain')) {
    recommendations = [...activities.indoor.relaxing];
    if (temp > 20) {
      recommendations.push({ text: "Dance in the warm rain! 🌧️", icon: "🌧️" });
    }
  }

  if (condition.includes('clear')) {
    if (hour >= 20 || hour <= 5) {
      recommendations.push({ text: "Perfect night for stargazing! ✨", icon: "✨" });
    }
    recommendations.push(...activities.outdoor.relaxing);
  }

  // Wind-based recommendations
  if (windSpeed > 5 && windSpeed < 15) {
    recommendations.push(
      { text: "Great day for flying a kite! 🪁", icon: "🪁" },
      { text: "Perfect conditions for sailing! ⛵", icon: "⛵" }
    );
  }

  // Humidity-based recommendations
  if (humidity > 80) {
    recommendations = recommendations.filter(rec => 
      !rec.text.toLowerCase().includes('run') && 
      !rec.text.toLowerCase().includes('workout')
    );
  }

  // Shuffle and limit recommendations
  return shuffleArray(recommendations).slice(0, 3);
};

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
