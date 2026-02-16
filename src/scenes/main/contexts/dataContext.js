import Papa from "papaparse";
import facilitiesCSV from "../data/facilities.csv?raw";
import practicesCSV from "../data/practices.csv?raw";
import personnelCSV from "../data/personnel.csv?raw";

const facilities = Papa.parse(facilitiesCSV, {
  header: true,
  dynamicTyping: true,
}).data;
const practices = Papa.parse(practicesCSV, {
  header: true,
  dynamicTyping: true,
}).data;
const personnel = Papa.parse(personnelCSV, {
  header: true,
  dynamicTyping: true,
}).data;
function provide() {
  return { facilities, practices, personnel };
}

export default {
  provide,
};
