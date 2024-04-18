// let user = {
//   name: 'John',
//   surname: 'Smith',
//   get fullName(){
//     return `${this.name}-${this.surname}`
//   },
//   set fullName(val){
//     let arr = val.split(' ');
//     this.name = arr[0];
//     this.surname = arr[1];
//   }
// }

// console.log(user);

// user.fullName = 'Вася Пупкин'
// console.log(user);


var products = {
  plainBurger: {
    name: 'Гамбургер простой',
    cost: 10000,
    kcall: 255,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get summKcall() {
      return this.kcall * this.amount;
    }
  },
  freshBurger: {
    name: 'Гамбургер FRESH',
    cost: 20500,
    kcall: 300,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get summKcall() {
      return this.kcall * this.amount;
    }
  },
  freshCombo: {
    name: 'FRESH COMBO',
    cost: 31900,
    kcall: 400,
    amount: 0,
    get summ() {
      return this.cost * this.amount;
    },
    get summKcall() {
      return this.kcall * this.amount;
    }
  }
}

// products.plainBurger.amount = 5
// console.log(products.plainBurger.summ);

var extraProducts = {
  doubleMayonnaise: {
    name: "Двойной майонез",
    cost: 500,
    kcall: 50
  },
  lettuce: {
    name: "Салатный лист",
    cost: 300,
    kcall: 20
  },
  cheese: {
    name: "Сыр",
    cost: 1000,
    kcall: 100
  }
}

const btns = document.querySelectorAll('.main__product-btn');

for (let i = 0; i < btns.length; i++) {
  const element = btns[i];

  element.addEventListener('click', function (e) {
    e.preventDefault();
    add(this)
  })

}

function add(button) {
  // el.getAttribute('name') - вернет значение атрибута
  // el.setAttribute('name', value) - добавляе атрибут и значение для него
  // el.hasAttribute('name') - проверяет наличин атрибута
  // el.removeAttribute('name') - удаляет атрибут

  let simbol = button.getAttribute('data-symbol');
  const parent = button.closest('.main__product');
  let id = parent.getAttribute('id');

  if (simbol == '+') {
    products[id].amount++;

  } else if (products[id].amount > 0) {
    products[id].amount--;
  }

  let output = parent.querySelector('.main__product-num');

  let spanPrice = parent.querySelector('.main__product-price span');
  let spanKcall = parent.querySelector('.main__product-kcall span');

  output.innerHTML = products[id].amount;
  spanPrice.innerHTML = products[id].summ;
  spanKcall.innerHTML = products[id].summKcall;
  console.log(spanPrice);
}

const checkbox = document.querySelectorAll('.main__product-checkbox');

for (let i = 0; i < checkbox.length; i++) {
  const element = checkbox[i];

  element.addEventListener('click', function () {
    addIngredient(this)
  })
}

function addIngredient(check) {

  let parent = check.closest('.main__product');
  let parentId = parent.getAttribute('id');
  let checkId = check.getAttribute('data-extra');
  let checked = check.checked;

  products[parentId][checkId] = checked;

  if (products[parentId][checkId] == true) {
    products[parentId].cost += extraProducts[checkId].cost;
    products[parentId].kcall += extraProducts[checkId].kcall;
  }
  else {
    products[parentId].cost -= extraProducts[checkId].cost;
    products[parentId].kcall -= extraProducts[checkId].kcall;
  }

  let spanPrice = parent.querySelector('.main__product-price span');
  let spanKcall = parent.querySelector('.main__product-kcall span');

  spanPrice.innerHTML = products[parentId].summ;
  spanKcall.innerHTML = products[parentId].summKcall;

}

const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const windowOut = document.querySelector('.receipt__window-out');
const windowBtn = document.querySelector('.receipt__window-btn');

const arrProducts = [];

let totalName = "";
let totalPrice = 0;
let totalKcall = 0;

addCart.addEventListener('click', function () {

  for (const key in products) {

    const el = products[key];

    if (el.amount > 0) {
      arrProducts.push(el)

      for (const key2 in el) {

        if (el[key2] === true) {
          el.name += '\n' + extraProducts[key2].name
        }

      }
    }
  }
  
  for (let i = 0; i < arrProducts.length; i++) {
    const elem = arrProducts[i];
    totalName += "\n" + elem.name + '\n' + `В количестве: ${elem.amount} шт. \n`;
    totalPrice += elem.summ;
    totalKcall += elem.summKcall;
  }
  
  windowOut.innerHTML = `Вы заказали: \n${totalName}\nОбщая калорийнось: ${totalKcall}\nОбщая стоимость: ${totalPrice} сумм`;
  
  if(totalPrice > 0){
    receipt.style.display = 'flex';
    
    setTimeout(() => {
      receipt.style.opacity = 1;
      receiptWindow.style.top = '25%';
    }, 100);
    
    document.body.style.overflow = 'hidden'
  }
  
  let ountput = document.querySelectorAll('.main__product-num');
  let spanPrice = document.querySelectorAll('.main__product-price span');
  let spanKcall = document.querySelectorAll('.main__product-kcall span');
  
  
  for (let i = 0; i < ountput.length; i++) {
    ountput[i].innerHTML = 0;
    spanPrice[i].innerHTML = 0;
    spanKcall[i].innerHTML = 0;
  }
  
  
})

windowBtn.addEventListener('click', function () {  
  window.location.reload();
})


// Домашнее задание

const images = document.querySelectorAll('.main__product-info');
const view = document.querySelector('.view');
const viewImg = document.querySelector('.view img');
const close = document.querySelector('.view__close');

images.forEach(item => {
  item.addEventListener('dblclick', function () {  
    openImg(this)
  })
})

function openImg(el) {  
  
  view.classList.add('active');
  let img = el.querySelector('.main__product-info img');
  let srcImg = img.getAttribute('src');
  viewImg.setAttribute('src', srcImg);
  
}


close.addEventListener('click', ()=> {
  view.classList.remove('active');
});


const count = document.querySelector('.header__timer-extra');

function countStart(time) {  
  
  setTimeout(() => {
    
    if(count.innerHTML >= 0 && count.innerHTML < 50){
      count.innerHTML++
      countStart(10);
    }
    else if(count.innerHTML >= 50 && count.innerHTML < 70){
      count.innerHTML++
      countStart(50);
    }
    else if(count.innerHTML >= 70 && count.innerHTML < 90){
      count.innerHTML++
      countStart(80);
    }
    else if(count.innerHTML >= 90 && count.innerHTML < 97){
      count.innerHTML++
      countStart(120);
    }
    else if(count.innerHTML >= 97 && count.innerHTML < 100){
      count.innerHTML++
      countStart(200);
    }
    
  }, time);
  
}

countStart();