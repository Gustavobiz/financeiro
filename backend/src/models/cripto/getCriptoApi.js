import { getCoin } from "../../api/coincap.js";
export default async function execute(cripto) {
  try {
    let coins = await getCoin(cripto);
    return coins;
  } catch (err) {
    throw err;
  }
}
