hexo.extend.helper.register("outdate", function () {
  const { config } = hexo.theme;
  if (config.outdate && config.outdate.enable) {
    return `
<script data-pjax>
  var updateTimeEl = _$('#post-update-time');
  var updateTime = updateTimeEl ? updateTimeEl.innerHTML : null;

  if (updateTime) {
    var update = new Date(updateTime);
    var now = new Date();
    var diff = now - update;
    var days = diff / 86400000;
    var daysAgo = window.REIMU_CONFIG.outdate.daysAgo;
    var template = window.REIMU_CONFIG.outdate.message;
    if (days >= daysAgo) {
      var message = "This article was last updated on " + updateTime + ". Please note that the content may no longer be applicable.";
      if (typeof template === 'string') {
        message = template.replace(/{time}/, updateTime);
      } else if (typeof template === 'object') {
        var lang = document.documentElement.lang;
        var messageKeys = Object.keys(template);
        var messageKey = null;
        for (var i = 0; i < messageKeys.length; i++) {
          if (messageKeys[i].toLowerCase() === lang.toLowerCase()) {
            messageKey = messageKeys[i];
            break;
          }
        }
        if (messageKey && template[messageKey]) {
          message = template[messageKey].replace(/{time}/, updateTime);
        }
      }
      var blockquote = _$('#outdate-blockquote');
      if (blockquote) {
        blockquote.querySelector('p').innerText = message;
        blockquote.style.display = 'block';
      }
    }
  }
</script>`;
  }
  return "";
});
