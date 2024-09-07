"use strict";
const getDocument = (el) => document.querySelector(el);
const getAllDocument = (els) => document.querySelectorAll(els);

const form = getDocument("form");

const cardNameInput = getDocument("#name");
const cardNameLabel = getDocument(".info .name");

const cardNumberInput = getDocument("#number");
const cardNumberLabel = getDocument(".card-num");

const cardMonthInput = getDocument("#month");
const cardYearInput = getDocument("#year");

const cardCvcInput = getDocument("#cvc");
const cardCvcLabel = getDocument(".cvc__label");

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

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Name
  cardNameInput.value === ""
    ? cardNameInput.classList.add("border-error")
    : cardNameInput.classList.remove("border-error");

  // Number
  cardNumberInput.value === ""
    ? cardNumberInput.classList.add("border-error")
    : cardNumberInput.classList.remove("border-error");

  // Month
  cardMonthInput.value === ""
    ? cardMonthInput.classList.add("border-error")
    : cardMonthInput.classList.remove("border-error");

  // Year
  cardYearInput.value === ""
    ? cardYearInput.classList.add("border-error")
    : cardYearInput.classList.remove("border-error");

  // Cvc
  cardCvcInput.value === ""
    ? cardCvcInput.classList.add("border-error")
    : cardCvcInput.classList.remove("border-error");
});
