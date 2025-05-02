document.addEventListener('DOMContentLoaded', () => {
  const plannerBody = document.getElementById("planner-body");
  const saveBtn = document.getElementById("saveBtn");
  const clearBtn = document.getElementById("clearBtn");
  const canvasBtn = document.getElementById("canvasBtn");
  const graphicalViewBtn = document.getElementById("graphicalViewBtn");

  const days = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
  const times = ['morning', 'noon', 'night'];
  const timeLabels = { morning: 'صبح', noon: 'ظهر', night: 'شب' };

  const createPlanner = () => {
    plannerBody.innerHTML = '';
    days.forEach((day, dayIndex) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${day}</td>
        ${times.map(time => `
          <td>
            <textarea placeholder="برنامه ${timeLabels[time]}" data-day="${dayIndex}" data-time="${time}"></textarea>
          </td>
        `).join('')}
      `;
      plannerBody.appendChild(row);
    });
    loadPlan();
  };

  const savePlan = () => {
    const data = {};
    document.querySelectorAll("textarea").forEach(el => {
      const day = el.dataset.day;
      const time = el.dataset.time;
      if (!data[day]) data[day] = {};
      data[day][time] = el.value.trim();
    });
    localStorage.setItem("weeklyPlan", JSON.stringify(data));
    alert("برنامه ذخیره شد!");
  };

  const loadPlan = () => {
    const saved = localStorage.getItem("weeklyPlan");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        document.querySelectorAll("textarea").forEach(el => {
          const day = el.dataset.day;
          const time = el.dataset.time;
          el.value = data[day]?.[time] || "";
        });
      } catch (e) {
        console.error("خطا در بارگذاری داده‌ها:", e);
      }
    }
  };

  const clearPlan = () => {
    if (confirm("آیا مطمئن هستید که می‌خواهید برنامه را پاک کنید؟")) {
      localStorage.removeItem("weeklyPlan");
      createPlanner();
    }
  };

  const goToCanvas = () => {
    window.location.href = "canvas.html";
  };

  const goToGraphicalView = () => {
    window.location.href = "graphical-view.html";
  };

  saveBtn.addEventListener('click', savePlan);
  clearBtn.addEventListener('click', clearPlan);
  canvasBtn.addEventListener('click', goToCanvas);
  graphicalViewBtn.addEventListener('click', goToGraphicalView);

  createPlanner();
});