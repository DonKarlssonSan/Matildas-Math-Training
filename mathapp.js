'use strict';
var myApp = angular.module('MathApp', ['ngAnimate']);

function MathAppCtrl($scope) {
  
    // Initial state
    $scope.nrOfCorrectAnswers = 0;
    $scope.animationToggle = '';
    var level = 1; // 1: easy 1-10, 2: medium: 1-20, hard: 1-100
    var usePlus = true;
    var useMinus = false;
    var useMult = false;
    var useDiv = false;
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
    
    $scope.toggleMult = function () {
        useMult = !useMult;
        getNewNumbers();
    };
    
    $scope.toggleDiv = function () {
        useDiv = !useDiv;
        getNewNumbers();
    };
    
    var getRandomSign = function () {
        var operator = "";
        do {
            switch (getRandomNumberWithMax(4)) {
                case 1:
                    if(usePlus) {
                        operator = "+";
                    }
                    break;
                case 2:
                    if(useMinus) {
                        operator = "-";
                    }
                    break;
                case 3:
                    if(useMult) {
                        operator = "*";
                    }
                    break;
                case 4:
                    if(useDiv) {
                        operator = "/";
                    }
                    break;
                default:
                    break;
            }
        } while (operator === "")
        return  operator;
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
    
    var newValuesAreOk = function () {
        var areOk = true;
        switch($scope.sign) {
            case "-":
                if (level === 1) {
                    areOk = $scope.first >= $scope.second;
                }
                break;
            case "/":
                areOk = $scope.first % $scope.second === 0;
            default:
                break;
        }
        return areOk;
    }

    var getNewNumbers = function () {
        do {
            $scope.first = getRandomNumber();
            $scope.second = getRandomNumber();
            $scope.sign = getRandomSign();
        } while (!newValuesAreOk())
    };

    var playRandomly = function () {
        var random = getRandomNumberWithMax(4);
        if (random > 0 && random <= 2) {
            var snd = new Audio(random.toString() + '.wav');
            snd.play();
        }
    };

    getNewNumbers();
}
