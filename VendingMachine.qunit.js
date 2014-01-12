$(function() {

    var oVendingMachine = null;

    module('VendingMachine', {
        setup : function(){
            oVendingMachine = new VendingMachine();
            oVendingMachine.supply({
                "Coke": 1,
                "Sprite" : 1,
                "Orange Juice" : 1,
                "Apple Juice" : 1,
                "NonExistingDrink": 0
            });
        },
        teardown : function(){
            /* 리소스 정리 */
            oVendingMachine = null;
        }
    });

    test("자판기에서 원하는 음료를 뽑을 수 있다.", function(){
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

    test("재고가 있는 음료만 뽑을 수 있다.", function(){
        // Given
        // When
        var sBeverage1 = oVendingMachine.buy("NonExistingDrink");

        // Then
        equal(sBeverage1, null);
    });

    test("재고만큼 음료를 구매할 수 있다.", function(){
        // given
        // when
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Coke");

        // then
        equal( sBeverage1, "Coke" );
        equal( sBeverage2, null );
    });

    test("동전을 넣은 만큼 음료를 구매할 수 있다.", function(){
        // given
        oVendingMachine.supply({ "Coke": 2 });  // 재고에 영향을 받아선 안 되므로 재고를 설정한다.
        oVendingMachine.fixPrice({ "Coke" : 100 });
        oVendingMachine.insertCoin(100);

        // when
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Coke");

        // then
        equal( sBeverage1, "Coke" );
        equal( sBeverage2, null );
    });

});
