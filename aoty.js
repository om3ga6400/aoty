// ==UserScript==
// @name         Better AOTY
// @namespace    https://github.com/om3ga6400
// @version      0.1.0
// @description  QoL mod for AOTY
// @author       om3ga6400
// @match        https://www.albumoftheyear.org/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  var node = document.querySelector(".albumCriticScoreBox");
  if (node) {
    node.remove();
  }

  var userScoreHeading = document.querySelector(".albumUserScoreBox .heading");
  if (userScoreHeading) {
    userScoreHeading.remove();
  }

  var noUnderlineLinks = document.querySelectorAll("a.noUnderline");
  noUnderlineLinks.forEach(function (link) {
    link.remove();
  });

  var criticsSection = document.getElementById("critics");
  if (criticsSection) {
    criticsSection.remove();
  }

  var mustHearButton = document.querySelector(".mustHearButton.user");
  if (mustHearButton) {
    mustHearButton.remove();
  }

  var showMoreStats = document.querySelector(".action.showMoreStats");
  if (showMoreStats) {
    showMoreStats.click();
  }

  var selectedTab = document.querySelector(".selectBox.selected");
  if (selectedTab && selectedTab.textContent.trim() === "User Reviews") {
    selectedTab.textContent = "Reviews";
  }

  var headline = document.querySelector(".albumHeadline");
  var coverBox = document.querySelector(".albumTopBox.cover");
  var ratingBox = document.querySelector(".albumTopBox:not(.cover):not(.info)");
  if (headline && ratingBox) {
    ratingBox.insertBefore(headline, ratingBox.firstChild);
  } else if (headline && coverBox && coverBox.parentNode) {
    coverBox.parentNode.insertBefore(headline, coverBox.nextSibling);
  }

  var style = document.createElement("style");
  style.textContent =
    ".albumUserScoreBox{border-top-left-radius:10px;border-top-right-radius:10px;}" +
    ".albumTopBox .albumHeadline{text-align:center;}";
  (document.head || document.documentElement).appendChild(style);

  var scoreHeaders = document.querySelectorAll(".scoreHeader");
  scoreHeaders.forEach(function (header) {
    header.remove();
  });

  var rightBoxes = document.querySelectorAll(".rightBox");
  rightBoxes.forEach(function (box) {
    if (box.textContent.includes("User Score")) {
      box.remove();
    }
  });

  var ratingRows = document.querySelectorAll(".ratingRow");
  ratingRows.forEach(function (row) {
    if (row.textContent.includes("critic score")) {
      row.remove();
    }
  });

  var ratingTexts = document.querySelectorAll(".ratingText");
  ratingTexts.forEach(function (text) {
    if (text.textContent.includes("user score")) {
      text.remove();
    }
  });

  var covers = document.querySelectorAll(".albumListCover.mustHear.both");
  covers.forEach(function (cover) {
    cover.className = "albumListCover mustHear user";
  });

  var sections = document.querySelectorAll(".section");
  sections.forEach(function (section) {
    var heading = section.querySelector(".sectionHeading");
    if (heading && heading.textContent.includes("You May Also Like")) {
      section.remove();
    }
  });

  var footerButtons = document.querySelectorAll(".footerButtons");
  footerButtons.forEach(function (button) {
    button.remove();
  });

  var headline = document.querySelector("h1.headline");
  if (headline) {
    headline.textContent = headline.textContent.replace(" by User Score", "").replace("Users' ", "");
  }

  var ratingTexts = document.querySelectorAll(".ratingText");
  ratingTexts.forEach(function (text) {
    var match = text.textContent.match(/\((\d+)\)/);
    if (match) {
      text.textContent = "(" + match[1] + " ratings)";
    }
  });

  var buyAmazon = document.querySelectorAll(".buyAmazon");
  buyAmazon.forEach(function (element) {
    element.remove();
  });

  var subscribeLinks = document.querySelectorAll("a[href='/subscribe/']");
  subscribeLinks.forEach(function (link) {
    var parent = link.parentElement;
    if (parent) {
      parent.remove();
    }
  });
})();
