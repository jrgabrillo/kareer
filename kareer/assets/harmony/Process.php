<?php
session_start();
include("Functions.php");
$Functions = new DatabaseClasses;

    if (isset($_GET['kill-session'])){
        print_r(session_destroy());
    }

    if(isset($_GET['chkConnection'])){
        print_r($function->chkConnection());
    }

    /*login*/
    if (isset($_GET['login'])){
        // session_destroy();
        $data = $_POST['data']; $flag = 0;
        $password = sha1($data[1]['value']);

        $query = $Functions->PDO("SELECT COUNT(*) FROM tbl_applicant WHERE email = '{$data[0]['value']}' AND password = '{$password}'");
        if($query[0][0]==0){
            $query = $Functions->PDO("SELECT COUNT(*) FROM tbl_employer  WHERE email = '{$data[0]['value']}' AND password = '{$password}'");
            if($query[0][0]==0){
                $query = $Functions->PDO("SELECT COUNT(*) FROM tbl_admin  WHERE username = '{$data[0]['value']}' AND password = '{$password}'");
                if($query[0][0]==0){
                    echo 0;
                }
                else if($query[0][0]==1){
                    $_SESSION["kareer7836"] = [$data[0]['value'],$password,'admin'];
                    echo 1;
                }
            }
            else if($query[0][0]==1){
                $_SESSION["kareer7836"] = [$data[0]['value'],$password,'employer'];
                echo 1;
            }
        }
        else if($query[0][0]==1){
            $_SESSION["kareer7836"] = [$data[0]['value'],$password,'applicant'];
            echo 1;
        }
    }

    /*getters*/
    if(isset($_GET['get-session'])){
        print_r($_SESSION);
        echo "xxx";
        if(isset($_SESSION['kareer7836']))
            print_r($_SESSION['kareer7836']);
        else
            print_r("0");
    }

    if(isset($_GET['get-jobsPosts'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];
            $query = $Functions->PDO("SELECT * FROM tbl_vacancies ORDER BY date DESC LIMIT 0,6");
            print_r(json_encode($query));
        }
        else{
            echo "Hacker";
        }
    }

?> 
