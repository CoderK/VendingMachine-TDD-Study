function VendingMachine() {};

VendingMachine.prototype = {

    _htMenu : {
        "Coke" : "Coke",
        "Sprite" : "Sprite",
        "Orange Juice" : "Orange Juice",
        "Apple Juice" : "Apple Juice"
    },

    buy : function(sBeverage){
        return this._htMenu[sBeverage];
    }
}

