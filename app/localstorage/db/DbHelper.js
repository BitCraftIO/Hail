import Db from "./Db";
import Transaction from "../models/Transaction";
import Wallet from "../models/Wallet";
import ExchangeWallet from "../models/ExchangeWallet";

class DbHelper {
    modelSchema = [
        TransactionModel,
        WalletModel
    ]
    
    //If active instance is not set, make sure constructor in Db.js is being called. 
    //If not, move that logic here
    getInstance() {
        let instance: Db = this.activeInstancePath;
        if(!instance) {
            throw new Error('DbHelper.js :: Active Instance Not Set!');
        }
        return instance;
    }
}