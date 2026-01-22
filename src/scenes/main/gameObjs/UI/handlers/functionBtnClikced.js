import storeMenu from "../components/operationMenu.js/storeMenu";
let menuOpened;
let storeMenuObj;
export default function functionBtnClicked(btnTag) {
  if (storeMenuObj) {
    storeMenuObj.destroy();
    storeMenuObj = null;
  }
  if (menuOpened === btnTag) {
    menuOpened = null;
  } else {
    menuOpened = btnTag;
    storeMenuObj = storeMenu(btnTag);
  }
}
