const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function age_calculate() {
  let today = new Date();
  let inp_date = document.getElementById("date_input").value;
  let input_date = new Date(inp_date);
  let birth_month, birth_year, birth_date;
  let birth_details = {
    date: input_date.getDate(),
    month: input_date.getMonth() + 1,
    year: input_date.getFullYear(),
  };
  let current_year = today.getFullYear();
  let current_month = today.getMonth() + 1;
  let current_date = today.getDate();

  let birth_print = document.getElementById("birthday");
  leap_cheacker(current_year);

  if (isNaN(input_date)) {
    display_result("-", "-", "-");
    details_output("-", "-", "-", "-", "-", "-", "-");
    birth_print.textContent = "Upcoming Birthday will show here!";
  } else {
    if (
      birth_details.year > current_year ||
      (birth_details.month > current_month &&
        birth_details.year == current_year) ||
      (birth_details.date > current_date &&
        birth_details.month == current_month &&
        birth_details.year == current_year)
    ) {
      alert("This person is not born yet!");
      display_result("-", "-", "-");
      details_output("-", "-", "-", "-", "-", "-", "-");
      birth_print.textContent = "Upcoming Birthday will show here!";
      return;
    } else {
      birth_year = current_year - birth_details.year;

      if (current_month >= birth_details.month) {
        birth_month = current_month - birth_details.month;
      } else {
        birth_year--;
        birth_month = 12 + current_month - birth_details.month;
      }

      if (current_date >= birth_details.date) {
        birth_date = current_date - birth_details.date;
      } else {
        birth_month--;
        let days = months[current_month - 2];
        birth_date = days + current_date - birth_details.date;

        if (birth_month < 0) {
          birth_month = 11;
          birth_year--;
        }
      }
      display_result(birth_date, birth_month, birth_year);
      birthday(input_date, input_date, birth_year, birth_print);
      let dtYe = birth_year;
      let dtMo = birth_year * 12 + birth_month;
      let dtWe = Math.floor((dtMo * 29 + birth_date) / 7);
      let dtDa = Math.floor((dtMo / 2) * 30 + (dtMo / 2) * 31 + birth_date);
      let dtHo = Math.floor(dtDa * 24);
      let dtMi = Math.floor(dtHo * 60);
      let dtSe = Math.floor(dtMi * 60);

      details_output(dtSe, dtMi, dtHo, dtDa, dtWe, dtMo, dtYe);
    } //if boyos na jonme tar else
  } //if input none hoy taile eta tar else

  //Another Function
  function display_result(p_date, p_month, p_year) {
    document.getElementById("out_day").textContent = p_date;
    document.getElementById("out_month").textContent = p_month;
    document.getElementById("out_year").textContent = p_year;
  }
  //Another function
  function leap_cheacker(year) {
    if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
      months[1] = 29;
    } else {
      months[1] = 28;
    }
  }
  //Another function
  function details_output(dSe, dMi, dHo, dDa, dWe, dMo, dYe) {
    document.getElementById("details_sec").textContent = dSe;
    document.getElementById("details_min").textContent = dMi;
    document.getElementById("details_hou").textContent = dHo;
    document.getElementById("details_day").textContent = dDa;
    document.getElementById("details_wee").textContent = dWe;
    document.getElementById("details_mon").textContent = dMo;
    document.getElementById("details_yea").textContent = dYe;
  }
  //Another function
  function birthday(inpBirth, inpValue, bYear, birthPrint) {
    let birthMonth = inpBirth.getMonth() + 1;
    let birthDay = inpBirth.getDate();
    let today = new Date();
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth() + 1;
    let todayDay = today.getDate();
    let exactBirth = new Date(birthMonth + "/" + birthDay + "/" + todayYear);
    let exactToday = new Date(todayMonth + "/" + todayDay + "/" + todayYear);

    const sec = 1000;
    const min = sec * 60;
    const hou = min * 60;
    const day = hou * 24;

    var timeSpan = exactToday - exactBirth;
    var timeSp = Math.floor(timeSpan / day);
    var leftDay = timeSp;

    if (isNaN(inpValue)) {
      birthPrint.textContent = "Upcoming Birthday will show here!";
    } else {
      if (leftDay < 365 && leftDay > 0) {
        var daysLeft = 365 - leftDay;
        birthPrint.textContent =
          "Only " + daysLeft + " days left for your next Birthday!";
      } else if (leftDay < 0) {
        var daysLeft = -1 * leftDay;
        birthPrint.textContent =
          "Only " + daysLeft + " days left for your next Birthday!";
      } else if (leftDay == 0) {
        birthPrint.textContent =
          "Oh! My dear. It's your " +
          bYear +
          "th Birthday today! Happy Birthday!";
      } else {
        birthPrint.textContent = "Opps! something went wrong!";
      }
    }
  } //birthday function end
} //main function
