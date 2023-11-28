import urllib.request, json

WEATHER_API_KEY = "YOUR_KEY_GOES_HERE"

def get_weather_data(coord):
    endpoint = "http://api.weatherapi.com/v1/current.json?key=" + WEATHER_API_KEY + "&q=" + coord + "&aqi=no"
    req = urllib.request.Request(endpoint)
    
    response = urllib.request.urlopen(req).read()
    data = json.loads(response.decode('utf-8'))
    
    weather_data = data["current"]
    
    def get_tempf(weather_data):
        return weather_data["temp_f"]
    
    def get_tempc(weather_data):
        return weather_data["temp_c"]
    
    def get_condition_text(weather_data):
        return weather_data["condition"]["text"]
    
    def get_condition_icon(weather_data):
        return weather_data["condition"]["icon"]
    
    weather = {}
    
    temp_f = get_tempf(weather_data)
    weather['temp_f'] = temp_f
    
    temp_c = get_tempc(weather_data)
    weather['temp_c'] = temp_c
    
    condition_text = get_condition_text(weather_data)
    weather['condition_text'] = condition_text
    
    condition_icon = get_condition_icon(weather_data)
    weather['condition_icon'] = condition_icon
    
    return weather