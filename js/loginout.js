let localStorageUserId = JSON.parse(localStorage.getItem("UserAtualID"));
let UserAtualID =
  localStorage.getItem("UserAtualID") !== null ? localStorageUserId : [];

function loginout(){
  const UserAtualID = 0
  localStorage.setItem("UserAtualID", JSON.stringify(UserAtualID));
}

