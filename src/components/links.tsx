import { Text } from "@react-three/drei"
import React from "react";

interface LinksProps {
    isVisible: boolean;
}

export const Links: React.FC<LinksProps> = ({isVisible}) => {
    return (
        <group position={[0, 0, 5]}>  
            <mesh visible={isVisible} >
                <planeGeometry args={[.08, .07]} />
                <meshPhongMaterial />
            </mesh>
            <Text
            visible={isVisible}
            position={[0, .018, 0.0]}
            font="./fonts/Sedan/Sedan-Regular.ttf"
            fontSize={.015}
            textAlign="center"
            anchorX={"center"}
            color={'#333'}
            onClick={() => window.open("https://github.com/theaaron", "_blank")}
            >
                Github
            </Text>
            <Text
            visible={isVisible}
            position={[0, 0, 0]}
            font="./fonts/Sedan/Sedan-Regular.ttf"
            fontSize={.015}
            textAlign="center"
            anchorX={"center"}
            color={'#333'}
            onClick={() => window.open("https://www.linkedin.com/in/aaron-anguiano/", "_blank")}
            >
                LinkedIn
            </Text>
            <Text
            visible={isVisible}
            position={[0, -.018, 0]}
            font="./fonts/Sedan/Sedan-Regular.ttf"
            fontSize={.015}
            textAlign="center"
            anchorX={"center"}
            color={'#333'}
            onClick={() => window.open("https://dev.to/_aaron", "_blank")}
            >
                Blog
            </Text>
        </group>
    )
}
