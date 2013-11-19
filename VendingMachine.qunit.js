$(function() {

var oVendingMachine = null;

module('VendingMachine', {
    setup : function(){
        oVendingMachine = new VendingMachine();
    },
    teardown : function(){

    }
});

test("자판기에서 음료를 뽑을 수 있다.", function(){
	// Given
	// When
    var sBeverage = oVendingMachine.buy("Coke");

	// Then
    equal(sBeverage, "Coke");
});

test("자판기에서 사이다를 뽑을 수 있다.", function(){
    // Given
    // When
    var sBeverage1 = oVendingMachine.buy("Cider");

    // Then
    equal(sBeverage1, "Cider");
});

});
