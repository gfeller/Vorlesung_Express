import { authService } from '../services/auth-service.js'
import { orderService } from '../services/order-service.js'

const orderContainer = document.querySelector("#orderContainer");
const orderRenderer = Handlebars.compile(document.querySelector("#order-template").innerHTML);

const orderId = window.location.hash.substring(1);
if (!(orderId && authService.isLoggedIn())) {
    window.location.replace("./index.html");
}

async function renderOrder() {
    orderContainer.innerHTML = orderRenderer(await orderService.getOrder(orderId))
}

orderContainer.addEventListener("click", async event => {
    if (event.target.classList.contains("js-delete")) {
        await orderService.deleteOrder(event.target.dataset.id);
        renderOrder()
    }
});

renderOrder();