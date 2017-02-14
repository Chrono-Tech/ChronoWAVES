
const assetsMap = {
  'DHgwrRvVyqJsepd32YbBqUeDH4GJ1N984X8QoekjgH8J':'WCT'
};

export const getAssetName = (assetId) => {
  if (assetId == null) {
    return "WAVES";
  } else {
    return assetsMap[assetId];
  }
};

