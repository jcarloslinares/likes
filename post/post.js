const fs = require('fs');

const addPost = (title, text) => {
    const post = {
        title: title,
        text: text,
        tags: ['new', 'hot'],
        reactions: {
            type: 'like',
            count: 0
        }
    };

    readJSON('post-data.json', (err, posts) => {
        if(err){
            console.log(err);
            return;
        }
        const dataDuplicate = posts.filter(post => post.title === title);

        if (dataDuplicate.length === 0){
            posts.push(post);
            writeJSON('post-data.json', JSON.stringify(posts), err => {
                if(err){
                    console.log(err);
                    return;
                }
                console.log('ok');
            });
        }
    });

};

const getPost = (title, callback) => {
    readJSON('post-data.json', (err, posts) => {
        if(err){
            callback(new Error(err));
            return;
        }
        var post = posts.filter(post => post.title === title);
        callback(null, post);
    });
};

const listPosts = (callback) => {
    readJSON('post-data.json', (err, posts) => {
        if(err){
            callback(new Error(err));
            return;
        }
        callback(null, posts);
    });
};

const readJSON = (fileName, callback) => {
    fs.readFile(`data/${fileName}`, 'utf-8', (err, data) => {
        if(err){
            callback(new Error(`No se pudo leer el archivo ${fileName}`));
            return;
        }
        var parse = [];

        if(data === '') {
            callback(null, parse);
            return;
        }

        try {
            parse = JSON.parse(data);
        } catch (error) {
            callback(new Error('parsing file: ' + error));
            return;
        }
        callback(null, parse);
    });
};

const writeJSON = (fileName, data, callback) => {

    fs.writeFile(`data/${fileName}`, data, err => {
        if(err){
            callback(new Error(`No se pudo escribir en el archivo ${fileName}, ${err}`));
            return;
        }
        console.log('Data saved');
        callback(null);
    });
};

module.exports = {
    addPost,
    getPost,
    listPosts
};