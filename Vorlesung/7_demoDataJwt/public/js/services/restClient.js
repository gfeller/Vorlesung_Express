;(function(services, $) {

    const ajaxUtil = window.util.ajax;
    const valueStorage = window.services.valueStorage;
    const tokenKey = "token";

    function login(userName, pwd) {
        return ajaxUtil.ajax("POST", "/login/", {email: userName, pwd: pwd}).done(function (token) {
            valueStorage.setItem(tokenKey, token);
        });
    }

    function logout() {
        valueStorage.setItem(tokenKey, undefined);
        return $.Deferred().resolve().promise();
    }

    function createPizza(pizzeName) {
        return ajaxUtil.ajax("POST", "/orders/", {name: pizzeName,}, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    function isLoggedIn() {
        return !!valueStorage.getItem(tokenKey);
    }

    function getOrders() {
        return ajaxUtil.ajax("GET", "/orders/", undefined, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    function getOrder(id) {
        return ajaxUtil.ajax("GET", `/orders/${id}`, undefined, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    function deleteOrder(id) {
        return ajaxUtil.ajax("DELETE", `/orders/${id}`, undefined, {authorization: "Bearer " + valueStorage.getItem(tokenKey)});
    }

    services.restClient = {
        login: login,
        logout: logout,
        createPizza: createPizza,
        isLogin: isLoggedIn,
        getOrders,
        getOrder,
        deleteOrder
    };
}(window.services = window.services || { }, jQuery));