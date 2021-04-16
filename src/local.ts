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
