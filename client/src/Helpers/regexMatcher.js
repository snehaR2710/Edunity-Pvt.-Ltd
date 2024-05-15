export function isEmail(string) {
    return string.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

export function isPassword(string) {
    return string.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)
}