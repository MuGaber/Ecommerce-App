import { userActionTypes } from './user.types';

export const googleSignInStart = () => ({
  type: userActionTypes.GOOGLE_SIGNIN_START
});

export const emailSignInStart = emailAndPassword => ({
  type: userActionTypes.EMAIL_SIGNIN_START,
  payload: emailAndPassword
});

export const signInSuccess = user => ({
  type: userActionTypes.SIGNIN_SUCCESS,
  payload: user
});

export const signInFailure = errorMessage => ({
  type: userActionTypes.SIGNIN_FAILURE,
  payload: errorMessage
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION
});
