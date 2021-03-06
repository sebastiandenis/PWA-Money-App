import * as UserActions from "../store/user.actions";
import * as AuthActions from "../../auth/store/auth.actions";
import { User } from "../models/user.model";

export interface State {
  user: User;
}

export const INITIAL_STORE_DATA: State = {
  user: {
    id: undefined,
    email: undefined,
    name: undefined,
    userId: undefined,
    config: {
      id: undefined,
      lang: undefined,
      currentBudgetId: undefined,
      currentSavingsId: undefined
    },
    profileMedia: {
      // tslint:disable-next-line:max-line-length
      profilePhotoUrl:
        "https://firebasestorage.googleapis.com/v0/b/pwa-money-app.appspot.com/o/profile%2Fprofile.png?alt=media&token=8d3d5d72-3c59-48b5-8ebf-f79ce87cb54d",
      // tslint:disable-next-line:max-line-length
      profileThumbnailUrl:
        "https://firebasestorage.googleapis.com/v0/b/pwa-money-app.appspot.com/o/profile%2Fprofile.png?alt=media&token=8d3d5d72-3c59-48b5-8ebf-f79ce87cb54d"
    }
  }
};

export function reducer(
  state = INITIAL_STORE_DATA,
  action: UserActions.All
): State {
  switch (action.type) {
    case AuthActions.AuthActionTypes.Logout:
      return INITIAL_STORE_DATA;
    case UserActions.UserActionTypes.LoadUserData:
      return {
        ...state
      };

    case UserActions.UserActionTypes.UserDataLoaded:
      return handleUserDataLoadedAction(state, <any>action);
    default:
      return state;
  }
}

function handleUserDataLoadedAction(
  state: State,
  action: UserActions.UserDataLoadedAction
): State {
  return {
    ...state,
    user: action.payload
  };
}
