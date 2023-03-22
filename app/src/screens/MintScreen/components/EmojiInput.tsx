import { Spacer } from "@atoms/Spacer";
import { Text } from "@atoms/Text";
import { StyleSheet } from "@helpers/style";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { mintForm } from "../states/mintForm";

type Props = {
  index: number;
};

export const EmojiInput = ({ index }: Props) => {
  return (
    <>
      <Text variant="callout" style={styles.label}>
        {`${index + 1}/${mintForm.state.items.length} · Pick an emoji`}
      </Text>
      <Spacer value={4} />
      <EmojiPicker
        width={"30vw"}
        theme={Theme.DARK}
        previewConfig={{ showPreview: false }}
        onEmojiClick={(emoji) => {
          mintForm.state.items[index].value?.set(emoji.emoji);
        }}
      />
    </>
  );
};

const styles: StyleSheet = {};
