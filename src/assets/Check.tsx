import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect, SvgProps } from "react-native-svg";
const Check = (props: SvgProps) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    {...props}
  >
    <G clipPath="url(#clip0_9718_357)">
      <Path
        d="M20.5623 5.4019L9.48528 16.4789L3.13746 10.1311L1 12.2686L9.48528 20.7538L22.6998 7.53935L20.5623 5.4019Z"
        fill={props.fill}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_9718_357">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Check;