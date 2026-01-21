import React, { useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const containerStyle = { height: "400px", width: "100%", borderRadius: "15px" };
const fallbackCenter = { lat: 42.6977, lng: 23.3219 }; // София

const Recenter = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView([center.lat, center.lng], map.getZoom());
        }
    }, [center, map]);
    return null;
};

export default function Map({ value, onChange }) {
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
                onChange(coords);
            },
        });
        return null;
    };

    return (
        <MapContainer
            center={value || fallbackCenter}
            zoom={value ? 19 : 16}
            style={containerStyle}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />
            <Recenter center={value || fallbackCenter} />
            {value && (
                <Marker
                    position={[value.lat, value.lng]}
                    draggable={true}
                    eventHandlers={{
                        dragend: (e) => {
                            const latLng = e.target.getLatLng();
                            onChange({ lat: latLng.lat, lng: latLng.lng });
                        },
                    }}
                />
            )}
        </MapContainer>
    );
}
