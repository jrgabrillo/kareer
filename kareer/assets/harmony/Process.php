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
        $data = $_POST['data']; $flag = 0;
        $password = sha1($data[1]['value']);

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

    /*getters*/
    if(isset($_GET['get-session'])){
        if(isset($_SESSION['kareer7836']))
            print_r(json_encode($_SESSION['kareer7836']));
        else
            print_r(0);
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

    if(isset($_GET['get-employerJobsPosts'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];
            $result = [];
            $Query = $Functions->PDO_SQL("SELECT * FROM tbl_vacancies WHERE employer_id = '{$data}' ORDER BY date DESC");
            foreach ($Query as $key => $value) {
                $Query2 = $Functions->PDO_SQL("SELECT * FROM tbl_application WHERE vacany_id = '{$value[0]}'");
                $result[] = [$value,$Query2];
            }
            print_r(json_encode($result));
        }
        else{
            echo "Hacker";
        }
    }

    if (isset($_GET['get-account'])){
       if(isset($_POST["data"])){
            $session = [$_SESSION['u7836'],$_SESSION['p7836']];

            $query = $Functions->PDO("SELECT * FROM tbl_employer  WHERE email = '{$session[0]}' AND password = '{$session[1]}'");
            if($query[0][0]==0){
                $query = $Functions->PDO("SELECT * FROM tbl_admin  WHERE username = '{$session[0]}' AND password = '{$session[1]}'");
                if($query[0][0]==0){
                    echo 0;
                }
                else if($query[0][0]==1){
                    print_r(json_encode($query));
                }
            }
            else if($query[0][0]==1){
                print_r(json_encode($query));
            }
        }
        else{
            echo "Hacker";
        }
    }

    if(isset($_GET['get-jobByID'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];
            $result = [];
            $Query = $Functions->PDO_SQL("SELECT * FROM tbl_vacancies WHERE id = '{$data}'");
            $Query2 = $Functions->PDO_SQL("SELECT * FROM tbl_application WHERE vacany_id = '{$Query[0][0]}'");
            $Query3 = $Functions->PDO_SQL("SELECT * FROM tbl_employer WHERE id = '{$Query[0][1]}'");
            $result[] = [$Query[0],$Query2,$Query3[0]];
            print_r(json_encode($result));
        }
        else{
            echo "Hacker";
        }
    }

    /* setters*/
    if (isset($_GET['set-postJob'])) {
        $data = $_POST['data'];
        $id = $Functions->PDO_IDGenerator('tbl_vacancies','id');
        $date = $Functions->PDO_DateAndTime();
        $data = $_POST['data'];

        $employer_id = $data[0];
        $job_title = $Functions->escape($data[1][0]['value']);
        $vacancy_date = $Functions->escape($data[1][1]['value']);
        $skills = $Functions->escape($data[1][2]['value']);
        $description = $Functions->escape($data[1][3]['value']);

        $query = $Functions->PDO("INSERT INTO tbl_vacancies(id,employer_id,description,vacancy_date,job_title,skills,date,status) VALUES('{$id}',{$employer_id},{$description},{$vacancy_date},{$job_title},{$skills},'{$date}',1)");
        if($query->execute())
            echo 1;
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

/*
    if(isset($_GET['get-jobsPosts'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];
            $result = [];
            $Query = $Functions->PDO("SELECT * FROM tbl_vacancies ORDER BY date DESC");
            foreach ($Query as $key => $value) {
                $Query2 = $Functions->PDO("SELECT * FROM tbl_application WHERE vacany_id = '{$value[0]}'");
                $result[] = [$value,$Query2];
            }
            print_r(json_encode($result));
        }
        else{
            echo "Hacker";
        }
    }
*/
?> 
