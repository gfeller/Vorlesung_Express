import $ from "jquery";

class AjaxUtil {
    ajax(metod, url, data, headers) {
        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            headers: headers,
            method: metod,
            url: url,
            data: JSON.stringify(data)
        });
    }
}

export default new AjaxUtil();