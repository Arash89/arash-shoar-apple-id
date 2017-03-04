(function(angular) {


angular.module('arashTcsApp')


.controller('buddyController', ['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService){


	vm = this;

	vm.testFunction = function function_name (argument) {
		
		console.log('SalamName');
	
	};

	
}]);






})(window.angular);	