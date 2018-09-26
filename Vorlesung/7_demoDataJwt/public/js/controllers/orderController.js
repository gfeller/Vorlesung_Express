import {restClient as client} from '../services/restClient.js'

$(function () {
    const output = $("#output");

    const orderContainer = $("#orderContainer");
    const orderRenderer = Handlebars.compile($("#order-template").html());

    const orderId = window.location.hash.substring(1);
    if (!(orderId && client.isLoggedIn())) {
        window.location.replace("./index.html");
        return;
    }

    function renderOrder() {
        client.getOrder(orderId).then(function (order) {
            orderContainer.html(orderRenderer(order));
        })
    }

    $(orderContainer).on("click", ".js-delete", function (event) {
        client.deleteOrder($(event.currentTarget).data("id")).then(renderOrder);
    });

    renderOrder();
});