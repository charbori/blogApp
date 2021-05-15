<?php
error_reporting(E_ALL);

function similarityFunc($user, $objectUser) {
    $resultUser = array();

    foreach($user as $userArr) {
        $a = floatval(0); // data
        $b = floatval(0); // client
        $c = floatval(0);

        foreach ($userArr as $key => $value) {
            $a += $userArr[$key] * $userArr[$key];
            $b += $objectUser[$key] * $objectUser[$key];
            $c += $userArr[$key] * $objectUser[$key];
        }

        $resultUser[] = $c / (sqrt($a) + sqrt($b));
    }
    return $resultUser;
}

function userBased() {
    // category array
    //$baseCate 관심상품, 행동, 특성(나이 등등...) > 유사도 선호도
    // $baseCate a, b, c, d, e ...
    // user view item data array
    // $user 1, 0, 1, 0, 1
    // $result $user by $user similarity 0.1, 0.2, 0.3 ....
    // result
    $baseCate = array('a', 'b', 'c', 'd', 'e', 'f','g');
    $user = array();
    $user[] = array(1,0,1,0,1,0,1);
    $user[] = array(1,1,1,0,0,1,0);
    $user[] = array(1,0,1,1,1,0,1);
    $user[] = array(1,0,0,0,1,1,1);
    $user[] = array(0,0,1,1,0,1,0);
    $user[] = array(1,0,0,0,1,1,0);
    $user[] = array(1,0,1,1,0,0,1);
    $user[] = array(0,0,1,1,1,1,0);
    $user[] = array(1,0,0,0,1,1,1);
    $user[] = array(0,0,1,1,0,1,1);

    $objectUser = array(0,0,0,0,1,1,1);

    $resultArr = array();
    $resultArr = similarityFunc($user, $objectUser);

    foreach($resultArr as $value) {
        echo $value.'<br>';
    }
}

userBased();

?>
