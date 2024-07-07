import express, { request } from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let comment = new Array();
let commentNum = 1;
let isLastComment=true;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function Comment(name, email, message, ID, time) {
  this.name = name;
  this.email = email;
  this.message = message;
  this.commentID = ID;
  this.time=time;
}

app.get("/", (req, res) => {
  res.render("index.ejs", { comments: comment, isLast: isLastComment });
});


app.post("/update/:id", (req, res) => {
  //get the object index from parameter id of edit button
  const commentId = req.params.id;
  console.log(commentId);
  const updatedComment = req.body.message;
  comment[commentId-1].message = updatedComment;
  res.render("index.ejs", { comments: comment, isLast: isLastComment});
});

app.post("/edit/:id", (req, res) => {
  //get the object index by passing the param to url
  const param_id = req.params.id;
  console.log(param_id);
  res.render("edit-comment.ejs", { id: param_id });
});

app.post("/delete/:id", (req, res) => {
  //deletes a comment and decrements currentIndex not yet finished
  const param_id = parseInt(req.params.id);
  const targetIndex = comment.findIndex(
    (comment) => comment.commentID === param_id
  );
  if (targetIndex !== -1) {
    comment.splice(targetIndex, 1);
    if(comment.length===0) {
      isLastComment=true;
    } else {
      isLastComment=false;
    }
    console.log("del:" + param_id);
    res.render("index.ejs", { comments: comment, isLast: isLastComment });
  }

  // currentIndex--;
});

app.post("/submit", (req, res) => {
  //add function that will create a new Comment object that is also an array
  const date= new Date();
  comment.push(
    new Comment(req.body.name, req.body.email, req.body.message, commentNum, date)
  );
  commentNum++; //actual number of comments
  isLastComment=false;
  res.render("index.ejs", {
    comments: comment,
    isLast: isLastComment
  });
  console.log(comment);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
