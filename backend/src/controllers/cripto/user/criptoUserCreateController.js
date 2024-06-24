import model from "../../../models/cripto/user/criptoUserCreate.js";

export default async function handle(req, res) {
  const { nome_cripto, quantidade, preco_compra, usuarioId } = req.body;
  try {
    let response = await model(nome_cripto, quantidade, usuarioId);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({erro:err.message});
  }
}
