(function(angular) {


angular.module('arashTcsApp')


/*
 * Routing part 
 */

.config(['$routeProvider',function($routeProvider) {

    $routeProvider.when('/signup', {
        templateUrl: 'pages/page1-form.html',
        controller: 'formController',
        controllerAs: 'frmCtr'

    })

    .when('/members', {
        templateUrl: 'pages/page2-table.html',
        controller: 'membersController',
        controllerAs:'memCtr'
    })


    .when('/', {
        templateUrl: 'pages/buddy-list.html',
        controller: 'buddyController',
        controllerAs:'budCtr'
    })

    .when('/bodylist', {
        templateUrl: 'pages/page3-mem-list.html',
        controller: 'memberslist',
        controllerAs: 'memlistCtr'
    });
    
}]);







})(window.angular);	