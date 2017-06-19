;(function(util, $) {
    function ajax(metod, url, data, headers) {
        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            headers: headers,
            method: metod,
            url: url,
            data: JSON.stringify(data)
        });
    }
    util.ajax = { ajax : ajax };

}(window.util = window.util || { }, jQuery));