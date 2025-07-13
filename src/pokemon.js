import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import chalk from "chalk";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const showWelcomeScreen = () => {
  console.log(`
⬜⬜⬛⬛⬛⬛⬜⬜░█████████             ░██                         ░██
⬜⬛🟥🟥🟥🟥⬛⬜░██     ░██            ░██                         ░██
⬛🟥🟥⬛⬛🟥🟥⬛░██     ░██  ░███████  ░██    ░██ ░███████   ░████████  ░███████  ░██    ░██
⬛⬛⬛⬜⬜⬛⬛⬛░█████████  ░██    ░██ ░██   ░██ ░██    ░██ ░██    ░██ ░██    ░██  ░██  ░██
⬛⬜⬜⬛⬛⬜⬜⬛░██         ░██    ░██ ░███████  ░█████████ ░██    ░██ ░█████████   ░█████
⬛⬜⬜⬜⬜⬜⬜⬛░██         ░██    ░██ ░██   ░██ ░██        ░██   ░███ ░██         ░██  ░██
⬜⬛⬜⬜⬜⬜⬛⬜░██          ░███████  ░██    ░██ ░███████   ░█████░██  ░███████  ░██    ░██
⬜⬜⬛⬛⬛⬛⬜⬜
`);
};

export const mainUI = async () => {
  console.log("1 : Input Caught Pokémon");
  console.log("2 : Edit Number of Caught Pokémon");
  console.log("3 : Delete Pokédex Entries");
};

export const readPokedex = async () => {
  try {
    const result = await fs.readFile(
      path.join(__dirname, "/data/data.json"),
      "utf-8"
    );
    const data = result.trim() === "" ? [] : JSON.parse(result);

    if (result.trim() === "") {
      console.log(chalk.gray(`══════════════════No0═══════════════════`));
      console.log(chalk.gray("═════════════Pokedex Empty══════════════"));
      console.log(chalk.gray("════════════════════════════════════════\n"));
      return;
    }

    for (const [index, element] of data.entries()) {
      console.log(
        chalk.gray(`══════════════════No${index + 1}═══════════════════`)
      );
      console.log(chalk.white.bold(`Pokémon : ${element.name}`));
      console.log(chalk.white(`Abilities  : ${element.abilities}`));
      console.log(chalk.white(`Types : ${element.types}`));
      console.log(chalk.white(`Owned : ${element.owned}`));
      console.log(chalk.gray("════════════════════════════════════════\n"));
    }
  } catch (error) {
    console.error(error);
  }
};

// Use Fetch API to Get a Data about
export const inputPokedex = async (inputName, inputNum) => {
  try {
    const result = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${inputName}`
    );
    if (!result.ok) {
      throw new Error("Error fetching pokemon data or pokemon name not found.");
    }
    const body = await result.json();
    let data = getImportantData(body);
    data.owned = inputNum;

    addToPokedex(data);
  } catch (error) {
    console.error(error);
  }
};

export const getImportantData = (body) => {
  const listOfAbilities = []; // List of Abilities
  const listOfTypes = [];

  // Get name
  const { name } = body;

  // Get abilities
  for (const abilityObj of body.abilities) {
    const {
      ability: { name: ability },
    } = abilityObj;
    listOfAbilities[listOfAbilities.length] = ability;
  }

  // Get types
  for (const typeObj of body.types) {
    const {
      type: { name: typeName },
    } = typeObj;
    listOfTypes[listOfTypes.length] = typeName;
  }

  // Get image
  const {
    sprites: { front_default },
  } = body;

  return {
    name,
    abilities: listOfAbilities,
    types: listOfTypes,
    image: front_default,
  };
};

const addToPokedex = async (newData) => {
  try {
    const oldDataRaw = await fs.readFile(
      path.join(__dirname, "/data/data.json"),
      "utf-8"
    );
    const oldData = oldDataRaw.trim() === "" ? [] : JSON.parse(oldDataRaw);
    const allData = [...oldData, newData];

    // Write to json file
    await fs.writeFile(
      path.join(__dirname, "/data/data.json"),
      JSON.stringify(allData, null, 2),
      "utf-8"
    );
    console.log("Pokemon successfully added to pokedex!");
    readPokedex();
  } catch (error) {
    console.error(error);
  }
};

export const editNumOfCaughtPokemon = async (index, num) => {
  try {
    const dataRaw = await fs.readFile(
      path.join(__dirname, "/data/data.json"),
      "utf-8"
    );
    const data = await JSON.parse(dataRaw);

    // Edit Num of Caught at Index
    data[index - 1].owned = num;

    // Save change
    await fs.writeFile("data.json", JSON.stringify(data, null, 2), "utf-8");
    console.log("Number of caught pokemon successfully changed!");
  } catch (error) {
    console.error(error);
  }
};

export const deletePokedexAtIndex = async (deleteIndex) => {
  try {
    const result = await fs.readFile(
      path.join(__dirname, "/data/data.json"),
      "utf-8"
    );
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
    await fs.writeFile(
      path.join(__dirname, "/data/data.json"),
      JSON.stringify(newData, null, 2),
      "utf-8"
    );
    console.log("Files deleted successfully");
  } catch (error) {
    console.error(error);
  }
};
