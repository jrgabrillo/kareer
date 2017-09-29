<?php
session_start();
include("Functions.php");
$Functions = new DatabaseClasses;

 if (isset($_GET['get-Employer'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];
            $QueryEmployer = $Functions->PDO_SQL("SELECT * FROM tbl_employer WHERE id = '{$data}'");
            print_r(json_encode($QueryEmployer));
        }
        else{
            echo "Hacker";
        }
    }
?> 