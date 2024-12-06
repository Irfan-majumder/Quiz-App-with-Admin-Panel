// Check session storage on dashboard
var brandCode = sessionStorage.getItem("brandCode");

if (brandCode === null) {
    // Clear body and show unauthorized access warning
    document.body.innerHTML = "";
    document.body.style.background = "purple";
    
    // Use SweetAlert2 for warning
    Swal.fire({
        icon: 'warning',
        title: 'Unauthorized Access',
        text: 'Please login first',
        confirmButtonText: 'Go to Login'
    }).then(() => {
        // Redirect to login page
        window.location = "../company/hell.html";
    });
} else {
    // Retrieve user data
    var allUserData = JSON.parse(localStorage.getItem(brandCode));
    
    // Set welcome message
    var brandNameEl = document.getElementById("brand-name");
    brandNameEl.innerHTML = "Welcome " + allUserData.brandName;
    
    // Logout functionality
    var logoutBtn = document.querySelector("#logout-btn");
    logoutBtn.addEventListener('click', (e) => {
        e.target.innerHTML = "Please Wait...";
        logoutBtn.disabled = true;
        e.target.style.background = "pink";
        
        setTimeout(function() {
            // Clear session storage on logout
            sessionStorage.removeItem("brandCode");
            
            // Redirect to login page
            window.location = "../company/hell.html";
        }, 2000);
    });
}


//new
/*
//start store subject coding
var visiblesubject= document.querySelector(".visible-subject");
var subjectBtn=document.querySelector(".subject-btn");
var subjectEl = document.querySelector(".subject");
subjectBtn.onclick= function(e){
    e.preventDefault();
    if(subjectEl.value !=""){
        newSubject();
    }
    else{
        Swal.fire({
            icon: 'warning',
            title: 'subject is empty',
            text: 'Please enter Subject',
            confirmButtonText: 'Go to Login'
        })
    }
}

const newSubject = () => {
    visiblesubject.innerHTML =`

    <div class="d-flex justify-content-between align-items-center">
            <h3>${subjectEl.value}</h3>
                <div>
                    <i class="fa fa-edit mx-2" style="font-size: 22px;"></i>
                    <i class="fa fa-save mx-2 d-none" style="font-size: 22px;"></i>
                    <i class="fa fa-trash mx-2" style="font-size: 22px;"></i>
                </div>
    </div>              
    `;
}
    */

