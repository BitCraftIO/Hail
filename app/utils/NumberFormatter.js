import numeral from 'numeral'

export function formatCoinPrice(price) {
    return numeral(price).format("$0,0");
}