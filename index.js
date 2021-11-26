const express = require('express');
const questionList = require('./questions.json');

const app = express();

app.use(express.static('static'));

app.get('/questionsInJson', function(req,res){
    let questionsNoAnswers = JSON.parse(JSON.stringify(questionList));
    
    for(i in questionsNoAnswers){
        delete questionsNoAnswers[i].answerIndex;
    }
    
    res.json(questionsNoAnswers); 
})


app.get('/answersInJson', function(req,res){

    let qIndex = req.query.q;
    let aIndex = req.query.a;
    let feedback = "";

    let question = questionList[qIndex];

    if(question.answerIndex == aIndex){
        feedback = "Correct! " + qIndex;
    }
    else{
        feedback = "Incorrect! " + qIndex;
    }

    res.send(feedback);
})



app.listen(80);