// リハウス アプリ共通JavaScript
document.addEventListener('DOMContentLoaded', () => {
  console.log('リハウス アプリが正常に起動しました。');
  updateCartDisplay();
});

// カート商品追加・連動機能 (localStorage活用)
function addToCart(itemName, price) {
  let cart = JSON.parse(localStorage.getItem('rehouse_cart') || '[]');
  let existing = cart.find(item => item.name === itemName);
  if (existing) {
    existing.count += 1;
  } else {
    cart.push({ name: itemName, price: price, count: 1 });
  }
  localStorage.setItem('rehouse_cart', JSON.stringify(cart));
  
  const toast = document.getElementById('toast-msg');
  if (toast) {
    toast.innerText = itemName + ' をカートに追加しました！';
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2000);
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartContainer = document.getElementById('cart-items-list');
  const cartTotal = document.getElementById('cart-total-price');
  if (!cartContainer) return;

  let cart = JSON.parse(localStorage.getItem('rehouse_cart') || '[]');
  
  // デフォルトで初期サンプルデータを入れる（空の場合）
  if (cart.length === 0) {
    cart = [
      { name: 'カップヌードル', price: 150, count: 1 },
      { name: '三ツ矢サイダー', price: 100, count: 1 },
      { name: 'ホイフル', price: 150, count: 1 }
    ];
    localStorage.setItem('rehouse_cart', JSON.stringify(cart));
  }

  cartContainer.innerHTML = '';
  let sum = 0;
  cart.forEach(item => {
    let itemTotal = item.price * item.count;
    sum += itemTotal;
    
    let imgName = 'item-snack.png';
    if (item.name.includes('ラーメン') || item.name.includes('ヌードル') || item.name.includes('タンメン')) {
      imgName = 'item-noodle.png';
    } else if (item.name.includes('サイダー') || item.name.includes('グレープ') || item.name.includes('ウォーター') || item.name.includes('コーラ')) {
      imgName = 'item-drink.png';
    }

    const div = document.createElement('div');
    div.className = 'product-item';
    div.innerHTML = `
      <div class="product-img"><img src="./images/${imgName}" alt="${item.name}" onerror="this.style.display='none'; this.parentNode.innerText='商品';"></div>
      <div class="product-info">
        <div class="product-name">${item.name}</div>
        <div class="product-price">¥${item.price} × ${item.count}</div>
      </div>
      <span style="font-weight: bold;">¥${itemTotal}</span>
    `;
    cartContainer.appendChild(div);
  });

  if (cartTotal) {
    cartTotal.innerText = '¥' + sum;
  }
}
