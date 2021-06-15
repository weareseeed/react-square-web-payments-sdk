// Internals
import { ActionMethodReducer, InitialStateMethods } from '../@types';

export const methodsReducer = (
  state: InitialStateMethods,
  action: ActionMethodReducer
): any => {
  switch (action.type) {
    case 'CHANGE_STATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error();
  }
};
