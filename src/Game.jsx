import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { BasicShadowMap } from "three";
import { Postprocessing } from "./Postprocessing.jsx";
import { World } from "./World.jsx";
import { Player } from "./Player.jsx";

export function Game() {

	const [ style, setStyle ] = useState({});
	const [ text, setText ] = useState( "loading..." );
	const [ playing, setPlaying ] = useState( false );

	useEffect( () => window.addEventListener(
		"pointerdown",
		function () {

			setStyle({
				backgroundColor: "black",
				backgroundImage: "url( loadscreen.jpg )",
				backgroundSize: "contain",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center"
			});
			setText( "" );
			setPlaying( true );
		},
		{ once: true }
	), [] );

	return (
		<Suspense fallback={
			<div style={ style }>{ text }</div>
		}>
			<Canvas
				dpr={ 0.2 }
				gl={{ antialias: false }}
				shadows={{ type: BasicShadowMap }}
			>
				<Postprocessing />
				<World spacing={ 25 } />
				<Player
					active={ playing }
					sensitivity={ 80 }
					lookLimit={ 30 * Math.PI / 180 }
					speed={ 8 }
					cameraShake={ 0.5 }
				/>
			</Canvas>
		</Suspense>
	);

}
