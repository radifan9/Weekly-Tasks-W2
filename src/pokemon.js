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
