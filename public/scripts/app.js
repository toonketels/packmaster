$(function(){

  /**
   * Our basic backbone model.
   */
  var LogMessage = Backbone.Model.extend({
      sayMessage: function() {
        alert(this.get('message_human'));
      }
    , change: function() {
        console.log(this.get('message_human') + 'changed');
      }
    , getDateFormatted: function() {
        var date = new Date(this.get('timestamp') * 1000);
        var date_formatted = date.getMonth()+'.'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        return date_formatted;
      }
  });


  /**
   * A basic list view.
   */
  var ListItemView = Backbone.View.extend({
      tagName: 'li'
    , className: 'log-message-item'
    , initialize: function(){
        this.model.bind('change', this.render, this);
        this.render();
      }
    , render: function() {
        var templateHtml = $('#list-item').html();
        var templatePlaceholderValues = {
            time: this.model.getDateFormatted()
          , siteName: this.model.get('site_name')
          , logMessage: this.model.get('message_human')
          , page: this.model.get('request_uri')
          , severity: this.model.get('severity')
        };
        var template = _.template(templateHtml, templatePlaceholderValues);
        $(this.el).html(template);
        return this;
      }
    , events : {
          "click .general": 'showDetailLogMessage'
        , "click .hide": 'hideDetailLogMessage'
      }
    , showDetailLogMessage: function() {
        this.$('.detail').show('slow');
        this.$('.hidden').removeClass('hidden');
      }
    , hideDetailLogMessage: function() {
        this.$('.detail').hide('slow');
        this.$('.detail').addClass('hidden');
      }
  });


  /**
   * Socket io stuff.
   */
  var socket = io.connect('http://localhost:3000');
  var container = jQuery('ul');

  socket.on('news', function (data) {
    console.log(data);

    // Create a new nodel
    var logMessage = new LogMessage(data);

    // Set latest message as property of
    // window object to easily access it
    // via the browser's console.
    window.latestLogMessage = logMessage;

    var listItemView = new ListItemView({model: logMessage})
    window.latestLogMessageView = listItemView;

    // Use models properties / methods
    // to create the output
    container.append(listItemView.el);

    // Emit something back to the server
    socket.emit('my other event', { my: 'data' });
  });
  

});