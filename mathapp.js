'use strict';
var myApp = angular.module('MathApp', ['ngAnimate']);

function MathAppCtrl($scope) {
    $scope.getRandomNumber = function () {
        var max = 0;
        if ($scope.level === 1) {
            max = 10;
        } else if ($scope.level === 2) {
            max = 20;
        } else if ($scope.level === 3) {
            max = 100;
        }
        return $scope.getRandomNumberWithMax(max);
    };

    $scope.getRandomNumberWithMax = function (max) {
        return Math.floor((Math.random() * max) + 1);
    };
    
    $scope.getNewNumbers = function () {
        $scope.first = $scope.getRandomNumber();
        $scope.second = $scope.getRandomNumber();
    };

    $scope.playRandomly = function () {
        var random = $scope.getRandomNumberWithMax(4);
        if (random > 0 && random <= 2) {
            var snd = new Audio(random.toString() + '.wav');
            snd.play();
        }
    };

    // Initial state
    $scope.getNewNumbers();
    $scope.nrOfCorrectAnswers = 0;
    $scope.animationToggle = '';
    $scope.level = 1; // 1: easy 1-10, 2: medium: 1-20, hard: 1-100

    $scope.answer = function () {
        return $scope.first + $scope.second;
    };
    
    $scope.increaseLevel = function () {
        if ($scope.level < 3) {
            $scope.level++;
            $scope.getNewNumbers();
        }
    };

    $scope.decreaseLevel = function () {
        if ($scope.level > 1) {
            $scope.level--;
            $scope.getNewNumbers();
        }
    };

    $scope.doToggleAnimation = function () {
        if ($scope.animationToggle === '') {
            $scope.animationToggle = 'pointsAnimation';
        } else {
            $scope.animationToggle = '';
        }
    };

    $scope.checkAnswer = function () {
        // Using evil twins for comparing a number with a string
        if ($scope.givenAnswer == $scope.answer()) {
            $scope.message = 'Bra!';
            $scope.getNewNumbers();
            $scope.nrOfCorrectAnswers++;
            $scope.doToggleAnimation();
            $scope.playRandomly();
        } else {
            $scope.message = 'Testa igen!';
        }
        $scope.givenAnswer = '';
    };
    
    $scope.getLevelString = function () {
        switch ($scope.level) {
            case 1:
                return 'Lätt (1 - 10)';
            case 2:
                return 'Mellan (1 - 20)';
            case 3:
                return 'Svår (1 - 100)';
        }
    };
}
