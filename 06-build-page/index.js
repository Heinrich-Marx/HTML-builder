const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "assets");
const dirStyle = path.join(__dirname, "styles");
fs.mkdir("06-build-page/project-dist", { recursive: true }, (err) => {
  if (err) throw err;
});

// MAKE HTML FILE AND REPLACE TAGS
const html = fs.createReadStream("06-build-page/template.html", "utf-8");
const newHtml = fs.createWriteStream("06-build-page/project-dist/index.html");
html.pipe(newHtml);
fs.readFile("06-build-page/project-dist/index.html", "utf-8", (err, data) => {
  if (err) throw err;
  fs.readFile("06-build-page/components/header.html", "utf-8", (err, data2) => {
    if (err) throw err;
    data = data.replace("{{header}}", data2);
    fs.writeFile(
      "06-build-page/project-dist/index.html",
      data,
      "utf-8",
      (err) => {
        if (err) throw err;
      }
    );
  });
  fs.readFile(
    "06-build-page/components/articles.html",
    "utf-8",
    (err, data3) => {
      if (err) throw err;
      data = data.replace("{{articles}}", data3);
      fs.writeFile(
        "06-build-page/project-dist/index.html",
        data,
        "utf-8",
        (err) => {
          if (err) throw err;
        }
      );
    }
  );
  fs.readFile("06-build-page/components/footer.html", "utf-8", (err, data4) => {
    if (err) throw err;
    data = data.replace("{{footer}}", data4);
    fs.writeFile(
      "06-build-page/project-dist/index.html",
      data,
      "utf-8",
      (err) => {
        if (err) throw err;
      }
    );
  });
  fs.access("06-build-page/components/about.html", (err) => {
    if (!err) {
      fs.readFile(
        "06-build-page/components/about.html",
        "utf-8",
        (err, data5) => {
          if (err) throw err;
          data = data.replace("{{about}}", data5);
          fs.writeFile(
            "06-build-page/project-dist/index.html",
            data,
            "utf-8",
            (err) => {
              if (err) throw err;
            }
          );
        }
      );
    }
  });
});

// MAKE STYLE.CSS
const style = path.join(__dirname, "project-dist/style.css");
fs.writeFile(style, "", (err) => {
  if (err) throw err;
});
fs.readdir(dirStyle, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((el) => {
    if (path.extname(el.name) === ".css") {
      fs.readFile(`${dirStyle}/${el.name}`, "utf-8", (err, data) => {
        if (err) throw err;
        else {
          fs.appendFile(style, data, (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });
});

// COPY FOLDER ASSETS
fs.readdir(dir, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  fs.mkdir("06-build-page/project-dist/assets", { recursive: true }, (err) => {
    if (err) throw err;
  });
  const dir2 = path.join(__dirname, "project-dist/assets");
  // console.log(files)
  files.forEach((el) => {
    recursive(el);
    function recursive(value) {
      if (value.isFile()) {
        fs.readFile(`${dir}/${el.name}/${value.name}`, "utf-8", (err, data) => {
          if (err) throw err;
          else {
            fs.writeFile(
              `${dir2}/${el.name}/${value.name}`,
              data,
              "utf-8",
              (err) => {
                if (err) throw err;
                // else console.log("ok");
              }
            );
          }
        });
      } else {
        fs.mkdir(
          `06-build-page/project-dist/assets/${value.name}`,
          { recursive: true },
          (err) => {
            if (err) throw err;
          }
        );

        const dir3 = path.join(__dirname, `assets/${value.name}`);
        fs.readdir(dir3, { withFileTypes: true }, (err, data) => {
          if (err) throw err;
          const dir2 = path.join(
            __dirname,
            `project-dist/assets/${value.name}`
          );
          data.forEach((elem) => {
            recursive(elem);
          });
        });
      }
    }
  });
});

// fs.readdir(assets,'utf-8', (err,files) => {
//     if (err) throw  err
//     fs.mkdir('06-build-page/project-dist',{recursive: true},err=> {
//         if (err) throw  err
//     })
//     fs.mkdir('06-build-page/project-dist/assets',{recursive: true}, err => {
//         if (err) throw err
//     })
//    // console.log(assets)
//     const assets2 = path.join(__dirname, 'project-dist/assets')
//     files.forEach((el) => {
//         // fs.readFile(recurciveFile(el),'utf-8',(err,data) => {
//         //     if (err) throw err
//         //     console.log('ok')
//         // })
//         // console.log(recurciveFile(el))
//         recurciveFile(el)
//     })
// })
//
// function recurciveFile (name) {
//     const name1 = path.join(__dirname,`assets/${name}`)
//     //console.log(name1)
//     fs.readdir(name1,'utf-8',(err,data) => {
//         if (err) throw  err
//
//
//
//         // data.forEach((el) => {
//         //     console.log(name1, `-`, el)
//         // })
//         console.log(name1, '-', data)
//         // else {
//         //     if (data.isFile()) {
//         //         return path.dirname(data)
//         //     } else {
//         //         fs.readdir(data,{withFileTypes: true},(err,data2) => {
//         //             if (err) throw  err
//         //             data2.forEach((el) => {
//         //                 if (el.isFile()) return path.dirname(el)
//         //                 else recurciveFile(el)
//         //             })
//         //         })
//         //     }
//         // }
//     })
//
// }
