import model from "../../models/cripto/getCriptoApi.js";

export default async function handle(req, res) {
  const { cripto } = req.body;
  try {
    let response = await model(cripto);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({erro:err.message});
  }
}
