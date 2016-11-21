import $ from "jquery";
import ajaxUtil from "./ajaxUtil"

class RestClient {
    login(userName, pwd) {
        return ajaxUtil.ajax("POST", "/login/", {email: userName, pwd: pwd}).done((msg) =>  {
            this.token = msg;
        });
    }

    logout() {
        this.token = undefined;
        return $.Deferred().resolve().promise();
    }

    createPizza(pizzeName) {
        return ajaxUtil.ajax("POST", "/orders/", {name: pizzeName,}, {authorization: "Bearer " + this.token});
    }

    isLoggedIn() {
        return !!this.token;
    }
}
export default new RestClient();