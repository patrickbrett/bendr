var script = document.createElement('script'),
  scripts = document.getElementsByTagName('script')[0];
script.src = 'https://maps.googleapis.com/maps/api/js?key=API_KEY_HERE';
scripts.parentNode.insertBefore(script, scripts);