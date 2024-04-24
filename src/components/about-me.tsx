import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react"
import { Group, Object3DEventMap, Vector3 } from "three";

interface TextProps {
    degreeName: string;
    schoolName: string;
    pos: Vector3;
}

interface WorkProps {
    company: string;
    jobTitle: string;
    pos: Vector3;
}

interface AboutMeProps {
    aboutMeVisible: boolean
}


export const AboutMe: React.FC<AboutMeProps> = ({aboutMeVisible}) => {

    const groupRef = useRef<Group<Object3DEventMap>>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.PI*1.5;
        }
      });

    return (
        <group ref={groupRef} position={[-5.1, 0, 0]} visible={aboutMeVisible}>
            <Education />
            <Experience />
        </group>
    )
}

const Education: React.FC = () => {
    return (
        <group>
            <Text
                font="./fonts/Sedan/Sedan-Regular.ttf"
                position={[0, .08, 0]}
                fontSize={.07}
                textAlign="left"
                anchorX={"left"}
                color={'#333'}
            >
                Education
            </Text>
            <Edu degreeName={"Master of Arts, Creative Technology"} schoolName={"Southern Methodist University"} pos={new Vector3(0, 0, 0)} />
            <Edu degreeName={"Master of Science, Computer Science"} schoolName={"Georgia Institute of Technology"} pos={new Vector3(0, -.15, 0)}  />
            <Edu degreeName={"Bachelor of Science, Computer Science"} schoolName={"Western Governors University"} pos={new Vector3(0, -.30, 0)}  />
        </group>
    )
}

const Experience: React.FC = () => {
    return (
        <group>
            <mesh position={[.1, -.1, -.01]}>
                <planeGeometry args={[1.3, .8]}/>
                <meshStandardMaterial />
            </mesh>
            <Text
                font="./fonts/Sedan/Sedan-Regular.ttf"
                position={[-.41, .08, 0]}
                fontSize={.07}
                textAlign="left"
                anchorX={"left"}
                color={'#333'}
            >
                Work
            </Text>

            <Work company={"DataAnnotationTech"} jobTitle={"AI Evaluator"} pos={new Vector3(-.4, 0, 0)} />
            <Work company={"nenos"} jobTitle={"iOS Engineer"} pos={new Vector3(-.4, -.15, 0)} />
            <Work company={"nenos"} jobTitle={"iOS Engineer Intern"} pos={new Vector3(-.4, -.3, 0)} />
        </group>
    )
}

const Work: React.FC<WorkProps> = ({company, jobTitle, pos}) => {
    return (
        <group position={pos}>
            <Text
                font="./fonts/Sedan/Sedan-Regular.ttf"
                fontSize={.04}
                textAlign="left"
                anchorX={"left"}
                color={'#333'}
            >{jobTitle}
            </Text>
            <Text
                position={[0, -.05, 0]}
                font="./fonts/Sedan/Sedan-Italic.ttf"
                fontSize={.03}
                textAlign="left"
                anchorX={"left"}
                color={'#888'}
            >{company}
            </Text>
        </group>
    )
}

const Edu: React.FC<TextProps> =  ({degreeName, schoolName, pos}) => {
    return (
        <group position={pos}>
            <Text
                position={[0, 0, 0]}
                font="./fonts/Sedan/Sedan-Regular.ttf"
                fontSize={.04}
                textAlign="left"
                anchorX={"left"}
                color={'#333'}
                >{degreeName}</Text>
            <Text
                position={[0, -.05, 0]}
                font="./fonts/Sedan/Sedan-Italic.ttf"
                fontSize={.03}
                textAlign="left"
                anchorX={"left"}
                color={'#888'}
            >{schoolName}</Text>
        </group>
    )
}

export const NameTitle: React.FC = () => {
    return (
        <>
            <Text
                position={[-4, 4, 0]}
                color={'#555'}
                font="./fonts/Sedan/Sedan-Regular.ttf"
            >Aaron Anguiano</Text>
        </>
    )
}
