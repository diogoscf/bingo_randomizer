function random_num(min, max) {
  return Math.round((max-min) * Math.random() + min)
};

function validateChoice() {
  var min = parseInt(document.getElementById("minimum").value);
  var max = parseInt(document.getElementById("maximum").value);
  if (max > min && min >= 1 && max > 1 && num_array.length < (max - min + 1)) {
    document.getElementById("generate").disabled = false;
    disableReason("")
  }
  else if (num_array.length >= (max - min + 1)) {
    document.getElementById("generate").disabled = true;
    disableReason("*All numbers have been shown. Please reset or change your input before continuing.");
  }
  else {
    disableReason("*Please correct errors in your input");
    document.getElementById("generate").disabled = true;
  }
};

var num_array = new Array();

function generateNumber() {
  var min = parseInt(document.getElementById("minimum").value);
  var max = parseInt(document.getElementById("maximum").value);
  var num = random_num(min, max)
  while (checkNumber(num) == -1) {
    num = random_num(min, max);
  };
  num_array.push(num);
  document.getElementById("output").innerHTML = num;
  num_array.sort(function(a, b){return a-b});
  document.getElementById("numbers_already_shown").innerHTML = ""; //Reset Area
  for (var i = 0; i < num_array.length; i++) {
    document.getElementById("numbers_already_shown").innerHTML += num_array[i] + "&#32;";
  };
  if(num_array.length >= (max - min + 1)) {
    document.getElementById("generate").disabled = true;
    disableReason("*All numbers have been shown. Please reset or change input before continuing.");
  };
};

function checkNumber(number) {
  if (num_array.includes(number)) {
    return (-1);
  }
  return (1);
}

function resetAll() {
  num_array.length = 0;
  document.getElementById("numbers_already_shown").innerHTML = num_array;
  document.getElementById("output").innerHTML = "";
  document.getElementById("generate").disabled = false;
  disableReason("")
}

function inputChange() {
  resetAll();
  document.getElementById("generate").disabled = true;
  disableReason("*Please validate your input before generating numbers");
}

function disableReason(reason) {
  document.getElementById("reason").innerHTML = "&nbsp;" + reason;
}

document.addEventListener('DOMContentLoaded', function() {
    inputChange()
}, false);
