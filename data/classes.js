export class Item {
  constructor(id, weight, type, name, quantity) {
    this.quantity = quantity;
    this.id = id;
    this.weight = weight;
    this.type = type;
    this.name = name;
  }
}

// Orakel
// Klasse Choice
// export class Choice {
//   lastChoice = false;
//   constructor(arrayWithAnswers) {
//     this.list = arrayWithAnswers;
//   }
//   // Methode
//   choose() {
//     do {
//       const chooseRandomElement = Math.round(
//         Math.random() * (this.list.length - 1)
//       );
//     } while (chooseRandomElement === this.lastChoice);

//     this.lastChoice = chooseRandomElement;
//     let value = this.list[chooseRandomElement];
//     return value;
//   }
// }
