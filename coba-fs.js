// import fs from "node:fs/promises";

// const readPokedex = async () => {
//   try {
//     const result = await fs.readFile("data.json", "utf-8");
//     const data = JSON.parse(result);

//     for (const element of data) {
//       console.log(`---Name : ${element.name}`);
//       console.log(`-----Age : ${element.age}`);
//       console.log(`-------City : ${element.city}`);
//     }
//   } catch (error) {
//     console.error();
//   }
// };

import fs from "node:fs/promises";
import chalk from "chalk";

const readPokedex = async () => {
  try {
    const result = await fs.readFile("data.json", "utf-8");
    const data = JSON.parse(result);

    for (const element of data) {
      console.log(chalk.gray("════════════════════════════════"));
      console.log(chalk.yellow.bold(`Name : ${element.name}`));
      console.log(chalk.cyan(`Age  : ${element.age}`));
      console.log(chalk.magenta(`City : ${element.city}`));
      console.log(chalk.gray("════════════════════════════════\n"));
    }
  } catch (error) {
    console.error(error);
  }
};

const addToPokedex = async () => {
  try {
    // Write JSON data
    const oldData = [
      { name: "John", age: 30, city: "New York" },
      { name: "Budi", age: 24, city: "Bandung" },
    ];
    const newData = { name: "Mackie", age: 27, city: "Los Angeles" };

    const allData = [...oldData, newData];

    await fs.writeFile("data.json", JSON.stringify(allData, null, 2), "utf-8");
    console.log("Files created successfully");
  } catch (error) {
    console.error(error);
  }
};

const deletePokedexAtIndex = async (deleteIndex) => {
  try {
    const result = await fs.readFile("data.json", "utf-8");
    const data = JSON.parse(result);

    // Create new array of object without selected index
    const newData = [];
    for (const [index, element] of data.entries()) {
      if (index != deleteIndex) {
        // As long as index bukan yang mau di delete, masukkan
        newData[newData.length] = element;
      }
    }

    // Write new array into an json
    await fs.writeFile("data.json", JSON.stringify(newData, null, 2), "utf-8");
    console.log("Files deleted successfully");
  } catch (error) {
    console.error(error);
  }
};

const editPokedexData = async (pokemonIndex, numberOfOwned) => {
  const result = await fs.readFile("data.json", "utf-8");
  const data = JSON.parse(result);

  data[pokemonIndex].age = numberOfOwned;

  // Write new array into an json
  await fs.writeFile("data.json", JSON.stringify(data, null, 2), "utf-8");
  console.log("Files edited successfully");
};

// readPokedex();
// addToPokedex();
// deletePokedexAtIndex(1);
editPokedexData(1, 4);
