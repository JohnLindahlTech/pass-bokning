import { formatISO } from "date-fns";

export function log(...args){
  console.log(formatISO(new Date(), ''), ...args);
}

export default log;