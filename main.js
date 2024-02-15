import readlineSync from "readline-sync";
import { Item } from "./data/classes.js";
import { mainMenuTemplate, subMenuTemplate } from "./data/template.js";
import { storageTemplate } from "./data/template.js";

const globalStorage = [
  { name: "Comode", id: "8", type: "Wood", quantity: 3, weight: 2 },
  { name: "Table", id: "2", type: "Stone", quantity: 4, weight: 8 },
  { name: "Chair", id: "6", type: "Plastik", quantity: 7, weight: 5 },
  { name: "Statue", id: "3", type: "Gibs", quantity: 1, weight: 5 },
];

function startProgramm() {
  // console.log(mainMenuTemplate);
  const mainMenu = readlineSync.question(mainMenuTemplate); // question clg automatically
  switch (
    mainMenu.toUpperCase() // toUpperCase() um sicherzustellen, dass der Input nicht case-sensitive ist
  ) {
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
          globalStorage.push(new Item(name, id, type, quantity, weight)); // hier wird das neue Item in das Array globalStorage gepusht.
          //?Wie hängt das mit dem Scope zusammen? Warum kann ich globalStorage.push() hier nutzen, obwohl globalStorage außerhalb der Funktion definiert ist? Weil es global ist?
          //? Warum kann ich dann nicht einfach globalStorage.push() nutzen, ohne es in die Funktion zu packen? => Das ist so, weil ich in diesem Fall ja die Funktion startProgramm() aufrufen muss, um das Programm überhaupt zu starten. Wenn ich globalStorage.push() außerhalb der Funktion nutzen würde, würde das nicht funktionieren, weil das Programm ja nicht startet, wenn ich nur globalStorage.push() schreibe.
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
      // console.log(storageTemplate);
      // for (let i = 0; i < globalStorage.length; i++) {
      //   console.log(
      //     `ID: ${globalStorage[i].id}, Typ: ${globalStorage[i].type}, Anzahl: ${
      //       globalStorage[i].quantity
      //     }, Gewicht: ${globalStorage[i].weight}, Gesamtgewicht: ${
      //       globalStorage[i].quantity * globalStorage[i].weight
      //     }`
      //   );
      // }
      // console.log("Das ist der gesamte Inhalt des Lagers.");

      //% Das schreibe ich jetzt alles in eine Funktion, weil ich diese Funktion auch in anderen Fällen nutzen will.
      //* showStorage() Funktion:

      function showStorage() {
        console.log(storageTemplate);
        for (let i = 0; i < globalStorage.length; i++) {
          console.log(
            `ID: ${globalStorage[i].id}, Typ: ${
              globalStorage[i].type
            }, Anzahl: ${globalStorage[i].quantity}, Gewicht: ${
              globalStorage[i].weight
            }, Gesamtgewicht: ${
              globalStorage[i].quantity * globalStorage[i].weight
            }`
          );
        }
        console.log("Das ist der gesamte Inhalt des Lagers.");
      }
      showStorage();

      // Nutze reduce() um JEDES Gesamtgewicht zusammen zu rechnen um ein Gesamtgewicht ALLER Items zu erhalten.
      const totalWeight = globalStorage.reduce(
        (accumulator, item) => accumulator + item.quantity * item.weight,
        0
      );
      console.log(
        `Das Gesamtgewicht aller Items beträgt: ${totalWeight} Kilo.`
      );
      //? Wo wird die Funktion totalweight() eigentlich genau gecalled?

      //* - Erstelle ein weiteres Menü:

      const subMenu = readlineSync.question(subMenuTemplate); // question clg automatically
      // hier muss ich deshalb wieder const subMenu schreiben, weil ich es in der switch-Abfrage immer wieder brauche. Dann arbeite ich mit readlineSync.question und in Klammern das Template, das ich nutzen will.
      //? Wie funktioniert das eigentlich, dass readlineSync mein Template als Frage ausgibt und der User dann eine Antwort eingeben kann? Der Prozess dahinter ist mir noch nicht ganz klar.

      if (subMenu.toUpperCase() === "B") {
        // - Wenn Input "B" eingegeben wird, dann öffne das Hauptmenü
        // dazu brauche ich nur die Funktion startProgramm() erneut aufzurufen, weil das Hauptmenü oben in der Funktion bereits definiert ist
        startProgramm();
      } else if (subMenu.toUpperCase() === "S") {
        // - Wenn Input "S" eingegeben wird, dann zeige ein neues Template bzw. Submenü, das nach [N]ame, [I]d, [T]ype, [Q]uantity, [W]eight sortiert
        const sortMenu = readlineSync.question(sortMenuTemplate);
        // - switch oder if-else
        switch (sortMenu.toUpperCase()) {
          case "N": // sortiere nach Name
            break;
          case "I": // sortiere nach ID
            break;
          case "T": // sortiere nach Type
            break;
          case "Q": // sortiere nach Quantity
            break;
          case "W": // sortiere nach Weight
            break;
          case "B": // kehre zurück zum Hauptmenü
            startProgramm();
            break;
          default: // falls der Input nicht gültig ist
            console.log("Invalid input");
        }
      }
      break;
    case "U":
      // Lager anzeigen lassen:
      // Das ist der gleiche Code wie bei "R", deshalb habe ich oben in R eine Funktion showStorage() erstellt, die ich hier ganz einfach und ohne doppelt Code zu schreiben nutzen kann.

      showStorage();

      // Ich schreibe eine Updatefunktion:

      function updateItem() {
        console.log(
          "Bitte geben Sie die ID des Elements ein, das Sie updaten möchten:"
        );
      }

      // Per Id soll nun ein Item ausgewählt werden, das geupdatet werden soll.

      // Als nächstes soll User neue values eingeben, mit denen das ausgewählte Update geupdatet werden soll. Wenn der Input leer bleibt, soll der alte value beibehalten werden.

      // Das bearbeitete Element soll vor dem Push ins Array globalStorage erst noch einmal angezeigt werden

      // Das bearbeitete Element soll dann ins Array gepusht werden

      // Das geupdatete Array soll dann noch einmal angezeigt werden um zu überprüfen, ob das Update erfolgreich war.

      updateItem();
      //? Wo muss ich diese Funktion definieren? Hier oder in einer anderen Datei? => Hier, weil ich sie hier aufrufe? Würde ich diese Funktion nicht aufrufen können, wenn sie in der class definiert wäre und warum? Vielleicht weil das Dateiübergreifend trotz export/import nicht funktioniert? Ich hatte damit Probleme, als ich die Funktion in einer anderen Datei definiert habe, aber das kann auch an anderen Fehlern gelegen haben.
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
