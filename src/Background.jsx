import { useThree } from "@react-three/fiber";
import { useCubeTexture } from "@react-three/drei";
import { NearestFilter } from "three";

export function Background() {

	const texture = useCubeTexture(
		[
			"background_sides.jpg",
			"background_sides.jpg",
			"background_top.jpg",
			"background_bottom.jpg",
			"background_sides.jpg",
			"background_sides.jpg"
		],
		{}
	);
	texture.magFilter = NearestFilter;
	texture.minFilter = NearestFilter;

	useThree().scene.background = texture;

	return <></>;

}
