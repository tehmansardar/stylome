import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const MapLocation = ({ loc }) => {
	const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

	let latLng = loc.latLng;
	latLng = latLng.split(',');

	useEffect(() => {
		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				console.log('Geolocation is not supported by this browser.');
			}
		}
		getLocation();

		function showPosition(position) {
			setUserLocation({
				...userLocation,
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		}
	}, []);

	const currentLocation = {
		lat: userLocation.lat,
		lng: userLocation.lng,
	};

	const apiIsLoaded = (map, maps) => {
		const directionsService = new window.google.maps.DirectionsService();
		const directionsRenderer = new window.google.maps.DirectionsRenderer({
			polylineOptions: { strokeColor: '#000' },
			suppressMarkers: true,
		});
		directionsRenderer.setMap(map);
		const origin = { lat: userLocation.lat, lng: userLocation.lng };
		const destination = {
			lat: parseFloat(latLng[0]),
			lng: parseFloat(latLng[1]),
		};

		// 30.661422499999997, 73.1062267

		directionsService.route(
			{
				origin: origin,
				destination: destination,
				travelMode: window.google.maps.TravelMode.DRIVING,
			},
			(result, status) => {
				if (status === window.google.maps.DirectionsStatus.OK) {
					directionsRenderer.setDirections(result);
				} else {
					console.error(`error fetching directions ${result}`);
				}
			}
		);
	};
	return (
		<div className='h-screen w-2/4'>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: 'AIzaSyBelvJjnjNr3A30X5dTVEMmoilV6FH_XP0',
				}}
				defaultCenter={{
					lat: userLocation.lat,
					lng: userLocation.lng,
				}}
				defaultZoom={11}
				center={currentLocation}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
			/>
		</div>
	);
};
export default MapLocation;
