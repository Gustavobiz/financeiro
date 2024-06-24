import model from "../../models/user/userCreate.js"

export default async function handle(req, res) {
    const { nome, cpf, email, senha, login } = req.body;
    try {
        let response = await model(nome, cpf, email, senha, login )
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({erro:err.message});
      }
};

