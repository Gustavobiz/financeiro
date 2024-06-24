import model from "../../models/carteira/carteiraUpdate.js"

export default function handle(req, res) {
    const {usuarioId, valor} = req.body;
    try {
        let response = model(usuarioId, valor)
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({erro:err.message});
    }
};