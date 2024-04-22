export function saveUserToken(userToken) {
    localStorage.setItem("TOKEN", userToken);
}
   export function getUserToken() {
    return localStorage.getItem("TOKEN");
}
   export function clearUserToken() {
    return localStorage.removeItem("TOKEN");
}

export function saveUserToken2(userToken2) {
    localStorage.setItem("TOKEN", userToken2);
}
   export function getUserToken2() {
    return localStorage.getItem("TOKEN");
}
   export function clearUserToken2() {
    return localStorage.removeItem("TOKEN");
}

export function saveUserToken3(userToken2) {
    localStorage.setItem("TOKEN", userToken2);
}
   export function getUserToken3() {
    return localStorage.getItem("TOKEN");
}
   export function clearUserToken3() {
    return localStorage.removeItem("TOKEN");
}

export function saveUserType(userType) {
    localStorage.setItem("USER_TYPE", userType);
}

export function getUserType() {
    return localStorage.getItem("USER_TYPE");
}

export function clearUserType() {
    localStorage.removeItem("USER_TYPE");
}