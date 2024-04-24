import { Canvas } from "@react-three/fiber";
import { Portals } from "./components/Portals";
import { NameTitle } from "./components/about-me";
import React from "react";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 70 }}>
      <NameTitle />
      <Portals />
    </Canvas>
  );
}

export default App;
