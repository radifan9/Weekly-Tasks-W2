"use strict";

// General import
import { createInterface } from "node:readline/promises";
const input = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// No 1
import { fetchData } from "./src/fetchData.js";
// No 2
import { getDataFromServer, processData } from "./src/dataFromServer.js";
// No 5
import {
  showWelcomeScreen,
  mainUI,
  readPokedex,
  inputPokedex,
  getImportantData,
  deletePokedexAtIndex,
} from "./src/pokemon.js";

// No 1
// then-catch
// Success
// fetchData(true)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// Failed
/*
 * Disini failed akan muncul duluan karena jika fail tidak menjalankan setTimeout
 */
// fetchData(false)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log("INI GAGAL");
//     console.error(err);
//   });

// Try-Catch
// async function goFetchData(status) {
//   try {
//     const response = await fetchData(status);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// Success
// goFetchData(true);

// Failed
// goFetchData(false);

/*
 * Penjelasan Promise :
 * Promise merupakan perwakilan dari sebuah value yang belum diketahui nilainya.
 * Terdapat 3 state dari promised : pending, fulfilled, dan rejected.
 */

/*
 * Penjelasan Then-Catch :
 * Salah satu dari penanganan promise adalah dengan menggunakan then-catch.
 * Untuk menangani promise tersebut kita perlu melakukan chaining.
 * Jadi fungsi dengan return promise akan menjalankan .then jika operasi async berhasil.
 * Jika operasi gagal, maka akan menjalankan kode program di .catch
 * Hal yang perlu di perhatikan, jika kita membuat fungsi promise sendiri maka perlu untuk melemar
 */

/*
 * Penjelasan Async/Await :
 * Selain menggunakan Then-Catch kita juga dapat menangani promise dengan menggunakan Async/Await.
 * keyword "async" mengubah function seolah-olah kode di dalam function tersebut jalan secara asynchronous.
 * keyword "await" menunda eksekusi hingga proses asynchronous selesai
 */

/*
 * Penjelasan Try/Catch :
 * Try-Catch adalah bentuk dari error handling.
 * Kita dapat menggunakan try-catch untuk menangani kemungkinan error pada kode async maupun synchronous.
 * Di dalam block kode try kita bisa masukkan kode yang mungkin terjadi error.
 * Jika ada error atau "rejected" promised, hal tersebut akan di alihkan ke block kode catch.
 * Kita juga bisa menambahkan kode blok finnaly yang berisikan kode yang ingin kita jalankan baik itu error maupun tidak.
 */

// No 2
const getListofProduct = (status, callback) => {
  try {
    getDataFromServer(status, callback);
  } catch (error) {
    console.error(error);
  }
};

// Success
// getListofProduct(true, processData);

// Failed
// getListofProduct(false, processData);

// No 5

// while (true) {
//   showWelcomeScreen();
//   readPokedex();

//   const userInputName = await input.question(
//     "Input name of the pokemon you caught : "
//   );
//   const userInputNumberOfOwned = await input.question(
//     `Input number of caught ${userInputName} : `
//   );
//   inputPokedex(userInputName, userInputNumberOfOwned);
//   break;
// }

(async function name() {
  try {
    showWelcomeScreen();
    await readPokedex();

    mainUI();
    const userUIInput = await input.question("\nWhat do you want to do? ");

    switch (userUIInput) {
      case "1":
        const userInputName = await input.question(
          "Input name of the pokemon you caught : "
        );
        const userInputNumberOfOwned = await input.question(
          `Input number of caught ${userInputName} : `
        );
        inputPokedex(userInputName, userInputNumberOfOwned);
        break;
      case "3":
        const userInputIndex = await input.question(
          "Input pokédex index you want to delete : "
        );

        deletePokedexAtIndex(userInputIndex - 1);
        break;
    }
  } catch (error) {
    console.error(error);
  }
})();
