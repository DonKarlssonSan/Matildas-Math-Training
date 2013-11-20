function MathAppCtrl($scope) {
  $scope.getRandomNumber = function () {
    return Math.floor((Math.random()*10)+1);
  };

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
    } else {
      $scope.message = 'Try again!';
    } 	
    $scope.givenAnswer = '';
  };
}
