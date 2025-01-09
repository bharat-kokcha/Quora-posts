const express= require("express");


const app=express();
const port=8080;
const path=require("path");
const methodOverride=require('method-override')
const {v4:uuidv4}=require('uuid');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
 
//Posts array containing different post data having id, username, content 
let posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"shradhakhapra",
        content:"Hardwork is important to achieve success"
    },
    {
        id:uuidv4(),
        username:"rahulkumar",
        content:"I got selected for my 1st internship!"
    }
];

//Index Route
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//Create & New Route 

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});

    res.redirect("/posts");

});

// Show Route : Shows individual post in detail with its id 
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
});

//Update Route

app.patch("/posts/:id",(req,res)=>{
    
    let {id}=req.params;
    let newContent = req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

//Edit Route

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs");
});

//Delete Route

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
    
});



//Listening to request. An Indication that server is working successufully
app.listen(port,()=>{
    console.log("listening to port: 8080");

});