import axios from "axios";
import sample from "lodash.sample";

async function getUsers() {
  let { data } = await axios.get(
    "https://randomuser.me/api/?results=2&nat=us,es,fr,gb"
  );

  return data.results;
}

function getFact() {
  let funnyFacts = [
    "39 is the number of books in the Old Testament according to Protestant canon",
    "7e+27 is the number of atoms in the average human body",
    "400 is the number of years in a period of the Gregorian calendar, of which 97 are leap years and 303 are common",
    "141 is the number of participants (90 Indians and 51 Pilgrims) at the First Thanksgiving",
    "235 is the atomic mass number of an important isotope of the element uranium, the fissile isotope which is used as the fuel for nuclear reactors and in some nuclear weapons",
    "304 is the record number of wickets taken in English cricket season by Tich Freeman in 1928",
    '137 is the California Penal Code for "Offer bribe to influence testimony"'
  ];

  return sample(funnyFacts);
}

export { getUsers, getFact };
