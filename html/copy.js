const fs = require("fs");
fs.copyFile("src/index.html", "build/index.html", (err) => {
	if (err) {
		console.log("unable to copy:", err)
	}
});
