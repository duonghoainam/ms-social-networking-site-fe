import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MessageToastType } from '../components/MessageToast/typings.d';

const showToastMessage = (message: string, type: MessageToastType): void => {
  const option: ToastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    // toastId: 'toast'
  };
  switch (type) {
    case MessageToastType.ERROR:
      toast.error(message, option);
      break;
    case MessageToastType.SUCCESS:
      toast.success(message, option);
      break;
    case MessageToastType.WARNING:
      toast.warning(message, option);
      break;
    default:
      toast.error(message, option);
      break;
  }
};

export { showToastMessage };
