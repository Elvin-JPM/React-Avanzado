import { AUTH_LOGIN_SUCCESS } from "../types";
import { authLoginSuccess } from "../actions";
describe("authLoginSuccess", () => {
  test('should return a "AUTH_LOGIN_SUCCESS"', () => {
    const expectedAction = {
      type: AUTH_LOGIN_SUCCESS,
    };
    const action = authLoginSuccess();
    expect(action).toEqual(expectedAction);
  });
});

describe("adsLoadedSuccess", () => {
  //it();
});
