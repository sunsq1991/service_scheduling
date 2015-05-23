'use strict';

/**
 * @ngdoc function
 * @name serviceSchedulingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serviceSchedulingApp
 */
angular.module('serviceSchedulingApp')
  .controller('MainCtrl', ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {
    var ref = new Firebase("https://blinding-inferno-2443.firebaseio.com/");
    //$scope.tasks = $firebaseArray(ref.child('tasks'));
    $scope.workers = $firebaseArray(ref.child('users/workers/').orderByChild("uid"));
    $scope.sortableOptions = {
      cursor: "move",
      connectWith: ".sortable-container",
      placeholder: "sortable-placeholder"
    };

    var hidePopover = function() {
      $('.popover').each(function () {
        //Set the state of the popover in the scope to reflect this
        var elementScope = angular.element(this).scope().$parent;
        elementScope.isOpen = false;
        //Remove the popover element from the DOM
        $(this).remove();
      });
    };

    $scope.editTask = function(task) {
      if (!$scope.editingTask) {
        $scope.editingTask = task;
        task.editing = 1;
        $scope.workers.$save($scope.workers.$getRecord(task.worker));
        
        //$scope.editingTask.editing = 1;
        $scope.editPopover.name = task.name;
        $scope.editPopover.address = task.address;
        $scope.editPopover.description = task.description;
        //$firebaseArray(ref.child('users').child('workers').child(task.worker).child(task.section)).$save(task);
      };
    }

    $scope.cancelEdit = function() {
      var task = $scope.editingTask;
      task.editing = 0;
      $scope.workers.$save($scope.workers.$getRecord(task.worker));
      $scope.editingTask = null;
      hidePopover();
    }

    $scope.saveEdit = function() {
      var task = $scope.editingTask;
      task.name = $scope.editPopover.name;
      task.address = $scope.editPopover.address;
      task.description = $scope.editPopover.description;
      task.editing = 0;
      $scope.workers.$save($scope.workers.$getRecord(task.worker));
      //$scope.workers.$save($scope.editPopover.worker);
      //$firebaseArray(ref.child('users').child('workers').child(task.worker).child(task.section)).$save(task);
      $scope.editingTask = null;
      hidePopover();
    }

    $scope.addTask = function(worker, section) {
      if (!$scope.editingTask) {
        $scope.editingTask = true;
        $scope.addPopover.worker = $scope.workers.$keyAt(worker);
        $scope.addPopover.section = section;
      };
    }

    $scope.cancelAdd = function() {
      $scope.editingTask = null;
      $scope.addPopover.name = '';
      $scope.addPopover.address = '';
      $scope.addPopover.description = '';
      hidePopover();
    }

    $scope.saveAdd = function() {
      var order = 0;
      $firebaseArray(ref.child('users/workers').child($scope.addPopover.worker).child($scope.addPopover.section))
        .$add({
        order: order,
        worker: $scope.addPopover.worker,
        section: $scope.addPopover.section,
        name: $scope.addPopover.name,
        address: $scope.addPopover.address,
        description: $scope.addPopover.description
      });
      $scope.editingTask = null;
      $scope.addPopover.name = '';
      $scope.addPopover.address = '';
      $scope.addPopover.description = '';
      hidePopover();
    }

    $scope.editPopover = {
      editTemplateUrl: 'template/popover-edit-card.html',
      name: '',
      address: '',
      description: ''
    };

    $scope.addPopover = {
      addTemplateUrl: 'template/popover-add-card.html',
      worker: '',
      section: 'morning',
      name: '',
      address: '',
      description: ''
    };
  }]);
