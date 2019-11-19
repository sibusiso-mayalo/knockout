function send_data(address, data)
  {
    //Send email to the specified address
    Email.send({
      Host:"smtp.gmail.com",
      Username:"mayalo.sbusiso@gmail.com",
      Password:"sbumayalo",
      To:address,
      From:"mayalo.sbusiso@gmail.com",
      Subject:"KnockoutJS Test",
      Body:data
    }).then(
      message => alert(message)
    );
  }

function calculate_total(array)
{
  //return the sum of all the prices on the given array (product catalog)
  var total = 0;
  array.forEach( function(item)
  {
    var data = JSON.parse( ko.toJSON(item) );
    total += parseFloat(data["price"]);
  });
  return total;
}

var viewModel = function()
{
  //declare all the variables
    this.self = this;
    this.id = ko.observable();
    this.name = ko.observable();
    this.code = ko.observable();
    this.price = ko.observable();
    this.items = ko.observableArray();

    self.delete = function(data)
    {
      //called when client clicks one of the delete buttons
      this.items.remove(data);
    };

    self.add = function()
    {
      //called when client wish to add new info on the table
      var order_item_dict = {id:this.id(), name:this.name(), code:this.code(), price:this.price()};
      this.items.push(order_item_dict);
    }

  self.checkout = function()
  {
    //called when the client wants to checkout
    //NB: On the spec, this is described as sending client data as JSON to google and to chris's emial
    var total = calculate_total(this.items());
    var final_dict = {"total":total, "data":this.items()};
    final_dict = ko.toJSON( final_dict) ;//change the dict object to a string of json format [tot:total, data:data]

    //send_data('http://www.google.com', final_dict);
    //send_data("chrisg@iosystemssa.com", final_dict);
    //send_data('mayalo.sbusiso@icloud.com', final_dict);
  };
};
window.onload = function(){ ko.applyBindings(new viewModel()); };
