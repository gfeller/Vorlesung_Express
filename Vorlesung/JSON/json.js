var myObject = { a : '1234', b : function(){ return this.a}, c : 1234, d : new Date(), e : [4,5,6,7] };
console.log(JSON.stringify( myObject ));

var string = '{"a":"1234","c":1234,"d":"2015-06-12T05:45:02.270Z","e":[4,5,6,7]}';
var object = JSON.parse(string);
console.log(object.d);
console.log(new Date(object.d).getDay());


var ok = JSON.parse('{"a":"1234"}');

try {
    var nok1 = JSON.parse('{a:"1234"}');
}
catch(err)
{
 console.log(err);
}

try {
    var nok2 = JSON.parse("{'a':'1234'}");
}
catch(err)
{
    console.log(err);
}



