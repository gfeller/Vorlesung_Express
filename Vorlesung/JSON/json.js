
var myObject = {
    a: '1234', b: function () {return this.a }, c: 1234, d: new Date(), e: [4, 5, 6, 7]
};
console.log(1, JSON.stringify(myObject));

var string = '{"a":"1234","c":1234,"d":"2015-06-12T05:45:02.270Z","e":[4,5,6,7]}';
var object = JSON.parse(string);
console.log(2, object.d);
console.log(3, new Date(object.d).getDay());


var undef = JSON.stringify({"undef": undefined});
console.log(4, undef);

try {
    JSON.parse("{'a':'1234'}");
} catch (err) {
    console.log(5, err);
}


//nicht ideal:
console.log(JSON.stringify([1, 2, 4, 5]));
//besser:
JSON.stringify({elements: [1, 2, 4, 5]});
