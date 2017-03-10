(function(angular) {

angular.module('arashTcsApp',['ngRoute', 'ngAnimate'])

//  first controller that works for form validity and submit 
.controller('formController', ['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService){

    //  Variables for the first controller 
    var newMemberData = {};

    var vm = this;

    vm.persons = [{name: 'SalamName', lastName: 'SalamLast'}];

    myService.thePersons = vm.persons;

    vm.lgPage = "pages/page1-form.html";

    vm.instruction = "Please fill out this form";

    vm.confPasswordModel = "";

    vm.passwordModel = "";    
    
    vm.email = {
        placeholder: "User: an Email like user@example.com",
        alertClass: "",
        warningHide:true,
        warning: "This is a wrong email address format Your Email user@example.com",
        OK: false
    };
    
    vm.password = {
        placeholder: "Password",
        alertClass: "",
        warningHide:true,
        warning: "Password is not matched",
        OK: false
    };  
    
    vm.confirmPass = {
        placeholder: "Confirm Password",
        alertClass: "",
        warningHide:true,
        warning: "Password is not matched",
        OK: false
    };
    
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
        OK: true
    };
    
    vm.dateBirth = {
        placeholder: "1990-01-01",
        alertClass: "",
        warningHide:true,
        warning: "Format YYYY-MM-DD between (2003 - 1867)",
        OK: false
    };


    vm.subDisabled = true;
    
    /* 
     *  The array that contains the 5 element's properties that we set for 
     *  application functionality 
     */
    vm.enableArr = [vm.email, vm.confirmPass, vm.firstName, vm.lastName, vm.dateBirth, vm.password];

    /* 
     *  Function that call for checking element validation for these events
     *  click and hitting enter for all elements
     *  change for the date element 
     */
    vm.lgValidation = function (event) {

        var elem = event.target;
        var elemObjectScope = vm[elem.name];
        var i = 0;


console.log('lgValidation');


        if (elem.name === "confirmPass") {

            var passwordModel = angular.element("#frmPass").eq(0).val();
            var confPasswordModel = angular.element("#frmConf").get(0).value;

            if (confPasswordModel !== passwordModel) {
                isValid = false;
                vm.confirmPass.warningHide = false;
                vm.password.warningHide = false;
                vm.password.warning = "Passwords are not matched"; 

            }
            else {
                vm.confirmPass.warningHide = true;
                vm.password.warningHide = true;
                isValid = true;
            }
          
        }

        var isValid = elem.checkValidity();

        if (elem.name === "dateBirth" && vm.dateBirthModel === undefined) {
            isValid = false;
        }


        if (!isValid) {
            
            vm.subDisabled = true;
            elemObjectScope.OK = false;
            elemObjectScope.warningHide = false;
            elemObjectScope.alertClass = "redLoginAlert";
            if(elem.name !== 'dateBirth') {
                elemObjectScope.warning = elem.validationMessage;
            }           
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
                    vm.subDisabled = false;
                    newMemberData = {
                        name: vm.firstNameModel,
                        lastName: vm.lastNameModel,
                        defualtAvatar: "images/avatars/default.png",
                        email: vm.emailModel,
                        birth: vm.dateBirthModel.getFullYear() + "-" +
                            vm.dateBirthModel.getMonth() + "-" +
                            vm.dateBirthModel.getDay()     
                    };                          
                }
            }
        }
    };

    //  Will be use when the user hits the reset button
    vm.lgReset = function () {

        for (i = 0; i < vm.enableArr.length; i++) {
            vm.enableArr[i].alertClass = "";
            vm.enableArr[i].warningHide = true;
            vm.enableArr[i].OK = false;
        }   

    };

    //  for when user click on submit button
    vm.lgSubmit = function (a) {
        $http.get('data/data.js').then(function(response) {
            vm.persons = response.data;
            vm.persons.push(newMemberData); 
            $location.path('/members');
        }, 
        function(reason) {
            // here is for codes when any error causes
        });
    };


    vm.settingsAfterMeLoad = function(){
            jQuery("#lgContainer").removeClass("col-sm-offset-3").removeClass("col-sm-6").addClass("col-sm-12");
    };

    $scope.$watch(function watch(scope) {
            return vm.persons;
          },
          function handle(newV, oldV) {
            myService.thePersons = vm.persons;
          }, true);

    $scope.$watch(function watch(scope) {
            return vm.dateBirthModel;
          },
          function handle(newV, oldV) {

            if (newV === oldV) {
                return;
            }

            var x = {};
            x.target = angular.element("#frmBirth").get(0);
            vm.lgValidation(x);
          }, true);    
          

    
}])


/*  Second controller that has responsibility for showing the list of people that
 *  signed in 
 */
.controller('membersController', ['myService', '$location', '$scope', function(myService, $location, $scope){

    var vm = this;

    vm.persons = myService.thePersons;

    $scope.$watch(function watch(scope) {
            return vm.persons;
          },
          function handle(newV, oldV) {
            myService.thePersons = vm.persons;
          }, true);     

    vm.gotoBodyList = function () {
        myService.thePersons = vm.persons;
        $location.path('/bodylist');
    };
   
}])


/*  Second controller that has responsibility for showing the list of people that
 *  signed in and you can delete them
 */
.controller('memberslist', ['myService', '$location', '$scope', function(myService, $location, $scope){

    var vm = this;

    vm.persons = myService.thePersons;

    $scope.$watch(function watch(scope) {
            return vm.persons;
          },
          function handle(newV, oldV) {
            myService.thePersons = vm.persons;
          }, true);     

    vm.removePerson = function (obj) {
    
        var key = obj.person.$$hashKey;

         var indexNumber = vm.persons.findIndex(function (objFor) {
          return objFor.$$hashKey == key;
        });

        vm.persons.splice(indexNumber, 1);

    };
  
}])




/*
 *  This one is the service that I designed to keep connection between the three 
 *  controllers  
 */
.service('myService', function(){

    this.thePersons = [];

});



})(window.angular);












