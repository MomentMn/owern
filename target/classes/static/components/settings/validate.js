/**
 * Created by Alex on 2018/1/11.
 */

export function checkPhone(rule, value, callback) {
    if (/^1(3[0-9]|5[0-35-9]|8[025-9])\d{8}$/.test(value)) {
        callback()
    }
    callback(new Error('phone not true error'))
}
export function checkNumber(rule, value, callback) {
    console.log("进来了")
    if (/^[0-9]*$/.test(value)) {
        callback()
    }
    callback(new Error('score must be number'))
}
