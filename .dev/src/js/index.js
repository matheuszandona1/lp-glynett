$(".testimonials__content").slick({
	// infinite: true,
	slidesToShow: 3,
	slidesToScroll: 3,
	prevArrow: $(".slide-slick-prev"),
	nextArrow: $(".slide-slick-next"),
	adaptiveHeight: true,
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
			option.value = estado.id
			option.textContent = estado.nome
			selectEstado.appendChild(option)
		})
	})
document.querySelector("#estado").addEventListener("change", function () {
	const idEstado = this.value

	// Limpa o select de cidades
	const selectCidade = document.querySelector("#cidade")
	selectCidade.innerHTML = ""

	// Busca as cidades do estado selecionado
	fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`)
		.then((response) => response.json())
		.then((cidades) => {
			cidades.sort((a, b) => a.nome.localeCompare(b.nome)) // Ordena as cidades em ordem alfabética

			cidades.forEach((cidade) => {
				const option = document.createElement("option")
				option.value = cidade.id
				option.textContent = cidade.nome
				selectCidade.appendChild(option)
			})
		})
})
