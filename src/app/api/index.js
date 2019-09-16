import service from "./apis";

export const apiGet = (url) => () => 
    service.get(url).then( v => v.data)
        .catch(error => {
            if(!error.response) {
                return Promise.reject('Error de red');
            }
            else {
                return Promise.reject(error.response.data);
            }
        });

export const apiPut = (url, id, obj) => () =>
    service.patch(`${url}/${id}`, obj).then( v => v.data)
        .catch(error => {
            if(!error.response) {
                return Promise.reject('Error de red');
            }
            else {
                return Promise.reject(error.response.data);
            }
        });

export const apiPost = (url, obj) => () =>
    service.post(`${url}`, obj).then( v => v.data )
        .catch(error => {
            // console.log("error");
            if(!error.response) {
                return Promise.reject('Error de red');
            }
            else {
                return Promise.reject(error.response.data);
            }
        });

export const apiDelete = (url, id) => () =>
    service.delete(`${url}/${id}`).then( v => v.data)
        .catch(error => {
            if(!error.response) {
                return Promise.reject('Error de red');
            }
            else {
                return Promise.reject(error.response.data);
            }
        });