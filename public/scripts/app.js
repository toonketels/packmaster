$(function(){

  /**
   * Our basic backbone model.
   */
  var LogMessage = Backbone.Model.extend({
      sayMessage: function() {
        alert(this.get('message_human'));
      }
    , change: function() {
        console.log('changed')
      }
    , getDateFormatted: function() {
        var date = new Date(this.get('timestamp') * 1000);
        var date_formatted = date.getMonth()+'.'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        return date_formatted;
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

    // Use models properties / methods
    // to create the output.
    container.append('<li>'+ logMessage.getDateFormatted() +' <strong>' + logMessage.get('site_name') + '</strong> - ' + logMessage.get('message_human') + '</li>');
    
    // Emit something back to the server
    socket.emit('my other event', { my: 'data' });
  });
  

});