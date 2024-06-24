import { getCoins, getCoin } from "../../api/brapi.js";
export default async function execute(usuarioId) {
  try {
    let coins = await getCoins();
    return coins.data.map(coin=>({
      "id": coin.id,
      "rank": coin.rank,
      "symbol": coin.symbol,
      "name": coin.name,
    }));
  } catch (err) {
    throw err;
  }
}
