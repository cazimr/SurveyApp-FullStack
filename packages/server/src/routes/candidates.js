import express from "express";
import crypto from "crypto";
import verifyToken from "../middleware/verifyToken";
import { db, app } from "../index";

const router = express.Router();

const candidates = () => {
	app.use("/candidate", router);

	//get all candidates
	router.get("/all", verifyToken, (req, res) => {
		try {
			db.query(
				"SELECT c.id,first_name,last_name,code,gender,DATE_FORMAT(birth_date,'%d.%m.%Y.') birth_date,email,url,pin,results FROM candidates c LEFT JOIN surveys s on c.id=s.candidate",
				(err, results) => {
					if (err) {
						console.log(err);
						res.status(500).send("Internal server error!");
					}
					else res.json(results);
				}
			);
		} catch (err) {
			console.log("error", err);
			res.status(500).send("Internal server error!");
		}
	});

	//get one candidate
	router.get("/:id", verifyToken, (req, res) => {
		const userId = parseInt(req.params.id);
		try {
			db.query(
				`SELECT c.id,first_name,last_name,code,gender,
				DATE_FORMAT(birth_date,'%d.%m.%Y.') birth_date,email,url,pin,results 
				FROM candidates c LEFT JOIN surveys s on c.id=s.candidate WHERE c.id=?`,
				[userId],
				(err, results) => {
					if (err) {
						console.log(err);
						res.status(500).send("Internal server error!");
					}
					else res.json(results);
				}
			);
		} catch (err) {
			console.log("error", err);
			res.status(500).send("Internal server error!");
		}
	});

	//add new candidate
	router.post("/", verifyToken, (req, res) => {
		if (
			!req.body.firstName ||
			!req.body.lastName ||
			!req.body.code ||
			!req.body.gender ||
			!req.body.birthDate ||
			!req.body.email
		)
			return res.status(400).end("Invalid request body!");
		try {
			db.query(
				"INSERT INTO candidates(first_name,last_name,code,gender,birth_date,email) VALUES (?,?,?,?,?,?)",
				[
					req.body.firstName,
					req.body.lastName,
					req.body.code,
					req.body.gender,
					req.body.birthDate,
					req.body.email,
				],
				(err, results) => {
					if (err) {
						console.log(err);
						res.status(500).send("Internal server error!");
					}
					else if (results.affectedRows === 1) res.status(201).end("Candidate added successfully");
					else res.status(500).send("Adding candidate failed!");
				}
			);
		} catch (err) {
			console.log("error", err);
			res.status(500).send("Internal server error!");
		}
	});
	//delete candidate
	router.delete("/:id", verifyToken, (req, res) => {
		const userId = parseInt(req.params.id);
		try {
			db.query("DELETE FROM candidates WHERE id=?", [userId], (err, results) => {
				if (err) {
					console.log(err);
					res.status(500).send("Internal server error");
				}
				else if (results.affectedRows === 0)
					return res.status(400).send("Candidate with given id wasn't found!");
				else res.status(200).send("Candidate removed successfully!");
			});
		} catch (err) {
			console.log("Error", err);
			res.status(500).send("Internal server error!");
		}
	});

	//generate survey
	router.post("/survey", verifyToken, (req, res) => {
		if (!req.body.userId) return res.status(400).send("Invalid request body");
		const userId = req.body.userId;
		crypto.randomBytes(40, (err, buffer) => {
			if (err) return res.status(500).send("Internal server errror!");
			const url = `http://localhost:3000/survey/${buffer.toString("hex")}`;
			crypto.randomBytes(3, (err2, buff2) => {
				if (err2) return res.status(500).send("Internal server errror!");
				const pin = buff2.toString("hex");
				db.query(
					"INSERT INTO surveys(url,pin,candidate) VALUES (?,?,?)",
					[url, pin, userId],
					(err, results) => {
						if (err) {
							console.log(err);
							res.status(500).send("Internal server error!");
						} else if (results.affectedRows === 1) res.status(201).json({ userId, url, pin });
						else res.status(500).send("Creating survey failed!");
					}
				);
			});
		});
	});

	//check url
	router.post("/surveyUser", (req, res) => {
		if (!req.body.url) return res.status(400).send("Invalid request body");
		try {
			db.query(
				`SELECT c.id id,first_name,last_name,code,gender,
		DATE_FORMAT(birth_date,'%d.%m.%Y.') birth_date,email,url,pin,results 
		FROM candidates c LEFT JOIN surveys s on c.id=s.candidate WHERE url=?`,
				[req.body.url],
				(err, results) => {
					if (err) {
						console.log(err);
						res.status(500).send("Internal server error!");
					}
					else if(results.length===1) res.json(results);
					else res.status(400).send("Invalid url!");
					
				}
			);
		} catch (err) {
			res.status(500).send("Internal server error");
		}
	});

	//After survey finish
	router.put("/survey/:id", (req, res) => {
		const userId = parseInt(req.params.id);
		if (!req.body.results) return res.status(400).send("Invalid request body");
		try {
			db.query(
				`UPDATE surveys SET results=?  WHERE candidate=?`,
				[req.body.results, userId],
				(err, results) => {
					if (err) {
						console.log(err);
						res.status(500).send("Internal server error!");
					}
					if (results.affectedRows === 1) res.send("Successful survey input!");
					else res.status(500).send("Candidate with given id doesn't exist!");
				}
			);
		} catch (err) {
			res.status(500).send("Internal server error");
		}
	});
};

export default candidates;
