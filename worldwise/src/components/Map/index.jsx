import React from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("/app/form")}>
      <h1>Map</h1>
      Position: {lat} , {lng}
      <button onClick={() => setSearchParams({ lat: 40, lng: 0 })}>
        Set Position
      </button>
    </div>
  );
}
