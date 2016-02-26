"use strict";
var myApp = angular.module("MathApp", ["ngAnimate"]);

function MathAppCtrl($scope) {
  
    // Initial state
    $scope.nrOfCorrectAnswers = 0;
    $scope.animationToggle = "";
    $scope.max = 10;
    var usePlus = true;
    var useMinus = false;
    var useMult = false;
    var useDiv = false;
    $scope.sign = "+";

    $scope.answer = function () {
        // Mwahaha!
        return eval($scope.first + $scope.sign + $scope.second);
    };
    
    $scope.increaseMax = function () {
        $scope.max++;
        getNewNumbers();
    };

    $scope.decreaseMax = function () {
        if ($scope.max > 1) {
            $scope.max--;
            getNewNumbers();
        }
    };

    var doToggleAnimation = function () {
        if ($scope.animationToggle === "") {
            $scope.animationToggle = "pointsAnimation";
        } else {
            $scope.animationToggle = "";
        }
    };

    $scope.checkAnswer = function () {
        // Using evil twins for comparing a number with a string
        if ($scope.givenAnswer == $scope.answer()) {
            getNewNumbers();
            $scope.nrOfCorrectAnswers++;
            $scope.message = getMessage();
            doToggleAnimation();
            playRandomly();
        } else {
            $scope.message = "Testa igen!";
        }
        $scope.givenAnswer = "";
    };
    
    var getMessage = function () {
        var message = "";
        switch ($scope.nrOfCorrectAnswers) {
            case 5:
                message = "Snyggt!"
                break;
            case 10:
                message = "Mycket bra!"
                break;
            case 20:
                message = "Väldigt bra!"
                break;
            case 30:
                message = "Bra jobbat hörru!"
                break;
            case 40:
                message = "Hejja, vad bra du är!"
                break;
            case 50:
                message = "Superbra!"
                break;
            case 60:
                message = "Du är bäst! =)"
                break;
            case 70:
                message = "Wow! BRAAA!!"
                break;
            default:
                message = "Bra!";
                break;
        }
        return message;
    }
       
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
        if(!usePlus && !useMinus && !useMult && !useDiv) {
            return "+";
        }
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
        return getRandomNumberWithMax($scope.max);
    };

    var getRandomNumberWithMax = function (max) {
        return Math.floor((Math.random() * max) + 1);
    };
    
    var newValuesAreOk = function () {
        var areOk = true;
        switch($scope.sign) {
            case "-":
                areOk = $scope.first >= $scope.second;
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
            var snd = new Audio(random.toString() + ".wav");
            snd.play();
        }
    };

    getNewNumbers();
}
