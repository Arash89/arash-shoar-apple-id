(function(angular) {


angular.module('arashTcsApp')

.directive('buddySettings', function() {return {
	restrict: 'EAC',
	templateUrl: 'pages/components/bud-set-comp.html'
};})

.directive('buddyModal', function() {return {
	restrict: 'EAC',
	templateUrl: 'pages/components/bud-modal-comp.html'
};})

.directive('buddyList', function() {return {
	restrict: 'EAC',
	templateUrl: 'pages/components/bud-list-comp.html'
};});


})(window.angular);	


