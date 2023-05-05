const fs = require("fs");

// Pfad zur JSON-Datei angeben
const filePath = "filter;.json";

// Datei asynchron auslesen
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // JSON-Datei in ein Objekt parsen
  const jsonData = JSON.parse(data);

  // Jede Zeile in der Konsole ausgeben, die kein "=" enthält
  for (let i = 0; i < jsonData.blacklist.length; i++) {
    if (!jsonData.blacklist[i].includes("=")) {
      const itemName = jsonData.blacklist[i].split("=")[0];
      console.log(`Item ${itemName} in Line ${i + 1} | Blacklist`);
    }
  }

  for (let key in jsonData.whitelist) {
    if (jsonData.whitelist.hasOwnProperty(key) && !key.includes("=")) {
      const index =
        jsonData.blacklist.length +
        Object.keys(jsonData.whitelist).indexOf(key) +
        1;
      const itemName = key;
      console.log(`Item ${itemName} in Line ${index} | Whitelist`);
    }
  }
});
