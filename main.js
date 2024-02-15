import readlineSync from "readline-sync";
import { Item } from "./data/classes.js";
import { mainMenuTemplate, subMenuTemplate } from "./data/template.js";
import { storageTemplate } from "./data/template.js";

//* Hier ein Anfangslager, das ich später löschen werde, wenn ich die Funktionen zum Hinzufügen, Löschen und Updaten von Items implementiert habe.
const globalStorage = [
  { name: "Comode", id: "8", type: "Wood", quantity: 3, weight: 2 },
  { name: "Table", id: "2", type: "Stone", quantity: 4, weight: 8 },
  { name: "Chair", id: "6", type: "Plastik", quantity: 7, weight: 5 },
  { name: "Statue", id: "3", type: "Gibs", quantity: 1, weight: 5 },
];

function startProgramm() {
  // // console.log(mainMenuTemplate);

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
      /* // console.log(storageTemplate, globalStorage); // so wird nur das storageTemplate und das Array als Objekt ausgegeben, nicht die einzelnen Elemente
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
      // console.log("Das ist der gesamte Inhalt des Lagers."); */

      //% Das schreibe ich jetzt alles in eine Funktion, weil ich diese Funktion auch in anderen Fällen nutzen will.
      //>> showStorage() Funktion:

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
        console.log("Das ist der aktuelle Inhalt des Lagers.");
      }
      showStorage();

      //>> JEDES Gewicht zusammen zu rechnen um ein Gesamtgewicht ALLER Items zu erhalten.
      const totalWeight = globalStorage.reduce(
        (accumulator, item) => accumulator + item.quantity * item.weight,
        0
      );
      console.log(
        `Das Gesamtgewicht aller Items beträgt: ${totalWeight} Kilo.`
      );
      //? Wo wird die Funktion totalweight() eigentlich genau gecalled?

      //>> Erstelle ein weiteres Menü:

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
      //>> Lager anzeigen lassen:

      // Das ist der gleiche Code wie bei "R", deshalb habe ich oben in R eine Funktion showStorage() erstellt, die ich hier ganz einfach und ohne doppelt Code zu schreiben nutzen kann.

      showStorage();

      //* Beginn Updatefunktion:
      // function updateItem() {
      //   const idInput = readlineSync.question(
      //     "Bitte geben Sie die ID des Elements ein, das Sie updaten möchten: "
      //   );
      //   //? Soll ich hier parseInt verwenden? Ich denke nicht, weil ich die ID ja nicht rechnen will, sondern nur auswählen. Aber was ist, wenn der User die ID als string eingibt?
      //! readline sync wandelt die Eingabe automatisch in einen String um, deshalb brauche ich parseInt nicht und es kann unter umständen auch zu Problemen führen, wenn ich es trotzdem benutze. Wenn der User die ID als String eingibt, dann wird das Item nicht gefunden, weil die ID als String im Array gespeichert ist.

      // Das ausgewählte Item soll anhand der eingebenen ID aus dem Array globalStorage ausgewählt werden.
      // const selectedItem = globalStorage.find((item) => item.id === idInput);
      //% mit find() kann ich ein Element aus einem Array finden, das eine bestimmte Eigenschaft hat, die ich suche. In diesem Fall suche ich nach der id, die der User eingegeben hat.
      /* 
      // Sicherstellen, dass der User eine gültige ID eingegeben hat
      // if (selectedItem) {
      //   console.log("Das ausgewählte Item ist:");
      //   console.log(selectedItem);
      // } else {
      //   console.log(
      //     "Fehlerhafte Eingabe. Bitte geben Sie eine gültige ID als Zahl ein."
      //   );
      //   updateItem(); // hier wird die Funktion erneut aufgerufen, wenn der User eine ungültige ID eingegeben hat, damit er eine neue ID eingeben kann. */
      //   //! Die Verwendung eines rekursiven Aufrufs in der updateItem()-Funktion, wenn der Benutzer eine ungültige ID eingibt, kann zu einem Stapelüberlauf führen, wenn der Benutzer wiederholt ungültige IDs eingibt. Um dies zu vermeiden, sollte vielleicht besser eine Schleife verwendet werden, die so lange läuft, bis eine gültige ID eingegeben wird.
      // ...
      // updateItem();

      //? Kann ich diese Funktion auch in einer class definieren, die ich in classes.js auslagere? Wenn ja, wann wäre das sinnvoll?

      // --------------------------------------------------------------------------------
      //>> Verbesserter Code für die updateItem()-Funktion:

      function updateItem(globalStorage) {
        const idInput = readlineSync.question(
          "Bitte geben Sie die ID des Elements ein, das Sie updaten möchten: "
        );

        //* Folgendes brauche ich eig nicht (hier in dem Fall, weil ID könnte ja auch was mit buchstaben sein);
        //* ansonsten oben im ersten Case (Create) einbauen und nicht hier
        /* 
        // Validierung der Eingabe, um sicherzustellen, dass eine numerische ID eingegeben wird
        // if (isNaN(idInput)) {
        //    "Wenn die Eingabe keine Zahl ist, dann..."
        //   console.log(
        //     "Fehlerhafte Eingabe. Bitte geben Sie eine gültige ID als Zahl ein."
        //   );
        //   updateItem(globalStorage); // Rekursiver Aufruf, bis eine gültige ID eingegeben wird
        //   return; // Beende die Funktion nach dem erneuten Aufruf.
        // } // ich brauche kein else, weil ich die Funktion ja beende, wenn die Eingabe keine Zahl ist und außerdem kann ich es mir sparen, hier das item noch einmal zu loggen */

        const selectedItem = globalStorage.find(
          (item) => item.id === idInput //! hier kein parseInt, weil readlineSync die Eingabe automatisch als string speichert und es durch parseInt zu Problemen kommen kann, z.B. wenn der User eine ID mit Buchstaben eingibt.
        );
        //% .find() gibt das erste Element im Array zurück, das die Bedingung erfüllt. In diesem Fall suche ich nach dem Element, das die ID hat, die der User eingegeben hat. Ich schreibe in Klammern item, weil ich das Element, das die Bedingung erfüllt, item nennen will. Das ist aber optional, ich könnte auch etwas anderes schreiben. Nach dem => schreibe ich die Bedingung, die das Element erfüllen muss, um gefunden zu werden. In diesem Fall muss die ID des Elements die ID sein, die der User eingegeben hat.

        // Das Ergebnis speichere ich in der Variable selectedItem, die ich dann weiter unten nutzen kann.
        if (selectedItem) {
          console.log("Das ausgewählte Item ist:");
          console.log(selectedItem);
        } else {
          console.log(
            "Kein Element mit der angegebenen ID gefunden. Bitte geben Sie eine gültige ID ein."
          );
          return;
          //* Beende die Funktion, da kein Element gefunden wurde; Hier kein rekursiver Aufruf, da die Funktion nicht erneut ausgeführt werden soll, um ggf. stack overflow zu vermeiden, falls der Benutzer wiederholt ungültige IDs eingibt.
        }

        //>> Wert(e) in dem ausgewählten Item nacheinander ändern:
        // Wenn nichts geändert wird (kein Input), dann soll der alte Wert beibehalten werden.

        //* Ich muss für jede Eigenschaft des Items, die ich ändern will, eine separate Abfrage machen, weil ich readlineSync.question() nicht in einer Schleife nutzen kann, um mehrere Eigenschaften gleichzeitig zu ändern. Ich könnte readlineSync.question() in einer Schleife nutzen, aber dann müsste ich die Eigenschaften in einem Objekt speichern und das Objekt dann in einer Schleife durchgehen. Das ist aber komplizierter und ich weiß nicht, ob es überhaupt funktioniert. Deshalb mache ich es so:

        // Name
        const updatedName =
          readlineSync.question(
            `Neuer Name (bisheriger Name: ${selectedItem.name}): `
          ) || selectedItem.name;

        // ID
        const updatedId =
          readlineSync.question(
            `Neue ID (bisherige ID: ${selectedItem.id}): `
          ) || selectedItem.id;

        // Type
        const updatedType =
          readlineSync.question(
            `Neuer Typ (bisheriger Typ: ${selectedItem.type}): `
          ) || selectedItem.type;

        // Quantity
        const updatedQuantityInput = readlineSync.question(
          `Neue Menge (bisherige Menge: ${selectedItem.quantity}): `
        );
        const updatedQuantity =
          parseInt(updatedQuantityInput, 10) || selectedItem.quantity;

        // Weight
        const updatedWeightInput = readlineSync.question(
          `Neues Gewicht (bisheriges Gewicht: ${selectedItem.weight}): `
        );
        const updatedWeight =
          parseFloat(updatedWeightInput) || selectedItem.weight;

        // Das bearbeitete Element soll vor dem Push ins Array globalStorage erst noch einmal mit dem/den neuen Wert(en) angezeigt werden:
        console.log(
          `Sie sind dabei, das bisherige Item wie folgt zu verändern: ${updatedName}, ${updatedId}, ${updatedType}, ${updatedQuantity}, ${updatedWeight}`
        );

        //>> Nun wird das bearbeitete Element im Array aktualisiert:

        // Dazu muss ich den Index des bearbeiteten Elements im Array finden und das bestehende Element überschreiben. Ohne den Index zu finden, kann ich das Element nicht überschreiben, weil ich nicht weiß, an welcher Stelle im Array das Element steht. Alternativ könnte ich das Element auch löschen und ein neues Element an der gleichen Stelle einfügen, aber das ist komplizierter und ineffizienter.

        //* 1. Finde den Index des bearbeiteten Elements im Array
        const index = globalStorage.indexOf(selectedItem);

        //* 2.  Überschreibe das bestehende Element im Array mit den neuen Werten
        globalStorage[index] = new Item( // ich überschreibe das bestehende Element im Array mit einem neuen Item (new Item), das die neuen Werte hat, die ich zuvor gespeichert habe
          updatedName,
          updatedId,
          updatedType,
          updatedQuantity,
          updatedWeight
        );
      }
      updateItem(globalStorage);
      // ich rufe zuletzt die Funktion updateItem() auf und übergebe das Array globalStorage als Argument, damit ich es in der Funktion nutzen kann.

      //>> Zeige das aktualisierte Array an, um zu überprüfen, ob das Update erfolgreich war.
      // console.log(
      //   `Sie haben das Item erfolgreich geupdatet. Das ist das aktualisierte Lager: ${globalStorage}`
      // ); //?  Warum erscheint hier [object Object]? Weil ich das Array als String logge und das Array aus Objekten besteht. Ich muss also die Objekte im Array einzeln loggen mit einer Schleife.
      //*  Hier kann ich meine zuvor definierte Funktion showStorage() nutzen
      showStorage();

      break;
    case "D":
      // Lass dir dein Lager anzeigen

      showStorage();

      // Nutze z.B. die ID um das Element zu selektieren.

      const deleteInput = readlineSync.question(
        "Bitte geben Sie die ID des Elements ein, das Sie löschen möchten: "
      );

      // Überprüfe, ob die ID im Array exsistiert und entferne diesen Eintrag aus dem Array.

      const toBeDeleted = globalStorage.find((item) => item.id === deleteInput);

      if (toBeDeleted) {
        console.log("Das ausgewählte Item ist:");
        console.log(toBeDeleted);
      } else {
        console.log(
          "Kein Element mit der angegebenen ID gefunden. Bitte geben Sie eine gültige ID ein."
        );
        return;
      }

      // Lösche das ausgewählte Item aus dem Array mit der Funktion deleteItem()

      function deleteItem() {
        const index = globalStorage.indexOf(deleteItem);
        globalStorage.splice(index, 1);
        console.log(
          "Das ausgewählte Item wurde erfolgreich gelöscht. Unten sehen Sie das aktualisierte Lager:"
        );
        // showStorage();
      }
      deleteItem();

      // Zeige das aktualisierte Array an, um zu überprüfen, ob das Löschen erfolgreich war.

      showStorage();

      break;
    case "Q":
      console.log("Das Programm wird beendet. Bis zum nächsten Mal!");
      break;

    case "O":
      const askAQuestion = readlineSync.question(
        "Stellen Sie eine Ja-Nein-Frage an das Lager-Orakel:"
      );

      // Orakel

      function chooseRandomAnswer() {
        const oracleArray = [
          "Ja",
          "Nein",
          "Vielleicht",
          "Frag mich später nochmal",
          "Die Lagerhaus-Götter haben sich noch nicht entschieden",
        ];

        // zufällige Antwort aus dem Array
        const randomIndex = Math.floor(Math.random() * oracleArray.length);
        return oracleArray[randomIndex];
      }

      console.log(chooseRandomAnswer());

      break;

    default:
      console.log("Invalid input");
    //! startProgramm(); // nicht hier, weil es sonst nach jedem falschen Input wieder startet
  }
  startProgramm();
}

startProgramm();
