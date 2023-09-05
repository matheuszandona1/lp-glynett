$(".testimonials__content").slick({
	// infinite: true,
	slidesToShow: 3,
	slidesToScroll: 3,
	prevArrow: $(".slide-slick-prev"),
	nextArrow: $(".slide-slick-next"),

	responsive: [
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			},
		},
	],
})

$(document).ready(function () {
	$("#telefone").mask("(00) 00000-0000")
})
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
	.then((response) => response.json())
	.then((estados) => {
		const selectEstado = document.querySelector("#estado")
		estados.sort((a, b) => a.nome.localeCompare(b.nome)) // Ordena os estados em ordem alfabética

		estados.forEach((estado) => {
			const option = document.createElement("option")
			option.value = estado.nome
			option.textContent = estado.nome
			option.setAttribute("data-id", estado.id) // Armazena o ID do estado como um atributo data-id
			selectEstado.appendChild(option)
			console.log("opção estado", estados)
		})
	})

document.querySelector("#estado").addEventListener("change", function () {
	const selectedOption = this.options[this.selectedIndex]
	const idEstado = selectedOption.getAttribute("data-id") // Pega o ID do estado do atributo data-id

	// Limpa o select de cidades
	const selectCidade = document.querySelector("#cidade")
	selectCidade.innerHTML = ""

	fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`)
		.then((response) => response.json())
		.then((cidades) => {
			cidades.sort((a, b) => a.nome.localeCompare(b.nome)) // Ordena as cidades em ordem alfabética

			cidades.forEach((cidade) => {
				const option = document.createElement("option")
				option.value = cidade.nome
				option.textContent = cidade.nome
				selectCidade.appendChild(option)
			})
		})
})

$(document).ready(function () {
	$("#phone").mask("(00) 0 0000-0000")
	$("#form").submit(function (e) {
		var valor = $("#phone").val()

		// Verifica se o valor do input tem o caractere placeholder ou não está completo
		if (valor.indexOf("_") > -1 || valor.replace(/[^0-9]/g, "").length !== 11) {
			alert("Por favor, insira um número de telefone válido!")
			e.preventDefault() // impede o envio do formulário
		}
	})
})
