## 1. Tipp: nicht immer alles neu erstellen wenn programm neu lädt

// const globalStorage = []; // wenn das anfangs ein leeres array ist, ist das nicht schlimm, denn wir wollen da ja was rein legen

//später kann das nervig sein bei update usw. weil wenn man es neu startet das programm dann ist das wiede rleer und dann muss man wieder neue objekte usw kreiieren

// deshalb kann man im array auch schon ein paar objekte vorbereiten, die dann schon drin sind, wenn das programm startet. Und dann kann man das immer wieder neu laden beim Neustart des Programms

//z.B. so:
// const globalStorage = [
// { name: "Comode", id: "8", type: "Wood", quantity: 3, weight: 2 },
// { name: "Table", id: "2", type: "Stone", quantity: 4, weight: 8 },
// { name: "Chair", id: "6", type: "Plastik", quantity: 7, weight: 5 },
// { name: "Statue", id: "3", type: "Gibs", quantity: 1, weight: 5 },
// ];

## 2. Tipp: github code in VsCode öffnen

// man kann auf repos in github gehen und wenn man da auf den code klickt, dann öffnet sich der code in VsCode
// ganz einfach Punkt auf dem Keyboard drücken und dann öffnet sich das in VsCode
// dann kann man ganz einfach mit dem code arbeiten, als ob das lokal bei uns liegen würde
// oft muss man manche sachen dann gar nicht mehr clonen, weil man vllt ja auch gar nicht alles braucht
// wenn sich zwischendrin was in dem code ändert, dann muss man es nur neu laden und schon hat man die aktuelle version
