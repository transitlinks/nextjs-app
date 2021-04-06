import { Action, DispatchAction } from './';

export interface UpdateHeaderAction extends Action {
  avatar: string;
}

export const updateHeader = ({ avatar }: { avatar: string }) => (dispatch: DispatchAction<UpdateHeaderAction>) => {
  return dispatch({ type: 'UPDATE_HEADER', avatar });
};
