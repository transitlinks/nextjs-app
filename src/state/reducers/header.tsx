import { HeaderState } from '../types/header';
import { UpdateHeaderAction } from "../actions/header";

const reduceHeader = (state: HeaderState = {
}, action: UpdateHeaderAction): HeaderState => {

  switch (action.type) {
    case 'UPDATE_HEADER':
      return { ...state, avatar: action.avatar };
    default:
      return state;
  }

};

export default reduceHeader;
