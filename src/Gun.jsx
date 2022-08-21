import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { MeshWobbleMaterial } from "@react-three/drei";
import { MultiplyBlending } from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { Sound } from "./Sound.jsx";
/*
	shooting BOOLEAN
	reloading BOOLEAN
	player REACT-REF
		THREE-OBJECT3D
*/
export function Gun({ shooting, reloading, player }) {

	const mesh = useRef();

	useEffect( function () {

		function callback( e ) {

			mesh.current.rotation.x = e.clientY / window.innerHeight * -2 + 1;
			mesh.current.rotation.y = e.clientX / window.innerWidth * -2 + 1;
		}
		window.addEventListener( "pointermove", callback );

		return () => window.removeEventListener( "pointermove", callback );
	}, [] );

	return (
		<mesh
			ref={ mesh }
			castShadow
			receiveShadow
			scale={ 5 }
			position={[ 0, -0.75, -4 ]}
			geometry={ useLoader(STLLoader, "gun.stl") }
		>
			<MeshWobbleMaterial
				factor={ 0.1 }
				blending={ MultiplyBlending }
				transparent={ true }
				opacity={ -1000 }
				color={ "fuchsia" }
			/>
			{ (shooting) && (<Sound
				name={ "gunshot.mp3" }
				volume={ 1 }
				loop={ false }
				player={ player }
			/>) }
			{ (reloading) && (<Sound
				name={ "reload.mp3" }
				volume={ 1 }
				loop={ false }
				player={ player }
			/>) }
		</mesh>
	);

}
