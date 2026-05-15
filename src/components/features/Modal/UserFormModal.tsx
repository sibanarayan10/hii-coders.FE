import { Modal } from 'antd';
import { SignUp } from '../Form/SignUp';

export const UserFormModal = (props: { onClose: () => void }) => {
  return (
    <Modal open onCancel={props.onClose} style={{ maxHeight: 600, overflow: 'auto' }}>
      <SignUp />
    </Modal>
  );
};
