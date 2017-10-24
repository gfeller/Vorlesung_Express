;(function($) {

    ajaxUtil = window.ajax;
    let token = undefined;

    function login(userName, pwd) {
        return ajaxUtil.ajax("POST", "/login/", { email: userName, pwd: pwd }).done(function (msg) {
            token = msg;
        });
    }

    function logout() {
        token = undefined;
        return $.Deferred().resolve().promise();
    }

    function createPizza(pizzeName) {
        return ajaxUtil.ajax("POST", "/orders/", {name: pizzeName}, {authorization: "Bearer "+token});
    }
   
    function isLoggedIn() {
        return !!token;
    }

    window.restClient = { login: login, logout: logout, createPizza: createPizza, isLogin: isLoggedIn };
}(jQuery));