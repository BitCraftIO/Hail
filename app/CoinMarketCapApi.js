export function getCoinDetails(coinName) {
	return fetch(`https://api.coinmarketcap.com/v1/ticker/${coinName}`)
		.then((response) => response.json());
}

export function getAllCoins() {
    return fetch("https://api.coinmarketcap.com/v1/ticker/")
		.then((response) => response.json());
}