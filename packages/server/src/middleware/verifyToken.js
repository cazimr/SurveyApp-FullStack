import { client } from "../config/oAuth2";
import { db } from "../index";

//verify that token is valid by google Authentication and also that user is one of the admins predefined in database
const verifyToken = async (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) return res.status(401).send("Access denied");

	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID,
		});
		const { name, email, picture } = ticket.getPayload();
		db.query("SELECT count(id) admin FROM admins WHERE email=?", [email], (err, result, fields) => {
			if (err) {
				console.log(err);
				res.status(500).send("Internal server error!");
			} else if (result[0].admin === 1) {
				req.user = { name, email, picture };
				next();
			} else res.status(401).send("Access denied");
		});
	} catch (err) {
		console.log(err);
		res.status(401).send("Access denied");
	}
};

export default verifyToken;
