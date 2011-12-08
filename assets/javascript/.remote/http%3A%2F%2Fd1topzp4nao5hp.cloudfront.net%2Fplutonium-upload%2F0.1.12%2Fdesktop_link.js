/* 
 * Desktop Site Link
 *
 * The Desktop Site Link is a little Javascript snippet that redirects you
 * to the desktop version of whatever page you are on.
 * 
 * Basically if you are on m.example.com it will take you to www.example.com. However
 * sometimes the rewriter rules are more complicated than that. This will take
 * the rewriter rules for your project into account.
 *
 * It also sets the mw_mobile_site cookie. This is the cookie that indicates to the
 * customer's redirection code whether or not a mobile user should be redirected.
 * 
 * USAGE:
 *
 * 3 steps to use with Tritium:
 *
 * 1. Add this script file
 *
 * 2. Insert a link with the 'mw_desktop_link' ID, i.e.:
     inject("<a id='mw_desktop_link'>Desktop Site</a>")
 *
 * 3. Configure by placing the 'mw_desktop_link_config' element anywhere on your page, i.e.:
     insert("div") {
       attribute("id", "mw_desktop_link_config")
       attribute("matcher", $rewrite_incoming_matcher)
       attribute("replacement", $rewrite_incoming_replacement)
       attribute("cookie_hours", "0")
       attribute("cookie_domain", ".belk.com")
       attribute("rewriter_json", $rewrite_incoming_json)
     }
 *
 * The 'mw_desktop_link_config' element can be used to configure how the desktop link works
 * with these parameters:
 *
 *   matcher= Regex for matching your mobile URL.
 *
 *   replacement= Replacement string to create a desktop URL out of mobile URL.
 *
 *   cookie_hours= (optional) The number of hours for which the mw_mobile_site cookie will be valid.
 *   Defaults to '0', in which case 'expires' is not specified so the cookie is transient.
 *
 *   cookie_domain= (optional) Set this to the domain which is shared by the mobile site
 *   and the desktop site (i.e. .example.com). If you don't select anything it will be set
 *   for you, but it cannot be automatically set if the top-level domain has more than one
 *   label (as in .co.uk).
 *
 *   immediate= (optional) If you set immediate to 'true' then as soon as this javascript executes
 *   the user will be redirected to the equivalent desktop page.
 *
 *   this_page_only= (optional) If you set this_page_only to 'true' then the desktop site cookie
 *   will only apply to this particular page. Works will with 'immediate' for specifying that this
 *   particular page has not been reformatted for mobile.
 */
x$(document).on("DOMContentLoaded", function() {
  var me = document.getElementById("mw_desktop_link_config");
  
  if (me === null) {
    console.log("No mw_desktop_link_config element found. This window url : (" + window.document.location.href +")");
    return;
  }

  var cookie_domain = me.getAttribute("cookie_domain");
  if (!cookie_domain) {
    cookie_domain = "." + /([a-z]+\.[a-z]+)($|\/|\?)/(window.location.toString())[1];
  }
  var cookie_hours = 0;
  var cookie_hours_attribute = me.getAttribute("cookie_hours");
  if (cookie_hours_attribute) {
    cookie_hours = parseInt(cookie_hours_attribute);
  }
  var cookie_seconds = cookie_hours * 1000 * 60 * 60;
  var rewriters = JSON.parse(me.getAttribute("rewriter_json"));

  // replace ruby-style capture groups (\1) with js-style ($1)
  for (var i=0;i<rewriters.length;i++) {
    rewriters[i]["replacement"] = rewriters[i]["replacement"].replace(/\\/g, "$");
  }

  var set_desktop_cookie = function() {
    var expires = new Date(new Date().getTime() + cookie_seconds);
    var cookie = "mw_mobile_site=false; ";
    // zero cookie seconds means a session/transient cookie - no 'expires' portion
    if (cookie_seconds != 0) {
      cookie += "expires=" + expires.toGMTString() + "; ";
    }
    if (me.getAttribute("this_page_only") == "true") {
      cookie += "path=" + window.location.pathname + "; ";
    } else {
      cookie += "path=/; ";
    }
    cookie += "domain=" + cookie_domain;
    document.cookie = cookie;
    return true;
  };

  // Get the desktop equivalent to the current location (i.e. get www.example.com for m.example.com)
  var get_desktop_location = function() {
    var location = window.location.toString();
    for (var j=0;j<rewriters.length;j++) {
      var matcher = new RegExp(rewriters[j]['matcher']);
      var replacement = rewriters[j]['replacement'];
      location = location.replace(matcher, replacement);
    }
    return location;
  };
  var desktop_location = get_desktop_location();

  var desktop_link = document.getElementById("mw_desktop_link");
  if (desktop_link) {
    desktop_link.onclick = set_desktop_cookie;
    desktop_link.setAttribute("href", desktop_location);
  }

  if (me.getAttribute("immediate") == "true") {
    set_desktop_cookie();
    window.location = desktop_location;
  }
});
