import { formatISO } from "date-fns";

export function log(...args){
  console.log(formatISO(new Date(), ''), ...args);
}

export function error(...args){
  console.error(formatISO(new Date(), ''), ...args);
}

export function createDebug(debug){
  return (...args) => {
    if(debug){
      return log(...args)
    }
  }
} 
 

export default log;