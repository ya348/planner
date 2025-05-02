document.addEventListener('DOMContentLoaded', () => {
    const planContainer = document.getElementById("weeklyPlanCards");
    const days = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
    const timeLabels = { morning: 'صبح', noon: 'ظهر', night: 'شب' };
  
    const loadPlan = () => {
      const saved = localStorage.getItem("weeklyPlan");
      if (saved) {
        try {
          const data = JSON.parse(saved);
          days.forEach((day, dayIndex) => {
            const dayPlan = data[dayIndex] || {};
            const card = document.createElement("div");
            card.className = "day-card";
            card.innerHTML = `
              <h3>${day}</h3>
              <p><strong>${timeLabels.morning}:</strong> ${dayPlan.morning || "برنامه‌ای ندارید."}</p>
              <p><strong>${timeLabels.noon}:</strong> ${dayPlan.noon || "برنامه‌ای ندارید."}</p>
              <p><strong>${timeLabels.night}:</strong> ${dayPlan.night || "برنامه‌ای ندارید."}</p>
            `;
            planContainer.appendChild(card);
          });
        } catch (e) {
          console.error("خطا در بارگذاری داده‌ها:", e);
          planContainer.innerHTML = `<p>خطا در بارگذاری برنامه.</p>`;
        }
      } else {
        planContainer.innerHTML = `<p>هیچ برنامه‌ای برای این هفته ذخیره نشده است.</p>`;
      }
    };
  
    loadPlan();
  });