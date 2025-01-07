interface UserData {
  token: string;
  refreshToken: string;
  id: string;
  name: string;
  professor: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  professor: boolean;
}

interface LoginSuccessAction {
  type: "LOGIN_SUCCESS";
  payload: UserData;
}

interface SetUserDataAction {
  type: "SET_USER_DATA";
  payload: UserData;
}

interface LogoutAction {
  type: "LOGOUT";
}

type AuthActionTypes = LoginSuccessAction | SetUserDataAction | LogoutAction;

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  professor: false,
};

const rootReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        professor: action.payload.professor,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        professor: action.payload.professor,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default rootReducer;
