import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react"
import { Group, Object3DEventMap } from "three";
import { Text, useTexture } from "@react-three/drei"
import heize from '../assets/heize.png'
import mandala from '../assets/mandala.png'
import threedee from '../assets/threedeeproj.png'

interface ProjectsProps {
    isVisible: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({isVisible}) => {
    const groupRef = useRef<Group<Object3DEventMap>>(null);
    const heizePhoto = useTexture(heize)
    const mandalaPhoto = useTexture(mandala)
    const threedeePhoto = useTexture(threedee)

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.PI*-1.5;
        }
      });

    return (
        <group position={[5, 0, 0.2]} visible={isVisible} ref={groupRef} onClick={() => {}} >
            <Text
                font="./fonts/Sedan/Sedan-Regular.ttf"
                position={[0, .3, 0.01]}
                fontSize={.08}
                textAlign="center"
                anchorX={"center"}
                color={'#333'}
            >
                Projects
            </Text>
            <mesh >
                <planeGeometry args={[1.7, 1]}/>
                <meshBasicMaterial color={'white'} />
            </mesh>
            <mesh position={[0.55, 0, 0.01]}>
                <planeGeometry args={[.4, .4]}/>
                <meshBasicMaterial color={'pink'}  map={threedeePhoto} />
            </mesh>
            <mesh position={[0.00, 0.0, 0.01]} onClick={() => window.open("https://aaroncodes.art/", "_blank")} >
                <planeGeometry args={[.4, .4]}/>
                <meshBasicMaterial color={'pink'}  map={heizePhoto}/>
            </mesh>
            <mesh position={[-.55, 0, 0.01]}>
                <planeGeometry args={[.4, .4]}/>
                <meshBasicMaterial color={'pink'} map={mandalaPhoto} />
            </mesh>
        </group>
    )
}
