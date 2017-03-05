(function(angular) {


angular.module('arashTcsApp')


.controller('buddyController', ['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService){


	vm = this;
	// vm.searchModel.status = "Busy";
	$http.get('data/buddy.js')
	.then(function(response) {
		vm.persons = response.data;
	}, function(reason) {

	});

	vm.statusForFilter = ['Busy', 'Idle', 'Available', 'Offline'];
	//vm.statusForFilter = [];

	vm.setStatusForFilter = function(event, value) {




        var elem = event.target;

console.log('elem', elem.checked);

        if (elem.checked) {

        	if (vm.statusForFilter.includes(value)) {
        		return;
        	}
        	else {
        		vm.statusForFilter.push(value);
        	}

        }
        else {

        	if (!vm.statusForFilter.includes(value)) {
        		return;
        	}
        	else {
        		var index = vm.statusForFilter.indexOf(value);
        		vm.statusForFilter.splice(index, 1);
        	}
        }
	};


	vm.filterByStatus = function(status) {
		return vm.statusForFilter.includes(status);
	};

	
}]);






})(window.angular);	