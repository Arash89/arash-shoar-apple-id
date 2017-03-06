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


	vm.budBirthDate = function(theDate) {
		var niceDate = new Date(theDate);
		return niceDate.toISOString().substr(0, 10);
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


	vm.enterNewMem = function(event, self) {
		vm.bufObj.status =  "Offline";
		vm.bufObj.lastSignIn = "3/1/2017";
		vm.bufObj._id = vm.persons.length + 1;
		vm.bufObj._id = "0000000000000000abcd" + vm.bufObj._id;
		var objForPush = new objForPushCunst(vm.bufObj.firstName, vm.bufObj.lastName, vm.bufObj.email, vm.bufObj.lastSignIn, vm.bufObj.bio, vm.bufObj.status, vm.bufObj.birthday, vm.bufObj._id);
		vm.persons.push(objForPush);

	};


	vm.resetTheModel = function() {

		if (vm.bufObj !== undefined) {

			if (vm.bufObj.firstName !== undefined) {
					vm.bufObj.firstName = "";
				}
		
				if (vm.bufObj.lastName !== undefined) {
					vm.bufObj.lastName = "";
				}
		
				if (vm.bufObj.email !== undefined) {
					vm.bufObj.email = "";
				}

				if (vm.bufObj.birthday !== undefined) {
					vm.bufObj.birthday = "";
				}
		
				if (vm.bufObj.bio !== undefined) {
					vm.bufObj.bio = "";
				}
		}
	};

	vm.firstOrder = "lastName";
	vm.secondOrder = "firstName";
	vm.orderArray = ["lastName", "firstName"];

	vm.periotity = function () {
		vm.orderArray[0] = vm.firstOrder;
		vm.orderArray[1] = vm.secondOrder; 
	};


}]);




function objForPushCunst(fname, lname, em, sign, bi, stat, bir, id) {
	this.firstName = fname;
	this.lastName = lname;
	this.email = em;
	this.lastSignIn = sign;
	this.bio = bi;
	this.status = stat;
	this.birthday = bir;
	this._id = id;
}


})(window.angular);	