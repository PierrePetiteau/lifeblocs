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
        <Text variant="callout">{`${index + 1}/${mintFormState.items.length} · Let's be grateful`}</Text>
        <Spacer horizontal value={4} />
        <Text variant="headline">☺️</Text>
      </Row>
      <Spacer value={8} />
      <motion.div>
        <Row>
          <Text color="gray10">1. Take a breath</Text>
          <Spacer horizontal value={12} />
          <Text variant="title1">🌬</Text>
        </Row>
        <Spacer value={4} />
        <Row>
          <Text color="gray10">2. Be in gratitude</Text>
          <Spacer horizontal value={12} />
          <Text variant="title1">✨</Text>
        </Row>
        <Spacer value={4} />
        <Row>
          <Text color="gray10">3. Look at the result</Text>
          <Spacer horizontal value={12} />
          <Text variant="title1">🔭</Text>
        </Row>
        <Spacer value={4} />
        <Row>
          <Text color="gray10">4. When it feel great, just press Mint</Text>
          <Spacer horizontal value={12} />
          <Text variant="title1">🚀</Text>
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
