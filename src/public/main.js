document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("addToCart");
    
    const product = document.getElementById("product");

    const data = {
        type: "count",
    }

    fetch("/api/cart", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(response => {
        if(!response.ok){
            throw "Data fetch Error";
        }
        return response.json()
    }).then(json => {
        const cartCountEl = document.getElementById("cartCount");
        cartCountEl.textContent = json.totalQuantity;
    })


    button && button.addEventListener("click", () => {
        const id = product.dataset.id;

        const value = {
            id, 
            type: "add",
            quantity: 1
        }

        fetch("/api/cart", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(value)
        }).then(response => {
            if(!response.ok){
                console.error("Error");
            }
            const cartCountEl = document.getElementById("cartCount");
            cartCountEl.textContent = +cartCountEl.textContent + 1;
        })
    });
})