<?php
$setMatrix = array();
$users = array();
// 데이터 카테고리 정리
$characterUser = array('a','b','c','d','e','f','g');
$categoryMovie = array('h','i','j','k','l','m','n','o');

// 데이터 전처리 후
// 사용자 영화의 연령별 선호도
// 사용자 영화의 주제별 선호도
$userAgeLike = array();
$userAgeLike[] = array(-0.9, -1, -0, 1, 0.3, -0.2, 0.3);
$userAgeLike[] = array(0.5, -1, -0.4, -0.5, 1, 0.2, 0.3);
$userAgeLike[] = array(0.4, 0, 0.1, 1, -0, 0.2, 0.3);
$userAgeLike[] = array(-0.3, -1, -0, 1, -0, 0.2, -0.3);
$userAgeLike[] = array(0.1, -0.1, 0, 1, 0, -0.2, 0.3);

$userTypeLike = array();
$userTypeLike[] = array(-0.1, 0.3, -0.1, -0.1, 0, -0.4, 1);
$userTypeLike[] = array(-0.5, -0.1, -1, -0.1, 1, 0, 0.1);
$userTypeLike[] = array(1, 0, 0.8, 0.4, -0.3, 1, 0);
$userTypeLike[] = array(1, -0.1, -0, 1, -0.1, 0.4, 0.3);
$userTypeLike[] = array(-0.1, -0.1, -0.4, 1, 0.4, 0.7, 0.8);

// 영화의 연령별 산술치, 주제별 선호도 수치
// 전처리 되어 있는 경우로 가정함
$movie = array();
$movie[] = array(-0.2, 0.9);
$movie[] = array(-0.8, -1);
$movie[] = array(-1, 1);
$movie[] = array(-0.9, 1);
$movie[] = array(1, 0.9);
$movie[] = array(0, 0.3);
$movie[] = array(-0.1, 0.6);

function machineLearning($ageLike, $typeLike, $movieDatas) {
    $result = array();
    foreach($ageLike as $key => $value) {
        $tempArray = array();
        foreach($movieDatas as $keyMovie => $valueMovie) {
            $tempArray[] = $ageLike[$key][0] * $movieDatas[$keyMovie][0] + $typeLike[$key][0] * $movieDatas[$keyMovie][1];
            if($tempArray[$keyMovie] <= 0) {
                $tempArray[$keyMovie] = 0;
            }
            echo $tempArray[$keyMovie].' ';
        }
        echo '<br>';
        $result[] = $tempArray;
    }

    return $result;
}

$resMachineLearning = machineLearning($userAgeLike, $userTypeLike, $movie);

$clientProspect = array(1, 0);

$prospectAll = array();
$tempProspectUser = 10;
$tempUserKey = 0;
foreach($userTypeLike as $key => $value) {
    $tempSqrt = sqrt(($userAgeLike[$key][0] - $clientProspect[0]) * ($userAgeLike[$key][0] - $clientProspect[0]) + ($userTypeLike[$key][0] - $clientProspect[1]) * ($userTypeLike[$key][0] - $clientProspect[1]));
    if ($tempSqrt < $tempProspectUser) {
        $tempProspectUser = $tempSqrt;
        $tempUserKey = $key;
    }
}
$tData = '';
foreach ($resMachineLearning[$tempUserKey] as $value) {
    $tData .= (string) $value;
    $tData .= ' ';
}
echo '유저 번호:'.$tempUserKey.' 유저 영화별 유샤도 :'.$tData;

?>