///////////////////////////////////hello
/*
// Initialize subjects array in localStorage
let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

var visiblesubject = document.querySelector(".visible-subject");
var subjectBtn = document.querySelector(".subject-btn");
var subjectEl = document.querySelector(".subject");

// Render existing subjects on page load
function renderSubjects() {
    visiblesubject.innerHTML = subjects.map((subject, index) => `
        <div class="d-flex justify-content-between align-items-center" data-index="${index}">
            <h3>${subject}</h3>
            <div>
                <i class="fa fa-edit mx-2" style="font-size: 22px;"></i>
                <i class="fa fa-save mx-2 d-none" style="font-size: 22px;"></i>
                <i class="fa fa-trash mx-2" style="font-size: 22px;"></i>
            </div>
        </div>
    `).join('');
    
    // Add event listeners for edit, save, and delete
    addSubjectListeners();
}

subjectBtn.onclick = function(e) {
    e.preventDefault();
    
    if(subjectEl.value.trim() !== "") {
        // Add new subject
        subjects.push(subjectEl.value.trim());
        
        // Save to localStorage
        localStorage.setItem('subjects', JSON.stringify(subjects));
        
        // Render subjects
        renderSubjects();
        
        // Clear input
        subjectEl.value = '';
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Subject is empty',
            text: 'Please enter Subject',
            confirmButtonText: 'OK'
        });
    }
}

function addSubjectListeners() {
    // Edit functionality
    document.querySelectorAll('.fa-edit').forEach(editIcon => {
        editIcon.onclick = function() {
            const subjectContainer = this.closest('.d-flex');
            const subjectText = subjectContainer.querySelector('h3');
            const saveIcon = subjectContainer.querySelector('.fa-save');
            
            // Replace text with input
            const originalText = subjectText.textContent;
            subjectText.innerHTML = `<input type="text" value="${originalText}" class="form-control">`;
            
            // Toggle icons
            this.classList.add('d-none');
            saveIcon.classList.remove('d-none');
        }
    });

    // Save functionality
    document.querySelectorAll('.fa-save').forEach(saveIcon => {
        saveIcon.onclick = function() {
            const subjectContainer = this.closest('.d-flex');
            const subjectInput = subjectContainer.querySelector('input');
            const editIcon = subjectContainer.querySelector('.fa-edit');
            
            // Get new subject value
            const newSubject = subjectInput.value.trim();
            
            // Update in subjects array
            const index = subjectContainer.getAttribute('data-index');
            subjects[index] = newSubject;
            
            // Save to localStorage
            localStorage.setItem('subjects', JSON.stringify(subjects));
            
            // Re-render subjects
            renderSubjects();
        }
    });

  
            //sweet alert delete effect
            // Delete functionality
document.querySelectorAll('.fa-trash').forEach(trashIcon => {
    trashIcon.onclick = function() {
        const subjectContainer = this.closest('.d-flex');
        const index = subjectContainer.getAttribute('data-index');
        
        // SweetAlert confirmation
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // Only delete if user confirmed
                subjects.splice(index, 1);
                localStorage.setItem('subjects', JSON.stringify(subjects));
                renderSubjects();
                
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Subject has been deleted.",
                    icon: "success"
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your subject is safe :)",
                    icon: "error"
                });
            }
        });
    }
});
            const subjectContainer = this.closest('.d-flex');
            const index = subjectContainer.getAttribute('data-index');
            
            // Remove from subjects array
            subjects.splice(index, 1);
            
            // Save to localStorage
            localStorage.setItem('subjects', JSON.stringify(subjects));
            
            // Re-render subjects
            renderSubjects();
        }


// Render subjects on page load
renderSubjects();

// start choosing subject in question-form
var chooseSubject = document.querySelector("#choose-subject");
var questionForm = document.querySelector(".question-form");

questionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //alert();
   // var selectedSubject = chooseSubject.value; // Get the selected subject
   // alert("You have selected: " + selectedSubject); // Display the selected subject in the alert
});
*/

// Initialize subjects array in localStorage

let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

var visiblesubject = document.querySelector(".visible-subject");
var subjectBtn = document.querySelector(".subject-btn");
var subjectEl = document.querySelector(".subject");
var chooseSubject = document.querySelector("#choose-subject");
var questionForm = document.querySelector(".question-form");

// Function to update dropdown options
function updateSubjectDropdown() {
    // Clear existing options
    chooseSubject.innerHTML = '<option value="">Select a subject</option>';
    
    // Add current subjects as options
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        chooseSubject.appendChild(option);
    });
}

// Render existing subjects on page load
function renderSubjects() {
    visiblesubject.innerHTML = subjects.map((subject, index) => `
        <div class="d-flex justify-content-between align-items-center" data-index="${index}">
            <h3>${subject}</h3>
            <div>
                <i class="fa fa-edit mx-2" style="font-size: 22px;"></i>
                <i class="fa fa-save mx-2 d-none" style="font-size: 22px;"></i>
                <i class="fa fa-trash mx-2" style="font-size: 22px;"></i>
            </div>
        </div>
    `).join('');
    
    // Update dropdown whenever subjects are rendered
    updateSubjectDropdown();
    
    // Add event listeners for edit, save, and delete
    addSubjectListeners();
}

subjectBtn.onclick = function(e) {
    e.preventDefault();
    
    if(subjectEl.value.trim() !== "") {
        // Add new subject
        subjects.push(subjectEl.value.trim());
        
        // Save to localStorage
        localStorage.setItem('subjects', JSON.stringify(subjects));
        
        // Render subjects and update dropdown
        renderSubjects();
        
        // Clear input
        subjectEl.value = '';
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Subject is empty',
            text: 'Please enter Subject',
            confirmButtonText: 'OK'
        });
    }
}

