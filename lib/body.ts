# Rewriters
$rewrite_link_host = "m(?<prefix>[a-z]*)\\.[a-z0-9\\-\\.]*craigslist\\.org"
$rewrite_link_matcher = "(^|\\/\\/|\\\"|\\')(?!m$prefix\\.)(www\\.)?([a-z0-9\\-\\.]*)craigslist\\.org"
$rewrite_link_replacement = "\\1m$prefix.\\3craigslist.org"

$rewrite_cookie_host = ""
$rewrite_cookie_matcher = "\\.?(www\\.)?([a-z0-9\\-\\.]*craigslist\\.org)"
$rewrite_cookie_replacement = ".\\2"
$rewrite_cookie_missing_replacement = ""

$rewrite_incoming_json = "[{\"matcher\":\"^m[a-z]*\\\\.craigslist\\\\.org\",\"replacement\":\"www.craigslist.org\"},{\"matcher\":\"m[a-z]*\\\\.([a-z0-9\\\\-\\\\.]*craigslist\\\\.org)\",\"replacement\":\"\\\\1\"}]"

$rewrite_incoming_json {
  replace("$secure", $secure)
}

$host {
  replace(regexp($rewrite_link_host))
}
$rewrite_link_matcher {
  
  replace("$prefix", $prefix)
}
$rewrite_link_replacement {
  
  replace("$prefix", $prefix)
}

$host {
  replace(regexp($rewrite_cookie_host))
}
$rewrite_cookie_matcher {
  
}
$rewrite_cookie_replacement {
  
}

# Script
@import main.ts

export("host", $host)
