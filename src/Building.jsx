import { MeshDistortMaterial, useTexture } from "@react-three/drei";
import { NearestFilter, RepeatWrapping } from "three";
/*
	size OBJECT
		width NUMBER
		height NUMBER
	position OBJECT
		x NUMBER
		z NUMBER
*/
export const Building = ({ size, position }) => (
	<mesh
		castShadow
		receiveShadow
		position={[ position.x, size.height/2, position.z ]}
	>
		<boxGeometry args={[ size.width, size.height, size.width ]} />
		<MeshDistortMaterial
			distort={ 0.25 }
			speed={ 0.5 }
		>
			<primitive
				attach="map"
				object={ useTexture("building.jpg") }
				magFilter={ NearestFilter }
				minFilter={ NearestFilter }
				wrapS={ RepeatWrapping }
				wrapT={ RepeatWrapping }
				repeat={[ 1, size.height/20 ]}
			/>
		</MeshDistortMaterial>
	</mesh>
);
