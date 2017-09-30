<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}

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
            $queryApplicant = $Functions->PDO("SELECT * FROM tbl_applicant RIGHT JOIN tbl_personalinfo ON tbl_applicant.id = tbl_personalinfo.id WHERE tbl_applicant.id = '{$query[0][0]}' ");
            print_r(json_encode($queryApplicant));
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
            $id = $Functions->PDO_IDGenerator('tbl_applicant','id');
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

    if (isset($_GET['do-academic'])){
        $data = $_POST['data'];

        $id = $Functions->PDO_IDGenerator('tbl_acadinfo','id');
        $date = $Functions->PDO_DateAndTime();
        $yearLevel = $Functions->escape($data[1][0]['value']);
        $school = $Functions->escape($data[1][1]['value']);
        $degree = $Functions->escape($data[1][2]['value']);
        $units = $Functions->escape($data[1][3]['value']);
        $periodofattendance = $Functions->escape($data[1][4]['value']." : ".$data[1][5]['value']);
        $yearGraduated = $Functions->escape($data[1][5]['value']);

        $query = $Functions->PDO("INSERT INTO tbl_acadinfo(id,applicant_id,level,schoolattended,degree,periodofattendance,highestlevel,yeargraduated,date) VALUES('{$id}','{$data[0]}',{$yearLevel},{$school},{$degree},{$periodofattendance},{$units},{$yearGraduated},'{$date}')");
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-career'])){
        $data = $_POST['data'];
        $id = $Functions->PDO_IDGenerator('tbl_career','id');
        $date = $Functions->PDO_DateAndTime();
        $fromDate = $Functions->escape($data[1][0]['value']);
        $toDate = $Functions->escape($data[1][1]['value']);
        $position = $Functions->escape($data[1][2]['value']);
        $agency = $Functions->escape($data[1][3]['value']);
        $salary = $Functions->escape($data[1][4]['value']);
        $appointment = $Functions->escape($data[1][5]['value']);

        $query = $Functions->PDO("INSERT INTO tbl_career(id,applicant_id,inclusive_fromdate,inclusive_todate,position_title,agency,monthly_salary,appointment_status,govt_service,date) VALUES('{$id}','{$data[0]}',{$fromDate},{$toDate},{$position},{$agency},{$salary},{$appointment},'','$date')");;
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-apply'])){
        $data = $_POST['data'];
        $date = $Functions->PDO_DateAndTime();
        $id = $Functions->PDO_IDGenerator('tbl_application','id');
        $query = $Functions->PDO("INSERT INTO tbl_application(id,vacancy_id,applicant_id,date,status) VALUES('{$id}','{$data[0]}','{$data[1]}','{$date}','1');");
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-searchJob'])){
        $data = $_POST['data'];
        $temp = [];
        $query = $Functions->PDO("SELECT * FROM tbl_vacancies WHERE status = 1 AND salary_range BETWEEN '{$data[1][0]}' AND '{$data[1][1]}'");
        foreach ($query as $key => $value) {
            $queryEmployer = $Functions->PDO("SELECT * FROM tbl_employer WHERE id ='{$value[1]}' AND  address LIKE '%{$data[0]['value']}%'");
            if(count($queryEmployer)){
                $skills = (is_array(json_decode($value[5])))?$value[5]:($value[5]=="[null]")?:json_encode([$value[5]]);
                $temp[] = [$value[0],$queryEmployer[0][5],$queryEmployer[0][3],$value[4],$value[2],$skills];                
            }
        }
        print_r(json_encode($temp));
    }

    if (isset($_GET['do-bookmark'])){
        $data = $_POST['data'];
        $id = $Functions->PDO_IDGenerator('tbl_bookmark','id');
        $date = $Functions->PDO_DateAndTime();
        $query = $Functions->PDO("INSERT INTO tbl_bookmark(id,vacancy_id,applicant_id,date,status) VALUES('{$id}','{$data[0]}','{$data[1]}','{$date}','1');");
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['get-academic'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_acadinfo WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-career'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_career WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-applicant'])){
        $data = $_POST['data'];
        $queryApplicant = $Functions->PDO("SELECT * FROM tbl_applicant RIGHT JOIN tbl_personalinfo ON tbl_applicant.id = tbl_personalinfo.id WHERE tbl_applicant.id = '{$data}' ");
        print_r(json_encode($queryApplicant[0]));
    }    

    if (isset($_GET['get-jobs'])){
        $data = $_POST['data'];
        $temp = [];
        $query = $Functions->PDO("SELECT * FROM tbl_vacancies WHERE status = 1 AND id NOT IN (SELECT vacancy_id FROM tbl_application WHERE applicant_id = '{$data}')");
        foreach ($query as $key => $value) {
            $queryEmployer = $Functions->PDO("SELECT * FROM tbl_employer WHERE id ='{$value[1]}'");
            $skills = (is_array(json_decode($value[5])))?$value[5]:($value[5]=="[null]")?:json_encode([$value[5]]);
            $temp[] = [$value[0],$queryEmployer[0][5],$queryEmployer[0][3],$value[4],$value[2],$skills];
        }
        print_r(json_encode($temp));
    }

    if (isset($_GET['get-applcation'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT id FROM tbl_application WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-bookmarks'])){
        $data = $_POST['data'];
        $temp = [];
        $query = $Functions->PDO("SELECT id FROM tbl_bookmark WHERE applicant_id = '{$data}'");
        foreach ($query as $key => $value) {
            $temp[] = $value[0];
        }
        print_r(json_encode($temp));
    }
//0977 1417 410

?> 
