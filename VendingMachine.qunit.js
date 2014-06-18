$(function() {

    var oVendingMachine = null;
    var DEFAULT_MONEY = 2000;

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
            oVendingMachine.setPrice({
                "Coke": 500,
                "Sprite" : 300,
                "Orange Juice" : 200,
                "Apple Juice" : 100
            });
            oVendingMachine.insertCoin( DEFAULT_MONEY );
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

    test("동전을 여러 번 넣을 수 있다.", function(){
        // given
        // when
        oVendingMachine.insertCoin(500);
        oVendingMachine.insertCoin(100);

        // then
        equal( oVendingMachine.balance(), DEFAULT_MONEY + 600);
    });

    test("동전을 넣은 만큼만 음료를 구매할 수 있다.", function(){
        // given
        oVendingMachine.supply({ "Coke": 100 });  // 재고가 없어서 나오지 않는 상황이 되어서는 안 되므로.
        oVendingMachine.buy("Coke");
        oVendingMachine.buy("Coke");
        oVendingMachine.buy("Coke");

        // when
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Coke");

        // then
        equal( sBeverage1, "Coke" );
        equal( sBeverage2, null );
    });

    test("지폐를 넣을 수 있다.", function(){
        // given
        oVendingMachine.supply({ "Coke": 100 });  // 재고가 없어서 나오지 않는 상황이 되어서는 안 되므로.
        oVendingMachine.setPrice({ "Coke": 2000 });
        oVendingMachine.insertPaperMoney(2000);

        // when
        oVendingMachine.buy("Coke");
        var sBeverage1 = oVendingMachine.buy("Coke");
        var sBeverage2 = oVendingMachine.buy("Coke");

        // then
        equal( sBeverage1, "Coke" );
        equal( sBeverage2, null );
    });

    test("거스름돈을 돌려받을 수 있다.", function(){
        // given
        // when
        var nChange = oVendingMachine.returnBalance();

        // then
        equal( nChange, DEFAULT_MONEY );
    });


});