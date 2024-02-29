import { md5 } from "js-md5";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}${month}${day}`;
export const TOKEN = md5(`Valantis_${formattedDate}`);