// JavaScript Document

(function(){

	var app = angular.module('store', ['ngCookies']);

	app.controller('StoreController', ['$scope','$cookies', function($scope,$cookies){
	
	  var productsData = [{
		id: 1,
		name: 'product1',
		price: 100.0,
		old_price:110,
		image: 'img/1.png'
	},{
		id: 2,
		name: 'product2',
		price: 14.5,
		old_price:110,
		image: 'img/2.png'
	},{
		id: 3,
		name: 'product3',
		price: 100.43,
		old_price:105,
		image: 'img/3.png'
	},{
		id: 4,
		name: 'product4',
		price: 99.9,
		old_price:120,
		image: 'img/4.png'
	},{
		id: 5,
		name: 'product5',
		price: 199.9,		
		old_price:210,
		image: 'img/5.png'
	}];
	
		$scope.products = productsData;
		$scope.cart = [];
	    $scope.total = 0;
	  /*
		if ($cookieStore.get('cart') !== null) {
		 		$scope.cart =  $cookieStore.get('cart');
		}
		*/
		
		if(!angular.isUndefined($cookies.get('total'))){
		       $scope.total = parseFloat($cookies.get('total'));
		}

		if (!angular.isUndefined($cookies.get('cart'))) {
		 		$scope.cart =  $cookies.getObject('cart');
		}
		
		$scope.addItemToCart = function(product){
		  
		 	if ($scope.cart.length === 0){
		 		product.qty = 1;
		 		$scope.cart.push(product);
				
		 	} else {
		 		var repeat = false;
		 		
				for(var i = 0; i< $scope.cart.length; i++){
		 			if($scope.cart[i].id === product.id){
		 				repeat = true;
		 				$scope.cart[i].qty +=1;
		 			}
		 		}
				
		 		if (!repeat) {
		 			product.qty = 1;
		 		 	$scope.cart.push(product);	
		 		}
		 	}
			
					
			
			//this date is for expiring cookie 
		 	var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
	  
		 	$cookies.putObject('cart', $scope.cart,  {'expires': expireDate});
		 	$scope.cart = $cookies.getObject('cart');
		 
		    $scope.total += parseFloat(product.price);     
     	    $cookies.put('total', $scope.total,  {'expires': expireDate});
		 
		 };
		 

		$scope.removeItemCart = function(product){
		   
		   if(product.qty > 1){
		     product.qty -= 1;
		     var expireDate = new Date();
         expireDate.setDate(expireDate.getDate() + 1);
		     $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
 			   $scope.cart = $cookies.getObject('cart');
		   }
		   else if(product.qty === 1){
		     var index = $scope.cart.indexOf(product);
 			 $scope.cart.splice(index, 1);
 			 expireDate = new Date();
       expireDate.setDate(expireDate.getDate() + 1);
 			 $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
 			 $scope.cart = $cookies.getObject('cart');
		     
		   }
		   
		   $scope.total -= parseFloat(product.price);
       $cookies.put('total', $scope.total,  {'expires': expireDate});
		   
		 };

	}]);

	

})();