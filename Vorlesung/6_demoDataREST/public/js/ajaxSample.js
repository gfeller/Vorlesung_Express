;(function($) {
    var client = window.restClient;
    $(function(){
        var output = $("#output");
        
        var pizzaContainer = $(".new-pizza-container");
        var btnNewPizza = $("#createPizza");
        var btnLogin = $("#login");
        var btnLogout = $("#logout");
        var inputPizza = $("#pizzaName");

        btnNewPizza.click(function (event) {
            client.createPizza(inputPizza.val()).done(function (msg) {
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
        
        function updateStatus() {
                btnLogin.toggle(!client.isLogin());
                btnLogout.toggle(client.isLogin());
                pizzaContainer.toggle(client.isLogin());
        }
        updateStatus();
    });
}(jQuery));