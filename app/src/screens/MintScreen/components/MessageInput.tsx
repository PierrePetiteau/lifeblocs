import { TextInput } from "@atoms/TextInput/TextInput";
import { StyleSheet } from "@helpers/style";
import { mintForm } from "../states/mintForm";

type Props = {
  index: number;
};

export const MessageInput = ({ index }: Props) => {
  return (
    <TextInput
      label={`${index + 1}/${mintForm.state.items.length} · Write your message`}
      style={[styles.textInput]}
      placeholder={"Write my first book"}
      onChange={(value: string) => {
        mintForm.state.items[index].value?.set(value);
      }}
      value$={mintForm.state.items[index].value}
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
