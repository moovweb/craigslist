$$("body") {
  add_class("_home")

  remove(".//table[@summary='calendar']")
  remove(".//script | .//br | .//span[@id='copy']")

  table_dump(".//table")

  $$("#leftbar") {
    attributes(data-ur-set:"tabs", data-ur-closeable:"true")
    $$("#logo") {
      insert("div", class:"_icons_bar") {
        insert("div", class: "sprites-account", data-ur-tabs-component:"button", data-ur-tab-id: "account")
        insert("div", class: "sprites-info", data-ur-tabs-component:"button", data-ur-tab-id: "info")
        insert("div", class: "sprites-search", data-ur-tabs-component:"button", data-ur-tab-id: "search")
      }
    }
    $$("ul#postlks") {
      attributes(data-ur-tab-id: "account", data-ur-tabs-component: "content")
      $$("a") {
        attribute("class", "_header_bar")
      }
    }
    $$("form#search") {
      attributes(data-ur-tab-id: "search", data-ur-tabs-component: "content")
    }
    insert("div", data-ur-tabs-component: "content", data-ur-tab-id: "info") {
      move_here("../div[@id='calttl']")
      move_here("../ul[@id='leftlinks']")
      move_here("../p[@id='sflinks']")
      $$("a") {
        attribute("class", "_header_bar")
      }
      $("./ul/li[1]/a") {
        #add_class("_important")
        remove()
      }
    }
  }

  $$("#main") {
    $(".//div[@class='col']") {
      attribute("data-ur-set", "toggler")
      $$("h4") {
        attribute("class", "_category")
        attribute("data-ur-toggler-component", "button")
        $$("a") {
          name("div")
        }
      }
      $$("ul") {
        attribute("data-ur-toggler-component", "content")
        $$("> li") {
          attribute("class", "_subcategory")
        }
      }
    }
  }
}