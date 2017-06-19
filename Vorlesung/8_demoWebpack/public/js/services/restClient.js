import $ from "jquery";
import ajaxUtil from "../utils/ajaxUtil"
import valueStorage from "../services/valueStorage"

const tokenKey = "token";


class RestClient {
    login(userName, pwd) {
        return ajaxUtil.ajax("POST", "/login/", {email: userName, pwd: pwd}).done(function (token) {
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

    isLogin() {
        return !!valueStorage.getItem(tokenKey);
    }

    getOrders() {
        return ajaxUtil.ajax("GET", "/orders/", {}, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    getOrder(id) {
        return ajaxUtil.ajax("GET", `/orders/${id}`, {}, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    deleteOrder(id) {
        return ajaxUtil.ajax("DELETE", `/orders/${id}`, {}, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }
}
export default new RestClient();