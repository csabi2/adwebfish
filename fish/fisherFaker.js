const faker = require('faker');
const fs = require('fs');

generateFisherman = (id) => {
  return {
      id: id,
      firstName : faker.name.firstName(),
      lastName: faker.name.lastName(),
      country: faker.address.country(),
      city: faker.address.city(),
      address: faker.address.streetAddress(),
      email: faker.internet.email(),
      telephone: faker.random.number()
  }
};

var fishermen = [];
for(let i = 1; i <= 100; i++){
    fishermen.push(generateFisherman(i));
}

generateLocation = (id) => {

    locationTypes = ['Lake', 'River', 'Sea'];
    var locName = faker.lorem.word();
    return {
        id: id,
        name: `${locName.slice(0,1).toUpperCase()}${locName.slice(1)} ${faker.random.arrayElement(locationTypes)}`,
        coordinates: `${faker.random.number()}, ${faker.random.number()}`
    }
};
var locations = [];
for(let i = 1; i <= 200; i++){
    locations.push(generateLocation(i));
}
generateCatch = (id) => {

    return {
        id: id,
        fisherman: faker.random.arrayElement(fishermen).id,
        location: faker.random.arrayElement(locations).id,
        timestamp: faker.date.recent(),
        weight: faker.random.number(),
        species: faker.lorem.words(2)
    }
};
var catches = [];

for(let i = 1; i <= 50; i++){
    catches.push(generateCatch(i));
}
var equipment = [
    {id: 1, name: "Example 1", description: faker.lorem.paragraph()},
    {id: 2, name: "Example 2", description: faker.lorem.paragraph()},

];

generateFisherEquipment = (id) => {


    return {
      id: id,
      fisherman: faker.random.arrayElement(fishermen).id,
      equipment: faker.random.arrayElement(equipment).id,
      additional_description: faker.lorem.paragraph()
  }
};
var fisherEquipment = [];

for(let i = 1; i < 400; i ++){
    fisherEquipment.push(generateFisherEquipment(i));
}
fishermen.push({id: 1000, firstName: "Test", lastName: "Felhasználó", country: "Magyarország", city: "Miskolc", address: "str 11", email: "myeamil@email.com", telephone: "077777777"});
equipment.forEach(value => {
    fisherEquipment.push({
            id: 400+value.id,
            fisherman: 1000,
            equipment: value.id,
            additional_description: "Custom description"
        }
    )
});


fs.writeFile('database.fake.json',
    JSON.stringify({
        fishermen: fishermen,
        locations: locations,
        catches: catches,
        fisher_equipment: fisherEquipment,
        equipment: equipment
    }), (err) => {});
