$$("body") {
  # Adding a class for page-specific styling
  add_class("_home")

  # Removing unnecessary scripts and breaks 
  remove(".//script")
  remove(".//br")

  # Removing the copyright banner
  remove(".//span[@id='copy']")

  # Changing tables so they are comprised of divs and spans
  table_dump(".//table")

  # Removing the calendar
  remove(".//div[@summary='calendar']")
  
  $$("#main") {
    
    # Turning the list of items into an accordion using Uranium (see http://uraniumjs.com)
    $$("#res > h4") {
      add_class("_category")
      # add span for button icon
      $$("a") {
        insert_bottom("span"){
          attribute("class", "_icon_subcategory")
        }
      }
    }
    
    # Adding attributes for Uranium widget 

    # Using XPath to take advantage of the "not" function
    $(".//div[@class='col' and not(@id='res')]") {
      attribute("data-ur-set", "toggler")
      $$("h4") {
        attributes(class: "_category", 
                   data-ur-toggler-component: "button")

        # Wrapping any "naked" text in a div - mainly for the "Personals" tab
        wrap_text_children('div') {
          insert("span", class: "_icon_category") {
            #attribute("class", "_toggler_btn_icon")
          }
        }

        # Making the links to the over-arching categories new items in the list
        $txt = fetch("./a/text()")
        insert_top("div", $txt) {
          # Adding a span to incorporate the button for the non-Personals categories
          insert("span") {
            attribute("class", "_icon_category")
          }
        }
        $$("a") {
          wrap("li") {
            move_to("../../div[@class='cats']/ul[1]", "top")
          }
        }
      }
      $$("ul") {
        attribute("data-ur-toggler-component", "content")
        $$("> li") {
          attribute("class", "_subcategory")
          # add span for button icon
          $$("> a"){
            insert_bottom("span"){
              attribute("class", "_icon_subcategory")
            }
          }
        }
      }
    }

    # Removing the extra div above the Personals category
    $(".//div[@id='ppp']/h4/div[1]") {
      remove()
    }
  }
  
	# Implementing an accordion for the location lists, too
  $$("#rightbar") {
    $$("> ul > li") {
      attribute("data-ur-set", "toggler")
      $$("h5") {
        attributes(class: "_category", 
                   data-ur-toggler-component: "button")
        wrap_text_children("div")
        # add span for button icon
        $("./div[1]"){
          insert("span"){
            attribute("class", "_icon_category")
          }
        }
      }
      $$("ul") {
        attribute("data-ur-toggler-component", "content")
        $$("> li") {
          attribute("class", "_subcategory")
          $$("> a") {
            insert_bottom("span") {
              attribute("class", "_toggler_subcategory")
            }
          }
        }
      }
    }
  }
  # Making the header with another Uranium widget (tabs)
  $$("#leftbar") {
    attributes(data-ur-set: "tabs", 
               data-ur-closeable: "true")
    wrap_text_children("span") {
      move_to("//span[@id='rightbar']")
    }
    # Adding the logo icons for all the tabs 
    $$("#logo") {
      insert("div", class: "_icons_bar") {
        insert("div", class: "icons-account", 
                      data-ur-tab-id: "account", 
                      data-ur-tabs-component: "button")
        insert("div", class: "icons-search", 
                      data-ur-tab-id: "search", 
                      data-ur-tabs-component: "button")
        insert("div", class: "icons-info", 
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