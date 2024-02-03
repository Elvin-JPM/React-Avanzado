export const getIsLogged = (state) => state.auth;

export const getAds = (state) => state.ads.data;

export const areAdsLoaded = (state) => state.ads.areAdsLoaded;

export const getAd = (adId) => (state) =>
  getAds(state).find((ad) => ad.id === adId);

export const getUI = (state) => state.ui;
