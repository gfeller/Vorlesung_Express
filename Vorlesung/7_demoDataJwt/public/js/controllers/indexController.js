;(function($) {
    var client = window.restClient;
    $(function(){
        var output = $("#output");

        var btnNewPizza = $("#createPizza");
        var btnLogin = $("#login");
        var btnLogout = $("#logout");
        var inputPizza = $("#pizzaName");
        var ordersContainer = $("#ordersContainer");

        let ordersRenderer = Handlebars.compile($("#orders-template").html());

        btnNewPizza.click(function (event) {
            client.createPizza(inputPizza.val()).done(function (msg) {
                renderOrders();
                output.text(JSON.stringify(msg));
            }).fail(function( msg ) {
                output.text(JSON.stringify(msg));
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

        function renderOrders()
        {
            client.getOrders().done(function(orders){
                debugger;
                ordersContainer.html(ordersRenderer({orders : orders}));
            })
        }

        $(ordersContainer).on("click", ".js-delete", function(event){
            client.deleteOrder($(event.currentTarget).data("id")).done(renderOrders);
        });

        function updateStatus() {
                $(".js-non-user").toggle(!client.isLogin());
                $(".js-user").toggle(client.isLogin());

                if(client.isLogin())
                {
                    renderOrders();
                }
        }
        updateStatus();
    });
}(jQuery));