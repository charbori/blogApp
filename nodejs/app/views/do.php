<?php
namespace app\do;
error_reporting(E_ALL);
require_once(__DIR__.'/vendor/autoload.php');

use eftec\bladeone\BladeOne;

$blade = new BladeOne(); // MODE_DEBUG allows to pinpoint troubles.
echo $blade->setView('home.home')    // it sets the view to render
           ->share(array("titleName"=>"testValueName")) // it sets the variables to sends to the view
           ->run(); // it calls /views/hello.blade.php

?>
