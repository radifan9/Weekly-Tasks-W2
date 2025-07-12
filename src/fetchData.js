export const fetchData = (status) => {
  return new Promise((resolve, reject) => {
    if (status) {
      setTimeout(() => {
        resolve("Data berhasil disimpan");
      }, 3000);
    } else {
      reject("Gagal mengambil data");
    }
  });
};

fetch(url);