function addSubjectListeners() {
    // Edit functionality
    document.querySelectorAll('.fa-edit').forEach(editIcon => {
        editIcon.onclick = function() {
            const subjectContainer = this.closest('.d-flex');
            const subjectText = subjectContainer.querySelector('h3');
            const saveIcon = subjectContainer.querySelector('.fa-save');
            
            // Replace text with input
            const originalText = subjectText.textContent;
            subjectText.innerHTML = `<input type="text" value="${originalText}" class="form-control">`;
            
            // Toggle icons
            this.classList.add('d-none');
            saveIcon.classList.remove('d-none');
        }
    });

    // Save functionality
    document.querySelectorAll('.fa-save').forEach(saveIcon => {
        saveIcon.onclick = function() {
            const subjectContainer = this.closest('.d-flex');
            const subjectInput = subjectContainer.querySelector('input');
            const editIcon = subjectContainer.querySelector('.fa-edit');
            
            // Get new subject value
            const newSubject = subjectInput.value.trim();
            
            // Update in subjects array
            const index = subjectContainer.getAttribute('data-index');
            subjects[index] = newSubject;
            
            // Save to localStorage
            localStorage.setItem('subjects', JSON.stringify(subjects));
            
            // Re-render subjects and update dropdown
            renderSubjects();
        }
    });

    // Delete functionality
    document.querySelectorAll('.fa-trash').forEach(trashIcon => {
        trashIcon.onclick = function() {
            const subjectContainer = this.closest('.d-flex');
            const index = subjectContainer.getAttribute('data-index');
            
            // SweetAlert confirmation
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            
            swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    // Only delete if user confirmed
                    subjects.splice(index, 1);
                    localStorage.setItem('subjects', JSON.stringify(subjects));
                    
                    // Re-render subjects and update dropdown
                    renderSubjects();
                    
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Subject has been deleted.",
                        icon: "success"
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your subject is safe :)",
                        icon: "error"
                    });
                }
            });
        }
    });
}

// Question form submission handler

