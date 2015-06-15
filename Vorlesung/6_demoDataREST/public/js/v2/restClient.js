;(function($) {

    ajaxUtil = window.ajax;
    var token = undefined;

    function login(userName, pwd) {
        return ajaxUtil.ajax("POST", "/login/", { email: userName, pwd: pwd }).done(function (msg) {
            token = msg;
        });
    }

    function logout() {
        return ajaxUtil.ajax("POST", "/logout/", { token : token } ).done(function (msg) {
            token = undefined;
        });
    }

    function createPizza(pizzeName) {
        return ajaxUtil.ajax("POST", "/orders/", {name: pizzeName, token: token});
    }

    window.restClient = { login : login, logout : logout, createPizza : createPizza };
}(jQuery));