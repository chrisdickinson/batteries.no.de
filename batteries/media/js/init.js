batteries = window.batteries || {};

$(function() {
  _.chain().
    keys(batteries).
    each(function(key) {
      window.console && console.log('Initializing '+key);
      batteries[key].init && batteries[key].init();
    });
});
