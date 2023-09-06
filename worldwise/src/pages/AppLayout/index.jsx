import React from "react";
import Sidebar from "@/components/Sidebar";
import User from "@/components/User";
import Map from "@/components/Map";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <User />
      <Map />
    </div>
  );
}
