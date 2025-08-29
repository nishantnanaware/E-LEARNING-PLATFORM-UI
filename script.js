// Mock course data
const courses = [
  { id:1, title:"HTML & CSS Basics", desc:"Learn the fundamentals of web development.", video:"https://www.youtube.com/embed/mU6anWqZJcc", lessons:["Introduction","HTML Basics","CSS Basics"], progress:0 },
  { id:2, title:"JavaScript Essentials", desc:"Learn JS for interactive web apps.", video:"https://www.youtube.com/embed/W6NZfCO5SIk", lessons:["Variables","Functions","DOM"], progress:0 }
];

// Save & Load
function saveProgress(){ localStorage.setItem("courses", JSON.stringify(courses)); }
function loadProgress(){ return JSON.parse(localStorage.getItem("courses")) || courses; }

// Index page
function loadCourses(){
  let list = document.getElementById("course-list");
  let data = loadProgress();
  data.forEach(c=>{
    list.innerHTML += `
      <div class="card">
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <a href="course.html?id=${c.id}">View Course</a>
      </div>`;
  });
}

// Course details
function loadCourseDetails(){
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  let course = loadProgress().find(c=>c.id==id);
  if(course){
    document.getElementById("course-title").innerText = course.title;
    document.getElementById("course-desc").innerText = course.desc;
    document.getElementById("video-container").innerHTML = `<iframe src="${course.video}" frameborder="0" allowfullscreen></iframe>`;
    let list = document.getElementById("lesson-list");
    course.lessons.forEach((lesson,i)=>{
      list.innerHTML += `<li onclick="markLesson(${course.id},${i})">${lesson}</li>`;
    });
  }
}

// Mark lesson complete
function markLesson(courseId, lessonIndex){
  let data = loadProgress();
  let course = data.find(c=>c.id==courseId);
  course.progress = Math.min(100, course.progress + (100/course.lessons.length));
  saveProgress();
  alert("Lesson completed! Progress updated.");
}

// Dashboard
function loadDashboard(){
  let data = loadProgress();
  let container = document.getElementById("progress-list");
  data.forEach(c=>{
    container.innerHTML += `
      <div class="card">
        <h3>${c.title}</h3>
        <div class="progress-bar"><div class="progress" style="width:${c.progress}%"></div></div>
        <p>${c.progress.toFixed(0)}% completed</p>
      </div>`;
  });
}
