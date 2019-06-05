const createParam = (id: string | null, param: string = 'playerId'): string =>
  id === null ? `:${param}` : id;

const routes = {
  /** route = `/` */
  root: () => '/',
  /** route = `/player/:playerId` */
  player: (playerId: string | null) => `/player/${createParam(playerId)}`
};

export { routes };
