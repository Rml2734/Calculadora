document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const display = document.getElementById('display');
    let currentInput = '';
    let operation = '';
    let history = [];

    // Manejar eventos de los botones de números
    document.querySelectorAll('.number').forEach(button => {
        button.addEventListener('click', () => {
            currentInput += button.innerText;
            operation += button.innerText;
            display.innerText = operation;
        });
    });

    // Manejar eventos de los botones de operadores
    document.querySelectorAll('.symbol').forEach(button => {
        button.addEventListener('click', () => {
            if (currentInput === '') return;
            operation += ` ${button.innerText} `;
            currentInput = '';
            display.innerText = operation;
        });
    });

    // Manejar evento del botón "igual"
    document.getElementById('equal').addEventListener('click', () => {
        try {
            const result = eval(operation.replace('÷', '/').replace('*', '*'));
            const historyItem = `${operation} = ${result}`;
            history.push(historyItem);
            display.innerText = historyItem;
            operation = `${result}`;
            currentInput = '';
            updateHistoryDisplay();
        } catch (error) {
            display.innerText = 'Error';
            operation = '';
            currentInput = '';
        }
    });

    // Manejar evento del botón "AC" (reset)
    document.getElementById('reset').addEventListener('click', () => {
        currentInput = '';
        operation = '';
        display.innerText = '0';
    });

    // Manejar evento del botón "punto decimal"
    document.getElementById('dot').addEventListener('click', () => {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            operation += '.';
            display.innerText = operation;
        }
    });

    // Manejar evento del botón "cambio de signo"
    document.getElementById('negative').addEventListener('click', () => {
        if (currentInput !== '') {
            currentInput = (parseFloat(currentInput) * -1).toString();
            operation = operation.replace(parseFloat(operation), currentInput);
            display.innerText = operation;
        }
    });

    // Función para actualizar el display del historial
    function updateHistoryDisplay() {
        const historyDisplay = document.getElementById('history-display');
        if (historyDisplay) {
            historyDisplay.innerHTML = history.map(item => `<p>${item}</p>`).join('');
        }
    }

    // Crear header fijo
    const calculatorHeader = document.createElement('div');
    calculatorHeader.id = 'calculator-header';

    // Crear botón "Historial"
    const historyButton = document.createElement('button');
    historyButton.innerText = 'Historial';
    historyButton.addEventListener('click', (event) => {
        historyModal.classList.toggle('show');

        // Ajustar el posicionamiento para móviles
        if (window.matchMedia('(max-width: 480px)').matches) {
            historyModal.style.left = '5%';
            historyModal.style.top = '60px';
        } else {
            const rect = event.target.getBoundingClientRect();
            historyModal.style.left = `${rect.right + 10}px`;
            historyModal.style.top = `${rect.bottom + 10}px`;
        }
    });
    calculatorHeader.appendChild(historyButton);

    // Crear ventana emergente para el historial
    const historyModal = document.createElement('div');
    historyModal.id = 'history-modal';

    // Crear display para el historial dentro de la ventana emergente
    const historyDisplay = document.createElement('div');
    historyDisplay.id = 'history-display';
    historyModal.appendChild(historyDisplay);

    // Crear botón "Borrar historial" dentro de la ventana emergente
    const clearHistoryButton = document.createElement('button');
    clearHistoryButton.innerText = 'Borrar historial';
    clearHistoryButton.addEventListener('click', () => {
        history = [];
        updateHistoryDisplay();
    });
    historyModal.appendChild(clearHistoryButton);

    // Insertar la ventana emergente en el DOM
    document.body.appendChild(historyModal);

    // Cerrar la ventana emergente al hacer clic fuera de ella
    window.addEventListener('click', (event) => {
        if (!historyModal.contains(event.target) && event.target !== historyButton) {
            historyModal.classList.remove('show');
        }
    });

    // Crear botón para alternar el tema oscuro
    const darkModeButton = document.createElement('button');
    darkModeButton.innerText = 'Tema oscuro';
    darkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        display.classList.toggle('dark-mode');
        // Cambiar el texto del botón
        darkModeButton.innerText = document.body.classList.contains('dark-mode') ? 'Tema claro' : 'Tema oscuro';
    });
    calculatorHeader.appendChild(darkModeButton);

    // Insertar header antes de la calculadora
    document.body.insertBefore(calculatorHeader, document.getElementById('calculator'));
});