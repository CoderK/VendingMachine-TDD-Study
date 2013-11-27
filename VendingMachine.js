function VendingMachine() {
    this._htStocks = {
        "Coke" : 1,
            "Sprite" : 1,
            "Orange Juice" : 1,
            "Apple Juice" : 1
    };
};

VendingMachine.prototype = {

    _htProducts : {
        "Coke" : "Coke",
        "Sprite" : "Sprite",
        "Orange Juice" : "Orange Juice",
        "Apple Juice" : "Apple Juice"
    },

    buy : function(sBeverage){
        if( this._htStocks[sBeverage] < 1 ){
            return null;
        }

        this._htStocks[sBeverage]--;
        return this._htProducts[sBeverage];
    }
};

