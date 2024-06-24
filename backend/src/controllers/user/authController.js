import model from "../../models/user/auth.js"

export default async function handle(req, res) {
    const { login, senha} = req.body;
    try {
        let response = await model(login, senha)
        return res.status(200).json(response);
    } catch (err) {
        return res.status(401).json({erro:err.message});
      }
};

