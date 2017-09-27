<?php
session_start();
include("Functions.php");
$Functions = new DatabaseClasses;
    if(isset($_GET['validateEmail'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT count(*) FROM tbl_applicant WHERE email = '{$data}'");
        print_r($query[0][0]);
    }
    
    if (isset($_GET['do-logIn'])){
        $data = $_POST["data"];
        $email = $data[0]['value'];
        $password = $data[1]['value'];

        $query = $Functions->PDO("SELECT * FROM tbl_applicant WHERE email = '{$email}'");
        if($Functions->testPassword($password,$query[0][4])){
            $_SESSION["kareer7836"] = [$email,$password,'applicant'];
            echo 1;
        }
        else{
            echo 0;
        }
    }

    if (isset($_GET['do-signUp'])){
        $data = $_POST['data'];
        $email = $Functions->escape($data[2]['value']);
        $firstname = $Functions->escape($data[0]['value']);
        $lastname = $Functions->escape($data[1]['value']);
        $password = $Functions->password($data[3]['value']);

        $query = $Functions->PDO("SELECT count(*) FROM tbl_applicant WHERE email = {$email}");
        if($query[0][0]<=0){
            $date = $Functions->PDO_DateAndTime();
            $id = $Functions->PDO_IDGenerate('tbl_applicant','id');
            $query = $Functions->PDO("INSERT INTO tbl_applicant(id,description,resume,email,password) VALUES('{$id}','','',{$email},'{$password}'); INSERT INTO tbl_personalinfo(id, family_name, given_name, middle_name, gender, date_of_birth, place_of_birth, permanent_address, citizenship, height, weight, mother_name, father_name, picture, date) VALUES ('{$id}',{$firstname},{$lastname},'','','','','','','','','','','avatar.png','{$date}')");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo 2;
        }

    }

    if (isset($_GET['do-academic-info'])){
        $data = $_POST['data'];
        $id = $Functions->PDO_IDGenerate('tbl_acadinfo','id');
        $level = $data[0]['value'];
        $sattended = $data[1]['value'];
        $degree = $data[2]['value'];
        $pattended = $data[3]['value'];
        $hlevel = $data[4]['value'];
        $ygraduated = $data[5]['value'];
        $aid = $data[6]['value'];

        $query = $Functions->PDO("INSERT INTO tbl_acadinfo(id,level,schoolattended,degree,periodofattendance,highestlevel,yeargraduated,applicant_id) VALUES('{$id}','{$level}','{$sattended}','{$degree}','{$pattended}','{$hlevel}','{$ygraduated}','{$aid}')");;
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-career-info'])){
        $data = $_POST['data'];
        // print_r($data);
        $id = $Functions->PDO_IDGenerate('tbl_career','id');
        $aid = $data[0]['value'];
        $idates = $data[1]['value'];
        $ptitle = $data[2]['value'];
        $agency = $data[3]['value'];
        $msalary = $data[4]['value'];
        $astatus = $data[5]['value'];
        $gservice = $data[6]['value'];
        $date = $data[6]['value'];

        $query = $Functions->PDO("INSERT INTO tbl_career(id,applicant_id,inclusive_dates,position_title,agency,monthly_salary,appointment_status,govt_service,date) VALUES('{$id}','{$aid}','{$idates}','{$ptitle}','{$agency}','{$msalary}','{$astatus}','{$gservice}','$date')");;
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

?> 
