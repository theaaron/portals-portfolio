import { CameraControls, Environment, GradientTexture, MeshPortalMaterial, RoundedBox, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import React, { useEffect, useRef, useState } from "react";
import { DoubleSide, Vector3 } from "three";
import { Links } from "./links";
import { AboutMe } from "./about-me";
import { Projects } from "./projects";

interface CardProps {
  color1: string;
  color2: string;
  name: string;
  pos: Vector3;
  active: string;
  setActive: () => {};
}

var camPosActive = {
  'About Me': new Vector3(-8.5, -.22, 0),
  'Links': new Vector3(0, 0, 5.1),
  'Projects': new Vector3(8.5, 0, 0)
};

export const Portals: React.FC = () => {
  const [active, setActive] = useState(null);
  const controlsRef = useRef<CameraControls | undefined>();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (controlsRef.current) {
      if (active) {
        const targetPos = new Vector3();
        scene.getObjectByName(active)?.getWorldDirection(targetPos);
  
        controlsRef.current.setLookAt(
          camPosActive[active].x,
          camPosActive[active].y,
          camPosActive[active].z,
          targetPos.x,
          targetPos.y,
          targetPos.z,
          true
        )
      } else {
        controlsRef.current.setLookAt(
          0,
          0,
          10,
          0,
          0,
          0,
          true
        )
      }

    }
  }, [active])

  return (
    <>
    <ambientLight intensity={0.5} />
    <Environment preset="sunset" />
      <CameraControls ref={controlsRef} />
      <Cards 
        color1={'#2E3192'} 
        color2={'#1BFFFF'} 
        pos={new Vector3(-2.5, 0, 0)} 
        name="About Me" 
        active={active}
        setActive={setActive}
      />
      <Cards 
        color1={'#09203F'} 
        color2={'#537895'} 
        pos={new Vector3(0, 0, 0)}  
        name="Links"
        active={active}
        setActive={setActive}
      />
      <Cards 
        color1={'#C33764 '} 
        color2={'#1D2671'} 
        pos={new Vector3(2.5, 0, 0)}  
        name="Projects"
        active={active}
        setActive={setActive}
      />
    </>
  );
};

const Cards: React.FC<CardProps>= ({color1, color2, pos, name, active, setActive}) => {
  const [rotation, setRotation] = useState({x: 0, y: 0, z: 0});
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const sphereOpen = active === name;
    easing.damp(portalMaterial.current, "blend", sphereOpen ? 1 : 0, 0.2, delta);
  })

  useEffect(() => {
    const handleRotation = () => {
      setRotation(prevRotation => ({
        x: prevRotation.x + .01,
        y: prevRotation.y + .005,
        z: prevRotation.z + .03
      }));
    };
    const intervalId = setInterval(handleRotation, 16);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <group position={pos} >
        <Text
          font="./fonts/Sedan/Sedan-Regular.ttf"
          castShadow={true} 
          color={'#eee'}
          fontSize={0.3}
          position={[0, -1.3, 0.11]}
          textAlign="center"
          anchorY={'bottom'}
        >
          {name}
        </Text>
        <RoundedBox args={[2, 3, 0.2]} onClick={() => setActive(active === name ? null : name)} name={name}>
            <MeshPortalMaterial ref={portalMaterial} side={DoubleSide} blend={active === name ? 1.0 : 0.0} >
              <ambientLight intensity={1.0} />
              <mesh 
              onClick={() => {
                if (active === name || active === null) {
                  setActive(active === name ? null : name)}
                }
              }              
              rotation={[rotation.x, rotation.y, rotation.z]} 
              >
                <sphereGeometry args={[5, 90, 9]} />
                <meshPhongMaterial>
                  <GradientTexture
                    stops={[0, 1]}
                    colors={[color1, color2]}
                    />
                </meshPhongMaterial>
              </mesh>
              <Links isVisible={active==='Links'}/>
              <AboutMe aboutMeVisible={active==='About Me'} />
              <Projects isVisible={active==='Projects'} />
            </MeshPortalMaterial>
        </RoundedBox>
      </group>
    </>
  )
}
