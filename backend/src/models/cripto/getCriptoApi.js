import { getCoin } from "../../api/brapi.js";
export default async function execute(cripto) {
  try {
    let coins = await getCoin(cripto);
    return coins;
  } catch (err) {
    throw err;
  }
}
