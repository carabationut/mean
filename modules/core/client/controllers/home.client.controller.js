'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.alerts = [
      {
        icon: 'glyphicon glyphicon-user',
        colour: 'btn-success',
        total: '20,408',
        description: 'TOTAL CUSTOMERS'
      },
      {
        icon: 'glyphicon glyphicon-calendar',
        colour: 'btn-primary',
        total: '8,382',
        description: 'UPCOMING EVENTS'
      },
      {
        icon: 'glyphicon glyphicon-edit',
        colour: 'btn-success',
        total: '8,382',
        description: 'NEW CUSTOMERS IN 24H'
      },
      {
        icon: 'glyphicon glyphicon-record',
        colour: 'btn-info',
        total: '8,382',
        description: 'EMAILS SENT'
      },
      {
        icon: 'glyphicon glyphicon-eye-open',
        colour: 'btn-warning',
        total: '8,382',
        description: 'FOLLOW UPS REQUIRED'
      },
      {
        icon: 'glyphicon glyphicon-flag',
        colour: 'btn-danger',
        total: '8,382',
        description: 'REFERRALS TO MODERATE'
      }
    ];
  }
]);
