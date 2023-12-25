// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAqequorFactory = (number, arr) => {
  return {
    specimenNum: number,
    dna: arr,
    mutate() {
      // Declare dnaBases so it can be accessed inside this function
      const dnaBases = ["A", "T", "C", "G"];
      // Reassign baseOne by having math.Random point to a random index of dnaBases
      baseOne = dnaBases[Math.floor(Math.random() * 4)];
      // Assign baseTwo a different value from dnaBases, loops through the dnaBases array until baseOne !== baseTwo
      let baseTwo;
      do {
        baseTwo = dnaBases[Math.floor(Math.random() * 4)];
      } while (baseTwo === baseOne);
      // Iterate through the array, replacing base with baseTwo if base === baseOne, otherwise just returns base
      this.dna = this.dna.map((base) => (base === baseOne ? baseTwo : base));
      return this.dna;
    },
    compareDNA(otherSpecimen) {
      // Declare commonBases to store common bases between two specimens
      let commonBases = 0;
      // Iterate through the entire length of the objects dna property
      for (let i = 0; i < this.dna.length; i++) {
        // If index [i] is the same letter, increment commonBases by 1
        if (this.dna[i] === otherSpecimen.dna[i]) {
          commonBases += 1;
        }
      }
      // Convert to decimal (sum/amount) and then to percent (* 100)
      let commonBasesPercent = (commonBases / this.dna.length) * 100;
      // Log message to the console. using .toFixed(2) to only log 2 decimals
      console.log(
        `Specimen ${this.specimenNum} and ${
          otherSpecimen.specimenNum
        } have ${commonBasesPercent.toFixed(2)}% DNA in common.`
      );
    },
    willLikelySurvive() {
      // Declare empty variable to store the amount of C and G bases
      let sumCG = 0;
      // Iterate through the entire length of the objects dna property
      for (let i = 0; i < this.dna.length; i++) {
        // If the current value is either C or G, increment sumCG by 1
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          sumCG += 1;
        }
      }
      // Convert to decimal
      let cgPercent = sumCG / this.dna.length;
      // Return cgPercent if it's more than or equal to 0.6 (60%)
      return cgPercent >= 0.6;
    },
    complementStrand() {
      // Declare a new variable that will store the array returned by this.dna.map(), which iterates through this.dna and swaps out the bases with their match
      let complementArray = this.dna.map((base) => {
        if (base === "A") {
          return "T";
        } else if (base === "T") {
          return "A";
        } else if (base === "G") {
          return "C";
        } else if (base === "C") {
          return "G";
        }
      });
      return complementArray;
    },
  };
};

/**
 * Creates an array of 30 pAequor factory specimens that are likely to survive.
 * Iterates creating specimens until 30 survivable ones are found.
 * Returns the array of survivable specimens.
 */
const createSurvivableSpecimens = () => {
  const survivableSpecimens = [];
  let specimenNum;
  while (survivableSpecimens.length < 30) {
    let newSpecimen = pAqequorFactory(specimenNum, mockUpStrand());
    if (newSpecimen.willLikelySurvive()) {
      survivableSpecimens.push(newSpecimen);
      specimenNum++;
    }
  }
  return survivableSpecimens;
};

/**
 * Creates an array of pAequor specimen objects by repeatedly generating specimens and testing if they will likely survive.
 * Generates specimens by incrementing specimenNum and passing it to pAequorFactory along with a mock DNA strand.
 * Adds surviving specimens to the array until it reaches 30 specimens.
 * Returns the array of survivable specimens.
 */
const createSpecimenArray = () => {
  const specimenArray = [];
  let specimenNum = 1;

  while (specimenArray < 30) {
    let newSpecimen = pAqequorFactory(specimenNum, mockUpStrand());
    if (newSpecimen.willLikelySurvive()) {
      specimenArray.push(newSpecimen);
      specimenNum++;
    }
  }
  return specimenArray;
};

/**
 * Finds the most related pair of specimens in the given array.
 * Iterates through the array, comparing each specimen to those after it.
 * Keeps track of the pair with the highest DNA similarity percentage.
 * Returns the pair with the highest similarity.
 */
const findMostRelatedSpecimens = (specimenArray) => {
  return specimenArray.reduce(
    (mostRelated, specimen, i, arr) => {
      arr.slice(i + 1).forEach((otherSpecimen) => {
        const similarity = specimen.compareDNA(otherSpecimen);
        if (similarity > mostRelated.similarity) {
          mostRelated = { pair: [specimen, otherSpecimen], similarity };
        }
      });
      return mostRelated;
    },
    { pair: [], similarity: 0 }
  ).pair;
};

/*
// Test for .mutate(), expected output is that either C, T, A or G is completely missing from the array
console.log(pAqequorFactory(1, mockUpStrand()).mutate());
// Create DNA strands for testing
let specimen1 = pAqequorFactory(1, mockUpStrand());
let specimen2 = pAqequorFactory(2, mockUpStrand());
// Compare the two with compareDNA(), expected output: 'specimen # and specimen # have x% DNA in common' where # is value of the objects number property
specimen1.compareDNA(specimen2);
// Use same variable to check willLikelySurvive(), expected output is a boolean
console.log(specimen1.willLikelySurvive())
*/
console.log(pAqequorFactory(1, mockUpStrand()).complementStrand());
