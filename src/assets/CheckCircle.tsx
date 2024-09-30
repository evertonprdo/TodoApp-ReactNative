import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CheckCircle = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="#000000"
    viewBox="0 0 256 256"
    {...props}
  >
    <Path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
  </Svg>
);
export default CheckCircle;