import { API_ENDPOINTS, BASE_URL } from '../static/Constants';
import networkApiHit from './UrlServices';

export const getPersonsList1 = () => {
    let url=BASE_URL+API_ENDPOINTS.USER_WITH_PAGINATION_LIMIt
  return networkApiHit(url, 'GET', "").then(res=>res)
};