/*
var allQuestionInput = questionForm.querySelectorAll("INPUT");
var allQuestion = JSON.parse(localStorage.getItem(brandCode+"_"+chooseSubject.value+"_question")) || [];
questionForm.addEventListener("submit", (e) => {
    
    e.preventDefault();

    
    
    
    if (!chooseSubject.value) {
        Swal.fire({
            icon: 'warning',
            title: 'Subject Required',
            text: 'Please select a subject before submitting',
            confirmButtonText: 'OK'
        });
        return;
    } else{
        allQuestion.push({
            question : allQuestionInput[0].value,
              optionOne: allQuestionInput[1].value,
              optionTwo: allQuestionInput[2].value,
              optionThree: allQuestionInput[3].value,
              optionFour: allQuestionInput[4].value,
              correctAnswer: allQuestionInput[5].value

        });

        localStorage.setItem(brandCode+"_"+chooseSubject.value+"_question",JSON.stringify(allQuestion));
        console.log(allQuestion);
        
        
    }
    
    // Handle form submission with selected subject
    console.log('Selected subject:', chooseSubject.value);
    // Add your form submission logic here
      
});




// Question form submission handler

var allQuestionInput = questionForm.querySelectorAll("INPUT");


// Function to get questions for a specific subject
function getQuestionsBySubject(subject) {
    const key = `${brandCode}_${subject}_question`;
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Function to save questions for a specific subject
function saveQuestionsToSubject(subject, questions) {
    const key = `${brandCode}_${subject}_question`;
    localStorage.setItem(key, JSON.stringify(questions));
}

// Function to clear form inputs
function clearForm() {
    allQuestionInput.forEach(input => input.value = '');
}

// Function to validate form
function validateForm() {
    if (!chooseSubject.value) {
        Swal.fire({
            icon: 'warning',
            title: 'Subject Required',
            text: 'Please select a subject before submitting',
            confirmButtonText: 'OK'
        });
        return false;
    }

    // Check if all inputs have values
    for (let input of allQuestionInput) {
        if (!input.value.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Form',
                text: 'Please fill all fields before submitting',
                confirmButtonText: 'OK'
            });
            return false;
        }
    }
    return true;
}

questionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const selectedSubject = chooseSubject.value;
   
    
    // Get existing questions for the selected subject
    const subjectQuestions = getQuestionsBySubject(selectedSubject);

    // Create new question object
    const newQuestion = {
        question: allQuestionInput[0].value,
        optionOne: allQuestionInput[1].value,
        optionTwo: allQuestionInput[2].value,
        optionThree: allQuestionInput[3].value,
        optionFour: allQuestionInput[4].value,
        correctAnswer: allQuestionInput[5].value
    };

    // Add new question to the subject's questions
    subjectQuestions.push(newQuestion);

    // Save updated questions back to localStorage
    saveQuestionsToSubject(selectedSubject, subjectQuestions);

    // Show success message
    Swal.fire({
        icon: 'success',
        title: 'Question Added',
        text: `Question successfully added to ${selectedSubject}`,
        confirmButtonText: 'OK'
    })

    // Clear the form
    clearForm();

    // Log for debugging
    console.log(`Questions for ${selectedSubject}:`, subjectQuestions);
});

// Helper function to display questions for a specific subject
function displaySubjectQuestions(subject) {
    if (!subject) {
        console.log('No subject selected');
        return;
    }
    const questions = getQuestionsBySubject(subject);
    console.log(`Questions for ${subject}:`, questions);
    return questions;
}

// Update question display when subject changes
chooseSubject.addEventListener('change', () => {
    const selectedSubject = chooseSubject.value;
    if (selectedSubject) {
        displaySubjectQuestions(selectedSubject);
    }

    
});


//UPDATE AND DELETE QUESTION

//const selectSubject = document.querySelector("#select-subject");

// Initialize on page load
renderSubjects();


//renderSubjects();

//get the subjects saved in local storage in the dropdown of option with id select-subject
const selectSubject = JSON.parse(localStorage.getItem("subjects"));
if (selectSubject) {
    selectSubject.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject;
        option.text = subject;
        document.getElementById("select-subject").appendChild(option);
        });
        }
        

 //Start returning question from the local storage


var newQuestions = [];
const selectAsSubject = document.querySelector("#select-subject");
const visibleQuestion = document.querySelector(".visible-question");

selectAsSubject.addEventListener('change', () => {
    const selectedSubject = selectAsSubject.value;
    const questionKey = `${brandCode}_${selectedSubject}_question`;
    const questionData = localStorage.getItem(questionKey);

    if (questionData && JSON.parse(questionData).length > 0) {
        // Show success message if data exists
        Swal.fire({
            icon: 'success',
            title: 'Data Available',
            text: `Questions found for ${selectedSubject}`,
            confirmButtonText: 'OK'
        });
        visibleQuestion.innerHTML = ''; // Clear the "No Data" message
        newQuestions = JSON.parse(questionData); // Update the newQuestions array
        console.log(newQuestions);
    } else {
        // Show warning message if no data exists
        Swal.fire({
            icon: 'warning',
            title: 'No Data Available',
            text: `No questions found for ${selectedSubject}`,
            confirmButtonText: 'OK'
        });
        //visibleQuestion.innerHTML = "<b style='color:red'>No Data Available</b>";
    }
});


*/



// Question form submission handler
var allQuestionInput = questionForm.querySelectorAll("INPUT");
var allQuestion = JSON.parse(localStorage.getItem(brandCode+"_"+chooseSubject.value+"_question")) || [];

/*questionForm.addEventListener("submit", (e) => {
    
    e.preventDefault();

    
    
    
    if (!chooseSubject.value) {
        Swal.fire({
            icon: 'warning',
            title: 'Subject Required',
            text: 'Please select a subject before submitting',
            confirmButtonText: 'OK'
        });
        return;
    } else{
        allQuestion.push({
            question : allQuestionInput[0].value,
              optionOne: allQuestionInput[1].value,
              optionTwo: allQuestionInput[2].value,
              optionThree: allQuestionInput[3].value,
              optionFour: allQuestionInput[4].value,
              correctAnswer: allQuestionInput[5].value

        });

        localStorage.setItem(brandCode+"_"+chooseSubject.value+"_question",JSON.stringify(allQuestion));
        console.log(allQuestion);
        
        
    }
    
    // Handle form submission with selected subject
    console.log('Selected subject:', chooseSubject.value);
    // Add your form submission logic here
      
});

*/


