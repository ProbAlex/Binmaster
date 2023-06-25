const fs = require("fs");

let unsortedStrings = [];

let sortedStrings = unsortedStrings.map((string) => {
  let [key, value] = string.split("=");
  let params = value.split("&");
  params.sort();
  return key + "=" + params.join("&");
});

let data = "";
sortedStrings.forEach((i) => (data += `"${i}",\n`));

fs.writeFile("sorted_blacklist_values.txt", data, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
