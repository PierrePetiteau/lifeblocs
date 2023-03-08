import { motion, SVGMotionProps } from "framer-motion";

type Props = Omit<SVGMotionProps<SVGSVGElement>, "fill"> & {
  variant?: "disabled" | "darken";
};

export const HexagonSVG = ({ children, variant, ...props }: Props) => {
  const _borderColor = () => {
    switch (variant) {
      case "disabled": {
        return "#36383B";
      }
      case "darken": {
        return "#40444A";
      }
      default: {
        return "#FFFFFF";
      }
    }
  };

  const _backgroundColor = () => {
    switch (variant) {
      case "disabled": {
        return "none";
      }
      case "darken": {
        return "url(#paint2_linear_317_1158)";
      }
      default: {
        return "url(#paint1_linear_317_1158)";
      }
    }
  };

  return (
    <>
      <motion.svg width="70" height="80" viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <motion.path
          d="M35.9625 1.61316C35.3403 1.25388 34.5737 1.25388 33.9515 1.61316L2.21653 19.9374C1.59444 20.2966 1.2112 20.9604 1.21117 21.6788L1.20935 58.3242C1.20932 59.0427 1.59263 59.7066 2.21489 60.0658L33.9516 78.3869C34.5738 78.7461 35.3402 78.7461 35.9624 78.3869L67.6991 60.0658C68.3214 59.7066 68.7047 59.0427 68.7046 58.3242L68.7028 21.6788C68.7028 20.9604 68.3196 20.2966 67.6975 19.9374L35.9625 1.61316Z"
          fill={_backgroundColor()}
        />
        <motion.path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.9971 2.95686L3.4258 20.6092C2.80371 20.9684 2.42047 21.6322 2.42044 22.3506L2.41868 57.6523C2.41865 58.3708 2.80197 59.0347 3.42422 59.3939L33.9973 77.0432C34.6194 77.4024 35.3859 77.4024 36.008 77.0432L66.581 59.3939C67.2033 59.0347 67.5866 58.3708 67.5866 57.6523L67.5848 22.3506C67.5848 21.6322 67.2015 20.9684 66.5794 20.6092L36.0082 2.95686C35.3859 2.59758 34.6193 2.59758 33.9971 2.95686ZM4.5007 21.281L33.9083 4.30057C34.5306 3.94129 35.2972 3.94129 35.9194 4.30057L65.327 21.281C65.9491 21.6402 66.3324 22.304 66.3324 23.0224L66.3341 56.9804C66.3341 57.6989 65.9508 58.3628 65.3286 58.722L35.9192 75.6995C35.2971 76.0587 34.5306 76.0587 33.9085 75.6995L4.49918 58.722C3.87693 58.3628 3.49361 57.6989 3.49365 56.9804L3.49533 23.0224C3.49537 22.304 3.8786 21.6402 4.5007 21.281Z"
          fill={_borderColor()}
        />
        <motion.path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.9058 0.269459L1.00725 19.2656C0.385154 19.6249 0.00192004 20.2886 0.00188441 21.007L2.48509e-09 58.9961C-3.56376e-05 59.7146 0.383282 60.3785 1.00554 60.7377L33.906 79.7306C34.5281 80.0898 35.2946 80.0898 35.9167 79.7306L68.8172 60.7377C69.4394 60.3785 69.8228 59.7146 69.8227 58.9961L69.8208 21.007C69.8208 20.2886 69.4376 19.6249 68.8155 19.2656L35.9169 0.269459C35.2947 -0.0898199 34.528 -0.0898196 33.9058 0.269459ZM2.21653 19.9374L33.9515 1.61316C34.5737 1.25388 35.3403 1.25388 35.9625 1.61316L67.6975 19.9374C68.3196 20.2966 68.7028 20.9604 68.7028 21.6788L68.7046 58.3242C68.7047 59.0427 68.3214 59.7066 67.6991 60.0658L35.9624 78.3869C35.3402 78.7461 34.5738 78.7461 33.9516 78.3869L2.21489 60.0658C1.59263 59.7066 1.20932 59.0427 1.20935 58.3242L1.21117 21.6788C1.2112 20.9604 1.59444 20.2966 2.21653 19.9374Z"
          fill={_borderColor()}
        />
        <defs>
          <linearGradient
            id="paint1_linear_317_1158"
            x1="14.3776"
            y1="15.2758"
            x2="51.2622"
            y2="66.0006"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9D1CB4" />
            <stop offset="0.340045" stopColor="#E321A6" />
            <stop offset="0.794293" stopColor="#FF5B98" />
            <stop offset="0.997697" stopColor="#FF7B93" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_317_1158"
            x1="14.3776"
            y1="15.2758"
            x2="51.2622"
            y2="66.0006"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#270734" />
            <stop offset="0.340045" stopColor="#390930" />
            <stop offset="0.794293" stopColor="#40182C" />
            <stop offset="0.997697" stopColor="#40212B" />
          </linearGradient>
        </defs>
      </motion.svg>
      <motion.div style={{ width: props.width, height: props.height, position: "absolute" }}>{children}</motion.div>
    </>
  );
};
