import { axios } from 'vendor';
import { routes } from 'shared';
import { store, settingsActions } from 'store';

class ApiService {
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
}

const apiService = new ApiService();

export { apiService };
