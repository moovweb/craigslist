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

# Fix the connection header so it is always connection: close,
# regardless of whether or not a connection header existed
$found = "false"
replace(/^(connection\:\s*)[^\r\n]*/i) {
  $found = "true"
  set("$1close")
}
match($found, "false") {
  append("\r\nConnection: close")
}

# Some operations only need be done when the response has a body
match($body, "true") {

  #
  # fix_content_encoding_header(compression)
  #
  # remove the content-encoding header
  replace(/\s+^content\-encoding\:[^\r\n]*/i, "")
  # add a correct one
  match($compression, not("")) {
    append("\r\nContent-Encoding: ")
    append($compression)
  }

  #
  # fix_content_length_header
  #
  $fixed_length = "false"
  replace(/^(content\-length\:\s*)[^\r\n]*/i) {
    $fixed_length = "true"
    set("$1")
    append($body_length)
  }
  # NOTE: Ideally we would not add a content-length header if one
  # did not exist in the original response. However, varnish will set
  # the content length to zero if it doesn't see a content-length
  # header. So here we ensure that one exists.
  match($fixed_length, "false") {
    append("\r\nContent-Length:")
    append($body_length)
  }
}

#
# fix_vary_header
#
$fixed_vary = "false"
replace(/^(vary\:\s*)[^\r\n]*/i) {
  $fixed_vary = "true"
  set("$1")
  append("Accept-Encoding")
}
match($fixed_vary, "false") {
  append("\r\nVary: Accept-Encoding")
}

#
# rewrite_location_header
#
replace(/^(location\:\s*)([^\r\n]*)/i) {
  $a = $1
  $2 {
    rewrite("link")
  }
  set($a)
  append("$2")
}

#
# rewrite_set_cookie_domains
#
match($rewrite_cookie_matcher, not("")) {
  replace(/^(set-cookie\:.*domain\=)([^\;\r\n]+)/i) {
    # NOTE: I'm saving $a because the call to rewrite will overwrite $1
    # If this gets fixed, we should use $1 instead of $a
    $a = $1
    $2 {
      rewrite("cookie")
    }

    set("$2")
    prepend($a)
  }
}

# find set-cookie headers without a domain and potentially add one
match($cookie_domain_missing_replacement, not("")) {
  replace(/^(set-cookie\:(?!.*domain)[^\r\n]+)/i) {
    set("$1")
    append("; domain=")
    append($cookie_domain_missing_replacement)
  }
}

# important that apply_export_variables be run last so that we don't rewrite
# cookie domains or locations that have been explicitly set by the user
match($body, "true") {

  match(var("Content-Type"), not("")) {
    replace(/^(content-type\:\s*)([^\;\r\n])+/i) {
      set("$1")
      append(var("Content-Type"))
    }
  }

  match(var("Content-Type-Charset"), not("")) {
    $found = "false"
    replace(/(content-type:[^\r\n]+charset=)([^\;\r\n]+)/i) {
      $found = "true"
      set("$1")
      append(var("Content-Type-Charset"))
    }
    match($found, "false") {
      replace(/^(content-type\:[^\r\n]+)/i) {
        set("$1")
        append("; charset=")
        append(var("Content-Type-Charset"))
      }
    }
  }

  match(var("Cache-Time"), not("")) {
    replace(/\s+^cache-control\:[^\r\n]*/i, "")
    replace(/\s+^pragma\:[^\r\n]*/i, "")
    replace(/\s+^expires\:[^\r\n]*/i, "")
    append("\r\nCache-Control: public, max-age=")
    append(var("Cache-Time"))
  }

  match($Location, not("")) {
    $found = "false"
    replace(/^(location\:\s*)([^\r\n]*)/i) {
      $found = "true"
      set("$1")
      append($Location)
    }
    match($found, "false") {
      replace(/(\A[^\r\n]+\s+)200/, "\\1302")
      append("\r\nLocation: ")
      append($Location)
    }
  }
}

