import Db from "./Db";
import TransactionModel from "../models/TransactionModel";
import WalletModel from "../models/WalletModel";

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