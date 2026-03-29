const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to web design and development.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to write and use functions.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduction to object-oriented programming.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to build dynamic websites using JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focus on UX, accessibility, and performance.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];



const courseContainer = document.getElementById("courseContainer");
const totalCredits = document.getElementById("totalCredits");

const allBtn = document.getElementById("allBtn");
const wddBtn = document.getElementById("wddBtn");
const cseBtn = document.getElementById("cseBtn");


// ==============================
//  COURSES FUNCTION DISPLAY
// ==============================

function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");

        // If completed → orange style
        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} credits</p>
        `;

        courseContainer.appendChild(card);
    });

    // Calculate total credits 
    const total = courseList.reduce((sum, course) => sum + course.credits, 0);

    totalCredits.textContent = `Total Credits: ${total}`;
}


// ==============================
// FILTER BUTTON EVENTS
// ==============================

// Show ALL courses
allBtn.addEventListener("click", () => {
    displayCourses(courses);
});

// Show only WDD courses
wddBtn.addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === "WDD");
    displayCourses(wddCourses);
});

// Show only CSE courses
cseBtn.addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === "CSE");
    displayCourses(cseCourses);
});


// ==============================
// INITIAL LOAD
// ==============================

displayCourses(courses);