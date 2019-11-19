function send_data(address, data)
  {
    //Send email to the specified address
    Email.send({
      Host:"smtp.gmail.com",
      Username:"",
      Password:"",
      To:address,
      From:"mayalo.sbusiso@gmail.com",
      Subject:"KnockoutJS Test",
      Body:data
    }).then(
      message => alert(message)
    );
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

    //called when client clicks one of the delete buttons
    self.delete = function(item)
    {
      self.items.remove(item);
    };

    //called when client wish to add new info on the table
    self.add = function()
    {
      var order_item_dict = {id:this.id(), name:this.name(), code:this.code(), price:this.price()};
      this.items.push(order_item_dict);
    }

    self.subtotal = ko.pureComputed(function()
    {
      var total = 0;

      ko.utils.arrayForEach(this.items(), function(item)
      {
        total += item.price();
        alert(total);
      });
      return total.toFixed(2);
    }, this);

    self.total = ko.pureComputed(function(){
      return this.subtotal() * (1 + this.vat());
    });

  //called when the client wants to checkout
  //NB: On the spec, this is described as sending client data as JSON to google and to chris's emial

  self.checkout = function()
  {
    var jsonData = ko.toJSON(this.items()); //change the array object to a string of json format
    //send_data('http://www.google.com', jsonData);
    //send_data("chrisg@iosystemssa.com");
    //send_data('mayalo.sbusiso@icloud.com', jsonData);
  }
};

window.onload = function(){ ko.applyBindings(new viewModel()); }
