var addP = document.getElementById('addP');
console.log(addP);
var items = document.getElementById('items');
console.log(items);
var totalP = document.getElementById('totalP');
console.log(totalP);

addP.addEventListener("submit",createP);
items.addEventListener('click',deleteP);

window.addEventListener('DOMContentLoaded', () => {
axios.get('https://crudcrud.com/api/58935b658fdc4414baf072e469421d7b/items')
.then(res => {
  const d = res.data;
  let c,i;
  var sum = 0;
  for(let a = 0; a<d.length;a++){
    c = d[a].cost;
    i =d[a].item;
    sum+= parseInt(c);
    display(c,i);
  }
  updateTotalPrice();
})
})

async function createP(e){
  e.preventDefault();

  let price = document.getElementById('price').value;
  let product = document.getElementById('product').value;
  await axios.post('https://crudcrud.com/api/58935b658fdc4414baf072e469421d7b/items',{ cost : price, item : product})
  .catch(err => console.error(err.message))
  .then(display(price,product))
  .then(updateTotalPrice)
}

async function display(c,i){
  let li = document.createElement('li');
  let ul = document.getElementById('items');
  let dlt = document.createElement('button');
  dlt.className = "delete";
  dlt.appendChild(document.createTextNode("delete"))
  li.appendChild(document.createTextNode(c + "-" + i));
  li.appendChild(dlt);
  ul.appendChild(li);
}

async function updateTotalPrice() {
  axios.get('https://crudcrud.com/api/58935b658fdc4414baf072e469421d7b/items')
    .then(res => {
      const d = res.data;
      let c, i;
      var sum = 0;
      for(let a = 0; a < d.length; a++){
        c = d[a].cost;
        i = d[a].item;
        sum += parseInt(c);
      }
      totalP.textContent = `Total Price of Products = ${sum}`;
    })
  }

async function deleteP(e){
  if(e.target.classList.contains('delete')){
    let li = e.target.parentElement;
    let ul = li.parentElement;
    ul.removeChild(li);
    let item = li.firstChild.textContent.trim().split('-')[0];
    var id,d,c;
    await axios
        .get("https://crudcrud.com/api/58935b658fdc4414baf072e469421d7b/items")
        .then((res) => {
          const data = res.data;
          for (let i = 0; i < data.length; i++) {
            id = data[i]._id;
            c = Number(data[i].cost);
            i = data[i].item;
            if(c == item){
                break;
            }
          }
        }, 1000);
        if(c == item){
          await axios.delete(`https://crudcrud.com/api/58935b658fdc4414baf072e469421d7b/items/${id}`)
          .then(res => console.log(res))
          .catch(err => console.error(err.message))
        }
        console.log(c);
        console.log(item);
    
    updateTotalPrice();
  }
}
