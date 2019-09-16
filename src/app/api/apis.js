import axios from 'axios';
import cookie from 'react-cookies';
import { urlBase, urlApiConsult } from './urls';

const token = cookie.load('token');
let isRefreshing = false;
let failedQueue = [];

const refresh_token = {
  refresh_token: '', 
  grant_type: 'refresh_token',
  client_id: '3',
  client_secret: '1Z4VO3qY9Gm5geEEHTMVr4xTNeo4R50UzV3ThfsC'
};

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }

    failedQueue = [];
  })
}

const settings =
    {
        baseURL: urlBase,
        headers: {
            Authorization: token ?
            `Bearer ${token}` : '' ,
            'Access-Control-Allow-Origin': "*",
        }
    }

const service = axios.create(settings);

service.CancelToken = axios.CancelToken;
service.isCancel = axios.isCancel;

service.interceptors.request.use(
    (config) => {
      let token = cookie.load('token')
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${ token }`
      }
  
      return config
    },
  
    (error) => {
      return Promise.reject(error)
    }
  )
  service.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        // dispatch something to your store
      }
  
      return Promise.reject(error);
    }
  )

  export const setupInterceptors = (store, history) => {
    // console.log(history)
    service.interceptors.response.use(
      (response) => response,
      (error) => {
        const { config, response: { status } } = error;
        const originalRequest = config;
  
        if (status === 403) {
          if(isRefreshing) {
            return new Promise(function(resolve, reject) {
              failedQueue.push({resolve, reject})
            }).then(token => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return axios(originalRequest);
            }).catch(error => {
              return error
            });
          }
  
          originalRequest._retry = true;
          isRefreshing = true;
          
          const refreshToken = cookie.load('refresh_token');
          return new Promise(function (resolve, reject) {
            refresh_token.refresh_token = refreshToken;
            const dataRefresh =querystring.stringify(refresh_token);
            // console.log(store);
  
            axios.post(`${ROOT}/oauth/token`, dataRefresh)
            .then(({data}) => {
              cookie.save('token', data.access_token, { path: '/' });
              cookie.save('refresh_token', data.refresh_token, { path: '/'});
              service.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token;
              originalRequest.headers['Authorization'] = 'Bearer ' + data.access_token;
              processQueue(null, data.access_token);
              resolve(axios(originalRequest));
            })
            .catch((error) => {
              processQueue(error, null);
              reject(error);
              
              if (error.response.status === 401) {
                // isRefreshing = false
                cookie.remove('token', { path: '/' })
                cookie.remove('user', { path: '/' })
                cookie.remove('refresh_token', { path: '/' })
                originalRequest._retry = true
                history.push('/login');
                store.dispatch({type: LOGOUT, payload: {} });
                store.dispatch({type: UPDATE_PROFILE, payload: {} });

                return
              }
  
            })
            .then(() => { isRefreshing = false })
          })
        }
        if (status === 401) {
          originalRequest._retry = true
          history.push('/login');
          return
        }
        return Promise.reject(error);
      }
    )
  }
export default service;

export const serviceApi = axios.create({
    baseURL: urlApiConsult,
    'headers': {
        'Access-Control-Allow-Origin': "*", 
        'Access-Control-Allow-Headers': "Content-Type, Authorization"      
    }
})
