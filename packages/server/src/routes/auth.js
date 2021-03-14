import express from "express";
import verifyToken from '../middleware/verifyToken';
import {app} from '../index';


const router = express.Router();

const auth = () => {

	app.use("/", router);

	router.post("/login",verifyToken, (req, res) => {
		res.json(req.user);
	});
};

export default auth;
