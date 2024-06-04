let eggs = 3;
let hide_areas = [];
let player_score = 0;
let comp_score = 0;
let turn = 0;
let rand_select = null;

const messages = $(".message")
  .map(function () {
    return this;
  })
  .get();

const areas = $(".field__area")
  .map(function () {
    return this;
  })
  .get();

const p_areas = $(".player__area")
  .map(function () {
    return this;
  })
  .get();

const c_areas = $(".comp__area")
  .map(function () {
    return this;
  })
  .get();

const num = Array.from({ length: c_areas.length }, (_, n) => "area_" + n);
const comp_eggs = createUniqueList(num).slice(0, 3).sort();

const rand_num = createUniqueList(num);

function createUniqueList(data) {
  return data.sort(() => Math.random() - 0.5);
}

for (let i = eggs; i > 0; i--) {
  messages[i - 1].textContent = "🥚";
}

$("#count").text(eggs + " eggs");

$("#result__player").text(player_score + " egg");
$("#result__comp").text(comp_score + " egg");

$(".field__area").click(function () {
  if (eggs > 0 && this.textContent === "") {
    this.textContent = "🥚";
    eggs--;
  } else if (this.textContent === "🥚") {
    this.textContent = "";
    eggs++;
  }

  for (let j = 3; j > 3 - eggs; j--) {
    $(messages[j - 1]).removeClass("hid");
  }

  for (let k = 0; k < 3 - eggs; k++) {
    $(messages[k]).addClass("hid");
  }

  if (eggs === 0) {
    $(".count-message").text("You have hid all the eggs");
  } else if (eggs > 1) {
    $("#count").text(eggs + " eggs");
  } else {
    $("#count").text(eggs + " egg");
  }
});

$("#ready-btn").click(function () {
  if (eggs > 0) {
    $("#ready-btn").animate({ left: 10 }, "fast");
    $("#ready-btn").animate({ left: 0 }, "fast");
  } else {
    for (let l = 0; l < areas.length; l++) {
      if (areas[l].textContent === "🥚") {
        hide_areas.push(areas[l].id);
      }
    }
    $(".header__text").text("Search the eggs on the field on the right");
    $(".main__hiding-state").addClass("close-hide-state");
    $(".main__play-state").animate({ width: "100%" });
    for (let m = 0; m < p_areas.length; m++) {
      if (hide_areas.includes("area_" + m)) {
        p_areas[m].textContent = "🥚";
      }
    }
  }
});

$(".comp__area").click(function () {
  if (comp_eggs.includes(this.id)) {
    this.textContent = "🥚";
    player_score++;
  }
  $(this).css("background-image", "url('../assets/images/Ground.jpg')");
  this.setAttribute("disabled", "");
  if (player_score > 1) {
    $("#result__player").text(player_score + " eggs");
  } else {
    $("#result__player").text(player_score + " egg");
  }

  setTimeout(() => {
    rand_select = Number(rand_num[turn].slice(5));
    if (p_areas[rand_select].textContent === "🥚") {
      comp_score++;
    }
    $(p_areas[rand_select]).css(
      "background-image",
      "url('../assets/images/Ground.jpg')"
    );
    if (comp_score > 1) {
      $("#result__comp").text(comp_score + " eggs");
    } else {
      $("#result__comp").text(comp_score + " egg");
    }
    turn++;
  }, 1000);
});
