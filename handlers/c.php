<?php
    // check for high score placement
    include "i.php";

    $score = strrev(base64_decode($_GET["v"]));
    //$score = $_GET["v"];
    //echo "test: " . $score;

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

    // if score is greater or equal to any score in database (of top 5)
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