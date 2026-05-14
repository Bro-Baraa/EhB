'use strict';

// Default modules for every new course
const DEFAULT_MODULES = ['Module 1', 'Module 2', 'Module 3'];

let courses = [];
let students = [];

const courseTitle = document.getElementById('courseTitle');
const courseDesc = document.getElementById('courseDesc');
const addCourse = document.getElementById('addCourse');
const courseList = document.getElementById('courseList');

const studentName = document.getElementById('studentName');
const coursePicker = document.getElementById('coursePicker');
const enrollStudent = document.getElementById('enrollStudent');
const studentList = document.getElementById('studentList');

const studentPicker = document.getElementById('studentPicker');
const modulePicker = document.getElementById('modulePicker');
const moduleGrade = document.getElementById('moduleGrade');
const addGrade = document.getElementById('addGrade');

const reportStudent = document.getElementById('reportStudent');
const generateReport = document.getElementById('generateReport');
const reportOutput = document.getElementById('reportOutput');

// Add a new course
addCourse.addEventListener('click', function () {
    if (courseTitle.value === '' || courseDesc.value === '') {
        alert('Please enter a course title and description.');
        return;
    }

    const course = {
        title: courseTitle.value,
        description: courseDesc.value,
        modules: DEFAULT_MODULES
    };

    courses.push(course);

    courseTitle.value = '';
    courseDesc.value = '';

    updatePage();
});

// Enroll a student in a course
enrollStudent.addEventListener('click', function () {
    if (studentName.value === '' || coursePicker.value === '') {
        alert('Please enter a student name and select a course.');
        return;
    }

    const student = {
        name: studentName.value,
        course: coursePicker.value,
        scores: []
    };

    students.push(student);

    studentName.value = '';

    updatePage();
});

// Add a grade to a student
addGrade.addEventListener('click', function () {
    const selectedStudent = studentPicker.value;
    const selectedModule = modulePicker.value;
    const grade = Number(moduleGrade.value);

    if (selectedStudent === '' || selectedModule === '' || grade < 0 || grade > 20 || moduleGrade.value === '') {
        alert('Please enter a score between 0 and 20.');
        return;
    }

    for (let student of students) {
        if (student.name === selectedStudent) {
            const score = {
                module: selectedModule,
                grade: grade
            };

            student.scores.push(score);
        }
    }

    moduleGrade.value = '';

    updatePage();
});

// Generate a report
generateReport.addEventListener('click', function () {
    const selectedStudent = reportStudent.value;

    for (let student of students) {
        if (student.name === selectedStudent) {
            let scoresHtml = '';
            let total = 0;

            for (let score of student.scores) {
                scoresHtml += `<li>${score.module}: ${score.grade}/20</li>`;
                total = total + score.grade;
            }

            let average = 0;

            if (student.scores.length > 0) {
                average = total / student.scores.length;
            }

            reportOutput.innerHTML = `
                <div class="card">
                    <h3>${student.name}</h3>
                    <p>Course: ${student.course}</p>

                    <h4>Scores</h4>
                    <ul>
                        ${scoresHtml}
                    </ul>

                    <p>Average: ${average.toFixed(1)}/20</p>
                </div>
            `;
        }
    }
});

// Update all parts of the page
function updatePage() {
    showCourses();
    showStudents();
    updateDropdowns();
}

// Show courses
function showCourses() {
    courseList.innerHTML = '';

    for (let i = 0; i < courses.length; i++) {
        courseList.innerHTML += `
            <div class="card">
                <h4>${courses[i].title}</h4>
                <p>${courses[i].description}</p>
                <p>Modules: ${courses[i].modules.join(', ')}</p>
                <button onclick="removeCourse(${i})">Remove</button>
            </div>
        `;
    }
}

// Remove a course
function removeCourse(index) {
    courses.splice(index, 1);
    updatePage();
}

// Show students
function showStudents() {
    studentList.innerHTML = '';

    for (let student of students) {
        studentList.innerHTML += `
            <div class="card">
                <p>${student.name} is enrolled in ${student.course}</p>
            </div>
        `;
    }
}

// Update dropdown menus
function updateDropdowns() {
    coursePicker.innerHTML = '';
    studentPicker.innerHTML = '';
    reportStudent.innerHTML = '';
    modulePicker.innerHTML = '';

    for (let course of courses) {
        coursePicker.innerHTML += `<option value="${course.title}">${course.title}</option>`;

        for (let module of course.modules) {
            modulePicker.innerHTML += `<option value="${course.title} - ${module}">${course.title} - ${module}</option>`;
        }
    }

    for (let student of students) {
        studentPicker.innerHTML += `<option value="${student.name}">${student.name}</option>`;
        reportStudent.innerHTML += `<option value="${student.name}">${student.name}</option>`;
    }
}

updatePage();