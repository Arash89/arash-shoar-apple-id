(function(angular) {


angular.module('arashTcsApp')


.controller('buddyController', ['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService){


	vm = this;
	// vm.searchModel.status = "Busy";
	vm.showHide = [];
	$http.get('data/buddy.js')
	.then(function(response) {
		vm.persons = response.data;
		// var i = 0;
		// for (i = 0; i < response.data.length; i++) {
		// 	vm.showHide.push(false);
		// }

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


	vm.classStatusColor = [{Available: 'class-available'}, {Idle: 'class-idle'}, {Busy: 'class-busy'}, {Offline: 'class-offline'}];

	vm.colorByStatus = function(status) {
		var theIndex = vm.classStatusColor.findIndex(function(item, ind, arr) {return item[status];});
		return vm.classStatusColor[theIndex][status];
	};

	
	vm.budDate = function(theDate, status) {
		if (status !== 'Offline') {
			return;
		}
		var niceDate = new Date(theDate);
		return niceDate.toLocaleDateString();
	};


	
	vm.showHideExpand = function(ind) {

		if (vm.persons[ind].expandVisibi === undefined) {
			vm.persons[ind].expandVisibi = false;
		}

		vm.persons[ind].expandVisibil = !vm.persons[ind].expandVisibil;

	};


	vm.removeItem = function(event, self) {

		event.stopPropagation();

		var id = self.person._id;

		var theIndex = vm.persons.findIndex(function(elem, i, a) {return elem._id === id;});

		var isOk = window.confirm('Are you OK with deleteing the ' + vm.persons[theIndex].firstName + " " + vm.persons[theIndex].lastName + "'s information?" );


		if (isOk) {
			vm.persons.splice(theIndex, 1);
		}
	};


}]);






})(window.angular);	