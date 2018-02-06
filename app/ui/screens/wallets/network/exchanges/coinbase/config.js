export const clientId = "e6f835288c8bcecd7dfafb7e9a073b2b83d95b6a1f4f5f6fefeca0f345a93326";
export const clientSecret = "2a9617bfc208fa9b7c796916c6ed8f2bd51a4b61add007e4d342d7f6ace2fe2f";
export const appUri = "";
export const webUri = `https://www.coinbase.com/oauth/authorize?client_id=${clientId}&response_type=code&scope=${scopes.join(',')}`
const scopes = [
    `wallet:accounts:read`,
    `wallet:accounts:create`,
    `wallet:accounts:update`,
    `wallet:addresses:read`,
    `wallet:addresses:create`,
    `wallet:buys:read`,
    `wallet:buys:create`,
    `wallet:deposits:read`,
    `wallet:user:email`,
    `wallet:withdrawals:read`,
    `wallet:transactions:read`,
    `wallet:transactions:send`,
]             
 