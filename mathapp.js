'use strict';
var myApp = angular.module('MathApp', ['ngAnimate']);

function MathAppCtrl($scope) {
    var setSign = function () {
        if(usePlus && useMinus) {
            $scope.sign = getRandomSign();
        } else if (usePlus) {
            $scope.sign = "+";
        } else if (useMinus) {
            $scope.sign = "-";
        }
    };
    
    var getRandomNumber = function () {
        var max = 0;
        if (level === 1) {
            max = 10;
        } else if (level === 2) {
            max = 20;
        } else if (level === 3) {
            max = 100;
        }
        return getRandomNumberWithMax(max);
    };

    var getRandomNumberWithMax = function (max) {
        return Math.floor((Math.random() * max) + 1);
    };
    
    var getNewNumbers = function () {
        do {
            $scope.first = getRandomNumber();
            $scope.second = getRandomNumber();
            setSign();
        } while (level === 1 && $scope.sign === "-" && $scope.first < $scope.second)
    };

    var playRandomly = function () {
        var random = getRandomNumberWithMax(4);
        if (random > 0 && random <= 2) {
            var snd = new Audio(random.toString() + '.wav');
            snd.play();
        }
    };

    // Initial state
    getNewNumbers();
    $scope.nrOfCorrectAnswers = 0;
    $scope.animationToggle = '';
    var level = 1; // 1: easy 1-10, 2: medium: 1-20, hard: 1-100
    var usePlus = true;
    var useMinus = false;
    $scope.sign = "+";

    $scope.answer = function () {
        // Mwahaha!
        return eval($scope.first + $scope.sign + $scope.second);
    };
    
    $scope.increaseLevel = function () {
        if (level < 3) {
            level++;
            getNewNumbers();
        }
    };

    $scope.decreaseLevel = function () {
        if (level > 1) {
            level--;
            getNewNumbers();
        }
    };

    var doToggleAnimation = function () {
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
            getNewNumbers();
            $scope.nrOfCorrectAnswers++;
            doToggleAnimation();
            playRandomly();
        } else {
            $scope.message = 'Testa igen!';
        }
        $scope.givenAnswer = '';
    };
    
    $scope.getLevelString = function () {
        switch (level) {
        case 1:
            return 'Lätt (1 - 10)';
        case 2:
            return 'Mellan (1 - 20)';
        case 3:
            return 'Svår (1 - 100)';
        }
    };
    
    $scope.togglePlus = function () {
        usePlus = !usePlus;
        getNewNumbers();
    };
    
    $scope.toggleMinus = function () {
        useMinus = !useMinus;
        getNewNumbers();
    };
    
    var getRandomSign = function () {
        return getRandomNumberWithMax(2) === 1 ? "-" : "+";
    };
}
