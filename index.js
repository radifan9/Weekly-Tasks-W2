"use strict";

// General import
import { createInterface } from "node:readline/promises";
const input = createInterface({
  input: process.stdin,
  output: process.stdout,
});

import { fetchData } from "./src/fetchData.js";
import { getDataFromServer, processData } from "./src/dataFromServer.js";
import { divideAndSort } from "./src/divideSort.js";
import {
  showWelcomeScreen,
  mainUI,
  readPokedex,
  inputPokedex,
  deletePokedexAtIndex,
  editNumOfCaughtPokemon,
} from "./src/pokemon.js";

// ------------------------------
// ------------ No 1 ------------
// ------------------------------
// then-catch
// Success
fetchData(true)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });

// Failed
/*
 * Disini failed akan muncul duluan karena jika fail tidak menjalankan setTimeout
 */
fetchData(false)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });

// Try-Catch
async function goFetchData(status) {
  try {
    const response = await fetchData(status);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

// Success
goFetchData(true);

// Failed
goFetchData(false);

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

// ------------------------------
// ------------ No 2 ------------
// ------------------------------
const getListofProduct = (status, callback) => {
  try {
    getDataFromServer(status, callback);
  } catch (error) {
    console.error(error);
  }
};

// Success
getListofProduct(true, processData);

// Failed
getListofProduct(false, processData);

// ------------------------------
// ------------ No 3 ------------
// ------------------------------
function sortStrings(arr) {
  // source : https://www.geeksforgeeks.org/dsa/sorting-strings-using-bubble-sort-2/
  let temp;

  // Sorting strings using bubble sort
  for (let j = 0; j < arr.length - 1; j++) {
    // Outside loop : iterates through each position in the array
    for (let i = j + 1; i < arr.length; i++) {
      // Inside loop : Compares the current element with remaining
      if (arr[j].city.localeCompare(arr[i].city) > 0) {
        // Positive : arr[j] berada di belakang arr[i]
        // Negative : arr[j] berada di depan arr[i]
        // 0 : Kedua string sama
        // Contoh : "Gwenborough".localeCompare("Aliyaview") => 1
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }
}

const userData = async () => {
  try {
    // Fetch data
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) throw new Error("Error fetching data");
    const body = await response.json(); // Parse JSON as input, outuput JS obj

    // Store user data as array of object
    let userData = [];
    userData = body.map((element) => {
      const userObj = {};
      Object.assign(userObj, {
        name: element.name,
        city: element.address.city,
      });
      return userObj;
    });

    // Sort arr according to city (ascending)
    sortStrings(userData); // Pass arr reference
    console.log(userData);
  } catch (error) {
    console.error(error);
  }
};

// Run userData
userData();

// ------------------------------
// ------------ No 4 ------------
// ------------------------------
console.log(divideAndSort(5956560159466056));

// ------------------------------
// ------------ No 5 ------------
// ------------------------------
(async function name() {
  try {
    showWelcomeScreen();

    while (true) {
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

        case "2":
          const userInputPokemonIndex = await input.question(
            "Input the index of pokemon you want to change? "
          );
          const userInputNum = await input.question(
            "Input the new number of caught pokemon? "
          );
          editNumOfCaughtPokemon(userInputPokemonIndex, userInputNum);
          break;

        case "3":
          const userInputIndex = await input.question(
            "Input pokédex index you want to delete : "
          );
          deletePokedexAtIndex(userInputIndex - 1);
          break;

        default:
          console.log("Invalid option. Please choose 1, 2, or 3.");
      }
    }
  } catch (error) {
    console.error(error);
  }
})();
