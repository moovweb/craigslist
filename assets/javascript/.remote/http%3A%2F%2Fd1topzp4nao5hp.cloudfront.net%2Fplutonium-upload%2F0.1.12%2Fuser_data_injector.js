/*
 User Data Injector
 Requires: XUI 2.0 (See NOTE below to make compatible with XUI 2.1)
 By: Andrew Farmer

 Definitions:
   placeholders:  elements on the page which will be filled in with user-
                  specific data
   load elements: elements which need to change style after the user-
                  specific data has loaded
   user data: data which cannot be cached, and which will be downloaded
              by this script and injected into the placeholders

 This script will immediately make a request for the URL of the
 current page with the X-Moov-API request header. It expects to receive a
 response in this format:
   <user_data>
     <item key="user_name">John Doe</item>
     ... more <item> elements ...
   </user_data>

 When the DOMContentLoaded event fires it will look for elements which
 have the user_data_key attribute (placeholders).

 When the AJAX request completes and the DOMContentLoaded event has fired
 this script will inject the downloaded data into the placeholders. For
 instance a response like the one above would trigger a change from this:
   <div user_data_key="user_name">Loading...</div>
 to this:
   <div user_data_key="user_name">John Doe</div>

 Additionally, users can add a 'user_data_loaded_class' attribute on any
 element, to have that class added to the element once the user_data loads.
 So if an element looks like this before the user data is loaded:
   <div class='pipe' user_data_loaded_class='lighter'>tobacco</div>
 It will look like this after the user data loads:
   <div class='pipe lighter' user_data_loaded_class='lighter'>tobacco</div>

*/

(function() {
   var placeholders = null;
   var load_elements = null;
   var response_xml = null;

   // Inject the user data if the AJAX response has arrived AND
   // the DOMContentLoaded event has fired
   var try_inject_user_data = function() {
     if (!placeholders || !load_elements || !response_xml) {
       return;
     }

     // Convert XML response into key/value hash
     var user_data = {};
     for (var i=0;i<response_xml.childNodes.length;i++) {
       var next_node = response_xml.childNodes[i];
       if (next_node.nodeType != 3 && next_node.nodeName == "item") {
         var key = next_node.getAttribute("key");
         user_data[key] = next_node.textContent;
       }
     }

     // Put each bit of data into its proper place
     placeholders.each(function() {
                         var xui_element = x$(this);
                         var key = xui_element.attr("user_data_key");
                         xui_element.html(user_data[key]);
                       });

     // Change the class on the load elements
     load_elements.each(function() {
                          var xui_element = x$(this);
                          var new_class = xui_element.attr("user_data_loaded_class");
                          xui_element.addClass(new_class);
                        });
   };

   // Save the AJAX response
   var data_callback = function() {
     response_xml = this.responseXML.documentElement;
     if (response_xml.nodeName != "user_data") {
       throw "Invalid Moov Cachify response: " + this.responseText;
     }

     try_inject_user_data();
   };

   // Issue the AJAX request
   x$(window).xhr('', {
                    method: 'post',
                    async: true,
                    callback: data_callback,
                    // NOTE: headers are specified differently in XUI 2.1
                    headers: [{name: "X-Moov-API", value:"true"}]
                  });

   // Wait for the DOM to load and get the placeholders
   x$(document).on("DOMContentLoaded", function() {
                     // Find all the elements on the page which will be filled in
                     placeholders = x$("*[user_data_key]");
                     // Find all the elements on the page that need their class changed
                     load_elements = x$("*[user_data_loaded_class]");
                     try_inject_user_data();
                   });

 })();

