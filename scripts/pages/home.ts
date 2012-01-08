$("/html") {
  log("I'm importing home")
  $("./head") {
    # step 1 --> inject moovweb library
    insert("script", src:"http://d1topzp4nao5hp.cloudfront.net/uranium-upload/0.1.46/uranium.js")
  }
  $("./body") {
    # step 2 --> remove not used script from desktop site
    $("script") {
      remove()
    }

    # step 3 --> dump table
    $(".//table") {
      name("div")
      attribute("class", "oldtable")
      $("./tr") {
        name("div")
        add_class(concat("mw_", index(), "row"))
        $("td|th") {
          name("span")
        }
      }
    }
    # step 4  --> style left colmun
    $(".//span[@id='leftbar']") {
      attributes(data-ur-set: "tabs", data-ur-closeable: "true")
      # insert header icons for account, search, calendar, info
      $("div[@id='logo']") {
        insert("div", class: 'mw_icons_bar') {
          insert("div", class: 'mw_account' , data-ur-tab-id: "account_tab", data-ur-tabs-component: "button", data-ur-state: "disabled")
          insert("div", class: 'mw_search', data-ur-tab-id: "search_tab", data-ur-tabs-component: "button", data-ur-state: "disabled")
          insert("div", class: 'mw_calendar', data-ur-tab-id: "calendar_tab", data-ur-tabs-component: "button", data-ur-state: "disabled")
          insert("div", class: 'mw_info', data-ur-tab-id: "info_tab", data-ur-tabs-component: "button", data-ur-state: "disabled")
        }
      }
      # account tab content
      $("./ul[@id='postlks']") {
        attributes(data-ur-tab-id: "account_tab", data-ur-tabs-component: "content", data-ur-state: "disabled")
        # remove duplicated link. "help. faq, abuse, legal" and "help" go to the same page
        $("li[3]") {
          remove()
        }
        $("li/a") {
          add_class("mw_bar3")
        }
      }
      $("ul[@id='leftlinks']") {
        attributes(data-ur-tab-id: "info_tab", data-ur-tabs-component: "content", data-ur-state: "disabled")
        move_here("./following-sibling::*", "bottom")

        # remove white space
        $("p[@id='sflinks']") {
          wrap_text_children("span") {
            remove()
          }
        }

        $(".//a") {
          add_class("mw_bar3")
        }
      }
      # search tab content
      $("./form[@id='search']") {
        attributes(data-ur-tab-id: "search_tab", data-ur-tabs-component: "content", data-ur-state: "disabled")
      }
      # remove calendar title
      $("div[@id='calttl']") {
        remove()
      }
      $("./div[@summary='calendar']") {
        attributes(data-ur-tab-id: "calendar_tab", data-ur-tabs-component: "content", data-ur-state: "disabled")
      }
    }
    $(".//div[@id='main']") {

      # post categories
      $(".//div[@class='col' and not(@id='res')]") {
        #create accordian set
        attributes(data-ur-set: "toggler")

        $(".//h4[@class='ban']") { 
          wrap_text_children("div")
          $txt = fetch("./a/text()")
          insert_top("div", $txt)
          $("./a") {
            text() {
              append(" all")
            }
            wrap("li") {
              move_to("../../div[@class='cats']/ul[1]", "top")
            }
          }
          # create accordian button
          attributes(class: "mw_bar1", data-ur-toggler-component: "button", data-ur-state: "disabled")
        }
        # create accordian content
        $("div[@class='cats']"){
          attributes (data-ur-toggler-component: "content", data-ur-state: "disabled")
          $(".//li") {
            add_class("mw_bar2")
          }
        }

      }
      $(".//div[@id='res']/h4") {
        add_class("mw_bar1")
      }


    }
    $(".//ul[contains(@class,'menu')]/li") {
      #create accordian set
      attributes(data-ur-set: "toggler")
      $("h5") {
        attributes(class: "mw_bar1", data-ur-toggler-component: "button", data-ur-state: "disabled")
        wrap_text_children("div")
      }
      $("ul") {
        attributes (data-ur-toggler-component: "content", data-ur-state: "disabled")
        $(".//li") {
          add_class("mw_bar2")
        }
      }
    }

    # insert footer copy right
    insert("a", "Mobile Site Powered by Moovweb", class: "mw_moovfooter", href: "http://moovweb.com", target: "_blank")
  }
}