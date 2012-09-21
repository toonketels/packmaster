  var socket = io.connect('http://localhost:3000');
  var container = jQuery('ul');
  console.log(container);

  socket.on('news', function (data) {
    console.log(data);

    var date = new Date(data.timestamp * 1000);
    var date_formatted = date.getMonth()+'.'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

    container.append('<li>'+ date_formatted +' <strong>' + data.site_name + '</strong> - ' + data.message_human + '</li>');
    socket.emit('my other event', { my: 'data' });
  });