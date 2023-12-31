export const GlobalCoinsData = 'https://api.coingecko.com/api/v3/global';
export const CoinsMarket = (perPage, page) =>
	`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`;
export const CoinPage = (id) => 
    `https://api.coingecko.com/api/v3/coins/${id}`;
export const HisotryData = (id, days) => 
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;



