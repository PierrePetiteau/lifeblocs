import { TextInput } from "@atoms/TextInput/TextInput";
import { StyleSheet } from "@helpers/style";
import { mintFormState } from "@screens/MintScreen/states/mintFormState";

type Props = {
  index: number;
};

export const MessageInput = ({ index }: Props) => {
  return (
    <TextInput
      label={`${index + 1}/${mintFormState.items.length} · Write your message`}
      style={[styles.textInput]}
      placeholder={"Write my first book"}
      onChange={(value: string) => {
        mintFormState.items[index].value?.set(value);
      }}
      value$={mintFormState.items[index].value}
      maxLength={82}
    />
  );
};

const styles: StyleSheet = {
  textInput: {
    border: "3px solid #FFFFFF",
    backgroundImage: "none",
    backgroundColor: "transparent",
    boxShadow: "none",
    borderRadius: "8px",
    padding: "10px",
  },
};
