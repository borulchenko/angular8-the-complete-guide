import { User } from '../user.model';

export interface State {
  user: User;
}

const initState: State = {
  user: null
};

export function authReducer(state = initState, action) {
  return state;
}
