;(function($) {
    let client = window.restClient;
    $(function(){
        var output = $("#output");

        var orderContainer = $("#orderContainer");
        let orderRenderer = Handlebars.compile($("#order-template").html());

        let orderId = window.location.hash.substring(1);
        if(!(orderId && client.isLogin))
        {
            window.location.replace("./ajaxSample.html");
            return;
        }

        function renderOrder()
        {
            client.getOrder(orderId).done(function(order){
                orderContainer.html(orderRenderer(order));
            })
        }

        $(orderContainer).on("click", ".js-delete", function(event){
            client.deleteOrder($(event.currentTarget).data("id")).done(renderOrder);
        });

        renderOrder();
    });
}(jQuery));