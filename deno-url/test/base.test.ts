import { URL, URLSearchParams } from '../src'

console.log(new URL("http://baidu.com"))

const paramsString = "q=URLUtils.searchParams&topic=api";
const searchParams = new URLSearchParams(paramsString);
console.log(searchParams)