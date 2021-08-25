const getHashTags = str => str.match(/#[a-zA-Z0-9]+/g).map(match => match.substring(1));
console.log(getHashTags("My city #city #landscape"));