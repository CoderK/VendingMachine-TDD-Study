function VendingMachine() {};

VendingMachine.prototype = {

    _htSelection : {
        "Coke" : "Coke",
        "Cider" : "Cider",
        "Orange Juice" : "Orange Juice",
        "Apple Juice" : "Apple Juice"
    },

    buy : function(sBeverage){
        return this._htSelection[sBeverage];
    }
}

