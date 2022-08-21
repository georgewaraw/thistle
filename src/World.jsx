import { Children, useMemo } from "react";
import { Background } from "./Background.jsx";
import { Ground } from "./Ground.jsx";
import { Building } from "./Building.jsx";
import { Tree } from "./Tree.jsx";
/*
	spacing NUMBER
*/
export function World({ spacing }) {

	const layout = useMemo( function () {

		const layout = `
-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-
T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T
-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-
T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T
-T-T-B-B-B-B-B-B-B-B-------B-B-B-B-B-B-B-B-T-T-
T-T-B-B-B-B-B-B-B-B-B-----B-B-B-B-B-B-B-B-B-T-T
-T-T-B-B-B-B-B-B-B-B-B---B-B-B-B-B-B-B-B-B-T-T-
T-T-B-BTTT-BTTTTTTTTBBTTTBBTTTTTTTTB-TTTB-B-T-T
-T-T-B-TTTB-BTTTTT T-BTTTB-TTTTTTTB-BTTT-B-T-T-
T-T-B-BTTTTB-B-T-B-TBBTTTBBT-B-T-B-BTTTTB-B-T-T
-T-T-B-TBTBTT-B--B-T-T---T-T-B--B-TTBTBT-B-T-T-
T-T-B-BT-T-B---B-B-TBT---TBT-B-B---B-T-TB-B-T-T
-T-T-B-TBTBTBTB-BTTT-T-T-T-TTTB-BTBTBTBT-B-T-T-
T-T-B-BT-T-TTTTB----BT---TB----BTTTT-T-TB-B-T-T
-T-T-B-TB-B-B--BB-BT-T-T-T-TB-BB--B-B-BT-B-T-T-
T-T-B-BTBTBTBTB-T-B-BT---TB-B-T-BTBTBTBTB-B-T-T
-T-T-B-TTTB-BTTB-B-B-T---T-B-B-BTTB-BTTT-B-T-T-
T-T-B-B-BB--B-TTT-TTB-TTT-BTT-TTT-B--BB-B-B-T-T
-T-T-B-TTTB-TBT-BT-T-BTTTB-T-TB-TBT-BTTT-B-T-T-
T-T-B-B-TTB--B-B-B-B-T---T-B-B-B-B--BTT-B-B-T-T
-T-T-B-TB-B-B-B-B-B-BB---BB-B-B-B-B-B-BT-B-T-T-
T-T---BBBB-B-B--B-B-BB-B-BB-B-B--B-B-BBBB---T-T
-T-T---TTTTTTTTTTTTTTTB-BTTTTTTTTTTTTTTT---T-T-
T-T----TTTT-TT--TT---T---T---TT--TT-TTTT----T-T
-T-T---TTTTTTTTTTTTTTTB-BTTTTTTTTTTTTTTT---T-T-
T-T---BBBB-B-B--B-B-BB-B-BB-B-B--B-B-BBBB---T-T
-T-T-B-TB-B-B-B-B-B-BB---BB-B-B-B-B-B-BT-B-T-T-
T-T-B-B-TTB--B-B-B-B-T---T-B-B-B-B--BTT-B-B-T-T
-T-T-B-TTTB-TBT-BT-T-BTTTB-T-TB-TBT-BTTT-B-T-T-
T-T-B-B-BB--B-TTT-TTB-TTT-BTT-TTT-B--BB-B-B-T-T
-T-T-B-TTTB-BTTB-B-B-T---T-B-B-BTTB-BTTT-B-T-T-
T-T-B-BTBTBTBTB-T-B-BT---TB-B-T-BTBTBTBTB-B-T-T
-T-T-B-TB-B-B--BB-BT-T-T-T-TB-BB--B-B-BT-B-T-T-
T-T-B-BT-T-TTTTB----BT---TB----BTTTT-T-TB-B-T-T
-T-T-B-TBTBTBTB-BTTT-T-T-T-TTTB-BTBTBTBT-B-T-T-
T-T-B-BT-T-B---B-B-TBT---TBT-B-B---B-T-TB-B-T-T
-T-T-B-TBTBTT-B--B-T-T---T-T-B--B-TTBTBT-B-T-T-
T-T-B-BTTTTB-B-T-B-TBBTTTBBT-B-T-B-BTTTTB-B-T-T
-T-T-B-TTTB-BTTTTTTT-BTTTB-TTTTTTTB-BTTT-B-T-T-
T-T-B-BTTT-BTTTTTTTTBBTTTBBTTTTTTTTB-TTTB-B-T-T
-T-T-B-B-B-B-B-B-B-B-B---B-B-B-B-B-B-B-B-B-T-T-
T-T-B-B-B-B-B-B-B-B-B-----B-B-B-B-B-B-B-B-B-T-T
-T-T-B-B-B-B-B-B-B-B-------B-B-B-B-B-B-B-B-T-T-
T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T
-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-
T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T
-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-T-
		`;

		return layout.split( "\n" )
			.slice( 1, layout.length-1 );
	}, [] );
	const random = ( from, to ) => Math.floor( Math.random() * (to - from) + from );

	return (
		<>
			<fogExp2
				attach="fog"
				args={[ "black", 0.025 ]}
			/>
			<ambientLight args={[ "fuchsia", 0.025 ]} />
			<Background />
			<Ground size={ 10000 } />
			{ Children.toArray(
				layout.map( (eR, iR) =>
					[ ...eR ].map( (eC, iC) => {

						const position = {
							x: iC * spacing - eR.length * spacing / 2 + spacing / 2,
							z: iR * spacing - layout.length * spacing / 2 + spacing / 2
						};

						if( eC === "B" ) return ( <Building
							size={{
								width: random( 19, 20 ),
								height: random( 40, 90 )
							}}
							position={ position }
						/> );
						else if( eC === "T" ) return ( <Tree
							size={{
								trunk: {
									width: random( 4, 8 ) / 10,
									height: random( 16, 20 )
								},
								leaves: random( 8, 10 )
							}}
							position={ position }
						/> );
					} )
				)
			) }
		</>
	);

}
