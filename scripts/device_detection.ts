
$device_stylesheet = "main"
match($user_agent) {
  with(/Android/) {
    $device_stylesheet="devices/android"
  }
  with(/Blackberry/) {
    $device_stylesheet="devices/blackberry"
  }
  with(/iPhone/) {
    $device_stylesheet="devices/iphone"
  }
  with(/iPad/) {
    $device_stylesheet="devices/ipad"
  }
  with(/WebKit/) {
    $device_stylesheet="devices/webkit"
  }
}