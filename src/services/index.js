// import axios from "axios";
import sample from "lodash.sample";

async function getUsers() {
//   let { data } = await axios.get(
//     "https://randomuser.me/api/?results=2&nat=us,es,fr,gb"
//   );

//   return data.results;
 return [{"gender":"male","name":{"title":"mr","first":"gabriel","last":"blanc"},"location":{"street":"2539 rue de l'abbé-groult","city":"nantes","state":"ardèche","postcode":21976,"coordinates":{"latitude":"4.0421","longitude":"-122.3082"},"timezone":{"offset":"-3:30","description":"Newfoundland"}},"email":"gabriel.blanc@example.com","login":{"uuid":"51448912-f344-4dd2-bbe9-74c75ab672b5","username":"tinymeercat513","password":"pussycat","salt":"0lts2ZkQ","md5":"f7f3ff52be78e81e0a21f65b06d38156","sha1":"fd6faea009678f754415a547a8b7bf5ed3f17fec","sha256":"233423c4f722c4343c1ce468449cfbe1a9cbc3c162f6af9a90ecb3e8988e340c"},"dob":{"date":"1960-03-23T19:05:14Z","age":59},"registered":{"date":"2014-11-10T14:43:53Z","age":4},"phone":"02-67-34-17-35","cell":"06-03-18-19-20","id":{"name":"INSEE","value":"1NNaN73315752 94"},"picture":{"large":"https://randomuser.me/api/portraits/men/48.jpg","medium":"https://randomuser.me/api/portraits/med/men/48.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/48.jpg"},"nat":"FR"},{"gender":"male","name":{"title":"mr","first":"mariano","last":"diaz"},"location":{"street":"8240 calle mota","city":"logroño","state":"región de murcia","postcode":55070,"coordinates":{"latitude":"12.1044","longitude":"-175.8922"},"timezone":{"offset":"+3:30","description":"Tehran"}},"email":"mariano.diaz@example.com","login":{"uuid":"62d2e40c-5628-4b83-b844-b39dd7f8e9f2","username":"heavypanda815","password":"desert","salt":"6J8kJ23h","md5":"6d1e348aa2cc3776f2c1d9acc3943ffe","sha1":"e6a9c6d8b848845c9c47116f8ca9838a5e2404bb","sha256":"05d1b2215fb8a8d4cec527527e3cd86eaf25c54392aec3e488edba2f96b12d11"},"dob":{"date":"1976-05-30T21:45:40Z","age":43},"registered":{"date":"2016-11-08T06:07:01Z","age":2},"phone":"949-980-162","cell":"631-281-465","id":{"name":"DNI","value":"42654334-X"},"picture":{"large":"https://randomuser.me/api/portraits/men/30.jpg","medium":"https://randomuser.me/api/portraits/med/men/30.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/30.jpg"},"nat":"ES"}]
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
