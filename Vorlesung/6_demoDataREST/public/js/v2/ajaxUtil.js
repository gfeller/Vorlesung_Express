;(function($) {

    function ajax(metod, url, data)
    {
        return $.ajax({
            dataType:  "json",
            method: metod,
            url: url,
            data: data
        });
    }

    window.ajax = { ajax : ajax };
}(jQuery));