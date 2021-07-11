import React from 'react';
import GoogleMapReact from 'google-map-react';

// const location = {
// 	address: '1600 Amphitheatre Parkway, Mountain View, california.',
// 	lat: 37.42216,
// 	lng: -122.08427,
// };

// eslint-disable-next-line no-restricted-globals
const MapLocation = ({ loc }) => {
	let latLng = loc.latLng;
	latLng = latLng.split(',');

	const locations = {
		address: loc.address,
		lat: parseFloat(latLng[0]),
		lng: parseFloat(latLng[1]),
	};
	console.log(locations);

	const LocationPin = ({ text }) => (
		<div className='pin'>
			<img
				src='https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-512.png'
				alt=''
				style={{ width: '30px', height: '30px' }}
			/>
			<p style={{ color: 'black', width: '150px' }}>{text}</p>
		</div>
	);

	return (
		<div className='h-screen w-2/4'>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyBelvJjnjNr3A30X5dTVEMmoilV6FH_XP0' }}
				defaultCenter={locations}
				defaultZoom={17}
			>
				<LocationPin
					lat={locations.lat}
					lng={locations.lng}
					text={locations.address}
				/>
			</GoogleMapReact>
		</div>
	);
};

export default MapLocation;
