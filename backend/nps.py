import urllib.request, json

key = "YOUR_KEY_GOES_HERE"

#get park data for specific state
def get_park_data(state_id):
    endpoint = "https://developer.nps.gov/api/v1/parks?stateCode=" + state_id +"&api_key=" + key
    req = urllib.request.Request(endpoint)
    
    response = urllib.request.urlopen(req).read()
    data = json.loads(response.decode('utf-8'))
    parks = data["data"]
    
    def get_park_name(parks):
        return parks["fullName"]
    
    def get_park_hours(parks):
        sample_hours = parks["operatingHours"][0]["standardHours"]
        desired_hours = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
        reordered_hours = {x: sample_hours[x] for x in desired_hours}
        return reordered_hours
    
    def get_park_state(parks):
        return parks["addresses"][0]["stateCode"]

    def get_park_desc(parks):
        return parks["description"]
    
    def get_park_coord(parks):
        coords = parks["latLong"]
        no_lat = coords.replace("lat:","")
        no_latlong = no_lat.replace("long:","")
        no_spaces = no_latlong.replace(" ","")
        return no_spaces
    
    def get_park_image(parks):
        return parks["images"][0]["url"]
    
    image = map(get_park_image, parks)
    names = map(get_park_name, parks)
    hours = map(get_park_hours, parks)
    state = map(get_park_state, parks)
    desc = map(get_park_desc, parks)
    coords = map(get_park_coord, parks)
    
    
    
    return {
        'names' : list(names),
        'hours' : list(hours),
        'state' : list(state),
        'desc' : list(desc),
        'coord' : list(coords),
        'image' : list(image)
    }