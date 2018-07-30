var greet = function(name) {
    console.log('hello ' + name);
}

var greet2 = function(s, name) {
    console.log(s + ' ' + name);
}

module.exports = {
    greet : greet,
    greet2 : greet2
}
