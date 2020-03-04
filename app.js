const fs = require('fs');
const lineByLine = require('n-readlines');
const { PDFDocument } = require('pdf-lib');

const main = async () => {
    const names = [];
    const liner = new lineByLine('names.txt');
    let line;
    while (line = liner.next()) {
        names.push(line.toString().replace("\r","").trim());
    }

    const file = fs.readFileSync("123.pdf");
    const pdfDoc = await PDFDocument.load(file);

    for (let i = 0; i < names.length; i++) {
        const one = await PDFDocument.create();
        const [page] = await one.copyPages(pdfDoc, [i]);
        one.addPage(page);
        one.setTitle(names[i]);
        const data = await one.save();
        fs.writeFileSync("export/"+names[i]+".pdf", data);
    }

};

main();