// Question form submission handler

var allQuestionInput = questionForm.querySelectorAll("INPUT");


// Function to get questions for a specific subject
function getQuestionsBySubject(subject) {
    const key = `${brandCode}_${subject}_question`;
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Function to save questions for a specific subject
function saveQuestionsToSubject(subject, questions) {
    const key = `${brandCode}_${subject}_question`;
    localStorage.setItem(key, JSON.stringify(questions));
}

// Function to clear form inputs
function clearForm() {
    allQuestionInput.forEach(input => input.value = '');
}

// Function to validate form
function validateForm() {
    if (!chooseSubject.value) {
        Swal.fire({
            icon: 'warning',
            title: 'Subject Required',
            text: 'Please select a subject before submitting',
            confirmButtonText: 'OK'
        });
        return false;
    }

    // Check if all inputs have values
    for (let input of allQuestionInput) {
        if (!input.value.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Form',
                text: 'Please fill all fields before submitting',
                confirmButtonText: 'OK'
            });
            return false;
        }
    }
    return true;
}

questionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const selectedSubject = chooseSubject.value;
   
    
    // Get existing questions for the selected subject
    const subjectQuestions = getQuestionsBySubject(selectedSubject);

    // Create new question object
    const newQuestion = {
        question: allQuestionInput[0].value,
        optionOne: allQuestionInput[1].value,
        optionTwo: allQuestionInput[2].value,
        optionThree: allQuestionInput[3].value,
        optionFour: allQuestionInput[4].value,
        correctAnswer: allQuestionInput[5].value
    };

    // Add new question to the subject's questions
    subjectQuestions.push(newQuestion);

    // Save updated questions back to localStorage
    saveQuestionsToSubject(selectedSubject, subjectQuestions);

    // Show success message
    Swal.fire({
        icon: 'success',
        title: 'Question Added',
        text: `Question successfully added to ${selectedSubject}`,
        confirmButtonText: 'OK'
    })

    // Clear the form
    clearForm();

    // Log for debugging
   // console.log(`Questions for ${selectedSubject}:`, subjectQuestions);
});

// Helper function to display questions for a specific subject
function displaySubjectQuestions(subject) {
    if (!subject) {
        console.log('No subject selected');
        return;
    }
    const questions = getQuestionsBySubject(subject);
    console.log(`Questions for ${subject}:`, questions);
    return questions;
}

// Update question display when subject changes
chooseSubject.addEventListener('change', () => {
    const selectedSubject = chooseSubject.value;
    if (selectedSubject) {
        displaySubjectQuestions(selectedSubject);
    }

    
});


//UPDATE AND DELETE QUESTION

//const selectSubject = document.querySelector("#select-subject");

// Initialize on page load
renderSubjects();


//renderSubjects();

//get the subjects saved in local storage in the dropdown of option with id select-subject
const selectSubject = JSON.parse(localStorage.getItem("subjects"));
if (selectSubject) {
    selectSubject.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject;
        option.text = subject;
        document.getElementById("select-subject").appendChild(option);
        });
        }
        

 //Start returning question from the local storage


var newQuestions = [];
const selectAsSubject = document.querySelector("#select-subject");
const visibleQuestion = document.querySelector(".visible-question");

selectAsSubject.addEventListener('change', () => {
    const selectedSubject = selectAsSubject.value;
    const questionKey = `${brandCode}_${selectedSubject}_question`;
    const questionData = localStorage.getItem(questionKey);

    if (questionData && JSON.parse(questionData).length > 0) {
        // Show success message if data exists
       /* Swal.fire({
            icon: 'success',
            title: 'Data Available',
            text: `Questions found for ${selectedSubject}`,
            confirmButtonText: 'OK'
        }); */
        visibleQuestion.innerHTML = ''; // Clear the "No Data" message
        newQuestions = JSON.parse(questionData); // Update the newQuestions array
        console.log(newQuestions);
        visibleQuestion.innerHTML =("");
        newQuestionsFunc();
    } else {
        // Show warning message if no data exists
        Swal.fire({
            icon: 'warning',
            title: 'No Data Available',
            text: `No questions found for ${selectedSubject}`,
            confirmButtonText: 'OK'
        });
        visibleQuestion.innerHTML = "<b style='color:red'>No Data Available</b>";
    }
});




