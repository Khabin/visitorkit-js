var VK = {
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
    $install_key: "",
    $post_url: "",
    label: ""
  },
  params: function() {
    var qs = document.location.search;
    qs = qs.split("+").join(" ");

    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

    while ((tokens = re.exec(qs))) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
  },
  findCampaign: function() {
    var campaign = "DIRECT";
    var query = VK.params();
    if (query.ref) {
      campaign = query.ref;
    }
    if (query.utm_campaign) {
      campaign = query.utm_campaign;
    }
    return campaign;
  },
  log: function(text) {
    if (location.hostname == "vk.local") {
      console.log(text);
    }
  },
  queue: function(name, label = "None", fn = () => {}) {
    var data = VK.sessionData;
    data["$name"] = name;
    data["label"] = label;
    data["$campaign"] = VK.findCampaign();

    // Send Request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (fn) fn();
      }
    };

    var endpoint = "https://sdk.visitorkit.com/v1/" + data["$install_key"];
    if (location.hostname == "vk.local") {
      endpoint = "http://sdk.vk.local/v1/" + data["$install_key"];
    }

    xhttp.open("POST", endpoint, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));

    VK.log("--> " + data["$name"] + " : " + data["label"]);
    VK.log(data);
  },
  conversion: function(label) {
    VK.queue("Conversion", label);
  },
  event: function(label) {
    VK.queue("Custom", label);
  },
  pageview: function() {
    VK.queue("Pageview");
    VK.observer();
  },
  manual: function(a, b) {
    VK.queue(a, b);
  },
  observer: function() {
    setTimeout(function() {
      VK.queue("TimeOnPage", "15");
    }, 15000);
    setTimeout(function() {
      VK.queue("TimeOnPage", "30");
    }, 30000);
    setTimeout(function() {
      VK.queue("TimeOnPage", "45");
    }, 45000);
    setTimeout(function() {
      VK.queue("TimeOnPage", "60");
    }, 60000);
  },
  init: function(key, auto = true) {
    VK.sessionData.$install_key = key;
    if (auto) VK.pageview();
  }
};

export default VK;
