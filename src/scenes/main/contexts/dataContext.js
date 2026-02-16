import Papa from "papaparse";
import facilitiesCSV from "../data/facilities.csv?raw";
import practicesCSV from "../data/practices.csv?raw";

const facilities = Papa.parse(facilitiesCSV, { header: true }).data;
const practices = Papa.parse(practicesCSV, { header: true }).data;
function provide() {
  return { facilities, practices };
}

export default {
  provide,
};
