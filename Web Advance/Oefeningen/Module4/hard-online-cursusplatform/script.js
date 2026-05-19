'use strict';

class Persoon {

    constructor(naam, email, leeftijd) {
        this.naam = naam;
        this.email = email;
        this.leeftijd = leeftijd;
    }
}

class Student extends Persoon {

    static lijst = [];

    constructor(naam, email, leeftijd, studentnummer, studiejaar) {
        super(naam, email, leeftijd);

        this.studentnummer = studentnummer;
        this.studiejaar = studiejaar;

        Student.lijst.push(this);
    }

    static zoekOpStudentnummer(nummer) {

        for (let student of Student.lijst) {

            if (student.studentnummer === nummer) {
                return student;
            }
        }
    }
}

class Docent extends Persoon {

    constructor(naam, email, leeftijd, vakgebied) {
        super(naam, email, leeftijd);

        this.vakgebied = vakgebied;
    }
}

class Cursus {

    static lijst = [];

    constructor(titel, beschrijving, docent, ects, maximumStudenten) {
        this.titel = titel;
        this.beschrijving = beschrijving;
        this.docent = docent;
        this.ects = ects;
        this.maximumStudenten = maximumStudenten;

        Cursus.lijst.push(this);
    }

    static zoekOpTitel(titel) {

        for (let cursus of Cursus.lijst) {

            if (cursus.titel === titel) {
                return cursus;
            }
        }
    }
}

class Inschrijving {

    static lijst = [];

    constructor(student, cursus) {

        this.student = student;
        this.cursus = cursus;

        this.status = 'actief';
        this.beoordeling = null;

        Inschrijving.lijst.push(this);
    }

    voegBeoordelingToe(score) {
        this.beoordeling = score;
    }

    static controleerDubbele(student, cursus) {

        for (let inschrijving of Inschrijving.lijst) {

            if (
                inschrijving.student === student &&
                inschrijving.cursus === cursus
            ) {
                return true;
            }
        }

        return false;
    }
}

const docent1 =
    new Docent('Marie', 'marie@mail.com', 40, 'Web');

const student1 =
    new Student('Baraa', 'baraa@mail.com', 22, 'S100', 2);

const student2 =
    new Student('Alex', 'alex@mail.com', 21, 'S101', 1);

const cursus1 =
    new Cursus('JavaScript', 'Frontend course', docent1, 6, 20);

const cursus2 =
    new Cursus('PHP', 'Backend course', docent1, 5, 15);

if (!Inschrijving.controleerDubbele(student1, cursus1)) {

    const inschrijving1 =
        new Inschrijving(student1, cursus1);

    inschrijving1.voegBeoordelingToe(18);
}

if (!Inschrijving.controleerDubbele(student2, cursus2)) {

    const inschrijving2 =
        new Inschrijving(student2, cursus2);

    inschrijving2.voegBeoordelingToe(15);
}

const courseList =
    document.getElementById('course-list');

const studentList =
    document.getElementById('student-list');

const teacherList =
    document.getElementById('teacher-list');

const enrollmentList =
    document.getElementById('enrollment-list');

for (let cursus of Cursus.lijst) {

    courseList.innerHTML += `
        <p>
            ${cursus.titel} - ${cursus.docent.naam}
        </p>
    `;
}

for (let student of Student.lijst) {

    studentList.innerHTML += `
        <p>
            ${student.naam} - ${student.studentnummer}
        </p>
    `;
}

teacherList.innerHTML += `
    <p>
        ${docent1.naam} - ${docent1.vakgebied}
    </p>
`;

for (let inschrijving of Inschrijving.lijst) {

    enrollmentList.innerHTML += `
        <p>
            ${inschrijving.student.naam}
            →
            ${inschrijving.cursus.titel}
            (${inschrijving.beoordeling}/20)
        </p>
    `;
}