const newQuestionsFunc = () => {
    visibleQuestion.innerHTML = ''; // Clear existing content
    
    newQuestions.forEach((question, index) => {
        visibleQuestion.innerHTML += `
        <div class="mb-3">
            
            
            <div class="d-flex justify-content-between">
            <h4>${index + 1}. ${question.question}</h4>
            <br>
                <div>
                    
                    <i class="fa fa-edit edit-btn mx-2"></i>
                    <i class="fa fa-save save-btn d-none mx-2"></i>
                    <i class="fa fa-trash del-btn mx-2" data-index="${index}"></i>
                </div>
                
            </div>
            <br>
            <div>
                <span>1. ${question.optionOne}</span>
                <br><br>
                <span>2. ${question.optionTwo}</span>
                <br><br>
                <span>3. ${question.optionThree}</span>
                <br><br>
                <span>4. ${question.optionFour}</span>
                <br><br>
                <span class="bg-info p-2 text-white">${question.correctAnswer}</span>
                <br><br>
            </div>
        </div>
        `;
    }); 

    // Add delete functionality
    const deleteButtons = visibleQuestion.querySelectorAll('.del-btn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            var index = parseInt(e.target.getAttribute('data-index'));
            
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Remove the question from the array
                    newQuestions.splice(index, 1);
                    
                    // Update localStorage
                    const selectedSubject = selectAsSubject.value;
                    const questionKey = `${brandCode}_${selectedSubject}_question`;
                    localStorage.setItem(questionKey, JSON.stringify(newQuestions));
                    
                    // Re-render the questions
                    newQuestionsFunc();
                    
                    Swal.fire(
                        'Deleted!',
                        'Your question has been deleted.',
                        'success'
                    );
                }
            });
        });
    });

    //start edit button code
    var allEditBtn = visibleQuestion.querySelectorAll('.edit-btn');

    allEditBtn.forEach((editBtn) => {
        editBtn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const saveBtn = this.nextElementSibling;
            const questionContainer = this.closest('.mb-3');
            const h4 = questionContainer.querySelector('h4');
            const spans = questionContainer.querySelectorAll('span');

            // Hide edit button and show save button
            this.classList.add('d-none');
            saveBtn.classList.remove('d-none');

            // Make fields editable
            h4.contentEditable = true;
            h4.focus();
            spans.forEach(span => {
                span.contentEditable = true;
                span.style.border = '2px solid red';
            });

            // Save button click handler
            saveBtn.addEventListener('click', () => {
                const updatedQuestion = h4.innerText.replace(`${index + 1}.`, '').trim();
                const updatedOptions = Array.from(spans).map(span => span.innerText.trim());

                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this question!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, change it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.value) {
                        // Update the newQuestions array
                        newQuestions[index] = {
                            question: updatedQuestion,
                            optionOne: updatedOptions[0].replace('1. ', ''),
                            optionTwo: updatedOptions[1].replace('2. ', ''),
                            optionThree: updatedOptions[2].replace('3. ', ''),
                            optionFour: updatedOptions[3].replace('4. ', ''),
                            correctAnswer: updatedOptions[4]
                        };

                        // Save updated questions to localStorage
                        const selectedSubject = selectAsSubject.value;
                        const questionKey = `${brandCode}_${selectedSubject}_question`;
                        localStorage.setItem(questionKey, JSON.stringify(newQuestions));

                        // Re-render the questions
                        newQuestionsFunc();

                        Swal.fire(
                            'Updated!',
                            'Your question has been updated.',
                            'success'
                        );
                    } else {
                        Swal.fire(
                            'Cancelled',
                            'Your question is safe!',
                            'error'
                        );
                        newQuestionsFunc(); // Reset the view
                    }
                });
            }, { once: true }); // Ensure event listener only fires once
        });
    });
};


