const yargs = require('yargs');
const posts = require('./post/post.js');
const argv = yargs.argv;


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

if(command === 'list'){
    var listPosts = posts.listPosts((err, posts) => {
      if(err){
        console.log(err);
        return;
      }
      console.log(posts);
    });
    console.log('listPosts');
}

if(command === 'del'){
    console.log('delPost');
};

if(command === 'upd'){
  console.log('updPost');
};