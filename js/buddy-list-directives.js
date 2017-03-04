(function(angular) {


angular.module('arashTcsApp')

.directive('buddySettings', function() {return {
	restrict: 'EAC',
	templateUrl: 'pages/components/buddy-sttings.html'
};})

.directive('buddyList', function() {return {
	restrict: 'EAC',
	templateUrl: 'pages/components/buddy-list-body.html'
};});


})(window.angular);	


