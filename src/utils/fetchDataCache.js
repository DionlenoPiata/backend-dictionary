const cacheDao = require("../dao/cache-dao");

exports.fetchDataCache = async (key, fetchFunction, ttlInSeconds) => {
  const cachedData = await cacheDao.getFromCache(key);
  if (cachedData) {
    return cachedData;
  }

  const freshData = await fetchFunction();

  await cacheDao.saveToCache(key, freshData, ttlInSeconds);

  return freshData;
};
