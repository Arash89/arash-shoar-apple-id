(function(angular) {


angular.module('arashTcsApp')


.controller('buddyController', ['$timeout','$scope', '$http', '$location', 'myService', function($timeout, $scope, $http, $location, myService){


	vm = this;

	//  An Array to keep flags for status of Rows are shown or not shown
	vm.showHide = [];

	//  Fetching the list of buddies from the database or web-service
	$http.get('data/buddy.js')
	.then(function(response) {
		vm.persons = response.data;
	}, function(reason) {

	});

	/* 
	 *  This array if has all its four element all users are shown
	 *  Otherwise each element is pop out aren't shown in the list 
	 */
	vm.statusForFilter = ['Busy', 'Idle', 'Available', 'Offline'];

	/* 
	 *  This is the function that works with the above Array to show
	 *  some of the members base on their status and check box that user
	 *  has selected
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

	//  Whit this function we set ng-show of th Row if it would be shown or not
	vm.filterByStatus = function(status) {
		return vm.statusForFilter.includes(status);
	};

	/*
	 *  This is an Array that keeps the class name for the Apple icon that
	 *  shows the buddies status with its color
	 */
	vm.classStatusColor = [{Available: 'class-available'}, {Idle: 'class-idle'}, {Busy: 'class-busy'}, {Offline: 'class-offline'}];

	//  This function sets the class of apple icon it wroks wiht above Array 
	vm.colorByStatus = function(status) {
		var theIndex = vm.classStatusColor.findIndex(function(item, ind, arr) {return item[status];});
		return vm.classStatusColor[theIndex][status];
	};

	/*
	 *  This function change the date to a short version 
	 *  For the users with the off-line status
	 */
	vm.budDate = function(theDate, status) {
		if (status !== 'Offline') {
			return;
		}
		var niceDate = new Date(theDate);
		return niceDate.toLocaleDateString();
	};

	/*
     *  This function change the date to a short version 
	 *  For the birthday
	 */
	vm.budBirthDate = function(theDate) {
		var niceDate = new Date(theDate);
		return niceDate.toISOString().substr(0, 10);
	};

	/*
     *  This function control visibility of the expanded data 
	 */	
	vm.showHideExpand = function(ind) {

		if (vm.persons[ind].expandVisibi === undefined) {
			vm.persons[ind].expandVisibi = false;
		}

		vm.persons[ind].expandVisibil = !vm.persons[ind].expandVisibil;

	};


	/*
     *  This function remove a buddy from the list
	 */	
	vm.removeItem = function(event, self, ind) {

		event.stopPropagation();

		var id = self.person._id;

		var theIndex = vm.persons.findIndex(function(elem, i, a) {return elem._id === id;});

		var isOk = window.confirm('Are you OK with deleting the ' + vm.persons[theIndex].firstName + " " + vm.persons[theIndex].lastName + "'s information?" );

		vm.persons[ind].expandVisibil = false;
		
		if (isOk) {
			vm.persons.splice(theIndex, 1);
		}
	};

	/*
     *  This function add a buddy to the buddy list
	 */	
	vm.enterNewMem = function(event, self) {
		vm.bufObj.status =  "Offline";
		vm.bufObj.lastSignIn = "3/1/2017";
		vm.bufObj._id = vm.persons.length + 1;
		vm.bufObj._id = "0000000000000000abcd" + vm.bufObj._id;
		var objForPush = new objForPushCunst(vm.bufObj.firstName, vm.bufObj.lastName, vm.bufObj.email, vm.bufObj.lastSignIn, vm.bufObj.bio, vm.bufObj.status, vm.bufObj.birthday, vm.bufObj._id);
		vm.persons.push(objForPush);
		$timeout(vm.resetTheModel, 300);
		
	};

	/*
     *  This function clears the modal dialog box for using again and add 
     *  new buddies to the list 
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

			vm.enableArr.forEach( function(element, index) {
				element.alertClass = "";
				element.warningHide = true;
				element.OK = false;
			});
			vm.addBtDisabled = true;


		}
	};

	vm.firstOrder = "lastName";
	vm.secondOrder = "firstName";
	vm.orderArray = ["lastName", "firstName"];

	vm.priotity = function () {
		vm.orderArray[0] = vm.firstOrder;
		vm.orderArray[1] = vm.secondOrder; 
	};

	//  This function changes the color of favorite star to yellow or gray
	vm.isFavorit = function(favorit) {

		if (favorit === "a") {
			//  yellow class name
			return 'class-idle';
		}
		else {
			//  gray class name
			return 'class-offline';
		}
	};

	vm.toggleFavorit = function(event, self) {
		event.stopPropagation();

		if (self.person.favorit === "a")
		{
			self.person.favorit = "z";
		} else {
			self.person.favorit = "a";
		} 
	};
		
	/*            ///////////////////////////  Validation Start  ////////////////////////////
	 *  From this point there are all variables and functions that will be used
	 *  for testing the validity of Add button of buddy list dialog box
	 *  to check if the user had filled out all necessary fields with the right format
	 */
	vm.firstName = {
	    placeholder: "First Name",
	    alertClass: "",
	    warningHide:true,
	    warning: "The Name must be less than 50 characters",
	    OK: false
	};
	
	vm.lastName = {
	    placeholder: "Last Name",
	    alertClass: "",
	    warningHide:true,
	    warning: "The Last Name must be less than 50 characters",
	    OK: false
	};

	vm.email = {
	    placeholder: "User: an Email like user@example.com",
	    alertClass: "",
	    warningHide:true,
	    warning: "This is a wrong email address format Your Email user@example.com",
	    OK: false
	};
	
	vm.dateBirth = {
	    placeholder: "1990-01-01",
	    alertClass: "",
	    warningHide:true,
	    warning: "Age must be 14 to 150 (2003 - 1867)",
	    OK: false
	};

	vm.bio = {
	    placeholder: "User: an Email like user@example.com",
	    alertClass: "",
	    warningHide:true,
	    warning: "Biography is mandatory",
	    OK: false
	};	


	vm.addBtDisabled = true;
	
	/* 
	 *  The array that contains the 5 element's properties that we set for 
	 *  application functionality 
	 */
	vm.enableArr = [vm.firstName, vm.lastName, vm.email, vm.dateBirth, vm.bio];

	/* 
	 *  Function that call for checking element validation for these events
	 *  click and hitting enter for all elements
	 *  change for the date element 
	 */
	vm.lgValidation = function (event, self) {

	    var elem = event.target;
	    var elemObjectScope = vm[elem.name];
	    var isValid = elem.checkValidity();
	    var i = 0;


		if(elem.name === 'dateBirth' && vm.bufObj.birthday === undefined) {
			isValid = false;
		}

	    if (!isValid) {
	        elemObjectScope.warningHide = false;
	        elemObjectScope.alertClass = "redLoginAlert";
	        if(elem.name !== 'dateBirth') {
	            elemObjectScope.warning = elem.validationMessage;
	        }
	        vm.addBtDisabled = true;
	        elemObjectScope.OK = false;
	        vm.enableArr.forEach(function(elem, inedex) {
	        });             
	    }
	    else {
	        elemObjectScope.warningHide = true;
	        elemObjectScope.alertClass = "greenLoginAlert"; 
	        elemObjectScope.OK = true;
	    }

	    for (i = 0; i < vm.enableArr.length; i++) {
	        if (vm.enableArr[i].OK === false) {
	            return;
	        }
	        else {
	            if (i === vm.enableArr.length - 1) {
	                vm.addBtDisabled = false;
	            }
	        }
	    }
	};


	/////////////////////////////  Validation End  ////////////////////////////////

}]);


/*
 *  This function constructor is used for adding new members to the list
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
