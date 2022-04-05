const citacao_element = document.getElementById('citacao');
const autor_element = document.getElementById('autor');
const proximo_button = document.getElementById('proximo_button');
const twitter_button = document.getElementById('twitter_button');

function carregaCitacao(citacao) {
    citacao_element.textContent = citacao.citacao;
    autor_element.textContent = citacao.autor;
}

function getCitacao() {
    const numero_citacao = (Math.round(Math.random() * 100) % citacoes.length);
    carregaCitacao(citacoes[numero_citacao]);
}

function tweetCitacao() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${citacao_element.textContent} - ${autor_element.textContent}`;
    window.open(twitterUrl, '_blank')
}

proximo_button.addEventListener('click', () => window.location.reload());
twitter_button.addEventListener('click', tweetCitacao);

window.onload = getCitacao;

