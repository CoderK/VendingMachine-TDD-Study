function VendingMachine() {
    this._htStocks = {};
    this._htPrice = {};
    this._nBalance = 0;
};

VendingMachine.prototype = {

    buy : function(sBeverage){
        if(this._hasNoEnoughMoney(sBeverage)){
            return null;
        }

        if( this._hasNoStocks(sBeverage) ){
            return null;
        }

        this._deductBalanceByPriceOf(sBeverage);
        this._reduceStockByOne(sBeverage);

        return sBeverage;
    },

    _deductBalanceByPriceOf: function (sBeverage) {
        this._nBalance -= this._htPrice[sBeverage];
    },

    _reduceStockByOne: function (sBeverage) {
        this._htStocks[sBeverage]--;
    },

    _hasNoEnoughMoney: function (sBeverage) {
        return this._htPrice[sBeverage] > this._nBalance;
    },

    _hasNoStocks: function (sBeverage) {
        return !this._htStocks[sBeverage] || this._htStocks[sBeverage] < 1;
    },

    supply : function(htStocks){
        this._htStocks = htStocks;
    },

    fixPrice : function(htPrice){
        this._htPrice = htPrice;
    },

    insertCoin : function(nCoin){
        this._nBalance = nCoin;
    }
};

