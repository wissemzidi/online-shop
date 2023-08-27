$(function () {
  $("main").css("--padding-top", $("header").outerHeight(true) + "px");

  $(document).on("keydown", function (e) {
    if (e.key == "ArrowDown" || e.key == "ArrowUp") {
      if (
        e.target.id == "searchInput" ||
        e.target.classList[0] == "searchLink"
      ) {
        e.preventDefault();
      }
    }
  });

  let selectedSearchIndex = null;
  let escapeOne = false;
  $(document).on("keyup", function (e) {
    if (e.key == "Escape") {
      hideAllMenus(600);
    }
    if (
      e.target.type == undefined &&
      (e.key == "/" || e.key.toUpperCase() == "F")
    ) {
      $("#showSearchMenuBtn").trigger("click");
    }

    let searchListLength = $(".searchLink").length;
    if (
      e.target.id == "searchInput" ||
      e.target.classList[0] == "searchLink" ||
      escapeOne == true
    ) {
      if (e.key == "ArrowDown") {
        if (
          selectedSearchIndex == null ||
          selectedSearchIndex == searchListLength - 1
        ) {
          selectedSearchIndex = 0;
        } else {
          selectedSearchIndex++;
        }
        e.target.id == "searchInput" ? (escapeOne = true) : (escapeOne = false);
        setTimeout(() => {
          $(`.searchLink:eq(${selectedSearchIndex})`).trigger("focus");
        }, 10);
      }
      if (e.key == "ArrowUp") {
        if (selectedSearchIndex == 0 || selectedSearchIndex == null) {
          selectedSearchIndex = searchListLength - 1;
        } else {
          selectedSearchIndex--;
        }
        e.target.id == "searchInput" ? (escapeOne = true) : (escapeOne = false);
        $(`.searchLink:eq(${selectedSearchIndex})`).trigger("focus");
      }
    }
  });

  // todo => to complete
  $("#mainShowCase").on("mouseover", function () {
    console.log("hover");
    $(".controlButton").fadeIn(300);
  });

  $("#menu-btn").on("click", function () {
    $(".menu").stop(true, false);
    hideAllMenus(600, "aside-nav");
    $("#aside-nav").slideToggle(600);
    $("#aside-nav").toggleClass("opened");
    $(this).attr("aria-expanded", $("#aside-nav").hasClass("opened"));
    toggleBlurryBg();
  });

  $("#showSearchMenuBtn").on("click", function () {
    $(".menu").stop(true, false);
    hideAllMenus(600, "searchMenu");
    $("#searchMenu").slideToggle(600, () => {
      if ($("#searchMenu").hasClass("opened")) {
        $("#searchMenu input").trigger("focus");
      }
    });
    $("#searchMenu").toggleClass("opened");
    toggleBlurryBg();
  });
});

function hideAllMenus(duration, except) {
  $(`.menu:not(#${except})`).removeClass("opened");
  $("#menu-btn").removeClass("opened");
  $("#menu-btn").attr("aria-expanded", false);
  $(`.menu:not(#${except})`).stop(true, false);
  $(`.menu:not(#${except})`).slideUp(duration);
  toggleBlurryBg();
}

function toggleBlurryBg() {
  $("#blurryBg").stop(true, false);
  if ($(".menu").hasClass("opened")) {
    $("#blurryBg").fadeIn();
  } else {
    $("#blurryBg").fadeOut();
  }
}
