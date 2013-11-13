$(function() {

module("VendingMachine", {
	setup: function() {
		this.vendingMachine = new VendingMachine();
		this.vendingMachine.supply({
			"Coke" : 1,
			"Coffee" : 1,
			"NonExistingDrink" : 0
		});
		this.vendingMachine.putCoin(100);
	}
});

test("자판기에서 원하는 음료를 뽑을 수 있다.", function(){
	// Given
	this.vendingMachine.putCoin(200);

	// When
	var beverage1 = this.vendingMachine.buy("Coke");
	var beverage2 = this.vendingMachine.buy("Coffee");

	// Then
	equal(beverage1, "Coke");
	equal(beverage2, "Coffee");
});

test("재고가 있는 음료만 구입할 수 있다", function(){
	// Given
	// When
	var beverage2 = this.vendingMachine.buy("NonExistingDrink");

	// Then
	equal(beverage2, null);
});

test("음료를 구입할 때마다 재고가 감소한다.", function(){
	// Given
	// When
	this.vendingMachine.buy("Coke");
	var beverage = this.vendingMachine.buy("Coke");

	// Then
	equal(beverage, null);
});

test("투입한 금액보다 낮은 가격의 음료만 구입할 수 있다.", function(){
	// Given
	// this.vendingMachine.setPrice({
	// 	"Coke" : 50,
	// 	"Coffee" : 200
	// });
	this.vendingMachine.putCoin(100);

	// When
	var beverage1 = this.vendingMachine.buy("Coke");
	var beverage2 = this.vendingMachine.buy("Coffee");

	// Then
	equal(beverage1, "Coke");
	equal(beverage2, null);
});

// TODO : putCoin은 동전이 합산될 것 같은 의미를 주지만, 실제로는 단순히 코인을 설정하는 역할을 하고 있음.







});
