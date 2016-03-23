(function () {
  'use strict';

  angular
    .module('customers')
    .controller('CustomersListController', CustomersListController);

  CustomersListController.$inject = ['CustomersService', '$modal', '$log', '$scope', '$location'];

  function CustomersListController(CustomersService, $modal, $log, $scope, $location) {
    var vm = this;

    vm.customers = CustomersService.query();

    vm.animationsEnabled = true;

    // Open a modal window to Save a single Customer record
    vm.modalCreate = function (size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modules/customers/client/views/form-customer.client.view.html',
        controller: function($scope, $modalInstance) {

          $scope.ok = function() {
          	//if(createCustomerForm.$valid){
            $modalInstance.close();
          	//}
            
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        },
        size: size
      });

      modalInstance.result.then(function(selectedItem) {
      	// Nothing here :)
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    // Open a modal window to Update a single Customer record
    vm.open = function (size, selectedCustomer) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modules/customers/client/views/edit-customer.client.view.html',
        controller: function ($scope, $modalInstance, customer) {
          $scope.customer = customer;

          $scope.ok = function() {
          	// if(updateCustomerForm.$valid)
          	// {
            $modalInstance.close($scope.customer);
          	// }
            
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        },
        size: size,
        resolve: {
          customer: function () {
            return selectedCustomer;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    vm.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    /**
     * Delete an Customer
     */
    vm.remove = function( customer ) {
        if( customer) { customer.$remove();
            
            for(var i in vm.customers ) {
                if(vm.customers [i] === customer ) {
                    vm.customers.splice(i, 1);
                }
            }
        }else {
            vm.customer.$remove(function() {
            });
        }
    };


  }

  angular
    .module('customers')
    .controller('CustomersUpdateController', CustomersUpdateController);

  CustomersUpdateController.$inject = ['CustomersService', '$modal', '$log', '$scope'];

  function CustomersUpdateController(CustomersService, $modal, $log, $scope) {
  
    var vm = this;

    $scope.channelOptions = [
      {id: 1, item:'Facebook'},
      {id: 2, item:'Twitter'},
      {id: 3, item:'Email'},
      {id: 4, item:'Others'},
    ];

  	// Update existing Customer	
    vm.update = function(updatedCustomer) {
      var customer = updatedCustomer;

      customer.$update(function() {
  			//$location.path('customer/' + customer._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }

  angular
    .module('customers')
    .controller('CustomersCreateController', CustomersCreateController);

  CustomersCreateController.$inject = ['CustomersService', '$modal', '$log', '$scope', 'Notify'];

  function CustomersCreateController(CustomersService, $modal, $log, $scope, Notify) {
    var vm = this;

    	// Create new Customer
    vm.create = function(customers) {
    		//Create new Customer object
      var customer = new CustomersService ({
        firstname: customers.firstname,
        surname: customers.surname,
        suburb: customers.suburb,
        country: customers.country,
        industry: customers.industry,
        email: customers.email,
        phone: customers.phone,
        referred: customers.referred,
        channel: customers.channel
      });

      customer.$save(function(response) {

    			//Clear form fields
        $scope.firstname = '';
        $scope.surname = '';
        $scope.suburb = '';
        $scope.country = '';
        $scope.industry = '';
        $scope.email = '';
        $scope.phone = '';
        $scope.referred = '';
        $scope.channel = '';

        Notify.sendMsg('NewCustomer', {'id': response._id});
        //$log.info(response._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });	
    };
  }

})();





angular.module('customers').directive('customerList', ['CustomersService', 'Notify', function(CustomersService, Notify) {
  'use strict';
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'modules/customers/client/views/customer-list-template.html',
    link: function(scope, element, attrs) {

        // when a new customer is added, update the customer list

        Notify.getMsg('NewCustomer', function(event, data) {
          //console.log('hello');
          scope.vm.customers = CustomersService.query();

        });
    }
  };
}]);