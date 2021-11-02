const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "secret-folder");
fs.readdir(dir, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((el) => {
    if (el.isFile()) {
      const file = path.join(__dirname, `secret-folder/${el.name}`);
      fs.stat(file, (err, stats) => {
        if (err) throw err;
        console.log(
          `${el.name.split(".")[0]} - ${path.extname(el.name).slice(1)} - ${
            +stats.size / 1000
          }kb`
        );
      });
    }
  });
});
