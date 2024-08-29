import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Pencil = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="#000000"
    viewBox="0 0 256 256"
    {...props}
  >
    <Path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z" />
  </Svg>
);
export default Pencil;