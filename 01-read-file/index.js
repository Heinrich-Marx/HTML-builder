const fs = require('fs');
const path = require('path')
const text01 = path.join(__dirname,'text.txt')
fs.readFile(text01,'utf-8',(err,content) => {
    if (err) {
        throw  err
    }
    const text = Buffer.from(content)
    console.log(text.toString())
})