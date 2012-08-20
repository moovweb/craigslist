# The main file executed by Tritium. The start of all other files.

match($content_type) {
  with(/html/) {
    replace(/fb:/, "fbn_") # Rewrite the xmlns facebook nodes before the html parser clobbers them
    
    html("UTF-8") {
      @import device_detection.ts
      


      @import html.ts
    }

    replace(/fbn_/, "fb:") # Rewrite the xmlns facebook nodes to restore them
  }
  #with(/javascript/) {
  #  @import ajax.ts
  #}
  else() {
    log(concat("Passing through ", $content_type, " unmodified"))
  }
}