export const PERMANENT = 'permanent';
export const PER_SESSION = 'per_session';
export const TTL = 'ttl';
export const NONE = 'none';

// rn permanent is not suported and work as session
export const isPermanent = (screen) => {
  if (screen?.config?.cache_strategy === PERMANENT) return true;
  return false;
}

export const isLoadFromCache = (screen) => {
  if (!screen?.config?.cache_strategy) return false;

  let isLoadFromCache = false;
  switch (screen.config.cache_strategy) {
    case PERMANENT:
    case PER_SESSION:
      isLoadFromCache = true;
      break;
    case TTL:
      if (!screen?.insertedAt || !screen?.config?.ttl_time) break;

      const now = new Date().getTime();
      if (now < Number(screen.insertedAt) + Number(screen.config.ttl_time)) {
        isLoadFromCache = true;
      }
      break;
    case NONE:
      isLoadFromCache = false;
      break;
    default:
      break;
  }
  return isLoadFromCache;
};
