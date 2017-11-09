const yargs = require('yargs');
const posts = require('./posts');
const argv = yargs.argv;

const http = require("http");
const express = require("express");
const app = express();

var command = process.argv[2];

if(command === 'add'){
    posts.addPost(argv.title, argv.text);
}

if(command === 'get'){
    posts.getPost(argv.title, (err, post) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(post);
    });
}

const listPosts = (req, res) => {
    posts.listPosts((err, posts) => {
        if(err){
            console.log(err);
            return;
        }
        res.json(posts);
    });
};


if(command === 'del'){
    console.log('delPost');
};

if(command === 'upd'){
  console.log('updPost');
};

module.exports = {
    listPosts
};

app.get("/posts", listPosts);

http.createServer(app).listen(3000);