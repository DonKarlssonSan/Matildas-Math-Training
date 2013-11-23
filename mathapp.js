function MathAppCtrl($scope) {
  $scope.getRandomNumber = function () {
    return $scope.getRandomNumberWithMax(10);
  };

  $scope.getRandomNumberWithMax = function (max) {
    return Math.floor((Math.random()*max)+1);
  };

  $scope.playRandomly = function() {
      var random = $scope.getRandomNumber();
      if(random > 0 && random <= 2) {
          var snd = new Audio(random.toString() + ".wav");
          snd.play();      
      }
  }
  
  // Initial state
  $scope.first = $scope.getRandomNumber();
  $scope.second = $scope.getRandomNumber();
  $scope.nrOfCorrectAnswers = 0;

  $scope.answer = function (){
    return $scope.first + $scope.second; 
  };

  $scope.checkAnswer = function (){
	// Using evil twins for comparing a number with a string
    if($scope.givenAnswer == $scope.answer()){
      $scope.message = 'Correct!';
      $scope.first = $scope.getRandomNumber();
      $scope.second = $scope.getRandomNumber();
      $scope.nrOfCorrectAnswers++;  
      $scope.playRandomly();
    } else {
      $scope.message = 'Try again!';
    } 	
    $scope.givenAnswer = '';
  };
}
