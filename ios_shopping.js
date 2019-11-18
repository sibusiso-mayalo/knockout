
function send_dataa(address, data)
{
  $.ajax({
        url: "mail.php",
        type: "POST",
        data: data,
        datatype: "form",
        processData: false,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (result) {
            alert(result);
        }
    });
};

  function send_data(address, data)
  {
    const xhr = new XMLHttpRequest();
    xhr.onload = function(){} //wont be handling server response
    xhr.open("POST", "mail.php");
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("address="+address+"data="+data);
  }

  var viewModel = function()
  {
    this.self = this;
    //this.items = ko.observableArray([{id:'sbu'}, {id:'mayalo'}]);
    this.id = ko.observable();
    this.name = ko.observable();
    this.code = ko.observable();
    this.price = ko.observable();

    this.subtotal = ko.observable(0);
    this.vat = ko.observable(0.14);
    this.total = ko.observable(0);

    this.items = ko.observableArray();

    //called when client wish to add new info on the table
    self.add = function()
    {
      var order_item_dict = {id:this.id(), name:this.name(), code:this.code(), price:this.price()};
      this.items.push(order_item_dict);
    }

    self.total = ko.pureComputed(function(){
      return this.subtotal() * (1 + this.vat()) + 1;
    });

    //called when client clicks one of the delete buttons
    self.delete = function(item){ self.items.remove(item); };

  //called when the client wants to checkout
  //NB: On the spec, this is described as sending client data as JSON to google and to chris's emial

  self.checkout = function()
  {
    var jsonData = ko.toJSON(this.items()); //change the array object to a string of json format
    //send to google
    send_dataa('http://www.google.com', jsonData);
    //send_data('mayalo.sbusiso@icloud.com', jsonData);
  }
};

window.onload = function(){ ko.applyBindings(new viewModel()); }
