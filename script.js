let names = []; // Array para armazenar os nomes

// Função para adicionar um nome à lista
function addName() {
    const newNameInput = document.querySelector("#newNameInput");
    const name = newNameInput.value.trim(); // Pega o valor e remove espaços em branco
    if (name && !names.includes(name)) { // Garante que o nome não esteja vazio e não seja duplicado
        names.push(name);
        newNameInput.value = ""; // Limpa o input
        renderNameList(); // Atualiza a lista exibida
    } else if (names.includes(name)) {
        alert("Este nome já está na lista!");
    }
}

// Função para remover um nome da lista
function removeName(nameToRemove) {
    names = names.filter(name => name !== nameToRemove);
    renderNameList(); // Atualiza a lista exibida
}

// Função para renderizar (mostrar) a lista de nomes no HTML
function renderNameList() {
    const nameListUl = document.querySelector("#nameList");
    nameListUl.innerHTML = ""; // Limpa a lista existente

    if (names.length === 0) {
        nameListUl.innerHTML = "<li>Nenhuma nome na lista. Adicione alguns!</li>";
        return;
    }

    names.forEach(name => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${name}</span>
            <button onclick="removeName('${name}')">Remover</button>
        `;
        nameListUl.append(listItem);
    });
}

// Função de atraso que você já tinha (útil para animações de sorteio)
function wait(tempo) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), tempo);
    });
}

// A sua nova função de sorteio de nomes
async function sortearNomes() {
    const totalResultados = Number(document.querySelector("#totalResultadosInput").value);
    const sortedNamesDisplay = document.querySelector("#sortedNamesDisplay");

    if (names.length === 0) {
        alert("A lista de nomes está vazia! Por favor, adicione nomes antes de sortear.");
        return;
    }

    if (totalResultados <= 0 || totalResultados > names.length) {
        alert(`O número de resultados deve ser entre 1 e ${names.length} (total de nomes na lista).`);
        return;
    }

    // Animação de "embaralhamento" (opcional, pode remover se não quiser)
    for (let j = 0; j < 20; j++) { // 20 iterações para simular embaralhamento
        sortedNamesDisplay.innerHTML = ""; // Limpa resultados anteriores
        const tempNames = [...names]; // Cria uma cópia para não modificar o array original
        for (let i = 0; i < totalResultados; i++) {
            const randomIndex = Math.floor(Math.random() * tempNames.length);
            const randomName = tempNames[randomIndex];

            const nameElement = document.createElement("div");
            nameElement.classList.add("result-item");
            nameElement.innerText = randomName;
            sortedNamesDisplay.append(nameElement);

            // Remove o nome temporariamente para evitar repetição nesta iteração
            tempNames.splice(randomIndex, 1);
        }
        await wait(50); // Ajuste o tempo para a velocidade da animação
    }

    // Realiza o sorteio final
    sortedNamesDisplay.innerHTML = ""; // Limpa para o resultado final
    const nomesSorteados = [];
    const nomesDisponiveis = [...names]; // Copia a lista original para o sorteio

    for (let i = 0; i < totalResultados; i++) {
        const randomIndex = Math.floor(Math.random() * nomesDisponiveis.length);
        const nomeSorteado = nomesDisponiveis[randomIndex];
        nomesSorteados.push(nomeSorteado);

        // Remove o nome sorteado para evitar repetição no sorteio atual
        nomesDisponiveis.splice(randomIndex, 1);

        const nameElement = document.createElement("div");
        nameElement.classList.add("result-item");
        nameElement.innerText = nomeSorteado;
        sortedNamesDisplay.append(nameElement);
        await wait(200); // Atraso para exibir cada nome sorteado
    }
}

// Inicializa a lista ao carregar a página
document.addEventListener("DOMContentLoaded", renderNameList);

// Adicionar evento para permitir adicionar nome com a tecla Enter no input
document.querySelector("#newNameInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addName();
    }
});
