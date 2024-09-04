"use strict";
const getDocument = (el) => document.querySelector(el);
const getDocumentAll = (els) => document.querySelectorAll(els);

const form = getDocument("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});
