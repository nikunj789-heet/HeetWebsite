document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("courseSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = Array.from(document.querySelectorAll(".course-card"));
  const count = document.getElementById("courseCount");
  const empty = document.getElementById("noCourses");
  let activeCategory = "all";

  function updateCourses() {
    const term = searchInput ? searchInput.value.trim().toLowerCase() : "";
    let visible = 0;
    cards.forEach(function (card) {
      const categoryMatch = activeCategory === "all" || card.dataset.category === activeCategory;
      const searchMatch = card.textContent.toLowerCase().includes(term);
      const show = categoryMatch && searchMatch;
      card.hidden = !show;
      if (show) visible++;
    });
    if (count) count.textContent = "Showing " + visible + " of " + cards.length + " courses";
    if (empty) empty.hidden = visible !== 0;
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeCategory = button.dataset.filter;
      filterButtons.forEach(function (item) {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      updateCourses();
    });
  });
  if (searchInput) searchInput.addEventListener("input", updateCourses);

  const form = document.getElementById("admissionForm");
  const result = document.getElementById("result");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("studentName").value.trim();
      const mobile = document.getElementById("mobile").value.trim();
      const course = document.getElementById("course").value;
      if (!name) { result.textContent = "કૃપા કરીને તમારું નામ લખો."; return; }
      if (!/^[0-9]{10}$/.test(mobile)) { result.textContent = "કૃપા કરીને 10 અંકનો સાચો મોબાઇલ નંબર લખો."; return; }
      if (!course) { result.textContent = "કૃપા કરીને કોર્સ પસંદ કરો."; return; }
      const message = "Hello Heet Computer Education!\nI want admission information.\nStudent Name: " + name +
        "\nMobile Number: " + mobile + "\nCourse: " + course;
      const url = "https://wa.me/918460575627?text=" + encodeURIComponent(message);
      result.textContent = "WhatsApp ખુલી રહ્યું છે. મેસેજ મોકલવા માટે Send દબાવો.";
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  updateCourses();
});
