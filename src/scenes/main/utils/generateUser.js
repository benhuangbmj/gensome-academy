const defaultValue = {
  cash: 0,
  FP: 0,
  MP: 0,
  skills: {},
  gameTime: 0,
  reputation: 0,
  roster: [],
  enrolled: 0,
};
export default function generateUser(k) {
  const userData = k.getData("user-data", JSON.stringify(defaultValue));
  const user = userData ? JSON.parse(userData) : defaultValue;
  for (let key in defaultValue) {
    if (!(key in user)) {
      user[key] = defaultValue[key];
    }
  }
  return user;
}
