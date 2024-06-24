import model from "../../../models/cripto/user/criptoUserDelete.js";

export default async function handle(req, res) {
  const {usuarioId, criptoId } = req.body;
  try {
    let response = await model(usuarioId, criptoId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({erro:err.message});
  }
}
