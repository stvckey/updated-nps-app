import random
from flask import Flask, jsonify, request
from flask_cors import CORS
from nps import get_park_data
from states import states
from weather import get_weather_data


app = Flask(__name__)
CORS(app)


random_state = (random.choice(list(states.items()))[0])

park_data = get_park_data(random_state)

weather_data = []
for x in park_data['coord']:
    temp = str(get_weather_data(x))
    weather_data.append(temp)

park_data["weather"] = weather_data
park_data["total_states"] = list(states.items())

@app.route('/',methods=['GET'])
def get_data():
    data = park_data
    return jsonify(data)
        
@app.route('/select_state', methods=['POST'])
def submit_form():
    data = request.get_json()
    # Process the form data here
    # Example: You can print the data for demonstration
    print(data)
    return jsonify({"message": "Form submitted successfully"})
    
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)