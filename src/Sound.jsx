import { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { AudioListener, AudioLoader } from "three";
/*
	name STRING
	volume NUMBER
	loop BOOLEAN
	player REACT-REF
		THREE-OBJECT3D
*/
export function Sound({ name, volume, loop, player }) {

	const audio = useRef();
	const [ listener ] = useState( new AudioListener() );
	const buffer = useLoader( AudioLoader, name );

	useEffect( function () {

		const currentPlayer = player.current;
		const currentAudio = audio.current;

		currentPlayer.add( listener );

		currentAudio.setDistanceModel( "exponential" );
		currentAudio.setRefDistance( 10 );
		currentAudio.setRolloffFactor( 2 );
		currentAudio.setBuffer( buffer );
		currentAudio.setVolume( volume );
		currentAudio.setLoop( loop );
		currentAudio.play();

		return function () {

			currentPlayer.remove( listener );
			currentAudio.stop();
		};
	}, [player, listener, buffer, volume, loop] );

	return (
		<positionalAudio
			ref={ audio }
			args={[ listener ]}
		/>
	);

}
