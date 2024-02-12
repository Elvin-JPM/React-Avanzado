import { ADS_LOADED_SUCCESS, AUTH_LOGIN_SUCCESS } from "../types";
import {
  adsLoadedSuccess,
  authLogin,
  authLoginFailure,
  authLoginRequest,
  authLoginSuccess,
} from "../actions";
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
  it('should return a "ADS_LOADED_SUCCESS" action with payload', () => {
    const ads = "ads";
    const expectedAction = {
      type: ADS_LOADED_SUCCESS,
      payload: ads,
    };
    const action = adsLoadedSuccess(ads);
    expect(action).toEqual(expectedAction);
  });
});

describe("authLogin", () => {
  const requestBody = "credentials";
  const action = authLogin(requestBody, true);
  const redirectURL = "redirectURL";
  const dispatch = jest.fn();
  const api = { auth: {} };
  const router = {
    state: { location: { state: { from: { pathname: redirectURL } } } },
    navigate: jest.fn(),
  };

  test("when login resolves should follow the login flow", async () => {
    api.login = jest.fn().mockResolvedValue("token");
    await action(dispatch, undefined, { api, router });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
    expect(api.login).toHaveBeenCalledWith(requestBody, true);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSuccess());
    expect(router.navigate).toHaveBeenCalledWith(redirectURL);
  });

  test("when login rejects should follow the error flow", async () => {
    try {
      const error = new Error("unauthorized");
      api.login = jest.fn().mockRejectedValue(error);
      await action(dispatch, undefined, { api, router });
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
      expect(api.login).toHaveBeenCalledWith(requestBody, true);
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFailure(error));
      expect(router.navigate).not.toHaveBeenCalledWith(redirectURL);
    } catch (error) {
      expect(error.message).toBe("unauthorized");
    }
  });
});
