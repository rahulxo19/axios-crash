const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
              console.log(err);
            } else {
              let cart = { products: [], totalPrice: 0 };
              if (fileContent) {
                try {
                  cart = JSON.parse(fileContent);
                } catch (error) {
                  console.log(error.message);
                }
              }
              const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
              const existingProduct = cart.products[existingProductIndex];
              let updatedProduct;
          
              if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
              } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
              }
              cart.totalPrice = cart.totalPrice + +productPrice;
              fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
              });
            }
          });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                return;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart };
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice*productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            })
        })
    }
}