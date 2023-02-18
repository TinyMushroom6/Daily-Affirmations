let currentWord = null;
const button = document.querySelector('#button');
const wordElement = document.querySelector('#words');
const pronounSelect = document.querySelector('.pronoun-select');
const pronounInputs = pronounSelect.querySelectorAll('input');

pronounInputs.forEach(input => {
  input.addEventListener('change', e => {
    fetch(`affirmations_${e.target.value}.txt`)
      .then(response => response.text())
      .then(text => {
        const words = text.split('\n');
        
        button.addEventListener('click', () => {
          let randomWord = currentWord;
          while (randomWord === currentWord) {
            const randomIndex = Math.floor(Math.random() * words.length);
            randomWord = words[randomIndex];
          }
          currentWord = randomWord;
          wordElement.textContent = currentWord;
        });
      })
      .catch(error => {
        console.error(`An error occurred while retrieving affirmations for ${e.target.value}:`, error);
      });
  });
});
