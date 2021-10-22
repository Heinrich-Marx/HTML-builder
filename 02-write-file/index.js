const readline = require('readline');
const path = require('path')
const fs = require('fs')
console.log('Приветствую, введите ваш текст')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const textFile = path.join(__dirname,'text.txt')
fs.writeFile(textFile,'', err=>{
    if (err) {throw err}
})

rl.on('line', line => {
    if (line == 'exit') {
        console.log('Всего хорошего, до свидания')
        process.exit(0)
    }

    fs.appendFile(textFile,`\n${line}`,err => {
        if (err) {throw err}
    })
}).on('close', () => {
    console.log('Всего хорошего, до свидания')
    process.exit(0);
});