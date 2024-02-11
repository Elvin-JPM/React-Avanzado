import { adCreateRequest, authLoginSuccess, authLogout } from "../actions";
import { defaultState, auth } from "../reducers.js";

describe("auth", () => {
  test('should manage "AUTH_LOGIN_SUCCESS" action', () => {
    const state = defaultState.auth;
    const action = authLoginSuccess();
    expect(auth(state, action)).toBe(true);
  });

  test('should manage "AUTH_LOGOUT" action', () => {
    const state = defaultState.auth;
    const action = authLogout();
    expect(auth(state, action)).toBe(false);
  });

  test('should manage "ANY" action', () => {
    const state = defaultState.auth;
    const action = adCreateRequest();
    expect(auth(state, action)).toBe(state);
  });

  test('should manage "ANY" action when state is not defined', () => {
    const state = undefined;
    const action = adCreateRequest();
    expect(auth(state, action)).toBe(defaultState.auth);
  });
});
