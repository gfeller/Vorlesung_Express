import {valueStorage} from './value-storage.js'

const tokenKey = "token";

class HttpService {
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
        
        if(valueStorage.getItem(tokenKey)){
            fetchHeaders.append("authorization", "Bearer "+ valueStorage.getItem(tokenKey))
        }        

        return fetch(url, {
            method: method,
            headers: fetchHeaders, body: JSON.stringify(data)
        }).then(x => {
            return x.json();
        });
    }

    setAuthToken(token){
        valueStorage.setItem(tokenKey, token);
    }

    hasAuthToken(){
        return Boolean(valueStorage.getItem(tokenKey))
    }

    removeAuthToken(token){
        valueStorage.setItem(tokenKey, undefined);
    }

}

export const httpService = new HttpService();