import { axios } from 'vendor';
import { routes } from 'shared';
import { store, appActions } from 'store';

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
      store.dispatch(appActions.setAsyncStart());
      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        store.dispatch(appActions.setAsyncSuccess());
        return response;
      },
      (error) => {
        store.dispatch(appActions.setAsyncError());
        return Promise.reject(error);
      }
    );
  }
}

const apiService = new ApiService();

export { apiService };
