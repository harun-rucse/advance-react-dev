import React from "react";
import styles from "./CityList.module.css";
import CityItem from "@/components/CityItem";
import Spinner from "@/components/Spinner";
import Message from "@/components/Message";
import { useCities } from "../../contexts/CitiesContext";

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities?.map((city, index) => (
        <CityItem key={index} city={city} />
      ))}
    </ul>
  );
}
