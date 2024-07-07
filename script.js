/*
    Dibuat oleh : Okky Hendrawan - 1462200279 - Kelas R
    Dibuat pada : Jumat, 14 Maret 2024 11:40
*/

let cart = []; // Array untuk menyimpan pesanan yang di input di makanan atau minuman

  document.getElementById('add-to-cart-btn').addEventListener('click', addToCart);
  document.getElementById('calculate-change-btn').addEventListener('click', calculateChange);

    function addToCart() {
        // Mendapatkan nilai makanan yang dipilih dari dropdown
        const foodName = document.getElementById('food-menu').options[document.getElementById('food-menu').selectedIndex].text;
        const foodPrice = parseInt(document.getElementById('food-menu').value);
        const foodQuantity = parseInt(document.getElementById('food-quantity').value);
        // Mendapatkan nilai minuman yang dipilih dari dropdown
        const drinkName = document.getElementById('drink-menu').options[document.getElementById('drink-menu').selectedIndex].text;
        const drinkPrice = parseInt(document.getElementById('drink-menu').value);
        const drinkQuantity = parseInt(document.getElementById('drink-quantity').value);

        // Mencari apakah jenis makanan dan minuman sudah ada di dalam keranjang
        let existingFoodItem = cart.find(item => item.foodName === foodName);
        let existingDrinkItem = cart.find(item => item.drinkName === drinkName);
    
            // Jika jenis makanan sudah ada, maka jumlahnya akan bertambah
            if (existingFoodItem) {
            existingFoodItem.foodQuantity += foodQuantity;
            } else {
            // Jika jenis makanan belum ada, tambahkan sebagai item baru
            cart.push({ foodName: foodName, foodPrice: foodPrice, foodQuantity: foodQuantity });
            }
    
                // Jika jenis minuman sudah ada, tambahkan jumlahnya
            if (existingDrinkItem) {
                existingDrinkItem.drinkQuantity += drinkQuantity;
            } else {
                // Jika jenis minuman belum ada, tambahkan sebagai item baru
                cart.push({ drinkName: drinkName, drinkPrice: drinkPrice, drinkQuantity: drinkQuantity });
            }
    
            // Perbarui total tagihan
            calculateTotal();

            // Tampilkan keranjang pesanan
            displayCart();

            // Reset jumlah makanan dan minuman menjadi 0
            resetFoodQuantity();
            resetDrinkQuantity();
        }

  function displayCart() {
      const cartContainer = document.getElementById('cart');
      cartContainer.innerHTML = ''; // Kosongkan container
    
        cart.forEach(item => {
            // Tampilkan item makanan jika jumlah makanan lebih dari 0
            if (item.foodQuantity && item.foodQuantity !== 0) {
                const foodRow = document.createElement('div');
                foodRow.innerHTML = `<p>${item.foodQuantity} ${item.foodName} (${item.foodPrice})</p>`;
                cartContainer.appendChild(foodRow);
            }
        
            // Tampilkan item minuman jika jumlah minuman lebih dari 0
            if (item.drinkQuantity && item.drinkQuantity !== 0) {
                const drinkRow = document.createElement('div');
                drinkRow.innerHTML = `<p>${item.drinkQuantity} ${item.drinkName} (${item.drinkPrice})</p>`;
                cartContainer.appendChild(drinkRow);
            }
      });
}

function calculateTotal() {
    let totalBill = 0;
    
    // Hitung total pembayaran
    cart.forEach(item => {
        if (item.foodPrice && item.foodQuantity) {
            totalBill += item.foodPrice * item.foodQuantity;
        }
        if (item.drinkPrice && item.drinkQuantity) {
            totalBill += item.drinkPrice * item.drinkQuantity;
        }
    });
    
    document.getElementById("total-bill").innerText = "Rp. " + totalBill;
}

function calculateChange() {
    var totalBill = parseInt(document.getElementById("total-bill").innerText.split(" ")[1]);
    var payment = parseInt(document.getElementById("payment").value);

    var change = payment - totalBill;
    document.getElementById("change").innerText = "Kembalian: Rp. " + change;
}

function updateFoodPrice() {
    var foodMenu = document.getElementById("food-menu");
    var foodPrice = foodMenu.options[foodMenu.selectedIndex].value;
    document.getElementById("food-price").innerText = "Rp. " + foodPrice;
}

function updateDrinkPrice() {
    var drinkMenu = document.getElementById("drink-menu");
    var drinkPrice = drinkMenu.options[drinkMenu.selectedIndex].value;
    document.getElementById("drink-price").innerText = "Rp. " + drinkPrice;
}

function resetFoodQuantity() {
    document.getElementById('food-quantity').value = 0;
}

function resetDrinkQuantity() {
    document.getElementById('drink-quantity').value = 0;
}
