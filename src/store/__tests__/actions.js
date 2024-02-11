import { ADS_LOADED_SUCCESS, AUTH_LOGIN_SUCCESS } from "../types";
import { adsLoadedSuccess, authLoginSuccess } from "../actions";
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
