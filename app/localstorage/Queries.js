import DbHelper from "./db/DbHelper";

export default class Queries {
    
    getWalletbyId(id:number) {
        let results = DbHelper.getInstance()
            .query('Wallet', 'id = ' + id);
        return results;
    }

    getExchangeWallets() {
        let results = DbHelper.getInstance()
            .query('ExchangeWallet');
        return results;
    }
    
    getLocalWallets(){
        let results = DbHelper.getInstance()
            .query('Wallet');
        return results;
    }
}