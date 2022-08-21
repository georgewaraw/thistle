import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useFBX } from "@react-three/drei";
import { AnimationMixer, MeshBasicMaterial, MultiplyBlending, NearestFilter, Vector3 } from "three";
import { Sound } from "./Sound.jsx";
/*
	distance ARRAY
		NUMBER NUMBER
	speed NUMBER
	hitPoints NUMBER
	gettingShot BOOLEAN
	player REACT-REF
		THREE-OBJECT3D
*/
export function Ghost({ distance, speed, hitPoints, gettingShot, player }) {

	const fbx = useFBX( "monster.fbx" );
	const [ mixer ] = useState( new AnimationMixer(fbx) );
	const [ target ] = useState( new Vector3() );
	const [ hit, setHit ] = useState( false );
	const [ health, setHealth ] = useState( hitPoints );
	const random = ( from, to ) => Math.floor( Math.random() * (to - from) + from );

	useEffect( function () {

		const [ mesh ] = fbx.children;
		mesh.castShadow = true;
		mesh.receiveShadow = true;

		mesh.material = mesh.material.map( function (e) {

			const texture = e.map;
			texture.magFilter = NearestFilter;
			texture.minFilter = NearestFilter;

			e.dispose();

			return new MeshBasicMaterial({
				blending: MultiplyBlending,
				transparent: true,
				opacity: 100,
				color: "fuchsia",
				map: texture
			});
		} );

		mixer.clipAction( fbx.animations[0] ).play();
	}, [fbx, mixer] );

	useFrame( function (_, delta) {

		target.x = player.current.position.x;
		target.z = player.current.position.z;
		fbx.lookAt( target );

		if( fbx.position.x < target.x ) fbx.position.x += speed * delta;
		else if( fbx.position.x > target.x ) fbx.position.x -= speed * delta;
		if( fbx.position.z < target.z ) fbx.position.z += speed * delta;
		else if( fbx.position.z > target.z ) fbx.position.z -= speed * delta;

		if(
			Math.abs( fbx.position.x - target.x ) < 2 &&
			Math.abs( fbx.position.z - target.z ) < 2
		) window.location.reload();

		mixer.update( delta );
	} );

	return (
		<primitive
			object={ fbx }
			scale={[ -5, 15, 15 ]}
			position-z={ -75 }
			onPointerDown={ function () {

				if( !gettingShot ) {

					setTimeout( () => setHit(true), 100 );
					setTimeout( () => setHit(false), 1100 );
					setHealth( health - 1 );

					if( health === 1 ) {

						fbx.position.x += ( (random(0, 2)) ? 1 : -1 ) * random( ...distance );
						fbx.position.z += ( (random(0, 2)) ? 1 : -1 ) * random( ...distance );
						setHealth( hitPoints );
					}
				}
			} }
		>
			<Sound
				name={ "music.mp3" }
				volume={ 0.8 }
				loop={ true }
				player={ player }
			/>
			<Sound
				name={ "growl.mp3" }
				volume={ 1 }
				loop={ true }
				player={ player }
			/>
			{ (hit) && (<Sound
				name={ "grunt.mp3" }
				volume={ 1 }
				loop={ false }
				player={ player }
			/>) }
		</primitive>
	);

}
