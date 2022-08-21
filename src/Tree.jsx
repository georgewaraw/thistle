import { MeshWobbleMaterial, useTexture } from "@react-three/drei";
import { NearestFilter } from "three";
/*
	size OBJECT
		trunk OBJECT
			width NUMBER
			height NUMBER
		leaves NUMBER
	position OBJECT
		x NUMBER
		z NUMBER
*/
export const Tree = ({ size, position }) => (
	<group position={[ position.x, size.trunk.height/2, position.z ]}>
		<mesh castShadow>
			<boxGeometry args={[ size.trunk.width, size.trunk.height, size.trunk.width ]} />
			<meshPhongMaterial>
				<primitive
					attach="map"
					object={ useTexture("tree_trunk.jpg") }
					magFilter={ NearestFilter }
					minFilter={ NearestFilter }
				/>
			</meshPhongMaterial>
		</mesh>
		<mesh
			castShadow
			position-y={ size.trunk.height / 2 }
		>
			<boxGeometry args={[ size.leaves, size.leaves, size.leaves ]} />
			<MeshWobbleMaterial
				factor={ 0.25 }
				speed={ 0.5 }
			>
				<primitive
					attach="map"
					object={ useTexture("tree_leaves.jpg") }
					magFilter={ NearestFilter }
					minFilter={ NearestFilter }
				/>
			</MeshWobbleMaterial>
		</mesh>
	</group>
);
