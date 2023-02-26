import { Colors } from "@states/themeState/colors";
import { themeState } from "@states/themeState/themeState";
import { motion, SVGMotionProps } from "framer-motion";

type Props = Omit<SVGMotionProps<SVGSVGElement>, "fill"> & {
  borderColor?: keyof Colors;
  showBackground?: boolean;
};

export const AppLogoSVG = ({ children, borderColor, showBackground = true, ...props }: Props) => {
  const _borderColor = borderColor ? themeState[borderColor].get().toString("rgb") : undefined;

  return (
    <>
      <motion.svg width="70" height="80" viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <motion.path
          d="M33.6651 4.3879L5.38354 20.7182C4.48809 21.2352 3.93646 22.1907 3.93641 23.2247L3.93479 55.8824C3.93474 56.9166 4.48649 57.8722 5.38217 58.3893L33.6654 74.7168C34.5609 75.2337 35.6641 75.2337 36.5596 74.7168L64.8429 58.3893C65.7385 57.8722 66.2903 56.9166 66.2902 55.8824L66.2886 23.2247C66.2886 22.1907 65.7369 21.2352 64.8415 20.7182L36.5599 4.38791C35.6643 3.87075 34.5608 3.87075 33.6651 4.3879Z"
          fill={showBackground ? "url(#paint0_linear_233_414)" : "none"}
        />
        <motion.path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.6627 0.387863L1.91709 18.7183C1.02164 19.2353 0.470009 20.1908 0.469958 21.2248L0.46814 57.8825C0.468088 58.9167 1.01984 59.8724 1.91552 60.3894L33.6629 78.7167C34.5584 79.2337 35.6617 79.2337 36.5572 78.7167L68.3046 60.3894C69.2003 59.8724 69.7521 58.9167 69.752 57.8825L69.7502 21.2248C69.7501 20.1908 69.1985 19.2353 68.303 18.7183L36.5574 0.387863C35.6618 -0.129287 34.5583 -0.129288 33.6627 0.387863ZM5.38354 20.7182L33.6651 4.3879C34.5608 3.87075 35.6643 3.87075 36.5599 4.38791L64.8415 20.7182C65.7369 21.2352 66.2886 22.1907 66.2886 23.2247L66.2902 55.8824C66.2903 56.9166 65.7385 57.8722 64.8429 58.3893L36.5596 74.7168C35.6641 75.2337 34.5609 75.2337 33.6654 74.7168L5.38217 58.3893C4.48649 57.8722 3.93474 56.9166 3.93479 55.8824L3.93641 23.2247C3.93646 22.1907 4.48809 21.2352 5.38354 20.7182Z"
          fill={_borderColor ?? "white"}
        />
        <defs>
          <linearGradient
            id="paint0_linear_233_414"
            x1="14.7347"
            y1="15.0187"
            x2="51.3347"
            y2="65.352"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#AF00CE" />
            <stop offset="0.40625" stopColor="#DE0399" />
            <stop offset="0.794293" stopColor="#FF5B98" />
            <stop offset="0.997697" stopColor="#FF7B93" />
          </linearGradient>
        </defs>
      </motion.svg>
      <motion.div
        style={{
          width: props.width,
          height: props.height,
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
