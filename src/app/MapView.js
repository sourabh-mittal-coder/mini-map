"use client";
import L from "leaflet";
import "./utils/LeafletIcon";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

export default function MapView() {
  const [geoData, setGeoData] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    getGeoData();
    getPoints();
  }, []);

  const getGeoData = () => {
    const url =
      "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson";
    fetch(url)
      .then((resp) => resp.json())
      .then((res) => {
        setGeoData(res);
      })
      .catch((error) => {
        console.error("Failed to fetch GeoJSON:", error);
      });
  };
  const getPoints = () => {
    const url =
      "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_geography_regions_elevation_points.geojson";
    fetch(url)
      .then((resp) => resp.json())
      .then((res) => {
        setPoints(res);
      })
      .catch((error) => {
        console.error("Failed to fetch points:", error);
      });
  };
  const onEachFeature = (feature, layer) => {
    if (feature.properties?.name) {
      layer.bindTooltip(`<strong>${feature.properties.name}</strong>`, {
        sticky: true,
      });
    }

    const defaultStyle = {
      weight: 1,
      color: "#3388ff",
      fillOpacity: 0.3,
    };

    layer.bindPopup(
      `<div>
        <strong>${feature.properties.name}</strong><br/>
        Type: ${feature.properties.type}<br/>
        State Code: ${feature.properties.postal}<br/>
        Region: ${feature.properties.region_big} (${feature.properties.region})<br/>
        <a href="${feature.properties.wikipedia}" target="_blank">Wikipedia</a>
      </div>`
    );
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 2,
          color: "#666",
          fillOpacity: 0.5,
        });
      },
      mouseout: (e) => {
        e.target.setStyle(defaultStyle);
      },
    });
  };

  const customIcon = new L.Icon({
    iconUrl: "/marker.png",
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={4}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points?.features.map((pos, i) => (
          <Marker
            key={pos.properties.name || i}
            position={[
              pos.geometry.coordinates[1],
              pos.geometry.coordinates[0],
            ]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-1 text-sm leading-tight">
                <p>
                  <strong>{pos.properties.name}</strong>
                </p>
                <p>
                  <span className="font-medium">Elevation:</span>{" "}
                  {pos.properties.elevation} m
                </p>
                <p>
                  <span className="font-medium">Region:</span>{" "}
                  {pos.properties.region}
                </p>
                <p>
                  <span className="font-medium">Coordinates:</span>{" "}
                  {pos.properties.lat_y.toFixed(4)},{" "}
                  {pos.properties.long_x.toFixed(4)}
                </p>
                <p>
                  <span className="font-medium">Type:</span>{" "}
                  {pos.properties.featureclass}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {geoData && (
          <GeoJSON
            data={geoData}
            style={{
              color: "#3388ff",
              weight: 1,
              fillOpacity: 0.3,
            }}
            onEachFeature={(feature, layer) => {
              onEachFeature(feature, layer);
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
