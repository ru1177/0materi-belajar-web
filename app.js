const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const {
    loadData,
    folderDatas,
    fileDatas
} = require('./utils/moduls');

// built in middleware
app.use(express.static('public'));

// setup templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// home page
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Belajar Bahasa Arab',
        layout: 'main-layout'
    })
});

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Tentang Penulis',
        layout: 'main-layout'
    })
});

// list of moduls page
app.get('/list-of-moduls', (req, res) => {
    const data = loadData();
    res.render('list-of-moduls', {
        title: 'Materi Belajar',
        layout: 'main-layout',
        data,
    })
});

// moduls pages
const datas = loadData();
datas.forEach(el => {
    const materi = el.materi;
    folderDatas(datas);
    fileDatas(materi);
    materi.forEach((el, i) => {
        app.get(`/${el.judul}/${el.id}`, (req, res) => {
            res.render(`moduls/${el.judul}/${el.id}`, {
                layout: 'materi',
                pembahasan: el.pembahasan,
                el,
                materi,
            });
        });
    })
});

app.listen(3000);