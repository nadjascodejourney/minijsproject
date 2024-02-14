import readlineSync from "readline-sync";
import { Item } from "./data/classes.js";
import { mainMenuTemplate } from "./data/template.js";
import { storageTemplate } from "./data/template.js";

const globalStorage = [
  { name: "Comode", id: "8", type: "Wood", quantity: 3, weight: 2 },
  { name: "Table", id: "2", type: "Stone", quantity: 4, weight: 8 },
  { name: "Chair", id: "6", type: "Plastik", quantity: 7, weight: 5 },
  { name: "Statue", id: "3", type: "Gibs", quantity: 1, weight: 5 },
];
// const oracle = [];

function startProgramm() {
  // console.log(mainMenuTemplate);
  const mainMenu = readlineSync.question(mainMenuTemplate); // question clg automatically
  switch (mainMenu.toUpperCase()) {
    case "C":
      let validInput = false;
      while (!validInput) {
        // while schleife, solange bis die Eingabe gültig ist
        const name = readlineSync.question("Name des Elements: ");
        const id = readlineSync.question("ID des Elements: ");
        const type = readlineSync.question("Typ des Elements: ");
        const quantityInput = readlineSync.question("Menge des Elements: ");
        const weightInput = readlineSync.question("Gewicht des Elements: ");

        // Überprüfung und Parsen der Eingaben; Alternativ könnte ich parseInt und parseFloat auch direkt in die Variablenzuweisung schreiben (z.B. const quantity = parseInt(readlineSync.question("Menge des Elements: "), 10);)
        const quantity = parseInt(quantityInput, 10);
        const weight = parseFloat(weightInput);

        // Überprüfung, ob die Eingaben gültig sind (innerhalb der while-Schleife, die Eingabe ggf. wiederholt werden soll)
        if (!isNaN(quantity) && !isNaN(weight)) {
          validInput = true;
          globalStorage.push(new Item(name, id, type, quantity, weight));
          console.log("Das Element wurde erfolgreich hinzugefügt:");
          console.log(globalStorage[globalStorage.length - 1]);
        } else {
          console.log(
            "Fehlerhafte Eingabe. Bitte geben Sie gültige Zahlen ein."
          );
        }
      }
      break;
    case "R":
      // console.log(storageTemplate, globalStorage); // so wird nur das storageTemplate und das Array als Objekt ausgegeben, nicht die einzelnen Elemente
      //* Wenn ich also sofort das storageTemplate UND die einzelnen Elemente ausgeben will, muss ich eine Schleife nutzen, um die Elemente auszugeben.
      console.log(storageTemplate);
      for (let i = 0; i < globalStorage.length; i++) {
        console.log(
          `ID: ${globalStorage[i].id}, Typ: ${globalStorage[i].type}, Anzahl: ${
            globalStorage[i].quantity
          }, Gewicht: ${globalStorage[i].weight}, Gesamtgewicht: ${
            globalStorage[i].quantity * globalStorage[i].weight
          }`
        );
      }
      console.log("Das ist der gesamte Inhalt des Lagers.");

      // Nutze reduce() um JEDES Gesamtgewicht zusammen zu rechnen um ein Gesamtgewicht ALLER Items zu erhalten.
      const totalWeight = globalStorage.reduce(
        (accumulator, item) => accumulator + item.quantity * item.weight,
        0
      );
      console.log(
        `Das Gesamtgewicht aller Items beträgt: ${totalWeight} Kilo.`
      );

      /* 
        - Erstelle ein weiteres Menü:
        - Wenn Input "B" eingegeben wird, dann öffne das Hauptmenü
        - Wenn Input "S" eingegeben wird, dann zeige ein neues Template, wonach sortiert werden soll.
        - Sortiere nach [N]ame, [I]d, [T]ype, [Q]uantity, [W]eight
        - Du könntest hierfür einen switch oder ein if-else nutzen */

      break;
    case "U":
      updateItem();
      break;
    case "D":
      deleteItem();
      break;
    case "Q":
      console.log("Das Programm wird beendet. Bis zum nächsten Mal!");
      break;

    // case "O":
    // oracle.push(
    //   new Choice([
    //     "Yes",
    //     "No",
    //     "Maybe",
    //     "Ask me later",
    //     "The Gods have not decided yet",
    //   ])
    // );
    // for (let i = 0; i < 10; i++) {
    //   console.log(oracle[i].choose());
    // }
    // break;
    default:
      console.log("Invalid input");
    // startProgramm(); // nicht hier, weil es sonst nach jedem falschen Input wieder startet
  }
  startProgramm();
}

startProgramm();
