import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";

const MapComponent = () => {

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyA084m0t0S9qNuJn-dWMw3jvQo1fp76cvQ"
    });
    
    const noMarkers = [

    ];

    const initialMarkers = [
        {
            position: {
                lat: 28.625293,
                lng: 79.817926
            },
            label: { color: "white", text: "P2" },
            draggable: false
        },
    ];

    
    const [activeInfoWindow, setActiveInfoWindow] = useState(null);
    const [markers, setMarkers] = useState(initialMarkers);

    const containerStyle = {
        width: "100%",
        height: "100%",
    }

    const center = {
        lat: 33.92367193117714, 
        lng: -84.00880402883644,
    }

    const mapClicked = (event) => { 
        console.log(event.latLng.lat(), event.latLng.lng()) 
    }

    const markerClicked = (marker, index) => { 
        window.google.maps.panTo(28.625293,79.817926);
        setActiveInfoWindow(index)
        // setMarkers(noMarkers)
        console.log(marker, index) 
    }

    const markerDragEnd = (event, index) => { 
        console.log(event.latLng.lat(), event.latLng.lng())
    }

    return (
        isLoaded
        &&
        <GoogleMap
            options={{ mapId: "bd45e656986ecfd4" }}
            mapContainerStyle={containerStyle} 
            center={center} 
            zoom={15}
            onClick={mapClicked}
        >
            {markers.map((marker, index) => (
                <Marker 
                    key={index} 
                    position={marker.position}
                    label={marker.label}
                    draggable={marker.draggable}
                    onDragEnd={event => markerDragEnd(event, index)}
                    onClick={event => markerClicked(marker, index)} 
                >
                    {
                        (activeInfoWindow === index)
                        &&
                        <InfoWindow 
                            position={marker.position} 
                            onCloseClick={() => setActiveInfoWindow(null)}
                        >
                            <h1>My coochie pink and my booty hole is brown</h1>
                            {/* <b>{marker.position.lat}, {marker.position.lng}</b> */}
                        </InfoWindow>
                    }  
                </Marker>
            ))}
        </GoogleMap>
    );
};

export default MapComponent;