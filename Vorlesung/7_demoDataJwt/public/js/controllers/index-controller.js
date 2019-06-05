import {restClient as client} from '../services/rest-client.js'


const btnNewPizza = document.querySelector("#createPizza");
const btnLogin = document.querySelector("#login");
const btnLogout = document.querySelector("#logout");
const inputPizza = document.querySelector("#pizzaName");
const ordersContainer = document.querySelector("#ordersContainer");

const ordersRenderer = Handlebars.compile(document.querySelector("#orders-template").innerHTML);

btnNewPizza.addEventListener("click", event => {
    event.preventDefault();
    
    client.createPizza(inputPizza.value).then(function (msg) {
        renderOrders();
    }).catch(function (msg) {
        //nothing!
    });
    inputPizza.value = "";    
});

btnLogin.addEventListener("click", () => {
    client.login("admin@admin.ch", "123456").then(updateStatus);
});

btnLogout.addEventListener("click", ()  => {
    client.logout().then(updateStatus);
});

function renderOrders() {
    client.getOrders().then(function (orders) {
        ordersContainer.innerHTML = ordersRenderer({orders: orders});
    })
}

ordersContainer.addEventListener("click", function (event) {
    if(event.target.classList.contains("js-delete")){   
        
        client.deleteOrder(event.target.dataset.id).then(renderOrders);
    }
});

function updateStatus() {
    Array.from(document.querySelectorAll(".js-non-user")).forEach(x=>x.classList.toggle("hidden", client.isLoggedIn()))
    Array.from(document.querySelectorAll(".js-user")).forEach(x=>x.classList.toggle("hidden", !client.isLoggedIn()))

    if (client.isLoggedIn()) {
        renderOrders();
    }
}
updateStatus(); 