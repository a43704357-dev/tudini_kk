
class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lotto-generator');

    const button = document.createElement('button');
    button.textContent = '번호 생성';
    button.addEventListener('click', () => this.generateNumbers());

    const resultContainer = document.createElement('div');
    resultContainer.setAttribute('class', 'result-container');

    const style = document.createElement('style');
    style.textContent = `
      .lotto-generator {
        text-align: center;
      }
      button {
        padding: 15px 30px;
        font-size: 1.2em;
        cursor: pointer;
        border: none;
        border-radius: 8px;
        background-color: #4CAF50;
        color: white;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transition: background-color 0.3s, box-shadow 0.3s;
      }
      button:hover {
        background-color: #45a049;
        box-shadow: 0 6px 12px rgba(0,0,0,0.3);
      }
      .result-container {
        display: flex;
        justify-content: center;
        margin-top: 30px;
      }
      .lotto-ball {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5em;
        font-weight: bold;
        margin: 0 10px;
        box-shadow: inset 0 -3px 6px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.2);
        color: #333;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(button);
    wrapper.appendChild(resultContainer);

    this.generateNumbers(); // Initial number generation
  }

  generateNumbers() {
    const resultContainer = this.shadowRoot.querySelector('.result-container');
    resultContainer.innerHTML = ''; // Clear previous numbers

    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    for (const number of [...numbers].sort((a, b) => a - b)) {
      const ball = document.createElement('div');
      ball.setAttribute('class', 'lotto-ball');
      ball.style.backgroundColor = this.getColor(number);
      ball.textContent = number;
      resultContainer.appendChild(ball);
    }
  }

  getColor(number) {
    if (number <= 10) return '#f2b526';
    if (number <= 20) return '#3498db';
    if (number <= 30) return '#e74c3c';
    if (number <= 40) return '#9b59b6';
    return '#2ecc71';
  }
}

customElements.define('lotto-generator', LottoGenerator);
