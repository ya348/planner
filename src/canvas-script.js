document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('planCanvas');
    const ctx = canvas.getContext('2d');
    const printBtn = document.getElementById('printBtn');
    const refreshBtn = document.getElementById('refreshBtn');

    const days = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
    const times = ['morning', 'noon', 'night'];
    const timeLabels = { morning: 'صبح', noon: 'ظهر', night: 'شب' };
    const colors = {
        header: '#3498db',
        doneBg: '#d5f5e3',
        notDoneBg: '#f9f9f9',
        text: '#2c3e50',
        border: '#e0e0e0',
        timeLabel: '#7f8c8d',
        doneMark: '#27ae60'
    };

    function resizeCanvas() {
        const container = document.querySelector('.canvas-container');
        const containerWidth = container.clientWidth;

        if (containerWidth < 950) {
            canvas.width = containerWidth - 40;
            canvas.height = (containerWidth - 40) * 0.75;
        } else {
            canvas.width = 950;
            canvas.height = 700;
        }

        drawPlanner();
    }

    const drawPlanner = () => {
        const data = JSON.parse(localStorage.getItem('weeklyPlan')) || {};

        const cellWidth = Math.floor((canvas.width - 60) / days.length);
        const cellHeight = 60;
        const headerHeight = 50;
        const timeWidth = 80;
        const startX = timeWidth + 10;
        const startY = 30;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = colors.border;
        ctx.lineWidth = 1;

        ctx.font = 'bold 16px IranSans';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        days.forEach((day, dayIndex) => {
            const x = startX + dayIndex * cellWidth;

            ctx.fillStyle = colors.header;
            ctx.beginPath();
            ctx.roundRect(x, startY, cellWidth, headerHeight, [5, 5, 0, 0]);
            ctx.fill();

            ctx.fillStyle = '#fff';
            ctx.fillText(day, x + cellWidth / 2, startY + headerHeight / 2);

            times.forEach((time, timeIndex) => {
                const y = startY + headerHeight + timeIndex * cellHeight;
                const taskData = data[dayIndex] || {};
                const taskText = taskData[time] || '';

                ctx.fillStyle = colors.notDoneBg;
                ctx.beginPath();
                ctx.roundRect(x, y, cellWidth, cellHeight, [0, 0, 5, 5]);
                ctx.fill();

                ctx.strokeStyle = colors.border;
                ctx.stroke();

                ctx.fillStyle = colors.text;
                ctx.font = '14px IranSans';
                ctx.textAlign = 'right';
                wrapText(ctx, taskText, x + 10, y + 15, cellWidth - 20, cellHeight - 10, 16);
            });
        });

        ctx.font = 'bold 14px IranSans';
        ctx.fillStyle = colors.header;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        times.forEach((time, timeIndex) => {
            const y = startY + headerHeight + timeIndex * cellHeight;

            ctx.fillStyle = colors.header;
            ctx.beginPath();
            ctx.roundRect(10, y, timeWidth, cellHeight, [5, 0, 0, 5]);
            ctx.fill();

            ctx.fillStyle = '#fff';
            ctx.fillText(timeLabels[time], 10 + timeWidth / 2, y + cellHeight / 2);
        });
    };

    function wrapText(context, text, x, y, maxWidth, maxHeight, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let lines = [];

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = context.measureText(testLine);

            if (metrics.width > maxWidth && i > 0) {
                lines.push(line);
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }

        lines.push(line);

        const maxLines = Math.floor(maxHeight / lineHeight);
        if (lines.length > maxLines) {
            lines = lines.slice(0, maxLines);
            lines[maxLines - 1] = lines[maxLines - 1].slice(0, -3) + '...';
        }

        for (let i = 0; i < lines.length; i++) {
            context.fillText(lines[i].trim(), x + maxWidth, y + (i * lineHeight));
        }
    }

    if (!CanvasRenderingContext2D.prototype.roundRect) {
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
            if (typeof radius === 'number') {
                radius = { tl: radius, tr: radius, br: radius, bl: radius };
            } else {
                radius = { tl: 0, tr: 0, br: 0, bl: 0, ...radius };
            }

            this.beginPath();
            this.moveTo(x + radius.tl, y);
            this.lineTo(x + width - radius.tr, y);
            this.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
            this.lineTo(x + width, y + height - radius.br);
            this.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
            this.lineTo(x + radius.bl, y + height);
            this.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
            this.lineTo(x, y + radius.tl);
            this.quadraticCurveTo(x, y, x + radius.tl, y);
            this.closePath();
            return this;
        };
    }

    printBtn.addEventListener('click', function () {
        window.print();
    });

    refreshBtn.addEventListener('click', function () {
        drawPlanner();
    });

    window.addEventListener('resize', function () {
        resizeCanvas();
    });

    resizeCanvas();
});