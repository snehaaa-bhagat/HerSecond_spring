// Creating the Tips object
const tips={
	hotflashes: "Keep a fan or cold water nearby",
	mood: "Regular sleep and light exercise",
	sleep:"Keep your room cool",
	joint: "Gentle stretching"
};
// selecting all checkboxes
const checkboxes= document.querySelectorAll('.checklist input[type="checkbox"]');
const resultsDiv=document.getElementById('results');

function updateTips(){
	let output="";

	checkboxes.forEach(function(checkbox){
		if(checkbox.checked){
			output += "<p>" + tips[checkbox.value] + "</p>";
		}
		
	});
	resultsDiv.innerHTML = output;
}
checkboxes.forEach(checkbox => {
	checkbox.addEventListener('change', updateTips);
});

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(function(question) {
  question.addEventListener('click', function() {
    const answer = question.nextElementSibling;
    answer.classList.toggle('show');
  });
});

const themeToggle=document.getElementById('theme-toggle');
themeToggle.addEventListener('click',function() {
	document.body.classList.toggle('dark');
});

const weightInput = document.getElementById('weight-input');
const calculateButton = document.getElementById('calculate-water');
const waterResult = document.getElementById('water-result');

calculateButton.addEventListener('click', function(){
	const weight=weightInput.value;
	const litres = (weight * 35) / 1000;
	waterResult.innerHTML = "You should drink about " + litres + " litres of water per day.";

});

const bmiweightInput=document.getElementById('bmi-weight-input');
const heightInput=document.getElementById('height-input');
const calculateBmiButton = document.getElementById('calculate-bmi');
const bmiResult=document.getElementById('bmi-result');


calculateBmiButton.addEventListener('click', function(){
	const weight=bmiweightInput.value;
	const height=heightInput.value;
	const heightInMeters= height/100;
	const bmi=weight/(heightInMeters * heightInMeters);
	console.log(bmi);
	let category=" ";
    if (bmi<18.5){
	category="Underweight";
    } else if(bmi<=24.9){
	category="Healthy";
    } else if(bmi<=29.9){
	category="Overweight";
    } else{
	category="Obese";
    } 
    bmiResult.innerHTML = "Your BMI is " + bmi.toFixed(1) + " (" + category + ")";


});

const reminderList= document.getElementById('reminders-list');
fetch('https://snehabhagat.pythonanywhere.com/reminders')  
   .then(response => response.json())
   .then(data => {
   	 let output="";
   	 data.reminders.forEach(function(reminder){
   	 	output += "<p>" + reminder + "</p>";
   	 });
   	 reminderList.innerHTML =output;
   });

const addReminderBtn = document.getElementById('add-reminder-btn');
const newReminderInput = document.getElementById('new-reminder-input');

addReminderBtn.addEventListener('click', function() {
  const reminderText = newReminderInput.value;

  fetch('https://snehabhagat.pythonanywhere.com/reminders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reminder: reminderText })
  })
    .then(response => response.json())
    .then(data => {
      let output = "";
      data.reminders.forEach(function(reminder) {
        output += "<p>" + reminder + "</p>";
      });
      reminderList.innerHTML = output;
    });
});

const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');

chatSendBtn.addEventListener('click', function() {
  const userMessage = chatInput.value;

fetch('https://snehabhagat.pythonanywhere.com/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: userMessage, secret: "her-second-spring-2026" })
  })
    .then(response => response.json())
    .then(data => {
    	chatMessages.innerHTML += "<p><strong>You:</strong> " + userMessage + "</p>";
      chatMessages.innerHTML += "<div><strong>AI:</strong> " + marked.parse(data.reply) + "</div>";
    	
      
    });
});


