//function to encrypt using plaintext and a key
function encryptCaesarCipher(input, key){
	//variable to hold end result
	var result = '';
	//parse key into integer
	key = parseInt(key);
	//bring key down if too large to work with alphabet ASCII characters
	while (key > 26){
		key /= 2;
		key = Math.round(key);
	}
	//for each letter in plaintext
	for (var i = 0; i < input.length;i++){
		//convert to charCode
		var tempChar = input.charCodeAt([i]);
		//if uppercase letter
		if (tempChar >= 97 && tempChar <= 122){
			//if wrap around needed for cipher
			if(tempChar+key > 122){
				tempChar+=key;
				tempChar-=122;
				tempChar+=96;
			}else{
				tempChar += key;
			}
			//if lowercase letter
		}else if (tempChar >= 65 && tempChar <= 90){
			//if wrap around needed for cipher
			if(tempChar+key > 90){
				tempChar+=key;
				tempChar-=90;
				tempChar+=64;
			}else{
				tempChar+=key;
			}
		}
		//convert back to string and add to result
		tempChar = String.fromCharCode(tempChar);
		result+= tempChar;
	}	
	//return result after conversion is completed
	return result;
}
//function to decrypt given cipher text and key
function decryptCaesarCipher(input, key){
	//variable to hold end result
	var result = '';
	//parse key to integer
	key = parseInt(key);
	//bring key down if too large to work with alphabet ASCII characters
	while (key > 26){
		key /= 2;
		key = Math.round(key);
	}
	//for each letter in ciphertext
	for (var i = 0; i < input.length;i++){
		//convert to charCode
		var tempChar = input.charCodeAt([i]);
		//if uppercase letter
		if (tempChar >= 97 && tempChar <= 122){
			//if wrap around needed for decipher
			if(tempChar-key < 97){
				tempChar-=key;
				tempChar=96-tempChar;
				tempChar=122-tempChar;
			}else{
				tempChar -= key;
			}
		//if lowercase letter	
		}else if (tempChar >= 65 && tempChar <= 90){
			//if wrap around needed for cipher
			if(tempChar-key < 65){
				tempChar-=key;
				tempChar=64-tempChar;
				tempChar=90-tempChar;
			}else{
				tempChar-=key;
			}
		}
		//convert deciphered charcode into string and add to result
		tempChar = String.fromCharCode(tempChar);
		result+= tempChar;
	}	
	//return result after deciphered
	return result;
}
//function to cipher/decipher text and send to append function
function submitAndCipher(){
	//grabs text, key and method to be used
	var cipherText = document.getElementById('plaintext').value;
	var cipherKey = document.getElementById('cipher-key').value;
	var method = document.getElementById('encrypt');
	//if encrypt is checked run the encrypt function, else decrypt
	if (method.checked == true){
		var encrypted = encryptCaesarCipher(cipherText, cipherKey);
		//append encrypted item
		appendItem(encrypted);
	}else{
		var decrypted = decryptCaesarCipher(cipherText, cipherKey);
		//append decrypted item
		appendItem(decrypted);
	}
}
//creates item to append ciphered or deciphered text to cipher-text div
function appendItem(item){
	//create paragraph node
	let node = document.createElement("P");
	//create text node and append to newly created P element
	let textNode = document.createTextNode(item);
	node.appendChild(textNode);
	//append to cipher-text div
	document.getElementById('cipher-text').appendChild(node);
}
//function to toggle Instructions
function toggleInstruction () {
	let instructions = document.getElementById('instruction');
	let instructionHeader = document.getElementById('instruction-header');
	instructions.classList.toggle('instruction-show');
	instructions.classList.toggle('instruction-hidden');
}

function resetCipherEngine () {
	//clear plaintext, cipherkey and ciphered text
	document.getElementById('plaintext').value = '';
	document.getElementById('cipher-key').value = 0;
	document.getElementById('cipher-text').innerHTML = '<p><i>Output</i></p>';
}
//when the DOM is loaded - 
window.onload = function(){
	//check the encrypt radio button by default
	document.getElementById('encrypt').checked = true;
	//when page reloaded, clear plaintext element and reset cipher key
	document.getElementById('plaintext').value = '';
	document.getElementById('cipher-key').value = 0;
	//grab buttons
	var submitButton = document.getElementById('submit-button');
	var clearButton = document.getElementById('clear-button');
	var instructionsButton = document.getElementById('instruction-toggle');
	//assign event listener for submit button
	submitButton.addEventListener('click', function(){
		//clear previous cipher text and call cipher with new info
		document.getElementById('cipher-text').innerHTML = '';
		submitAndCipher();
	});
	//assign event listener for clear button
	clearButton.addEventListener('click', function(){
		resetCipherEngine();
	});
	//assign event listener for instruction toggle
	instructionsButton.addEventListener('click', function(){
		toggleInstruction();
	});
}


