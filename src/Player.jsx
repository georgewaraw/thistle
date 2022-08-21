import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { CameraShake, PerspectiveCamera } from "@react-three/drei";
import { Euler, Vector3 } from "three";
import { Title } from "./Title.jsx";
import { Gun } from "./Gun.jsx";
import { Ghost } from "./Ghost.jsx";
import { Sound } from "./Sound.jsx";
/*
	active BOOLEAN
	sensitivity NUMBER
	lookLimit NUMBER
	speed NUMBER
	cameraShake NUMBER
*/
export function Player({ active, sensitivity, lookLimit, speed, cameraShake }) {

	const player = useRef();
	const shake = useRef();
	const [ then, setThen ] = useState( 0 );
	const [ touchStart, setTouchStart ] = useState({ x: 0, y: 0 });
	const [ shooting, setShooting ] = useState( false );
	const [ reloading, setReloading ] = useState( false );
	const [ moving, setMoving ] = useState( null );
	const [ volume, setVolume ] = useState( 0 );
	const [ looking, setLooking ] = useState({ x: 0, y: 0 });
	const [ euler ] = useState( new Euler(0, 0, 0, "YXZ") );
	const [ vector ] = useState( new Vector3() );
	const [ decay, setDecay ] = useState( true );


	useEffect( function () {

		function touchStartCallback( e ) {

			setThen( Date.now() );
			setTouchStart({
				x: e.changedTouches[ 0 ].clientX / window.innerWidth * 2 - 1,
				y: e.changedTouches[ 0 ].clientY / window.innerHeight * -2 + 1
			});
		}
		window.addEventListener( "touchstart", touchStartCallback );

		function touchEndCallback( e ) {

			if(
				active &&
				Date.now() - then < 200
			) {

				const touchEnd = {
					x: e.changedTouches[ 0 ].clientX / window.innerWidth * 2 - 1,
					y: e.changedTouches[ 0 ].clientY / window.innerHeight * -2 + 1
				};
				let direction = null;

				if(
					Math.abs( touchStart.x - touchEnd.x ) < 0.1 &&
					Math.abs( touchStart.y - touchEnd.y ) < 0.1
				) {

					if( !shooting ) {

						setShooting( true );
						if( Math.random() > 0.5 ) setReloading( true );

						setTimeout( function () {

							setShooting( false );
							setReloading( false );
						}, 1000 );
					}
				}
				else {

					if(
						Math.abs( touchStart.x - touchEnd.x ) < 0.2 &&
						Math.abs( touchStart.y - touchEnd.y ) > 0.1
					) direction = ( touchStart.y - touchEnd.y < 0 ) ? "FORWARD" : "BACK";
					else if(
						Math.abs( touchStart.x - touchEnd.x ) > 0.1 &&
						Math.abs( touchStart.y - touchEnd.y ) < 0.2
					) direction = ( touchStart.x - touchEnd.x > 0 ) ? "LEFT" : "RIGHT";

					if( moving === direction ) {

						setMoving( null );
						setVolume( 0 );
					}
					else {

						setMoving( direction );
						setVolume( 1 );
					}
				}
			}
		}
		window.addEventListener( "touchend", touchEndCallback );

		return function () {

			window.removeEventListener( "touchstart", touchStartCallback );
			window.removeEventListener( "touchend", touchEndCallback );
		};
	}, [active, then, touchStart, shooting, moving] );


	useEffect( function () {

		function callback( e ) {

			if(
				active &&
				Date.now() - then > 200
			) {

				const x = (e.clientX / window.innerWidth * 2 - 1) / sensitivity;
				const y = (e.clientY / window.innerHeight * 2 - 1) / (sensitivity * 2);

				setLooking({
					x: ( Math.abs(x) > 0.0025 ) ? x : 0,
					y: ( Math.abs(y) > 0.00125 ) ? y : 0
				});
			}
		}
		window.addEventListener( "pointermove", callback );

		return () => window.removeEventListener( "pointermove", callback );
	}, [active, then, sensitivity] );


	useEffect( function () {

		function callback() {

			if( active && !touchStart.x && !shooting ) {

				setShooting( true );
				if( Math.random() > 0.5 ) setReloading( true );

				setTimeout( function () {

					setShooting( false );
					setReloading( false );
				}, 1000 );
			}
		}
		window.addEventListener( "pointerdown", callback );

		return () => window.removeEventListener( "pointerdown", callback );
	}, [active, touchStart, shooting] );


	useEffect( function () {

		function callback( e ) {

			if( active ) {

				let direction = null;

				switch( e.code ) {

					case "ArrowUp": case "KeyW":

						e.preventDefault();
						direction = "FORWARD";
						break;
					case "ArrowDown": case "KeyS":

						e.preventDefault();
						direction = "BACK";
						break;
					case "ArrowLeft": case "KeyA":

						e.preventDefault();
						direction = "LEFT";
						break;
					case "ArrowRight": case "KeyD":

						e.preventDefault();
						direction = "RIGHT";
						break;
				}

				if( moving === direction ) {

					setMoving( null );
					setVolume( 0 );
				}
				else {

					setMoving( direction );
					setVolume( 1 );
				}
			}
		}
		window.addEventListener( "keyup", callback );

		return () => window.removeEventListener( "keyup", callback );
	}, [active, moving] );


	useFrame( function () {

		euler.setFromQuaternion( player.current.quaternion );

		euler.y -= looking.x;
		euler.x = Math.max(
			-lookLimit,
			Math.min(
				lookLimit,
				euler.x -= looking.y
			)
		);

		player.current.quaternion.setFromEuler( euler );
	} );


	useFrame( function (_, delta) {

		vector.setFromMatrixColumn( player.current.matrix, 0 );

		switch( moving ) {

			case "FORWARD":

				player.current.position.addScaledVector(
					vector.crossVectors( vector, player.current.up ),
					-speed * delta
				);
				break;
			case "BACK":

				player.current.position.addScaledVector(
					vector.crossVectors( vector, player.current.up ),
					speed * delta
				);
				break;
			case "LEFT":

				player.current.position.addScaledVector(
					vector,
					-speed * delta
				);
				break;
			case "RIGHT":

				player.current.position.addScaledVector(
					vector,
					speed * delta
				);
				break;
		}
	} );


	useFrame( function () {

		if( moving ) {

			shake.current.setIntensity( cameraShake );
			setDecay( false );
		}
		setDecay( true );
	} );

	return (
		<>
			<group
				ref={ player }
				position-y={ 9 }
			>
				<PerspectiveCamera
					makeDefault
					far={ 250 }
				/>
				<CameraShake
					ref={ shake }
					maxPitch={ cameraShake / 10 }
					maxRoll={ cameraShake / 10 }
					maxYaw={ cameraShake / 10 }
					pitchFrequency={ cameraShake }
					rollFrequency={ cameraShake }
					yawFrequency={ cameraShake }
					decay={ decay }
				/>
				<pointLight
					args={[ "fuchsia", 2.5, 50, 2 ]}
					castShadow
					position-y={ 7 }
				/>
				{ (!active) && <Title /> }
				{ (active) && (<Gun
					shooting={ shooting }
					reloading={ reloading }
					player={ player }
				/>) }
				{ (active) && (<>
					<Sound
						name={ "noise.mp3" }
						volume={ 0.1 }
						loop={ true }
						player={ player }
					/>
					<Sound
						name={ "footstep.mp3" }
						volume={ volume }
						loop={ true }
						player={ player }
					/>
				</>) }
			</group>
			{ (active) && (<Ghost
				distance={[ 75, 100 ]}
				speed={ speed }
				hitPoints={ 3 }
				gettingShot={ shooting }
				player={ player }
			/>) }
		</>
	);

}
