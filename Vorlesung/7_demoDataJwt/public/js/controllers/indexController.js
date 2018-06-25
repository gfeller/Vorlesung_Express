import {restClient as client} from '../services/restClient.js'

$(function () {
    const btnNewPizza = $("#createPizza");
    const btnLogin = $("#login");
    const btnLogout = $("#logout");
    const inputPizza = $("#pizzaName");
    const ordersContainer = $("#ordersContainer");

    const ordersRenderer = Handlebars.compile($("#orders-template").html());

    btnNewPizza.click(function (event) {
        client.createPizza(inputPizza.val()).done(function (msg) {
            renderOrders();
        }).fail(function (msg) {
            //nothing!
        });
        inputPizza.val("");
        event.preventDefault();
    });

    btnLogin.click(function () {
        client.login("admin@admin.ch", "123456").then(updateStatus);
    });

    btnLogout.click(function () {
        client.logout().then(updateStatus);
    });

    function renderOrders() {
        client.getOrders().done(function (orders) {
            ordersContainer.html(ordersRenderer({orders: orders}));
        })
    }

    $(ordersContainer).on("click", ".js-delete", function (event) {
        client.deleteOrder($(event.currentTarget).data("id")).done(renderOrders);
    });

    function updateStatus() {
        $(".js-non-user").toggle(!client.isLoggedIn());
        $(".js-user").toggle(client.isLoggedIn());

        if (client.isLoggedIn()) {
            renderOrders();
        }
    }

    updateStatus();
});
