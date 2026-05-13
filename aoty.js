// ==UserScript==
// @name         Better AOTY
// @namespace    https://github.com/om3ga6400
// @version      0.1.0
// @description  QoL mod for AOTY
// @author       om3ga6400
// @match        https://www.albumoftheyear.org/album/*
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
    ".albumUserScoreBox{border-top-left-radius:6px;border-top-right-radius:6px;}" +
    ".albumTopBox .albumHeadline{text-align:center;}";
  (document.head || document.documentElement).appendChild(style);
})();
