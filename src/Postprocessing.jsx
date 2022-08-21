import { ChromaticAberration, DepthOfField, EffectComposer, Noise, Scanline } from "@react-three/postprocessing";

export const Postprocessing = () => (
	<EffectComposer>
		<Scanline
			density={ 1 }
			opacity={ 0.05 }
		/>
		<ChromaticAberration offset={[ 0.002, 0.002 ]} />
		<Noise opacity={ 0.1 } />
		<DepthOfField
			focusDistance={ 0.1 }
			focalLength={ 1.5 }
			bokehScale={ 1 }
		/>
	</EffectComposer>
);
