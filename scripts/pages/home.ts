$("/html") {
  log("I'm importing home")
  $("./head") {
    insert("script", src:"http://d1topzp4nao5hp.cloudfront.net/uranium-upload/0.1.46/uranium.js")
  }
  $("./body") {
    $(".//table") {
      name("div")
      attribute("class", "oldtable")
      $("./tr") {
         name("div")
         add_class(concat("mw_", index(), "row"))
      }
    }
    $(".//ul[@id='leftlinks']") {
      remove()
    }
    $(".//div[@id='calttl']") {
      remove()
    }
    $(".//div[@summary='calendar']") {
      remove()
    }
    $(".//div[@id='main']") {
      move_to("//div[@id='logo']", "after")
    }
    $(".//ul[@id='postlks']") {
      log("selecing ul")
      $("./li[2]") {
        add_class('second')
      }
    }
    $(".//div[@class='col']") {
      attribute("data-ur-set", "toggler")
      $(".//h4[@class='ban']") {
        attribute("data-ur-toggler-component", "button")
        $("./a") {
          attribute("href", "")
        }
      }
      $(".//div[@class='cats']") {
        attribute("data-ur-toggler-component", "content")
      }
    }
  }
}