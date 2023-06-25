const _ = require("lodash");
const fs = require("fs");

function allPossibleCases(arr) {
  if (arr.length === 0) {
    return [];
  } else if (arr.length === 1) {
    return arr[0];
  } else {
    var result = [];
    var allCasesOfRest = allPossibleCases(arr.slice(1));
    for (var c in allCasesOfRest) {
      for (var i = 0; i < arr[0].length; i++) {
        result.push(arr[0][i] + "&" + allCasesOfRest[c]);
      }
    }
    return result;
  }
}

function generateEnchantCombinations(ids, ultEnchants, enchant) {
  const ultlvl = ["false"];
  const enchantIds = Object.keys(enchant);
  const enchantLevels = enchantIds.map((id) =>
    enchant[id].map((lvl) => `${id}:${lvl}`)
  );
  const enchantCombinations = allPossibleCases(enchantLevels);

  const allCombinations = [];
  ultlvl.forEach((ultlvlValue) => {
    ultEnchants.forEach((ultenchant) => {
      ids.forEach((id) => {
        enchantCombinations.forEach((combination) => {
          allCombinations.push(
            `"${id}=${ultenchant}:${ultlvlValue}&${combination}",`
          );
        });
      });
    });
  });
  fs.writeFile(
    "generated_combinations.txt",
    allCombinations.join("\n") + "\n",
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );
}

const ids = [
  "PET_AMMONITE_LEGENDARY",
  "PET_SQUID_LEGENDARY",
  "PET_REINDEER_LEGENDARY",
];
const ultEnchants = ["candyUsed"];
const enchant = {
  //  heldItem: [
  //"PET_ITEM_TIER_BOOST",
  //"PET_ITEM_QUICK_CLAW",
  //"PET_ITEM_MINOS_RELIC",
  //"PET_ITEM_BUBBLEGUM",
  //  ],
  rounded_level: [55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
};

generateEnchantCombinations(ids, ultEnchants, enchant);
