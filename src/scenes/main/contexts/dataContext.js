import Papa from "papaparse";
import facilitiesCSV from "../data/facilities.csv?raw";

const facilities = Papa.parse(facilitiesCSV, { header: true }).data;
function provide() {
  return { facilities };
}

export default {
  provide,
};
