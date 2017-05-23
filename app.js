'use strict';

let areUserAuthenticated;
let vocabulary =[];
const auth = document.getElementById('auth');
const vocBody = document.getElementById('vocBody');
const email = document.getElementById('email');
const password = document.getElementById('password');

 	var config = {
    apiKey: "AIzaSyCEXwgrI0meq1QQeDQeh14ZrMxcx1t-OWI",
    authDomain: "vocabulary-d0a18.firebaseapp.com",
    databaseURL: "https://vocabulary-d0a18.firebaseio.com",
    projectId: "vocabulary-d0a18",
  };
  firebase.initializeApp(config);

	let fireVoc = firebase.database().ref('vocabulary/');
	
	fireVoc.on('value', snap => {

		if(snap.val() != null ) {

			vocabulary = snap.val();
		} else {
			console.log('typeof snap.val',typeof snap.val());
			console.log('snap.val:',snap.val());
		}
			console.log(vocabulary)
		for(let i = 0; i < vocabulary.length; i++) {
			console.log('BLYA!!!')

			const dl = document.getElementById('mydl');
			const dd1 = document.createElement('DD');
			const dd2 = document.createElement('DD');
			const br = document.createElement('BR');
			const text1 = document.createTextNode(vocabulary[i].myword);
			const text2 = document.createTextNode(vocabulary[i].explain);
			dd1.id = 'dd1';
			dd2.id = 'dd2';
			dd1.appendChild(text1);
			dd2.appendChild(text2);
			dd2.appendChild(br);
			dl.appendChild(dd1);
			dl.appendChild(dd2);
		}
	})

	const login = document.getElementById('login');
	const logout = document.getElementById('logout');
	const signup = document.getElementById('signup');

	login.addEventListener('click', e => {
		const myemail = email.value;
		const mypass = password.value;
		const auth1 = firebase.auth();

		const promise = auth1.signInWithEmailAndPassword(myemail,
		mypass);
		promise
		.then(() => {
			console.log('then in login')
			email.value = '';
			password.value = '';
			show(vocBody, auth);
		})
		.catch(e => {
			alert(e.message);
			console.log(e.message);
		})
	})

	signup.addEventListener('click', e => {
		const myemail = email.value;
		const mypass = password.value;
		const auth1 = firebase.auth();

		const promise = auth1.createUserWithEmailAndPassword(myemail,
		mypass);
		promise
		.then(() => {
			console.log('then in signup')
			email.value = '';
			password.value = '';
			show(vocBody, auth);
		})
		.catch(e => {
			console.log(e.message)
			alert(e.message)
		})
	})

	logout.addEventListener('click', e => {
		firebase.auth().signOut();
		show(auth, vocBody);
	})

	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			areUserAuthenticated = true;
			// console.log(firebaseUser);
			show(vocBody,auth);

		} else {
			areUserAuthenticated = false;
			console.log('not logged In');
			show(auth,vocBody);
		}
	});

function show(shown, hidden) {
	shown.style.display='block';
	hidden.style.display='none';
} 

let inp = document.getElementById('newWord');
let mean = document.getElementById('meaning');
let button = document.getElementById('button');
let word ='';
let meaning = '';

inp.addEventListener('change', () => {
	word = inp.value;
	// console.log('word:', word);
})

mean.addEventListener('change', () => {
	meaning = mean.value;
	// console.log('meaning:',meaning);
})

button.addEventListener('click', () => {

if(meaning === '' || word === '') {
	alert('please check the word and explanation!');
	return
}

	let couple = {
		explain: meaning,
		id: vocabulary.length,
		myword: word,
	};
	firebase.database().ref('vocabulary/'+couple.id).set(couple);


	console.log('vocabulary' ,vocabulary);
	
	document.getElementById('meaning').value = '';
	document.getElementById('newWord').value = '';
})