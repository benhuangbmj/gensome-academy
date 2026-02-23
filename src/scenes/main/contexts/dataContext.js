import Papa from "papaparse";
import facilitiesCSV from "../data/facilities.csv?raw";
import practicesCSV from "../data/practices.csv?raw";
import personnelCSV from "../data/personnel.csv?raw";
import statusCSV from "../data/status.csv?raw";
import facility_statusCSV from "../data/facility_status.csv?raw";

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
const status = Papa.parse(statusCSV, {
  header: true,
  dynamicTyping: true,
}).data;
const facilityStatus = Papa.parse(facility_statusCSV, {
  header: true,
  dynamicTyping: true,
}).data;
function provide() {
  return { facilities, practices, personnel, status, facilityStatus };
}

export default {
  provide,
};
