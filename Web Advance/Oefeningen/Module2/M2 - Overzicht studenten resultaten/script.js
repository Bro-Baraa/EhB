'use strict';

const students = {
    Alex: [],
    Sam: [],
    Jo: []
};

const studentSelect = document.getElementById('student');
const courseInput = document.getElementById('course');
const gradeInput = document.getElementById('grade');
const addGradeButton = document.getElementById('addGradeButton');
const studentOverview = document.getElementById('studentOverview');

// Add a grade to the selected student
addGradeButton.addEventListener('click', function () {
    const studentName = studentSelect.value;
    const course = courseInput.value;
    const grade = Number(gradeInput.value);

    if (course === '' || grade < 0 || grade > 20 || gradeInput.value === '') {
        alert('Please enter a course and a score between 0 and 20.');
        return;
    }

    const result = {
        course: course,
        grade: grade
    };

    students[studentName].push(result);

    courseInput.value = '';
    gradeInput.value = '';

    showOverview();
});

// Show all student results
function showOverview() {
    let html = '';

    for (let studentName in students) {
        const results = students[studentName];

        let coursesHtml = '';
        let total = 0;
        let highest = 0;
        let lowest = 20;

        for (let result of results) {
            coursesHtml += `<li>${result.course}: ${result.grade}/20</li>`;
            total = total + result.grade;

            if (result.grade > highest) {
                highest = result.grade;
            }

            if (result.grade < lowest) {
                lowest = result.grade;
            }
        }

        let average = 0;

        if (results.length > 0) {
            average = total / results.length;
        } else {
            lowest = 0;
        }

        html += `
            <div class="student-card">
                <h2>${studentName}</h2>

                <ul>
                    ${coursesHtml}
                </ul>

                <p>Average: ${average.toFixed(1)}</p>
                <p>Highest: ${highest}</p>
                <p>Lowest: ${lowest}</p>
            </div>
        `;
    }

    studentOverview.innerHTML = html;
}

showOverview();