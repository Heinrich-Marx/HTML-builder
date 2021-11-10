const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "files");
fs.readdir(dir, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  fs.access("04-copy-directory/files-copy", (err) => {
    if (!err) {
      fs.readdir("04-copy-directory/files-copy", (err, files) => {
        if (err) throw err;
        //  console.log(files);
        for (let el of files) {
          fs.unlink(path.join("04-copy-directory/files-copy", el), (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });

  fs.mkdir("04-copy-directory/files-copy", { recursive: true }, (err) => {
    if (err) throw err;
  });
  const dir2 = path.join(__dirname, "files-copy");
  files.forEach((el) => {
    fs.readFile(`${dir}/${el.name}`, "utf-8", (err, data) => {
      if (err) throw err;
      else {
        fs.writeFile(`${dir2}/${el.name}`, data, "utf-8", (err) => {
          if (err) throw err;
        });
      }
    });
  });
});
