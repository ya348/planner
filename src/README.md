Weekly Planner 📅
A responsive web-based weekly planner designed for Persian users, allowing you to create, save, and view your weekly schedules in multiple formats: tabular, graphical (card-based), and visual (canvas-based). The app supports RTL layout and Persian fonts for a localized experience. 🌐
Features ✨

Tabular View: Input and edit plans for morning, noon, and night for each day (Saturday to Friday). ✏️
Graphical View: Display plans in a card-based format, organized by day. 🗂️
Canvas View: Visualize your schedule in a grid using HTML5 Canvas, with responsive design and print support. 🎨
Data Persistence: Save plans in the browser's localStorage for easy access across sessions. 💾
Responsive Design: Works seamlessly on desktop and mobile devices. 📱💻
Print Support: Print the canvas view with a clean, optimized layout. 🖨️
Persian Localization: Uses Persian fonts (Shabnam and IranSans) and RTL layout for a native feel. 🇮🇷

File Structure 📂

planner.html: Main page for editing plans in a table format.
canvas.html: Renders the plan as a visual grid using Canvas.
graphical-view.html: Displays plans in a card-based format.
style.css: Styles for the main planner page (table and buttons).
canvas-style.css: Styles for the canvas view, including print rules.
graphical-style.css: Styles for the card-based graphical view.
script.js: Handles plan creation, saving, and navigation.
canvas-script.js: Manages canvas rendering and responsive resizing.
graphical-script.js: Loads and displays the card-based view.
README.md: This documentation file.

Setup 🚀

Clone or download the repository to your local machine.
Place all files in the same directory to maintain relative paths.
Open planner.html in a modern browser (Chrome, Firefox, or Edge recommended).

No dependencies or server setup needed! The app runs entirely in the browser using CDN-hosted fonts. 🎉
Usage 📋

Creating a Plan:

Open planner.html.
Enter tasks for morning, noon, and night for each day in the textareas.
Click "ذخیره برنامه" (Save Plan) to store the plan in localStorage.


Viewing the Plan:

Tabular View: Default view in planner.html shows the plan in a table.
Graphical View: Click "مشاهده لیستی" (Graphical View) to see cards in graphical-view.html.
Canvas View: Click "مشاهده گرافیکی" (Canvas View) to view the grid in canvas.html.


Managing the Plan:

Click "پاک‌سازی" (Clear) in planner.html to reset the plan.
In canvas.html, use "چاپ برنامه" (Print) to print or "بروزرسانی نمایش" (Refresh) to redraw the canvas.


Navigation:

From graphical-view.html, click "بازگشت به ویرایشگر" (Back to Editor) to return to planner.html.



Technical Details 🔍

Fonts: Shabnam (CDN) for main/graphical views; IranSans (CDN) for canvas view.
Storage: Plans stored in localStorage as JSON, with days indexed (0-6) and tasks for morning/noon/night.
Canvas Rendering: Dynamically resizes and wraps text to fit cells.
Responsive Design: Uses media queries and dynamic canvas sizing for all screen sizes.
Print Optimization: Hides non-essential elements for clean printing in canvas view.

Known Limitations ⚠️

Plans are stored locally and may be lost if localStorage is cleared.
Long text in canvas view is truncated with an ellipsis.
Limited error handling for corrupted localStorage data (errors logged to console).

Future Improvements 🛠️

Add input validation for task entries.
Implement server-side storage for persistent plans.
Enable interactive editing in the canvas view.
Support multiple languages or customizable time slots.

License 📜
Publication and use are permitted with proper attribution to the creator. 😊
