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

  function removeOne(selector) {
    var element = document.querySelector(selector);
    if (element) {
      element.remove();
    }
  }

  function removeAll(selector) {
    document.querySelectorAll(selector).forEach(function (element) {
      element.remove();
    });
  }

  function setText(selector, text) {
    var element = document.querySelector(selector);
    if (element) {
      element.textContent = text;
    }
  }

  function replaceText(selector, transform) {
    var element = document.querySelector(selector);
    if (element) {
      element.textContent = transform(element.textContent);
    }
  }

  removeOne(".albumCriticScoreBox");
  removeOne(".artistCriticScoreBox");
  removeOne(".albumUserScoreBox .heading");
  removeOne("#critics");
  removeOne(".mustHearButton.user");
  removeAll("a.noUnderline");

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
    ".albumUserScoreBox,.artistUserScoreBox{border-top-left-radius:10px;border-top-right-radius:10px;}" +
    ".albumTopBox .albumHeadline{text-align:center;}";
  (document.head || document.documentElement).appendChild(style);

  removeAll(".scoreHeader");
  setText("a[href='?type=featured&s=user']", "Score");

  var featuredCriticTab = document.querySelector(
    "a[href='?type=featured&s=critic']",
  );
  if (featuredCriticTab) {
    var listItem = featuredCriticTab.closest("li");
    if (listItem) {
      listItem.remove();
    }
  }

  document.querySelectorAll(".rightBox").forEach(function (box) {
    if (box.textContent.includes("User Score")) {
      box.remove();
    }
  });

  document.querySelectorAll(".ratingRow").forEach(function (row) {
    if (row.textContent.includes("critic score")) {
      row.remove();
    }
  });

  document.querySelectorAll(".ratingText").forEach(function (text) {
    if (text.textContent.includes("user score")) {
      text.remove();
    }
  });

  document
    .querySelectorAll(
      ".image.mustHear.user, .image.mustHear.both, .image.mustHear.critic",
    )
    .forEach(function (image) {
      image.className = "image";
    });

  document
    .querySelectorAll(".mustHear > i.fas.fa-star")
    .forEach(function (star) {
      var container = star.parentElement;
      if (container) {
        container.remove();
      }
    });

  document.querySelectorAll(".section").forEach(function (section) {
    var heading = section.querySelector(".sectionHeading");
    if (heading && heading.textContent.includes("You May Also Like")) {
      section.remove();
    }
  });

  removeAll(".footerButtons");
  removeAll(".buyAmazon");

  replaceText("h1.headline", function (text) {
    return text.replace(" by User Score", "").replace("Users' ", "");
  });

  document.querySelectorAll(".ratingText").forEach(function (text) {
    var match = text.textContent.match(/\((\d+)\)/);
    if (match) {
      text.textContent = "(" + match[1] + " ratings)";
    }
  });

  document.querySelectorAll("a[href='/subscribe/']").forEach(function (link) {
    var parent = link.parentElement;
    if (parent) {
      parent.remove();
    }
  });

  document
    .querySelectorAll(".scoreValueContainer[title]")
    .forEach(function (container) {
      var rawScore = container.getAttribute("title");
      if (!rawScore) {
        return;
      }

      var scoreValue = container.querySelector(".scoreValue");
      if (scoreValue) {
        scoreValue.textContent = rawScore;
      }
    });
})();
