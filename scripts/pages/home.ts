$("/html/body") {
	add_class("_home")
	remove(".//script")
	remove(".//br")
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
  remove(".//div[@summary='calendar']")
  $(".//div[@id='main']") {
  	$(".//div[@id='res']/h4") {
		  add_class("_category")
		}
  	$(".//div[@class='col' and not(@id='res')]") {
  		attribute("data-ur-set", "toggler")
		  $(".//h4") {
		    attributes(class: "_category", 
		    	         data-ur-toggler-component: "button")
		    wrap_text_children('div')
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
  $(".//span[@id='rightbar']") {
  	$("./ul/li") {
  		attribute("data-ur-set", "toggler")
	  	$(".//h5") {
	  		attributes(class: "_category", data-ur-toggler-component: "button")
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
	$(".//span[@id='leftbar']") {
		attributes(data-ur-set: "tabs", 
             data-ur-closeable: "true")
		wrap_text_children("span") {
			move_to("//span[@id='rightbar']")
		}
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