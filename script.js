
const MyBtn = document.querySelector(".MyBtn");
const RulesBox = document.querySelector(".RulesBox");
const ExitButton = document.querySelector(".Buttons .ExitButton");
const ContinueButton = document.querySelector(".Buttons .ContinueButton");
const Questions = document.querySelector(".Questions")

const TimeCount = document.querySelector(".TimeCount .Seconds");
const TimeLine = document.querySelector(".QuestionHeader .time_lines");

MyBtn.onclick = () =>{
    RulesBox.classList.add("activeInfo")
}

ExitButton.onclick = () =>{
    RulesBox.classList.remove("activeInfo");
}

ContinueButton.onclick = () =>{
    RulesBox.classList.remove("activeInfo");
    Questions.classList.add("activeQuiz")
     showQuestions(0)
     startTimer(15)
     startTimerLine(0);
}

const nextBtn = document.querySelector(".nextBtn");

const result_box = document.querySelector(".result_box");
const restart_quiz = document.querySelector(".buttons .restart1");
const quit_quiz = document.querySelector(".buttons .quit");



restart_quiz.onclick = ()=>{
    Questions.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    let que_count = 0; 
    let timeValue = 15; 

    let widthValue = 0;
    let userScore =0; 
    showQuestions(que_count);
    clearInterval(counter); 
    startTimer(timeValue)
    clearInterval(counterLine); 
    startTimerLine(widthValue); 
    nextBtn.style.display = "none"; 
    timeOff.textContent = "Time Left";

}

quit_quiz.onclick = () =>{
    window.location.reload();
}

let que_count = 0;
let counter;
let timeValue = 15
let counterLine;
let widthValue = 0;
let userScore = 0;

nextBtn.onclick = () =>{
    if(que_count <questions.length -1){
        que_count ++
        showQuestions(que_count);
        clearInterval(counter);
        startTimer(timeValue);

        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = "none";
    }else{
        console.log("you have complete your task") 
        showResultBox()
    }
}

function showQuestions(index){
    const que_text = document.querySelector(".text2");
    const option_list = document.querySelector(".MyOptions");
    let option_tag = '<div class="options"><span>' + questions[index].options[0] + '</span></div>'
                    +'<div class="options"><span>' + questions[index].options[1] + '</span></div>'
                    +'<div class="options"><span>' + questions[index].options[2] + '</span></div>'
                    +'<div class="options"><span>' + questions[index].options[3] + '</span></div>'
                    
    let que_tag = "<span>" + questions[index].numb + "." + questions[index].question + "</span>";
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const total_que = document.querySelector(".total_que");
    let total_tag = '<p>' + questions[index].numb + ' of 5</p>'
    total_que.innerHTML = total_tag;

    const option = option_list.querySelectorAll(".options");
    for(let i  = 0; i<option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="tick icon"><i class="fa fa-check""></i></div>'
let crossIcon = ' <div class="cross icon"><i class="fa fa-times"></i></div>'

function optionSelected(answer){
    clearInterval(counter)
    clearInterval(counterLine)
    const option_list  = document.querySelector(".MyOptions")
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloptions = option_list.children.length;
    if(userAns == correctAns){
        userScore +=1; 
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer Is Correct")
        answer.insertAdjacentHTML("beforeend", tickIcon)
    }else{
        answer.classList.add("incorrect")
        console.log("Answer Is Wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);
    

        for(let i = 0; i < alloptions; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "options correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
            }
        }
    }



    for(let i = 0 ; i< alloptions; i++){
        option_list.children[i].classList.add("disabled")
    }
    nextBtn.style.display = "block";
}

function showResultBox(){
    RulesBox.classList.remove("activeInfo");
    Questions.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = document.querySelector(".score_text");
    if(userScore > 3){
       let  scoretag = '<span>Congratulations On You Got <p>'+ userScore + '</p>Out of<p>'+ questions.length+ '</p></span>'
        scoreText.innerHTML = scoretag
    }

    else if(userScore > 1){
        let  scoretag = '<span>Carry  On You Got <p>'+ userScore + '</p>Out of<p>'+ questions.length+ '</p></span>'
         scoreText.innerHTML = scoretag
     }

     else{
        let scoretag = '<span>I Am  Sorry You Got <p>'+ userScore + '</p>Out of<p>'+ questions.length + '</p></span>'
         scoreText.innerHTML = scoretag
     }
}

function startTimer(time){
    counter = setInterval(timer, 1000)
        function timer(){
            TimeCount.textContent = time;
            time--
            if(time <9){
                let addZero = TimeCount.textContent;
                TimeCount.textContent = "0" + addZero
            }
            if(time <0){
                clearInterval(counter)
                TimeCount.textContent = '00'
            }
        }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 50);
    function timer(){
        time += 1;
        TimeLine.style.width = time + "px";
        if(time > 319){
            clearInterval(counterLine)
        }
    }
}