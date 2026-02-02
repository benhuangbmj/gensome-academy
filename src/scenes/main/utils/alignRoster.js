//TODO: the attending array should be restored when the game loads, not being combined with the roster.
import userContext from "../contexts/userContext";
export default function alignRoster() {
  const user = userContext.provide();
  user.roster.unshift(...user.attending);
  user.roster.push(...user.attended);
  user.attended = [];
  user.attending = [];
  user.enrolled = user.roster.length;
  console.log("Roster aligned:", user.roster);
}
