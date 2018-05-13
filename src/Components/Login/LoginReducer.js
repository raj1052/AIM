import { asyncActionNames } from '../Common/GlobalActionCreators';
const actionNames = asyncActionNames('LOGIN');

const INITIAL_STATE = { errors: null, authenticated: false, admin_privileges: false, profile: null, progress: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionNames.success:
      return { ...state, errors: null, authenticated: true, data: action.payload, progress: false };
    case actionNames.failure:
      return { ...state, errors: action.errors, progress: false };
    case actionNames.unauth:
      return { ...state, errors: null, authenticated: false, data: null, progress: false }
    case actionNames.progress:
      return { ...state, progress: true }
    case actionNames.privileges:
      return { ...state, admin_privileges: true };
    default:
      return state;
  }
};
