import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Landing from "./Landing";
import Navigation from "./Navigation";
import { getCurrentUser } from "../firebase";

export default function RoutesTree() {
  const currentUser = getCurrentUser();
  
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}
