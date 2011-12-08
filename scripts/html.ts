# HTML Transformations go here

$("/html") {

  # Strip out comments and links
  # PASSTHROUGH: To passthrough comments and links, delete the 3 lines below
  #$(".//comment()|.//link|.//style") {
  #  remove()
  #}

  # Add assets
  $("./head") {
    insert("link", rel: "stylesheet", type: "text/css", href: asset("main.css", "stylesheet"))
    insert("link", rel: "shortcut icon", href: asset("favicon.ico", "image"))
    insert("link", rel: "apple-touch-icon", href: asset("apple-touch-icon.png", "image"))
  }
  $("./body") {
    # Rewrite links
    $(".//a") {
      attribute("href") {
        value() {
          rewrite("link")
        }
      }
    }

    # Rewrite form actions
    $(".//form") {
      attribute("action") {
        value() {
          rewrite("link")
        }
      }
    }

  }

  # Absolutize IMG and SCRIPT SRCs
  var("slash_path") {
    # the 'slash_path' is the path of this page without anything following it's last slash
    set($path)
    replace(/[^\/]+$/, "")
    # turn empty string into a single slash because this is the only thing separating the host from the path relative path
    replace(/^$/, "/")
  }
  $(".//img|.//script") {
    var("src", fetch("./@src"))
    # skip URLs which: are empty, have a host (//www.example.com), or have a protocol (http:// or mailto:)
    match($src, /^(?![a-z]+\:)(?!\/\/)(?!$)/) {
      attribute("src") {
        value() {
          match($src) {
            with(/^\//) {
              # host-relative URL: just add the host
              prepend(concat("//", $source_host))
            }
            else() {
              # path-relative URL: add the host and the path
              prepend(concat("//", $source_host, $slash_path))
            }
          }
        }
      }
    }
  }



  @import sections/header.ts
  @import sections/footer.ts
  @import pages/home.ts
  @import mappings.ts


}
