

//nicht ideal:
console.log(JSON.stringify([1, 2, 4, 5]));
//besser:
JSON.stringify({elements: [1, 2, 4, 5]});
