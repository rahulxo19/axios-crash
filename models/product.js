const db = require('../util/database')
const Cart = require('./cart')




module.exports = class Product {
  constructor(title,price, imageUrl, description ) {
    this.title = title;
    this.price = Number(price);
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
    [this.title, this.price, this.imageUrl, this.description]
    )
  }
  update(id) {
    return db.execute('UPDATE products SET title = ?, price = ?, imageUrl = ?, description = ? WHERE id=?',
    [this.title, this.price, this.imageUrl, this.description, id])
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static findById(id, cb) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE products.id = ?', [id])
  }
}
