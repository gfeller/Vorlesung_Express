import {ajaxUtil} from '../utils/ajaxUtil.js'
import {valueStorage} from './valueStorage.js'

const tokenKey = "token";

class RestClient {
    login(userName, pwd) {
        return ajaxUtil.ajax("POST", "/login/", {email: userName, pwd: pwd}).then(function (token) {
            valueStorage.setItem(tokenKey, token);
        });
    }

    logout() {
        valueStorage.setItem(tokenKey, undefined);
        return $.Deferred().resolve().promise();
    }

    createPizza(pizzeName) {
        return ajaxUtil.ajax("POST", "/orders/", {name: pizzeName,}, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    isLoggedIn() {
        return !!valueStorage.getItem(tokenKey);
    }

    getOrders() {
        return ajaxUtil.ajax("GET", "/orders/", undefined, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    getOrder(id) {
        return ajaxUtil.ajax("GET", `/orders/${id}`, undefined, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    deleteOrder(id) {
        return ajaxUtil.ajax("DELETE", `/orders/${id}`, undefined, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }
}

export const restClient = new RestClient();