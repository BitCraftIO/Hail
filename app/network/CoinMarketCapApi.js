// @flow

export function getCoinDetails(coinName: String): Promise<Array<Object>> {
	// only need to do + when using strings in template literals
	return fetch(`https://api.coinmarketcap.com/v1/ticker/${+coinName}`)
		.then((response) => response.json());
}

export function getAllCoins() : Promise<Array<Object>> {
    return fetch("https://api.coinmarketcap.com/v1/ticker/")
		.then((response) => response.json());
}