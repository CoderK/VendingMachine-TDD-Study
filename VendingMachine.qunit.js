$(function() {

var oVendingMachine = null;

module('VendingMachine', {
    setup : function(){
        oVendingMachine = new VendingMachine();
    },
    teardown : function(){
    }
});

test("자판기에서 콜라, 사이다, 오렌지 주스, 사과 주스 중 원하는 음료를 뽑을 수 있다.", function(){
    // Given
    // When
    var sBeverage1 = oVendingMachine.buy("Coke");
    var sBeverage2 = oVendingMachine.buy("Cider");
    var sBeverage3 = oVendingMachine.buy("Orange Juice");
    var sBeverage4 = oVendingMachine.buy("Apple Juice");
    var sBeverage5 = oVendingMachine.buy("Coffee");
    var sBeverage6 = oVendingMachine.buy("Milk");

    // Then
    equal(sBeverage1, "Coke");
    equal(sBeverage2, "Cider");
    equal(sBeverage3, "Orange Juice");
    equal(sBeverage4, "Apple Juice");

    notEqual(sBeverage5, "Coffee");
    notEqual(sBeverage6, "Milk");
});

});
