;(function(services) {
    function setItem(name, value) {
        if (value) {
            localStorage.setItem(name, JSON.stringify(value));
        }
        else {
            localStorage.removeItem(name);
        }
    }

    function getItem(name) {
        return JSON.parse(localStorage.getItem(name) || null);
    }

    services.valueStorage = {getItem, setItem};
}(window.services = window.services || { }));