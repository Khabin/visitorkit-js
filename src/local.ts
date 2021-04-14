interface URLParms {
  item: String;
  value: string;
}

/**
 * Get URL params
 */
export function params() {
  var qs = document.location.search;
  qs = qs.split("+").join(" ");
  var params: Array<URLParms> = [],
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while ((tokens = re.exec(qs))) {
    params.push({
      item: decodeURIComponent(tokens[1]),
      value: decodeURIComponent(tokens[2]),
    });
  }
  return params;
}

/**
 * Debug text only on vk.local
 */
export function log(text: any) {
  if (location.hostname == "vk.local") {
    console.log(text);
  }
}

/**
 * Set Cookie
 */
export function setCookie(name: string, value: string, minutes: number) {
  var date = new Date();
  var expires = "; expires=" + new Date(date.getTime() + minutes * 60000).toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; samesite=strict; path=/";
}

/**
 * Get Cookie
 */
export function getCookie(name: string) {
  var matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : "{}";
}

/**
 * Generate a Session Token
 */
export function token() {
  return "xxx:xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Look for "ref" and "utm_campaign"
 */
export function findCampaign() {
  let campaign: string = "DIRECT";
  params().forEach((item) => {
    if (item["item"] == "ref") {
      campaign = item["value"];
    }
    if (item["item"] == "utm_campaign") {
      campaign = item["value"];
    }
  });
  return campaign;
}
