const fs = require("fs");

// Array of filenames to sort
const fileNames = ["filter.json", "filter;.json", "filter=nil.json"];

fileNames.forEach((fileName) => {
  // Read the JSON file
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Parse the JSON data
    let jsonData = JSON.parse(data);

    // Sort the blacklist array alphabetically
    jsonData.blacklist.sort();

    //sort the whitelist object alphabetically by key
    jsonData.whitelist = sortObject(jsonData.whitelist);

    // Write the sorted JSON data back to the file
    fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${fileName} sorted successfully!`);
      }
    });
  });
});

const sortObject = (obj) => {
  const sorted = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = obj[key];
    });
  return sorted;
};
