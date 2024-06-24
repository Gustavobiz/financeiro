import model from "../../models/user/userCreate.js"

export default async function handle(req, res) {
    console.log("oi");
    const { nome, cpf, email, senha, login } = req.body;
    try {
        console.log("ola");
        let response = await model(nome, cpf, email, senha, login )
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({erro:err.message});
      }
};