//start registration form code
    // Registration form elements
    const registrationForm = document.querySelector(".registration-form");
    const allRegistrationInput = registrationForm.querySelectorAll("input");
    const userType = document.querySelector("#choose-type");
    const registrationDataEl = document.querySelector('.registration-data');
    
    // Initialize registration data from localStorage
    let registrationData = [];
    const existingData = localStorage.getItem("registrationData");
    if (existingData) {
        registrationData = JSON.parse(existingData);
    }

    // Form submission handler
    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        registrationFunc();
    });

    // Registration function
    const registrationFunc = () => {
        if (userType.value !== "choose type") {
            const newUser = {
                name: allRegistrationInput[0].value,
                id: allRegistrationInput[1].value,
                dob: allRegistrationInput[2].value, 
                userType: userType.value,
                mobile: allRegistrationInput[3].value,
                email: allRegistrationInput[4].value,
                password: allRegistrationInput[5].value,
                status: 'Active' // Default status
            };

            registrationData.push(newUser);
            localStorage.setItem("registrationData", JSON.stringify(registrationData));
            
            Swal.fire({
                icon: 'success',
                title: 'Registration successful',
                confirmButtonText: 'OK'
            });

            registrationForm.reset();
            registrationDataFunc(); // Refresh the table
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Please select a user type',
                confirmButtonText: 'OK'
            });
        }
    }

    // Display registration data in table
    const registrationDataFunc = () => {
        // Clear existing content first
        registrationDataEl.innerHTML = '';
        
        // Then add new content
        registrationData.forEach((allData, index) => {
            registrationDataEl.innerHTML += `
            <tr index="${index}">
                <th scope="row">${index + 1}</th>
                <td>
                    <div class="profile">
                        <img src="../Dashboard/images/profile-pic2.png" width="35px" height="35px" alt="Profile Picture">
                    </div>
                </td>
                <td class="text-nowrap" style="width: 8rem;">${allData.name}</td>
                <td class="text-nowrap" style="width: 8rem;">${allData.id}</td>
                <td class="text-nowrap" style="width: 8rem;">${allData.dob}</td>
                <td class="text-nowrap" style="width: 8rem;">${allData.userType}</td>
                <td class="text-nowrap" style="width: 8rem;">${allData.mobile}</td>
                <td class="text-nowrap" style="width: 8rem;">${allData.email}</td>
                <td class="text-nowrap" style="width: 8rem;">${allData.password}</td>
                <td class="text-nowrap" style="width: 8rem;">${allData.status || 'Active'}</td>
                <td class="text-nowrap" style="width: 8rem;">
                    <i class="fa fa-trash del-btn mx-3"></i>
                    <i class="fa fa-eye edit-btn" data-bs-toggle="modal" data-bs-target="#myModal"></i>
                </td>
            </tr>
            `;
        });

        // Add delete functionality
        var i;
        var allDelBtn = registrationDataEl.querySelectorAll('.del-btn');
        console.log(allDelBtn);
        for(i=0; i<allDelBtn.length; i++){
            allDelBtn[i].addEventListener('click', function(){
              var parent = this.parentElement.parentElement;
              var index = parent.getAttribute('index');
              

              /////
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
              });
              swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  registrationData.splice(index, 1);
                  localStorage.setItem("registrationData", JSON.stringify(registrationData));
                  registrationDataFunc();
                  swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                  });
                }
              });
            });
        }
    }

    // Initial load of registration data
    document.addEventListener('DOMContentLoaded', () => {
        registrationDataFunc();
    });

/////////////////////////////

// start toggler box code

var togglerBtn = document.querySelectorAll(".toggler-icon");
var sideNav = document.querySelector(".side-nav");

togglerBtn[0].onclick = function () {
    sideNav.classList.add("active");
    this.classList.add("d-none");
    togglerBtn[1].classList.remove("d-none");
}

togglerBtn[1].onclick = function () {
    sideNav.classList.remove("active");
    togglerBtn[0].classList.remove("d-none");
    this.classList.add("d-none");
}

// end toggler box code

