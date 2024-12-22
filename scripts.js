// Cotação de moedas do dia.
const USD = 6.09
const EUR = 6.38
const GBP = 7.65

// Obter os elementos do formulário que iremos trabalhar
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o amount para receber somente números.
amount.addEventListener("input", () => {
  const regexHasCharacters = /\D+/g
  amount.value = amount.value.replace(regexHasCharacters, "")
})

// Capturando o evento de submit do formulário.
form.onsubmit = (event) => {
  event.preventDefault ()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

// Função para converter a moeda.
function convertCurrency (amount, price, symbol) {

  try {
    // Converte o valor de 'amount' para um número
    const numericAmount = Number(amount);

    // Verifica se 'numericAmount' é válido antes de continuar
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return alert("Por favor, digite um número válido maior que zero.");
    }

    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // Calcula o valor total e substitui o ponto por vírgula.
    let total = numericAmount * price

    // Remove o RS da formatação.
    total = formatCurrencyBRL(total).replace("R$", "")

    // Outra opção para substituir o ponto por vírgula:
    // let total = String(amount * price).replace(".", ",")

    /* if(isNaN(total)) {
      return alert("Por favor, digite um número.")
    }
    */


    // Exibe o resultado total.
    result.textContent = `${total} Reais`

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result")
  } catch (error) {
    console.log(error)
    alert("Não foi possível realizar a conversão. Tente novamente mais tarde.")
    // Remove a classe do footer, escondendo ele da janela.
    footer.classList.remove("show-result")
  }
}

// Formata a moeda em Real Brasileiro
function formatCurrencyBRL(value) {
  // Converte para numero para usar toLocaleString
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}