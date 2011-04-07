batteries = window.batteries || {};

$(function() {
  _(batteries).chain().
    keys().
    each(function(key) {
      window.console && console.log('Initializing '+key);
      batteries[key].init && batteries[key].init();
    });
});
