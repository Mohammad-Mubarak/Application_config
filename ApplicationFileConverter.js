const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
const fs = require("fs");
const app = express();
const upload = multer({ dest: "uploads/" });

const port = process.env.PORT || 4000;

app.use(express.static("public"));

app.get("/app", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
}
);


app.post("/upload", upload.single("file"), (req, res) => {
	const result = dotenv.parse(fs.readFileSync(req.file.path));
	const formattedProperties = {};
	for (const key in result) {
		formattedProperties[key] = "${" + key + "}";
	}
	const formattedPropertiesString = Object.entries(formattedProperties)
		.map(([key, value]) => `${key}=${value}`)
		.join("\n");

	fs.writeFileSync(
		"updatedApplication.properties",
		formattedPropertiesString
	);
	res.download("updatedApplication.properties");
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
