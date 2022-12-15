const fs = require('fs')

// load data
const loadData = () => {
    const data = fs.readFileSync('data/moduls.json', 'utf-8', );
    const dataParse = JSON.parse(data);
    return dataParse;
};

// folder datas
const folderDatas = (datas) => {
    datas.forEach(el => {
        const dirDatas = `views/moduls/${el.judul}`;
        if (!fs.existsSync(dirDatas)) {
            fs.mkdirSync(dirDatas);
        }
    })
};

// is file exist
const fileInvented = (fileName, el) => {
    fs.writeFileSync(fileName, `<%- include('../moduls-layout.ejs')%>`);
}

// file datas
const fileDatas = (data) => {
    data.forEach((el) => {
        const fileData = `views/moduls/${el.judul}/${el.id}.ejs`;
        if (!fs.existsSync(fileData)) {
            fileInvented(fileData, el);
        }
    });
};

module.exports = {
    loadData,
    folderDatas,
    fileDatas
};