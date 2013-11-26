$(function() {

var oVendingMachine = null;

module('VendingMachine', {
    setup : function(){
        oVendingMachine = new VendingMachine();
    },
    teardown : function(){
        /* 리소스 정리 */
        oVendingMachine = null;
    }
});

test("여러 종류의 음료 중 원하는 음료를 뽑을 수 있다.", function(){
    // Given
    // When
    var sBeverage1 = oVendingMachine.buy("Coke");
    var sBeverage2 = oVendingMachine.buy("Sprite");
    var sBeverage3 = oVendingMachine.buy("Orange Juice");
    var sBeverage4 = oVendingMachine.buy("Apple Juice");

    // Then
    equal(sBeverage1, "Coke");
    equal(sBeverage2, "Sprite");
    equal(sBeverage3, "Orange Juice");
    equal(sBeverage4, "Apple Juice");
});

test("콜라, 사이다, 오렌지 주스, 사과 주스만 뽑을 수 있다.", function(){
    // Given
    // When
    var sBeverage1 = oVendingMachine.buy("Coffee");
    var sBeverage2 = oVendingMachine.buy("Milk");

    // Then
    notEqual(sBeverage1, "Coffee");
    notEqual(sBeverage2, "Milk");
});

});
