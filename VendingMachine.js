function VendingMachine() {
	this._priceChart = {
		"Coke" : 50,
		"Coffee" : 200		
	}

	this._coin = 0;
};

VendingMachine.prototype.buy = function(beverageName) {
	if( this._priceChart[beverageName] > this._coin ) return null;

	if (this._stock[beverageName] == 0) return null;
	this._stock[beverageName]--;

	return beverageName;
}

VendingMachine.prototype.supply = function(htSupply) {
	this._stock = htSupply;	
}

VendingMachine.prototype.putCoin = function(inputCoin) {
	this._coin = inputCoin;	
}
