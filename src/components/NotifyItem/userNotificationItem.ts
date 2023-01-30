
interface UseNotifyItemReturn {
  onSelectAction: any
}

export const UseNotifyItem = (): UseNotifyItemReturn => {
  // const currentUser = useSelector((state: AppState) => state.auth.currentUser);
  const onSelectAction = (eventKey: any, event: Object): void => {
    console.log(eventKey);
    if (eventKey === 1) {
      console.log('action')
    }
  }
  return {
    onSelectAction
  };
};
