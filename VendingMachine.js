function VendingMachine() {
    this._htStocks = {};
    this._htPriceTable = {};
    this._nBalance = 0;
};

VendingMachine.prototype = {

    buy : function(sBeverage){
        if( this._canNotBuyIt(sBeverage) ){
            return null;
        }

        this._deductBalnceByPriceOf(sBeverage);
        this._reduceStockByOne(sBeverage);

        return sBeverage;
    },

    supply : function(htStocks){
        this._htStocks = htStocks;
    },

    getStocks : function(){
        return this._htStocks;
    },

    insertCoin : function(nCoin){
        this._nBalance += nCoin;
    },

    balance : function(){
        return this._nBalance;
    },

    setPrice : function(htPriceTable){
        this._htPriceTable = htPriceTable;
    },

    getPrice : function(){
        return this._htPriceTable;
    },

    _canNotBuyIt: function (sBeverage) {
        return this._hasNoMoney(sBeverage) || this._hasNoStocks(sBeverage);
    },

    _deductBalnceByPriceOf: function (sBeverage) {
        this._nBalance -= this._htPriceTable[sBeverage];
    },

    _reduceStockByOne: function (sBeverage) {
        this._htStocks[sBeverage]--;
    },

    _hasNoMoney: function (sBeverage) {
        return this._htPriceTable[sBeverage] > this._nBalance;
    },

    _hasNoStocks: function (sBeverage) {
        return !this._htStocks[sBeverage] || this._htStocks[sBeverage] < 1;
    },

    allBeverageInfo : function(){
        var aoResults = Object.keys(this._htStocks).map(function(name){
            return { name : name, stocks : this._htStocks[name], price : this._htPriceTable[name] };
        }, this);

        return aoResults;
    }
};

function VendingMachineView(htConfig) {
    this._oVendingMachine = htConfig.model;
    this._welBeveragePanel = $( htConfig.selector );
    // this._welBeverageBtns = this._welBeveragePanel.find("li");

    this._welBeveragePanel.click($.proxy(this._onClickBeverage, this));

    var htStocks = this._oVendingMachine.getStocks();

    var tpl = '<li class="item{INDEX} beverage" data-beverage-name="{NAME}"><button><span class="blind">{NAME}</span></button><span>{PRICE}</span></li>';

    var sHtml = Object.keys(htStocks).map(function(name, i) {
        return tpl.replace("{INDEX}", i).replace("{NAME}", name);
    });

    console.log(sHtml.join(""));

    this._welBeveragePanel.find("ul").html( sHtml.join("") );
};

VendingMachineView.prototype = {
    _onClickBeverage : function(welEvent){
        var sBevName = $(welEvent.target).data("beverage-name");
        this._oVendingMachine.buy(sBevName);

        // this._oVendingMachine.buy($(welEvent.target).find("button > span").text());
    }
}