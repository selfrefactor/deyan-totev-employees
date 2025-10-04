let {exec} = require('helpers-fn');
let command = 'curl https://jsonplaceholder.typicode.com/todos/1'

async function  foo() {
	console.log(__dirname);
	let result = await exec({command});
	console.log(result);
	return 'foo';
}

exports.foo = foo;