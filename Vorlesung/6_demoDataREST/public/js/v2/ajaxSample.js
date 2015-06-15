;(function($) {
    var client = window.restClient;
    $(function(){
        var output = $("#output");

        $("#createPizza").click(function(){
            client.createPizza("hawaii").done(function( msg ) {
                output.text(JSON.stringify(msg));
            }).fail(function( msg ) {
                output.text(JSON.stringify(msg));
            });
        });

        $("#login").click(function(){
            client.login("mgfeller@hsr.ch", "1234" ).done(function( msg) {
                output.text(JSON.stringify(msg));
            });
        });

        $("#logout").click(function(){
            client.logout().done(function( msg ) {
                output.text(JSON.stringify(msg));
            });
        });
    });
}(jQuery));