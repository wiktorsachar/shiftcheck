class Shifts {
  static getRefDate() {
    return 1581634800000;
  }
  static getDayDifference(dateArray) {
    const day = 86400000,
      dayDifference =
        (new Date(...dateArray).valueOf() - this.getRefDate()) / day;
    return {
      days: Math.round(Math.abs(dayDifference)),
      positive: dayDifference >= 0
    };
  }
  static getShiftNumber(dateArray, night) {
    const { days, positive } = this.getDayDifference(dateArray),
      dayPattern = [3, 2, 1, 4, 3],
      nightPattern = [4, 3, 2, 1, 4],
      counter = positive ? days % 4 : 4 - (days % 4);
    if (!night) {
      return dayPattern[counter];
    } else {
      return nightPattern[counter];
    }
  }
}
function shiftWrap(number) {
  switch (number) {
    case 1:
      return "1 - J.";
    case 2:
      return "2 - Ad.";
    case 3:
      return "3 - Al.";
    case 4:
      return "4 - Ad.";
    default:
      break;
  }
}

function dateStringToArray(dateString) {
  const date = new Date(dateString);
  return [date.getFullYear(), date.getMonth(), date.getDate()];
}
function getDateInput() {
  const date = new Date(document.getElementById("date-picker").value);
  return dateStringToArray(date);
}
function checkIfNightChecked() {
  return document.getElementById("night").checked;
}
function setOutput(output) {
  document.getElementById("output").innerHTML =
    typeof output === "number" ? "Zmiana nr " + shiftWrap(output) : "";
  console.log(output);
}
function onClick() {
  const date = getDateInput(),
    night = checkIfNightChecked(),
    shift = Shifts.getShiftNumber(date, night);
  setOutput(shift);
}
function blur(id) {
  document.getElementById(id).blur();
}
