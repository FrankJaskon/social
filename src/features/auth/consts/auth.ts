export const passwordRegex: RegExp =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~\\/])[A-Za-z0-9!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~\\/]+$/g
export const usernameRegex: RegExp = /^[0-9A-Za-z.\-_]+$/
export const emailRegex: RegExp = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g
