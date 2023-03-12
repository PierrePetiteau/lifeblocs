import { modalsState, ModalType } from "./modalsState";

const showModal = async (modal: ModalType) => {
  modalsState.queu.push(modal);
};

export const isModalAlreadyExist = (id: string) => {
  return modalsState.queu
    .peek()
    .map((v) => v?.id)
    .includes(id);
};

export const showDefaultModal = ({
  id = "none",
  title = "Modal title",
  description = "Modal description",
  buttons = [],
}: Partial<ModalType>) => {
  showModal({ id, title, description, buttons });
};
