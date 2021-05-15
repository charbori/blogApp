<?php
$test_data = array("title" => array("fruit" => "melon"),
                    "main" => array("cloth" => "red",
                                    "cloth2" => "blue"),
                    "foot" => "shoes",
                    "db" => array("redis" => "object_db",
                                "mysql" => "rdbms",
                                "docker" => "yup"));
$data_key = key(($test_data));
$data = current($test_data);
echo $data_key."\r\n";
var_dump($data);

function search_dfs($needle, $haystack, $first_key) {

    $visited = array();
    $stack = array();
    $visited[$first_key] = true;
    $stack[] = $first_key;
    $answer = array();

    while (!empty($stack)) {
        $value = array_pop($stack);
        $child_arr = $test_data[$value];

        foreach ($child_arr as $key => $value) {
            if (!$visited[$key]) {
                $stack[] = $key;
            }
            if ($value == $needle) {
                $answer[] = $key;
            }
        }
        $visited[key($child_arr)] = true;
    }

    return $answer;
}

var_dump(search_dfs("main", $test_data, $data_key));

?>
