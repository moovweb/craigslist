# HTML Transformations go here

$("/html") {
  rewrite_links()
  absolutize_srcs()
  
  # Remove all script tags not marked with "data-keep" attribute
  remove_desktop_js();

    # Needed to begin mobilizing
  remove_all_styles()
  remove_html_comments()
  insert_mobile_meta_tags()

  
  add_assets()

  @import sections/header.ts
  @import sections/footer.ts

  @import mappings.ts

  # Late load all the images on the site
  # lateload()
}

