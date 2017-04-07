<?php 
    // add high score

    // Configuration
    $hostname = "localhost";
    $username = "root";
    $password = "root";
    $database = "smorrow";
    $port = 8888;

    $link = mysqli_init();
    $success = mysqli_real_connect(
        $link, $hostname, $username, $password, $database, $port
    );

    // check connection
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    // Strings must be escaped to prevent SQL injection attack. 
    $name = mysqli_real_escape_string($link, strrev(base64_decode($_GET["z"])));
    $score = mysqli_real_escape_string($link, strrev(base64_decode($_GET["a"])));
    $hash = $_GET["s"]; 

    //$name = mysqli_real_escape_string($link, $_GET["z"]); 
    //$score = mysqli_real_escape_string($link, $_GET["a"]); 
    //$hash = $_GET["s"]; 

    // Change this value to match the value stored in the client javascript below 
    $secretKey="2f6d0f62dbedda976330f88add53a7e7";

    $real_hash = md5($name . $score . $secretKey); 
    if($real_hash == $hash) { 
        // Send variables for the MySQL database class. 
        //$query = "insert into rhombushighscores values (NULL, '$name', '$score');"; 
        //$result = mysql_query($query) or die("Query failed: " . mysql_error()); 
        // run insert SQL command
        $query="insert into rhombushighscores values (NULL,'" . $name . "','" . $score . "')";
        if ($result != mysqli_query($connection ,$query)) {
            echo "Query failed!";
        }
    } 

    //echo $hash . " VS " . $real_hash . "<br/>";
    //echo $name . " - " . $score;
   
?>