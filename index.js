const express = require('express'); //states the app we need to use
const ListofQuestions = require('./questions.json');//states where we get the questions from

const app = express();//the app that we are using

app.use(express.static('static'));//where the folder is in

app.get('/questionsInJson', function(response){ //reponds to the question
    let questionsNoAnswers = JSON.parse(JSON.stringify(ListofQuestions));
    for(i in questionsNoAnswers){ delete questionsNoAnswers[i].answerIndex;}
    response.json(questionsNoAnswers); 
})

app.get('/answersInJson', function(request,response){
    let questionsNoAnswers = request.query.q;//index for all the answers
    let answerIndex = request.query.a;
    let reply = "";
    let question = ListofQuestions[questionsNoAnswers];
    if(question.answerIndex == answerIndex){reply = "Correct! " + questionsNoAnswers;}//print correct if the correct answer is select
    else{reply = "Incorrect! " + questionsNoAnswers;}//print incorrect if incorrect answer is selected
    response.send(reply);
}
)
app.listen(80);//look out for port 80
