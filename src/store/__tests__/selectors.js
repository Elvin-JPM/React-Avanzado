import { getAd } from "../selectors";

describe("getAds", () => {
  const adId = "1";
  const ads = [{ id: adId }];
  const state = { ads: { data: ads } };

  test("should return an Ad by adId", () => {
    expect(getAd(adId)(state)).toBe(ads[0]);
  });

  test("should not return any Add", () => {
    expect(getAd("2")(state)).toBeUndefined();
  });
});
