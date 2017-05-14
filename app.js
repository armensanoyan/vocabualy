'use strict'

let inp = document.getElementById('newWord');
let mean = document.getElementById('meaning');
let button = document.getElementById('button');
let word ='';
let meaning = '';
let vocabulary = [];

inp.addEventListener('change', () => {
	word = inp.value;
	console.log(word);
})

mean.addEventListener('change', () => {
	meaning = mean.value;
	console.log(meaning);
})

button.addEventListener('click', () => {
	let couple = {};

	couple.one = word;
	couple.two = meaning;

	vocabulary.push(couple);

	let x = document.createElement("DD");
	let t = document.createTextNode(couple.one + couple.two);
	x.appendChild(t);
	let y = document.getElementById("mydl");
	y.appendChild(x);
	console.log(vocabulary);
})