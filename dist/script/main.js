$(function () {
  $("aside").css("--padding-top", $("header").outerHeight() + 20 + "px");

  $(document).on("keyup", function (e) {
    if (e.key == "Escape") {
      hideAllMenus(300);
      hideAsideMenu(300);
    }
    if (e.target.type == undefined && e.key.toUpperCase() == "F") {
      $("#showSearchMenuBtn").trigger("click");
    }
  });

  $("#menu-btn").on("click", function () {
    $("#sideMenu").stop(true, false);
    $(this).toggleClass("opened");
    $(this).attr("aria-expanded", $(this).hasClass("opened"));
    $("#sideMenu").slideToggle(600);
    $("#sideMenu").toggleClass("opened");
    if ($(this).hasClass("opened")) {
      hideAllMenus(600);
    }
    toggleBlurryBg();
  });

  $("#showSearchMenuBtn").on("click", function () {
    $("#searchMenu").stop(true, false);
    hideAsideMenu(600);
    $("#searchMenu").slideToggle(600, () => {
      if ($("#searchMenu").hasClass("opened")) {
        $("#searchMenu input").trigger("focus");
      }
    });
    $("#searchMenu").toggleClass("opened");
    toggleBlurryBg();
  });
});

function hideAsideMenu(duration) {
  $("#menu-btn").stop(true, false);
  $("#menu-btn").removeClass("opened");
  $("#menu-btn").attr("aria-expanded", false);
  $("#sideMenu").slideUp(duration);
}

function hideAllMenus(duration) {
  $(".menu").stop(true, false);
  $(".menu").slideUp(duration);
  $(".menu").removeClass("opened");
  toggleBlurryBg();
}

function toggleBlurryBg() {
  if ($(".menu").hasClass("opened")) {
    $("#blurryBg").fadeIn();
  } else {
    $("#blurryBg").fadeOut();
  }
}
