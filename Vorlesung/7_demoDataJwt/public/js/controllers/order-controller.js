import {restClient as client} from '../services/rest-client.js'

const orderContainer = document.querySelector("#orderContainer");
const orderRenderer = Handlebars.compile(document.querySelector("#order-template").innerHTML);

const orderId = window.location.hash.substring(1);
if (!(orderId && client.isLoggedIn())) {
    window.location.replace("./index.html");
}

function renderOrder() {
    client.getOrder(orderId).then(function (order) {
        orderContainer.innerHTML = orderRenderer(order)
    })
}

orderContainer.addEventListener("click", function (event) {
    if(event.target.classList.contains("js-delete")){           
        client.deleteOrder(event.target.dataset.id).then(renderOrder);
    }
});


renderOrder();