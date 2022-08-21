import { useTexture } from "@react-three/drei";
import { NearestFilter, RepeatWrapping } from "three";
/*
	size NUMBER
*/
export const Ground = ({ size }) => (
	<mesh
		receiveShadow
		rotation-x={ 270 * Math.PI / 180 }
	>
		<planeGeometry args={[ size, size ]} />
		<meshPhongMaterial>
			<primitive
				attach="map"
				object={ useTexture("ground.jpg") }
				magFilter={ NearestFilter }
				minFilter={ NearestFilter }
				wrapS={ RepeatWrapping }
				wrapT={ RepeatWrapping }
				repeat={ size / 10 }
			/>
		</meshPhongMaterial>
	</mesh>
);
