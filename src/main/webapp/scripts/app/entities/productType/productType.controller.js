'use strict';

angular.module('trackerApp')
    .controller('ProductTypeController', function ($scope, ProductType, User, ProductTypeSearch, ParseLinks, Account) {
        $scope.productTypes = [];
        $scope.users = User.query();
        $scope.account = Account.get();
        $scope.page = 1;
        $scope.loadAll = function() {
            ProductType.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.productTypes.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 1;
            $scope.productTypes = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.showUpdate = function (id) {
            ProductType.get({id: id}, function(result) {
                $scope.productType = result;
                $('#saveProductTypeModal').modal('show');
            });
        };

        $scope.save = function () {
            if ($scope.productType.id != null) {
                ProductType.update($scope.productType,
                    function () {
                        $scope.refresh();
                    });
            } else {
                ProductType.save($scope.productType,
                    function () {
                        $scope.refresh();
                    });
            }
        };

        $scope.delete = function (id) {
            ProductType.get({id: id}, function(result) {
                $scope.productType = result;
                $('#deleteProductTypeConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            ProductType.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deleteProductTypeConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.search = function () {
            ProductTypeSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.productTypes = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.reset();
            $('#saveProductTypeModal').modal('hide');
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.productType = {name: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
