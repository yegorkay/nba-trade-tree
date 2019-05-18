import { axios } from 'vendor';
import { routes } from 'shared';

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
}

const apiService = new ApiService();

export { apiService };
