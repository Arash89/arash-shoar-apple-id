(function(angular) {


angular.module('arashTcsApp')


.controller('buddyController', ['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService){


	vm = this;

	// An Array to keep flags for status of Rows are shown or not shown
	vm.showHide = [];

	// Fetching the list of buddies from the database or webservice
	$http.get('data/buddy.js')
	.then(function(response) {
		vm.persons = response.data;
	}, function(reason) {

	});

	/* 
	 * This array if has all its four element all users are shoen
	 * Othewist each elemet is pop out aren't shown in the list 
	 */
	vm.statusForFilter = ['Busy', 'Idle', 'Available', 'Offline'];

	/* 
	 * This is the function that works with the above Array to show
	 * some of the members base on thier status and check box tha user
	 * has selected
	 */
	vm.setStatusForFilter = function(event, value) {

        var elem = event.target;

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

	// Whit this function we set ng-show of th Row if it would be shown or not
	vm.filterByStatus = function(status) {
		return vm.statusForFilter.includes(status);
	};

	/*
	 * This is an Array that keeps the class name for the Apple icon that
	 * shows the buddies status with its color
	 */
	vm.classStatusColor = [{Available: 'class-available'}, {Idle: 'class-idle'}, {Busy: 'class-busy'}, {Offline: 'class-offline'}];

	// This function sets the class of apple icon it wroks wiht above Array 
	vm.colorByStatus = function(status) {
		var theIndex = vm.classStatusColor.findIndex(function(item, ind, arr) {return item[status];});
		return vm.classStatusColor[theIndex][status];
	};

	/*
	 * This function change the date to a short version 
	 * For the users with the offline status
	 */
	vm.budDate = function(theDate, status) {
		if (status !== 'Offline') {
			return;
		}
		var niceDate = new Date(theDate);
		return niceDate.toLocaleDateString();
	};

	/*
     * This function change the date to a short version 
	 * For the birthay
	 */
	vm.budBirthDate = function(theDate) {
		var niceDate = new Date(theDate);
		return niceDate.toISOString().substr(0, 10);
	};

	/*
     * This function control visibility of the expanded data 
	 */	
	vm.showHideExpand = function(ind) {

		if (vm.persons[ind].expandVisibi === undefined) {
			vm.persons[ind].expandVisibi = false;
		}

		vm.persons[ind].expandVisibil = !vm.persons[ind].expandVisibil;

	};


	/*
     * This function remove a buddy from the list
	 */	
	vm.removeItem = function(event, self) {

		event.stopPropagation();

		var id = self.person._id;

		var theIndex = vm.persons.findIndex(function(elem, i, a) {return elem._id === id;});

		var isOk = window.confirm('Are you OK with deleteing the ' + vm.persons[theIndex].firstName + " " + vm.persons[theIndex].lastName + "'s information?" );


		if (isOk) {
			vm.persons.splice(theIndex, 1);
		}
	};

	/*
     * This function add a buddy to the buddy list
	 */	
	vm.enterNewMem = function(event, self) {
		vm.bufObj.status =  "Offline";
		vm.bufObj.lastSignIn = "3/1/2017";
		vm.bufObj._id = vm.persons.length + 1;
		vm.bufObj._id = "0000000000000000abcd" + vm.bufObj._id;
		var objForPush = new objForPushCunst(vm.bufObj.firstName, vm.bufObj.lastName, vm.bufObj.email, vm.bufObj.lastSignIn, vm.bufObj.bio, vm.bufObj.status, vm.bufObj.birthday, vm.bufObj._id);
		vm.persons.push(objForPush);

	};

	/*
     * This function clears the modal dialog box for using again and add 
     * new buddies to the list 
	 */	
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

	vm.priotity = function () {
		vm.orderArray[0] = vm.firstOrder;
		vm.orderArray[1] = vm.secondOrder; 
	};

	// This function changes the color of favorit star to yellow or gray
	vm.isFavorit = function(favorit) {

		if (favorit === "true") {
			// yellow class name
			return 'class-idle';
		}
		else {
			// gray class name
			return 'class-offline';
		}
	};

	vm.toggleFavorit = function(event, self) {
		event.stopPropagation();

		if (self.person.favorit === "true")
		{
			self.person.favorit = "false";
		} else {
			self.person.favorit = "true";
		} 
	};
		


}]);


/*
 * This function cunstructor is used for adding new members to the list
 */	
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
