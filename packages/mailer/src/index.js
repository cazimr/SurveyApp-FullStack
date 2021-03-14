// Imports
import mustache from "mustache";
import path from "path";
import fs from "fs";
import getTransport from "./transporters";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "../src/config/env";

const app = express();

// attribute "from" is not needed since it always sends from email defined in .env variable
const sendMail = async ({ subject, to, cc, bcc, data, template }) => {
	try {
		const transporter = getTransport();
		const htmlMail = fs.readFileSync(path.join(__dirname, "emails", template), "utf8");
		const htmlOutput = mustache.render(htmlMail, data);
		const info = await transporter.sendMail({
			to,
			cc,
			bcc,
			subject,
			html: htmlOutput,
		});

		return 1;
	} catch (error) {
		console.error(error.message);
		throw error;
	}
};

// APP

app.use(express.json());
app.use(cors());
app.use(helmet());

app.post("/sendmail", async (req, res) => {

	if (!req.body.mailData || !req.body.mailData.to || !req.body.mailData.data || !req.body.mailData.template)
		return res.status(400).end("Invalid request body");
	try {
		await sendMail(req.body.mailData);
		res.json({ message: "Mail delivered", status: 200 });
	} catch (err) {
		res.status(400).send("Error sending mail");
	}
});

const port = PORT || 4000;

app.listen(port, () => {
	console.log(`Mailer listening at http://localhost:${port}`);
});
