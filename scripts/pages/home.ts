$("/html/body") {
	# Adding a class for page-specific styling
	add_class("_home")

	# Removing unnecessary scripts and breaks 
	remove(".//script")
	remove(".//br")

	# Changing tables so they are comprised of divs and spans
  $(".//table") {
  	name("div")
  	attribute("class", "oldtable")
  	$("./tr") {
  		name("div")
  		add_class("_" + index() + "row")
  		$("td|th") {
  			name("span")
  		}
  	}
  }

  # Removing the calendar
  remove(".//div[@summary='calendar']")

  $(".//div[@id='main']") {

  	# Turning the list of items into an accordion using Uranium (see http://uraniumjs.com)
  	$(".//div[@id='res']/h4") {
		  add_class("_category")
		}

		# Adding attributes for Uranium widget 
  	$(".//div[@class='col' and not(@id='res')]") {
  		attribute("data-ur-set", "toggler")
		  $(".//h4") {
		    attributes(class: "_category", 
		    	         data-ur-toggler-component: "button")
		    wrap_text_children('div')

		    # Making the links to the over-arching categories items in the list
		    $txt = fetch("./a/text()")
			  insert_top("div", $txt)
			  $("./a") {
			    wrap("li") {
			      move_to("../../div[@class='cats']/ul[1]", "top")
			    }
			  }
		  }
			$(".//ul") {
			  attribute("data-ur-toggler-component", "content")
			  $("./li") {
			    attribute("class", "_subcategory")
			  }
			}
		}
	}

	# Implementing an accordion for the location lists, too
  $(".//span[@id='rightbar']") {
  	$("./ul/li") {
  		attribute("data-ur-set", "toggler")
	  	$(".//h5") {
	  		attributes(class: "_category", 
	  			         data-ur-toggler-component: "button")
	  		wrap_text_children("div")
	  	}
	  	$(".//ul") {
	  		attribute("data-ur-toggler-component", "content")
	  		$("./li") {
	  		  attribute("class", "_subcategory")
	  		}
	  	}
	  }
  }
  # Making the header with another Uranium widget (tabs)
	$(".//span[@id='leftbar']") {
		attributes(data-ur-set: "tabs", 
               data-ur-closeable: "true")
		wrap_text_children("span") {
			move_to("//span[@id='rightbar']")
		}
		# Adding the logo icons for all the tabs 
	  $("./div[@id='logo']") {
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
	  $("./ul[@id='postlks']") {
	    attributes(data-ur-tabs-component: "content", 
	               data-ur-tab-id: "account",
	               data-ur-state: "disabled")
	    $("./li/a") {
	    	attribute("class", "_header_bar")
	    }
	  }
	  $("./form[@id='search']") {
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
			$(".//a") {
			  attribute("class", "_header_bar")
			}
		}
	}
}