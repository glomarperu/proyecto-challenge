const inputText = document.getElementById('input-text');
        const encryptButton = document.getElementById('encrypt-button');
        const decryptButton = document.getElementById('decrypt-button');
        const outputText = document.getElementById('output-text');
        const copyButton = document.getElementById('copy-button');
        const outputContainer = document.getElementById('output-container');
        const outputImage = document.getElementById('output-image');

        const errorMessage = document.getElementById('error-message');

        // Función para mostrar el mensaje de error con ícono
        function mostrarError(mensaje) {
            const iconoError = '<i class="fas fa-exclamation-circle"></i>'; // Icono de error de Font Awesome
            errorMessage.innerHTML = `${iconoError} ${mensaje}`;
        }

        // Evento al cambiar el texto en el input
        inputText.addEventListener('input', function() {
            const text = inputText.value.trim();
            if (isValidText(text)) {
                errorMessage.innerText = '';
                outputText.innerHTML = `<p class="message-not-found">Ningún mensaje fue encontrado</p><p>Ingresa el texto que desees encriptar o desencriptar.</p>`;
                copyButton.style.display = 'none';
                outputImage.style.display = 'block'; // Mostrar imagen cuando el texto se borra
            } else {
                mostrarError('Solo se permiten letras minúsculas y sin acentos.');
            }
        });

        // Evento al hacer clic en el botón de encriptar
        encryptButton.addEventListener('click', function() {
            const text = inputText.value.trim();
            if (isValidText(text)) {
                const encryptedText = encrypt(text);
                outputText.innerHTML = `<p>${encryptedText}</p>`;
                copyButton.style.display = 'block';
                outputImage.style.display = 'none'; // Ocultar imagen si se muestra
            } else {
                mostrarError('Solo se permiten letras minúsculas y sin acentos.');
            }
        });

        // Evento al hacer clic en el botón de desencriptar
        decryptButton.addEventListener('click', function() {
            const text = inputText.value.trim();
            if (isValidText(text)) {
                const decryptedText = decrypt(text);
                outputText.innerHTML = `<p>${decryptedText}</p>`;
                copyButton.style.display = 'block';
                outputImage.style.display = 'none'; // Ocultar imagen si se muestra
            } else {
                mostrarError('Solo se permiten letras minúsculas y sin acentos.');
            }
        });


        copyButton.addEventListener('click', function() {
            const text = outputText.innerText;
            navigator.clipboard.writeText(text);
        });

        function isValidText(text) {
            const regex = /^[a-z\s]+$/;
            return regex.test(text);
        }

        function encrypt(text) {
            let encryptedText = '';
            for (let i = 0; i < text.length; i++) {
                const charCode = text.charCodeAt(i);
                if (charCode >= 97 && charCode <= 122) {
                    encryptedText += String.fromCharCode((charCode - 97 + 3) % 26 + 97);
                } else {
                    encryptedText += text[i];
                }
            }
            return encryptedText;
        }

        function decrypt(text) {
            let decryptedText = '';
            for (let i = 0; i < text.length; i++) {               
                const charCode = text.charCodeAt(i);
                if (charCode >= 97 && charCode <= 122) {
                    decryptedText += String.fromCharCode((charCode - 97 - 3 + 26) % 26 + 97);
                } else {
                    decryptedText += text[i];
                }
            }
            return decryptedText;
        }