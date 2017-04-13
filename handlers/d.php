<?php
    // display high scores

    // Configuration
    $hostname = "localhost";
    $username = "root";
    $password = "root";
    $database = "smorrow";
    /*
    $username = "sean_classsample";
    $password = "Forrester308";
    $database = "sean_classsample";
    */
 
    try {
        $dbh = new PDO("mysql:host=". $hostname .";dbname=". $database, $username, $password);
    } catch(PDOException $e) {
        echo "<h1>An error has occurred.</h1><pre>", $e->getMessage() ,"</pre>";
    }
 
    // only query the top five highscores
    $sth = $dbh->query("SELECT * FROM rhombushighscores ORDER BY score DESC, id DESC LIMIT 5");
    $sth->setFetchMode(PDO::FETCH_ASSOC);
 
    $result = $sth->fetchAll();

    $output = "";
    if(count($result) > 0) {
        foreach($result as $r) {
            $output .= $r["name"] . "," . $r["score"] . ",";
        }
        // strip off last ,
        $output = rtrim($output, ",");
    }
    echo $output;
?>