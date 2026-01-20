import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
};

const fallbackCenter = {
    lat: 42.6977,
    lng: 23.3219,
};

export default function Map({ value, onChange }) {
    const handleClick = (e) => {
        onChange({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    };

    return (
        <LoadScript googleMapsApiKey="ТВОЯ_API_KEY">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={value || fallbackCenter}
                zoom={value ? 16 : 13}
                onClick={handleClick}
            >
                {value && (
                    <Marker
                        position={value}
                        draggable
                        onDragEnd={(e) =>
                            onChange({
                                lat: e.latLng.lat(),
                                lng: e.latLng.lng(),
                            })
                        }
                    />
                )}
            </GoogleMap>
        </LoadScript>
    );
}
