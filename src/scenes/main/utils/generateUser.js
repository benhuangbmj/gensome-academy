const defaultValue = { cash: 0, FP: 0, MP: 0, skills: {} };
export default function generateUser() {
  const userData = getData("user-data", JSON.stringify(defaultValue));
  const user = userData ? JSON.parse(userData) : defaultValue;
  return user;
}
