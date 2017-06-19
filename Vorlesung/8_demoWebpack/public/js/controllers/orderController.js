import $ from "jquery";
import client from "../services/restClient";

import handlebars from "handlebars";
import x from "../utils/handlebarsHelpers";


$(function () {

    let orderContainer = $("#orderContainer");
    let orderRenderer = handlebars.compile($("#order-template").html());

    let orderId = window.location.hash.substring(1);
    if (!(orderId && client.isLogin())) {
        window.location.replace("./index.html");
        return;
    }

    function renderOrder() {
        client.getOrder(orderId).done(function (order) {
            orderContainer.html(orderRenderer(order));
        })
    }

    $(orderContainer).on("click", ".js-delete", function (event) {
        client.deleteOrder($(event.currentTarget).data("id")).done(renderOrder);
    });

    renderOrder();
});