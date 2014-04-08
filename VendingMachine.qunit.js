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
        oVendingMachine.insertCoin(10000);

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
        oVendingMachine.insertCoin(10000);

        // When
        var sBeverage1 = oVendingMachine.buy("NonExistingDrink");

        // Then
        equal(sBeverage1, null);
    });

    test("재고만큼 음료를 구매할 수 있다.", function(){
        // given
        oVendingMachine.insertCoin(10000);

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
        equal( oVendingMachine.balance(), 600);
    });

	test("동전을 넣은 만큼만 음료를 구매할 수 있다.", function(){
	    // given
	    oVendingMachine.supply({ "Coke": 100 });  // 재고가 없어서 나오지 않는 상황이 되어서는 안 되므로.
	    oVendingMachine.setPrice({ "Coke": 500 });
	    oVendingMachine.insertCoin(500);

	    // when
	    var sBeverage1 = oVendingMachine.buy("Coke");
	    var sBeverage2 = oVendingMachine.buy("Coke");

	    // then
	    equal( sBeverage1, "Coke" );
	    equal( sBeverage2, null );
	});

    test("음료별로 가격을 설정할 수 있다.", function(){
        // given
        oVendingMachine.insertCoin(800);

        // when
        oVendingMachine.setPrice({
            "Coke": 500,
            "Sprite" : 300
        });

        // then
        equal( oVendingMachine.buy("Coke"), "Coke" );
        equal( oVendingMachine.buy("Sprite"), "Sprite" );
    });

	test("판매중인 음료 재고 목록을 가져올 수 있다.", function(){
        // given

        // when
        var htStocks = oVendingMachine.getStocks();

        // then
        equal( htStocks["Coke"], 1 );
        equal( htStocks["NonExistingDrink"], 0 );
    });

	test("판매중인 음료 가격표를 가져올 수 있다.", function(){
        // given
		oVendingMachine.setPrice({
            "Coke": 500,
            "Sprite" : 300
        });

        // when
        var htPriceTable = oVendingMachine.getPrice();

        // then
        equal( htPriceTable["Coke"], 500 );
        equal( htPriceTable["Sprite"], 300 );
    });

	test("전시중인 음료의 정보를 가져올 수 있다.", function(){
        // given
		oVendingMachine.setPrice({
                "Coke": 500,
                "Sprite" : 300,
                "Orange Juice" : 200,
                "Apple Juice" : 100,
                "NonExistingDrink": 0
            });

        // when
        var htInfo = oVendingMachine.allBeverageInfo();

        // then
        equal( htInfo[0].name, "Coke" );
        equal( htInfo[0].price, 500 );
        equal( htInfo[0].stocks, 1 );
    });

    module('VendingMachineView', {
        setup : function(){
            oVendingMachine = {
            	buy : function(sBeverage){
            		this.buy.argument = sBeverage;
            	},
				supply : function(htStocks){
        			this._htStocks = htStocks;
    			},
				getStocks : function(){
    				return this._htStocks;	
    			}
            };

			oVendingMachine.supply({
                "Coke": 1,
                "Sprite" : 1,
                "Orange Juice" : 1,
                "Apple Juice" : 1
            });
        },
        teardown : function(){
            /* 리소스 정리 */
            oVendingMachine = null;
        }
    });

    test("음료를 마우스로 클릭해서 구매할 수 있다.", function(){
        // given
        var oVendingMachineView = new VendingMachineView({
        	selector : "#_product_area",
        	model : oVendingMachine
        });

        // when
        oVendingMachineView._welBeveragePanel.find("li.beverage:first").click();

        // then
        equal(oVendingMachine.buy.argument, "Coke");
    });

	test("판매중인 음료가 진열된다.", function(){
        // given
        var oVendingMachineView = new VendingMachineView({
        	selector : "#_product_area",
        	model : oVendingMachine
        });

        // when
        var sFirst = oVendingMachineView._welBeveragePanel.find("li.beverage:first").data("beverage-name");
        var sLast = oVendingMachineView._welBeveragePanel.find("li.beverage:last").data("beverage-name");

        // then
        equal(sFirst, "Coke");
        equal(sLast, "Apple Juice");
    });

});
