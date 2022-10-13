
    var cifra = document.getElementById("cifra");
    var open = document.getElementById('open');
    var encButton = document.querySelector('button');
    var result = document.getElementById('result');
    var decButton = document.getElementById('decButton');
    
    function stripDuplicates(str) {
    var seen = {},
        len = str.length,
        i = 0,
        clean = '';
    for (; i < len; i++) {
        var chr = str[i];
        if (!seen[chr]) {
            clean += chr;
            seen[chr] = true;
        }
    }
    return clean;
    }

    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    //var alphabet = '@%-./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    function createCipherKey(keyword, alphabet) {

        keyword = stripDuplicates(keyword);

        var monoalphabet = alphabet,
            len = keyword.length,
            i = 0,
            x = 0,
            rows = [],
            cipher = '';

        for (; i < len; i++) {
            monoalphabet = monoalphabet.replace(new RegExp(keyword[i], 'g'), '');
        }

        monoalphabet = keyword + monoalphabet;

        for (; x < len; x++) {

            var key = keyword[x],
                k = x,
                mlen = monoalphabet.length,
                row = '';

            for (; k < mlen; k += len) {
                row += monoalphabet[k];
            }
            rows.push(row);
        }

        cipher = rows.sort(function(a, b) {
            return a[0] > b[0] ? 1 : 0;
        }).join('');

        return cipher;
    }

    function createCipher(keyword, phrase, alphabet) {

        phrase = phrase;
        var cipherKey = createCipherKey(keyword, alphabet);

        return Array.prototype.map.call(phrase, function(i) {
            return i === ' ' ? ' ' : cipherKey[alphabet.indexOf(i)];
        }).join('');
    }

    function solveCipher(key, phrase, alphabet) {

        phrase = phrase;
        var cipher = createCipherKey(key, alphabet);

        return Array.prototype.map.call(phrase, function(i) {
            return i === ' ' ? ' ' : alphabet[cipher.indexOf(i)];
        }).join('');
    }

    encButton.addEventListener('click', () => {
        result.value = createCipher(cifra.value, open.value, alphabet);
    });

    decButton.addEventListener('click', () => {
        result.value = solveCipher(cifra.value, open.value, alphabet)
    });