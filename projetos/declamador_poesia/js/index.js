const titulo_poema = document.getElementById('titulo_poema');
const autor_poema = document.getElementById('autor_poema');
const poema_text = document.getElementById('poema_text');
const audio_element = document.querySelector('audio');

// Função que chama a API que lê a poesia.
function declamaPoesia(poesia) {
    VoiceRSS.speech({
        key: '1b90dd70a9d449c98dd3222ab4fa82f6',
        src: poesia,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

function carregaPoema(poema) {
    titulo_poema.textContent = poema.titulo;
    autor_poema.textContent = poema.autor;
    poema_text.innerHTML = poema.poema.replaceAll('...', '<br/>');
    declamaPoesia(poema.poema)
}

carregaPoema(poemas[1]);


