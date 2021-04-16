import { findCampaign, log } from "./local";

declare global {
  interface Window {
    VK: Object;
  }
}

interface SessionObject {
  $campaign: String;
  $hostname: String;
  $href: String;
  $height: Number;
  $width: Number;
  $ua: String;
  $path: String;
  $title: String;
  $referrer: String;
  $name: String;
  label: String;
  $install_key: String;
}

interface WindowObject {
  sessionData: SessionObject;
  conversions_triggerd: Array<String>;
  event: Function;
  pageview: Function;
  session: Function;
  manual: Function;
  conversion: Function;
}

var VK: WindowObject = {
  sessionData: {
    $campaign: "",
    $hostname: location.hostname,
    $href: location.href,
    $height: window.innerHeight,
    $width: window.innerWidth,
    $ua: navigator.userAgent,
    $path: location.pathname,
    $title: document.title,
    $referrer: document.referrer,
    $name: "",
    label: "",
    $install_key: "",
  },
  conversions_triggerd: [],
  event: function (label: string) {
    queue("Custom", label);
  },
  pageview: function () {
    queue("Pageview");
  },
  session: function () {
    queue("Session");
  },
  manual: function (a: string, b: string) {
    queue(a, b);
  },
  conversion: function () {},
};

VK.conversion = (label: string) => {
  queue("Conversion", label);
};

window.VK = VK;

/**
 * Watch the Window Events
 */
function observer() {
  var state = {
    click: false,
    scroll: false,
  };

  // // 5s
  // setTimeout(function () {
  //   queue("Interaction", "5s");
  // }, 5000);
  //
  // // 15s
  // setTimeout(function () {
  //   queue("Interaction", "15s");
  // }, 15000);
  //
  // // 30s
  // setTimeout(function () {
  //   queue("Interaction", "30s");
  // }, 30000);
  //
  // // 60s
  // setTimeout(function () {
  //   queue("Interaction", "60s");
  // }, 60000);

  // Scroll
  window.addEventListener("scroll", function () {
    if (!state.scroll) {
      queue("Interaction", "Scroll");
    }
    state.scroll = true;
  });
  //
  // // Click
  // window.addEventListener("click", function () {
  //   if (!state.click) {
  //     queue("Interaction", "Click");
  //   }
  //   state.click = true;
  // });

  // Page View
  queue("Pageview");
}

/**
 * Send events to Queue
 */
function queue(name: string, label = "None", fn = () => {}) {
  var data = VK.sessionData;
  data["$name"] = name;
  data["label"] = label;
  data["$install_key"] = "%%install_key%%";

  // Send Request
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (fn) fn();
    }
  };

  xhttp.open("POST", "%%post_url%%", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(data));

  log("--> " + data["$name"] + " : " + data["label"]);
  log(data);
}

/**
 * Starting Place
 */
function init() {
  var campaign = findCampaign();
  VK.sessionData.$campaign = campaign;
  observer();
}

init();
