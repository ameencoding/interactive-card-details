"use strict";
const getDocument = (el) => document.querySelector(el);
const getAllDocument = (els) => document.querySelectorAll(els);

const form = getDocument("form");

const cardNameInput = getDocument("#name");
const cardNameLabel = getDocument(".info .name");
let cardNameError = false;

const cardNumberInput = getDocument("#number");
const cardNumberLabel = getDocument(".card-num");
let cardNumberError = false;

const cardMonthInput = getDocument("#month");
let cardMonthError = false;
const cardYearInput = getDocument("#year");
let cardYearError = false;

const cardCvcInput = getDocument("#cvc");
const cardCvcLabel = getDocument(".cvc__label");
let cardCvcError = false;

// ####### Name #######
cardNameInput.addEventListener("input", function () {
  type(cardNameLabel, this.value.trim());
});

// ####### Number #######
let num = 0;
cardNumberInput.addEventListener("input", function () {
  if (!checkNum(this.value)) return;
  num = this.value.trim();
  if (num.length > 16) return;
  type(cardNumberLabel, formatter(num));
});

// ####### Month #######
cardMonthInput.addEventListener("input", function () {
  if (!checkNum(this.value)) return;
  const monthLabel = getDocument(".date ._m");
  if (this.value == 0 || this.value > 12) {
    return;
  }
  type(monthLabel, this.value.trim());
});

// ####### Year #######
cardYearInput.addEventListener("input", function () {
  if (!checkNum(this.value)) return;
  const yearLabel = getDocument(".date ._y");
  if (this.value <= 24) {
    return;
  }
  type(yearLabel, this.value.trim());
});

// ####### CVC #######
cardCvcInput.addEventListener("input", function () {
  if (!checkNum(this.value)) return;
  if (this.value.length > 3) {
    return;
  }
  type(cardCvcLabel, this.value.trim());
});

const formatter = function (num) {
  const cleanNumber = num.replace(/\D/g, "");
  return cleanNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const checkNum = (val) => new RegExp("^[0-9]+$").test(val);

const type = function (label, msg) {
  label.classList.contains("name")
    ? (label.textContent = capitalize(msg))
    : (label.textContent = msg);
};

const capitalize = (content) => {
  if (content === "") return;
  return content
    .split(" ")
    .map((c) => c[0].toUpperCase() + c.slice(1))
    .join(" ");
};

const errorController = function (inputEl, spanEl, msg, state) {
  if (state) {
    inputEl.classList.add("border-error");

    spanEl.textContent = msg;
    spanEl.classList.remove("hide");
  } else {
    inputEl.classList.remove("border-error");

    spanEl.textContent = msg;
    spanEl.classList.add("hide");
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Name
  if (cardNameInput.value === "") {
    cardNameError = true;
    errorController(
      getDocument("#name"),
      getDocument(".name-error"),
      "Can't be empty!",
      cardNameError
    );
  } else {
    cardNameError = false;
    errorController(
      getDocument("#name"),
      getDocument(".name-error"),
      "",
      cardNameError
    );
  }

  // Number
  if (cardNumberInput.value === "") {
    cardNumberError = true;
    errorController(
      getDocument("#number"),
      getDocument(".num-error"),
      "Can't be empty!",
      cardNumberError
    );
  } else if (cardNumberInput.value.length < 16) {
    cardNumberError = true;
    errorController(
      getDocument("#number"),
      getDocument(".num-error"),
      "Invalid card number!",
      cardNumberError
    );
  } else {
    cardNumberError = false;
    cardNumberInput.classList.remove("border-error");
    errorController(
      getDocument("#number"),
      getDocument(".num-error"),
      "",
      cardNumberError
    );
  }

  // Month
  if (cardMonthInput.value === "") {
    cardMonthInput.classList.add("border-error");
    cardMonthError = true;
  } else {
    cardMonthError = false;
    cardMonthInput.classList.remove("border-error");
  }

  // Year
  if (cardYearInput.value === "") {
    cardYearInput.classList.add("border-error");
    cardYearError = true;
  } else {
    cardYearInput.classList.remove("border-error");
    cardYearError = false;
  }

  // Cvc
  if (cardCvcInput.value === "") {
    cardCvcError = true;
    errorController(
      getDocument("#cvc"),
      getDocument(".cvc-error"),
      "Can't be empty",
      cardCvcError
    );
  } else if (cardCvcInput.value.length < 3) {
    cardCvcError = true;
    errorController(
      getDocument("#cvc"),
      getDocument(".cvc-error"),
      "Invalid CVC!",
      cardCvcError
    );
  } else {
    cardCvcError = false;
    errorController(
      getDocument("#cvc"),
      getDocument(".cvc-error"),
      "",
      cardCvcError
    );
  }

  // Finally
  if (
    !cardNameError &&
    !cardNumberError &&
    !cardMonthError &&
    !cardYearError &&
    !cardCvcError
  ) {
    setTimeout(() => displayThanks(), 1200);
  }
});

const displayThanks = function () {
  form.classList.add("hide");
  getDocument(".thanks").classList.remove("hide");
};

getDocument(".thanks button").addEventListener("click", function () {
  setTimeout(() => location.reload(), 800);
});
