// src/lib/weather.ts
export async function getNainitalWeather() {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  // Lat/Lon for Nainital
  const lat = 29.3919;
  const lon = 79.4542;
  
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) throw new Error("Weather station unreachable");
  
  return response.json();
}