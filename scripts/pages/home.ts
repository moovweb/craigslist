$$("body") {
  # Adding a class for page-specific styling
  add_class("_home")
  # Removing unnecessary scripts and breaks 
  # Removing the copyright banner
  # Removing the calendar
  remove(".//table[@summary='calendar']")
  remove(".//script | .//br | .//span[@id='copy'] | .//table[@summary='calendar']")

  # Changing tables so they are comprised of divs and spans
  table_dump(".//table")

  # Get the left bar out of the way
  # $$("#leftbar") {
  #   move_to("/html/body")
  # }

  #   # Adding attributes for Uranium widget 
  $$("#main") {
  #   # Using XPath to take advantage of the "not" function
    $(".//div[@class='col']") {
      attribute("data-ur-set", "toggler")
      $$("h4") {
        attributes(class: "_category", 
                   data-ur-toggler-component: "button")
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
  
  # Making the header with another Uranium widget (tabs)
  $$("#leftbar") {
    attributes(data-ur-set: "tabs", 
               data-ur-closeable: "true")
    # Adding the logo icons for all the tabs 
    $$("#logo") {
      insert("div", class: "_icons_bar") {
        insert("div", class: "sprites-account", 
                      data-ur-tab-id: "account", 
                      data-ur-tabs-component: "button")
        insert("div", class: "sprites-search", 
                      data-ur-tab-id: "search", 
                      data-ur-tabs-component: "button")
        insert("div", class: "sprites-info", 
                      data-ur-tab-id: "info", 
                      data-ur-tabs-component: "button")
      }
    }

    # Defining the content that will appear when the corresponding icon buttons are clicked
    $$("ul#postlks") {
      attributes(data-ur-tabs-component: "content", 
                 data-ur-tab-id: "account",
                 data-ur-state: "disabled")
      $$("> li > a") {
        attribute("class", "_header_bar")
      }
    }
    $$("form#search") {
      attributes(data-ur-tabs-component: "content", 
                 data-ur-tab-id: "search",
                 data-ur-state: "disabled")
    }
    insert("div", data-ur-tabs-component: "content", 
                  data-ur-tab-id: "info", 
                  data-ur-state: "disabled") {
      move_here("../ul[@id='leftlinks']")
      move_here("../div[@id='calttl']")
      move_here("../p[@id='sflinks']")
      $$("a") {
        attribute("class", "_header_bar")
      }
    }
  }
}