document.addEventListener("DOMContentLoaded", function () {
  const calendarBody = document.getElementById("calendar-body");
  const currentMonthYear = document.getElementById("current-month-year");
  const prevMonthButton = document.getElementById("prev-month");
  const nextMonthButton = document.getElementById("next-month");
  const todayButton = document.getElementById("todayButton");
  const Days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  function isSingleDigit(digit) {
    if (digit >= 10) {
      return digit;
    } else {
      let newDigit = "0" + digit;
      return newDigit;
    }
  }

  const updateCalendar = async () => {
    try {
      const {
        data: { todo },
      } = await axios.get("/api/tasks/all");

      todo.sort((a, b) => new Date(a.date) - new Date(b.date)); //This will sort the date in ascending order

      console.log(todo);

      //Filtering the total array to the current month
      //Example if we are on November section then the array will be filtered and only data of month Novemeber wil be present
      const filteredToDoArray = todo.filter((item) => {
        const itemMonth = new Date(item.date).getMonth() + 1; // Adding 1 because getMonth() returns 0-based index
        return itemMonth === currentMonth + 1;
      });

      const todayDate = new Date().getDate();
      const todayMonth = new Date().getMonth();
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const firstDayOfWeek = firstDayOfMonth.getDay();
      let flag = 0;

      let month = new Date(null, currentMonth).toLocaleString("en-US", {
        month: "long",
      });
      let year = currentYear;
      currentMonthYear.innerText = `${month} ${year}`;

      let calendarHTML = "";
      let dayCounter = 1;
      let nextMonthDayCounter = 1;
      let prevMonthDay =
        new Date(currentYear, currentMonth, 0).getDate() - // This will get the last day of the month
        new Date(currentYear, currentMonth, 0).getDay(); //This will get the day of the last month
      let trackDay = 0;
      for (let i = 0; i < 6; i++) {
        let row = '<div class="row text-center rowBorder">';

        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDayOfWeek) {
            //For previous month ending dates

            if (todayDate == prevMonthDay && todayMonth == currentMonth - 1) {
              row += `<div class="col columnBorder anotherCalendarColor today"><p class="days">${Days[trackDay]}</p><span>${prevMonthDay}</span></div>`;
              trackDay++;
              prevMonthDay++;
            } else {
              row += `<div class="col columnBorder anotherCalendarColor"><p class="days">${Days[trackDay]}</p><span>${prevMonthDay}</span></div>`;
              trackDay++;
              prevMonthDay++;
            }
          } else if (dayCounter <= daysInMonth) {
            //For actual date
            let month = currentMonth + 1;
            let dateInfo =
              currentYear +
              "-" +
              isSingleDigit(month) +
              "-" +
              isSingleDigit(dayCounter);
            if (i == 0) {
              if (todayDate == dayCounter && todayMonth == currentMonth) {
                //This process will display the task in calendar body if any exits
                let todoArray = [];
                while (
                  flag < filteredToDoArray.length &&
                  dateInfo === filteredToDoArray[flag].date
                ) {
                  todoArray.push(filteredToDoArray[flag]);
                  flag++;
                }
                row += `<div class="col columnBorder today trigger" data-info = ${dateInfo}><p class="days">${Days[trackDay]}</p><span>&nbsp;${dayCounter}&nbsp;</span>`;

                if (todoArray) {
                  const todos = todoArray
                    .map((todo) => {
                      const { _id, title, description, color } = todo;
                      return `<a href="view?id=${_id}" style="text-decoration:none;color:black;"><span class="todoInDate" style="background:${color};">${todo.title}</span></a>`;
                    })
                    .join("");
                  row += todos;
                }

                row += `</div>`;
                trackDay++;
                dayCounter++;
              } else {
                //This process will display the task in calendar body if any exits
                let todoArray = [];
                while (
                  flag < filteredToDoArray.length &&
                  dateInfo === filteredToDoArray[flag].date
                ) {
                  todoArray.push(filteredToDoArray[flag]);
                  flag++;
                }
                row += `<div class="col columnBorder trigger" data-info = ${dateInfo}><p class="days" >${Days[trackDay]}</p><span>${dayCounter}</span>`;
                if (todoArray) {
                  const todos = todoArray
                    .map((todo) => {
                      const { _id, title, description, color } = todo;
                      return `<a href="view?id=${_id}" style="text-decoration:none;color:black;"><span class="todoInDate" style="background:${color};">${todo.title}</span></a>`;
                    })
                    .join("");
                  row += todos;
                }

                row += `</div>`;
                trackDay++;
                dayCounter++;
              }
            } else {
              // checking if the date is today or not if yes the css with blue highlight appears
              if (todayDate == dayCounter && todayMonth == currentMonth) {
                //This process will display the task in calendar body if any exits
                let todoArray = [];
                while (
                  flag < filteredToDoArray.length &&
                  dateInfo === filteredToDoArray[flag].date
                ) {
                  todoArray.push(filteredToDoArray[flag]);
                  flag++;
                }
                row += `<div class="col columnBorder today trigger" data-info = ${dateInfo}><span class="forToday">${dayCounter}</span>`;
                if (todoArray) {
                  const todos = todoArray
                    .map((todo) => {
                      const { _id, title, description, color } = todo;
                      return `<a href="view?id=${_id}" style="text-decoration:none;color:black;"><span class="todoInDate" style="background:${color};">${todo.title}</span></a>`;
                    })
                    .join("");
                  row += todos;
                }

                row += `</div>`;
                dayCounter++;
              } else {
                //This process will display the task in calendar body if any exits
                let todoArray = [];
                while (
                  flag < filteredToDoArray.length &&
                  dateInfo === filteredToDoArray[flag].date
                ) {
                  todoArray.push(filteredToDoArray[flag]);
                  flag++;
                }
                row += `<div class="col columnBorder trigger" data-info = ${dateInfo}><span>${dayCounter}</span>`;
                if (todoArray) {
                  const todos = todoArray
                    .map((todo) => {
                      const { _id, title, description, color } = todo;
                      return `<a href="view?id=${_id}" style="text-decoration:none;color:black;"><span class="todoInDate" style="background:${color};">${todo.title}</span></a>`;
                    })
                    .join("");
                  row += todos;
                }

                row += `</div>`;
                dayCounter++;
              }
            }
          } else {
            //For next months initial date
            row += `<div class="col columnBorder anotherCalendarColor">${nextMonthDayCounter}</div>`;
            nextMonthDayCounter++;
          }
        }

        row += "</div>";
        calendarHTML += row;
      }

      calendarBody.innerHTML = calendarHTML;
    } catch (error) {
      console.log(error);
    }
  };

  prevMonthButton.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateCalendar();
  });

  nextMonthButton.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    updateCalendar();
  });
  todayButton.addEventListener("click", () => {
    currentDate = new Date();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();
    updateCalendar();
  });

  updateCalendar();
});
