import {valueStorage} from './value-storage.js'

const tokenKey = "token";

class HttpService {
    ajax(query, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});

        if (valueStorage.getItem(tokenKey)) {
            fetchHeaders.append("authorization", "Bearer " + valueStorage.getItem(tokenKey))
        }

        return fetch("/graphql", {
            method: "POST",
            headers: fetchHeaders,
            body: JSON.stringify({query: query})
        }).then(x => {
            return x.json();
        }).then(x => {
            if (x) {
                return x.data;
            }
            return x
        });
    }

    setAuthToken(token) {
        valueStorage.setItem(tokenKey, token);
    }

    hasAuthToken() {
        return Boolean(valueStorage.getItem(tokenKey))
    }

    removeAuthToken(token) {
        valueStorage.setItem(tokenKey, undefined);
    }

}

export const httpService = new HttpService();
