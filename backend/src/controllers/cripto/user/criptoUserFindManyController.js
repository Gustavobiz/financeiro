import model from "../../../models/cripto/user/criptoUserFindMany.js";

export default async function handle(req, res) {
  const {usuarioId} = req.body;
  try {
    let response =await model(usuarioId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({erro:err.message});
  }
}
