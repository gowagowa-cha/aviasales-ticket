const formSearch = document.querySelector('.form-search');
const inputCitiesFrom = document.querySelector('.input__cities-from');
const dropdownCitiesFrom = document.querySelector('.dropdown__cities-from');
const inputCitiesTo = document.querySelector('.input__cities-to');
const dropdownCitiesTo = document.querySelector('.dropdown__cities-to');
const inputDateDepart = document.querySelector('.input__date-depart');

//Данные

const CITY_API = 'dataBase/cities.json',
	PROXY = 'https://cors-anywhere.herokuapp.com/',
	API_KEY = 'bc07069f52ce8225d603929ed66d7333',
	calendar = ''

let city = []
// const city = [
//   'Элиста', 'Москва', 'Санкт-Петербург','Одеса', 'Волгоград', 'Самара', 'Нижний Новгород', 'Казань', 'Вроцлав', 'Ростов-на-Дону',
//   'Екатеринбург', 'Калининград', 'Минск', 'Караганда', 'Севастополь', 'Челябиск', 'Керчь', 'Шымкен', 'Ухань', 'Днепропетровск'
// ];

// функции

const getData = (url, callback) => {
	const request = new XMLHttpRequest()

	request.open('GET', url)

	request.addEventListener('readystatechange', () => {
		if (request.readyState !== 4) return

		if (request.status === 200) {
			callback(request.response);
		} else {
			console.error(request.status)
		}
	})

	request.send()
}

const showCity = (input, list) => {
	list.textContent = '';

	if (input.value !== '') {

		const filterCity = city.filter((item) => {
				const fixItem = item.name.toLowerCase()
				return fixItem.includes(input.value.toLowerCase())
		})
	
		filterCity.forEach((item) => {
			const li = document.createElement('li')
			li.classList.add('dropdown__city')
			li.textContent = item.name
			list.append(li)
		})
	}	
};

const handlerCity = (event, input, list) => {
	const target = event.target;
	if (target.tagName.toLowerCase() === 'li') {
		input.value = target.textContent;
		list.textContent = ''
	}
}

// обработчики событий
inputCitiesFrom.addEventListener('input', () => {
	showCity(inputCitiesFrom, dropdownCitiesFrom)
})
inputCitiesTo.addEventListener('input', () => {
	showCity(inputCitiesTo, dropdownCitiesTo)
});

dropdownCitiesFrom.addEventListener('click', (event) => {
	handlerCity(event, inputCitiesFrom, dropdownCitiesFrom)
});
dropdownCitiesTo.addEventListener('click', (event) => {
	handlerCity(event, inputCitiesTo, dropdownCitiesTo)
});

formSearch.addEventListener('submit', (event) => {
	event.preventDefault()

	const cityFrom = city.find((item) => inputCitiesFrom.value === item.name)
	const cityTo = city.find((item) => inputCitiesTo.value === item.name)

	const formData = {
		from: cityFrom.code,
		to: cityTo.code,
		when: inputDateDepart.value,
	}
	console.log(formData);
})

// вызовы функции
 
getData(CITY_API, (data) => {
	city = JSON.parse(data).filter((item) => item.name)
})



// getData(calendar + '?depart_date=2020-05-25&origin=SVX&destination=KGD&one_way=true&token='
//  + API_KEY, (data) => {
// 	const cheapTicket = JSON.parse(data).best_prices.filter(item => item.depart_date === '2020-05-29')
// 	console.log(cheapTicket);
// });

