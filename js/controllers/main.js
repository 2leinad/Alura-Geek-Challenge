import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="image-container">
            <img src="${image}" alt="${name}">
        </div>    
        
        <div class="card-container--info">
                <p>${name}</p>
                <div class="card-container--value">
                    <p>$ ${price} USD</p>
                    <button class="delete-button" data-id="${id}">
                        <img class="deleteImage" src = "./imagenes/115789_trash_icon.png" alt="Eliminar">
                    </button>
                </div>
        </div>
    `;

    const eraseCard = card.querySelector(".delete-button");

    eraseCard.addEventListener("click", (event) => {
        const answer = confirm("¿Seguro que deseas borar?");
        if (answer == true) {
        const id = event.target.parentElement.getAttribute("data-id");
        
        servicesProducts
        .deleteProduct(id)
        }
        else{
            return false;
        }
});

    //     const id = event.target.parentElement.getAttribute("data-id");

    // servicesProducts
    //     .deleteProduct(id)
    // });

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();

        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name, product.price, product.image, product.id
                )
            )
        });

    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[form-name]").value;
    const price = document.querySelector("[form-price]").value;
    const image = document.querySelector("[form-image]").value;

    servicesProducts
        .createProducts(name, price, image)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

});

render();
