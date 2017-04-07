<?php
    // check for high score placement
    
    // Configuration
    $hostname = "localhost";
    $username = "root";
    $password = "root";
    $database = "smorrow";

    // Strings must be escaped to prevent SQL injection attack. 
    $score = $_GET["score"];
    //$score = 7;

    try {
        $dbh = new PDO("mysql:host=". $hostname .";dbname=". $database, $username, $password);
    } catch(PDOException $e) {
        echo "<h1>An error has occurred.</h1><pre>", $e->getMessage() ,"</pre>";
    }

    // only query the top five highscores
    $sth = $dbh->query("SELECT * FROM rhombushighscores ORDER BY score DESC, id DESC LIMIT 5");
    $sth->setFetchMode(PDO::FETCH_ASSOC);
 
    $result = $sth->fetchAll();


    // by default score is not qualified
    $qualified = false;

    $output = "";
    if(count($result) > 0) {
        foreach($result as $r) {
            if ($score >= $r["score"]) {
                $qualified = true;
                break;
            }
        }
    }

    // response back to game
    if ($qualified) echo "t";
    else echo "f";
?>