import { axios } from 'vendor';
import { routes } from 'shared';
import { store, settingsActions } from 'store';
import { History } from 'models';

class AppService {
  getTeams() {
    return axios({
      method: 'GET',
      url: routes.TEAMS
    });
  }

  getTradeHistory(f1: string, f2: string) {
    return axios({
      method: 'GET',
      url: routes.TRADE,
      params: { f1, f2 }
    });
  }

  getPlayerHistory(id: string, date: string) {
    return axios({
      method: 'GET',
      url: routes.PLAYER_HISTORY,
      params: { id, date }
    });
  }

  configureInterceptor() {
    axios.interceptors.request.use((config) => {
      store.dispatch(settingsActions.setAsyncStart());
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        store.dispatch(settingsActions.setAsyncSuccess());
        return response;
      },
      (error) => {
        store.dispatch(settingsActions.setAsyncError());
        return Promise.reject(error);
      }
    );
  }

  handleQueryParams(history: History, pathname: string, search: string = '') {
    return history.push({
      pathname,
      search
    });
  }
}

const appService = new AppService();

export { appService };
