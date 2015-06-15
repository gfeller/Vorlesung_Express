;(function($) {
    $(function(){
        var output = $("#output");
        var token = undefined;

        $("#createPizza").click(function(){
            $.ajax({
                dataType:  "json",
                method: "POST",
                url: "/orders/",
                data: { name: "hawaii", token : token }
            }).done(function( msg ) {
                output.text(JSON.stringify(msg));
            }).fail(function( msg ) {
                output.text(JSON.stringify(msg));
            });
        });

        $("#login").click(function(){
            $.ajax({
                dataType:  "json",
                method: "POST",
                url: "/login",
                data: { email: "mgfeller@hsr.ch", pwd: "1234" }
            }).done(function( msg, err ) {
                token = msg;
                output.text(JSON.stringify(msg));
            });
        });

        $("#logout").click(function(){
            $.ajax({
                dataType:  "json",
                method: "POST",
                url: "/logout",
                data: { token : token }
            }).done(function( msg, err ) {
                token = undefined;
                output.text(JSON.stringify(msg));
            });
        });
    });
}(jQuery));