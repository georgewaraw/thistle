import { extend } from "@react-three/fiber";
import { MeshWobbleMaterial } from "@react-three/drei";
import { AdditiveBlending } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import VT323_Regular from "./VT323_Regular.json";
extend({ TextGeometry });

export const Title = () => (
	<mesh position-z={ -1 }>
		<textGeometry
			args={[
				"thistle.",
				{
					font: new FontLoader().parse( VT323_Regular ),
					size: 0.075,
					height: 0.015
				}
			]}
			onUpdate={ (e) => e.center() }
		/>
		<MeshWobbleMaterial
			factor={ 0.25 }
			blending={ AdditiveBlending }
			color={ "fuchsia" }
		/>
	</mesh>
);
