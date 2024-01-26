import DrawerForm from './DrawerForm';
import _EditForm from './EditForm';
import ModalForm from './ModalForm';

type TEditForm = typeof _EditForm & {
  Drawer: typeof DrawerForm;
  Modal: typeof ModalForm;
};

const EditForm = _EditForm as TEditForm;
EditForm.Modal = ModalForm;
EditForm.Drawer = DrawerForm;

export default EditForm;
