import { Row } from "@atoms/Row";
import { Spacer } from "@atoms/Spacer";
import { Text } from "@atoms/Text";
import { StyleSheet } from "@helpers/style";
import { mintFormState } from "@screens/MintScreen/states/mintFormState";
import { motion } from "framer-motion";

type Props = {
  index: number;
};

export const SubmitInput = ({ index }: Props) => {
  return (
    <>
      <Row>
        <Text variant="callout">{`${index + 1}/${mintFormState.items.length} · Let’s mint your first badge`}</Text>
        {/* <Spacer horizontal value={4} />
        <Text variant="headline">🙌</Text> */}
      </Row>
      <Spacer value={16} />
      <motion.div>
        <Row>
          <Text color="gray10">1. Create your contract</Text>
          <Spacer horizontal value={12} />
          <Text >✅</Text>
        </Row>
        <Spacer value={12} />
        <Row>
          <Text color="gray10" style={[styles.darken]}>
            2. Mint your NFT
          </Text>
          {/* <Spacer horizontal value={12} />
          <Text variant="title1">✅</Text> */}
        </Row>
      </motion.div>
    </>
  );
};

const styles: StyleSheet = {
  darken: {
    filter: "brightness(0.3)",
  },
};
