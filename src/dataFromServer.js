// No 2

export const getDataFromServer = (status, callback) => {
  if (status) {
    setTimeout(() => {
      // Simulasi ambil data dari server
      const products = ["Product 1", "Product 2", "Product 3"];
      callback(products, null); // Panggil cb dengan data produk
    }, 3000);
  } else {
    // Panggil cb dengan param kedua object Error
    const err = new Error("Failed to fetch data");
    callback(null, err);
  }
};

// Dibuat sebagai call back function
export const processData = (success, failed) => {
  // Jika berhasil, success ada isinya (tidak null)
  if (success) {
    console.log("List of product from API");
    for (const [index, element] of success.entries()) {
      console.log(`${index} : ${element}`);
    }
  } else {
    // Jika gagal, failed ada isinya (tidak null)
    throw Error(failed); // throw object Error dari getDataFromServer
  }
};
