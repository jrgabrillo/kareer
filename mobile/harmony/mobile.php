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

    if(isset($_GET['send-mail'])){
        $data = $_POST['data'];
        $receiver = $data[0];
        $subject =  $data[1];
        $message = $data[2];

        $result = $Functions->mailTemplate("{$receiver}, rufo.gabrillo@gmail.com, info@rnrdigitalconsultancy.com",$subject,$message);
        print_r($result);
    }
    
    if (isset($_GET['do-logIn'])){
        $data = $_POST["data"];
        $email = $data[0]['value'];
        $password = $data[1]['value'];

        $query = $Functions->PDO("SELECT * FROM tbl_applicant WHERE email = '{$email}' AND status = '1'");
        if($query[0][5] == '1'){
            if($Functions->testPassword($password,$query[0][4])){
                $queryApplicant = $Functions->PDO("SELECT * FROM tbl_applicant RIGHT JOIN tbl_personalinfo ON tbl_applicant.id = tbl_personalinfo.id WHERE tbl_applicant.id = '{$query[0][0]}' ");
                print_r(json_encode($queryApplicant));
            }
            else{
                echo 0;
            }
        }
    }

    if (isset($_GET['do-logInFB'])){
        $data = $_POST['data'];
        $email = $data[3];
        $firstname = $data[1];
        $lastname = $data[2];
        $account_id = $data[0];
        // $gender = $data[4];

        $query = $Functions->PDO("SELECT * FROM tbl_applicant WHERE email = '{$email}'");;
        $queryApplicant = $Functions->PDO("SELECT * FROM tbl_applicant RIGHT JOIN tbl_personalinfo ON tbl_applicant.id = tbl_personalinfo.id WHERE tbl_applicant.id = '{$query[0][0]}' ");
            print_r(json_encode($queryApplicant));       
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
            $query = $Functions->PDO("INSERT INTO tbl_applicant(id,description,resume,email,password,status) VALUES('{$id}','','',{$email},'{$password}','1'); INSERT INTO tbl_personalinfo(id, given_name, family_name, middle_name, gender, age, date_of_birth, place_of_birth, permanent_address, citizenship, height, weight, mother_name, father_name, language, religion, mother_occupation, father_occupation, picture, date) VALUES('{$id}',{$firstname},{$lastname},'','','','','','','','','','','','','','','','profile.png','{$date}')");
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

    if (isset($_GET['do-signUpFB'])){
        $data = $_POST['data'];
        $email = $Functions->escape($data[3]);
        $firstname = $Functions->escape($data[1]);
        $lastname = $Functions->escape($data[2]);
        $account_id = $Functions->escape($data[0]);
        // $link = $Functions->escape($data[4]);
        $gender = $Functions->escape($data[4]);
        $query = $Functions->PDO("SELECT count(*) FROM tbl_applicant WHERE email = {$email}");
        if($query[0][0]<=0){
            $date = $Functions->PDO_DateAndTime();
            // $id = $Functions->PDO_IDGenerator('tbl_applicant','id').'FB';
            $query = $Functions->PDO("INSERT INTO tbl_applicant(id,description,resume,email,password,status) VALUES({$account_id},'','',{$email},'','2'); INSERT INTO tbl_personalinfo(id, given_name, family_name, middle_name, gender, age, date_of_birth, place_of_birth, permanent_address, citizenship, height, weight, mother_name, father_name, language, religion, mother_occupation, father_occupation, picture, date) VALUES({$account_id},{$firstname},{$lastname},'',{$gender},'','','','','','','','','','','','','','profile.png','{$date}')");
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
        $year = substr(json_encode($data[1][5]['value']),1,4);
        $yearGraduated = $Functions->escape($year);
        // $yearGraduated = $Functions->escape($data[1][5]['value']);
        
        if(($yearLevel == 'Elementary') || ($yearLevel == 'High School')){
            $query = $Functions->PDO("INSERT INTO tbl_acadinfo(id,applicant_id,level,schoolattended,degree,periodofattendance,highestlevel,yeargraduated,date) VALUES('{$id}','{$data[0]}',{$yearLevel},{$school},'',{$periodofattendance},'',{$yearGraduated},'{$date}')");
        }
        else{
            $query = $Functions->PDO("INSERT INTO tbl_acadinfo(id,applicant_id,level,schoolattended,degree,periodofattendance,highestlevel,yeargraduated,date) VALUES('{$id}','{$data[0]}',{$yearLevel},{$school},{$degree},{$periodofattendance},{$units},{$yearGraduated},'{$date}')");
        }
        
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-skill'])){
        $data = $_POST['data'];
        
        $id = $Functions->PDO_IDGenerator('tbl_skills','id');
        $date = $Functions->PDO_DateAndTime();
        $skill = $Functions->escape($data[1][0]['value']);
        $level = $Functions->escape($data[1][1]['value']);

        $query = $Functions->PDO("INSERT INTO tbl_skills(id,applicant_id,skill,level,date) VALUES('{$id}','{$data[0]}',{$skill},{$level},'{$date}')");
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-language'])){
        $data = $_POST['data'];
        
        $id = $Functions->PDO_IDGenerator('tbl_language','id');
        $date = $Functions->PDO_DateAndTime();
        $language = $Functions->escape($data[1][0]['value']);
        $level = $Functions->escape($data[1][1]['value']);

        $query = $Functions->PDO("INSERT INTO tbl_language(id,applicant_id,language,level,date) VALUES('{$id}','{$data[0]}',{$language},{$level},'{$date}')");
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-references'])){
        $data = $_POST['data'];
        
        $id = $Functions->PDO_IDGenerator('tbl_references','id');
        $date = $Functions->PDO_DateAndTime();
        $name = $Functions->escape($data[1][0]['value']);
        $relationship = $Functions->escape($data[1][1]['value']);
        $profession = $Functions->escape($data[1][2]['value']);
        $email = $Functions->escape($data[1][3]['value']);
        $phone = $Functions->escape($data[1][4]['value']);
        $address = $Functions->escape($data[1][5]['value']);
        // $address2 = $Functions->escape($data[1][6]['value']);

        $query = $Functions->PDO("INSERT INTO tbl_references(id,applicant_id,name,relationship,profession,email,phone,address,date) VALUES('{$id}','{$data[0]}',{$name},{$relationship},{$profession},{$email},{$phone},{$address},'{$date}')");

        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-seminar'])){
        $data = $_POST['data'];
        
        $id = $Functions->PDO_IDGenerator('tbl_seminars','id');
        $event = $Functions->escape($data[1][0]['value']);
        $location = $Functions->escape($data[1][1]['value']);
        $date = $Functions->escape($data[1][2]['value']);

        $query = $Functions->PDO("INSERT INTO tbl_seminars(id,applicant_id,event,location,date) VALUES('{$id}','{$data[0]}',{$event},{$location},{$date})");

        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-deleteAcad'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("DELETE FROM tbl_acadinfo WHERE id = '{$data}';");
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
        $gov = $Functions->escape($data[1][6]['value']);
        $query = $Functions->PDO("INSERT INTO tbl_career(id,applicant_id,inclusive_fromdate,inclusive_todate,position_title,agency,monthly_salary,appointment_status,govt_service,date) VALUES('{$id}','{$data[0]}',{$fromDate},{$toDate},{$position},{$agency},{$salary},{$appointment},{$gov},'$date')");
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-deleteCareer'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("DELETE FROM tbl_career WHERE id = '{$data}';");
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
        $query = $Functions->PDO("SELECT * FROM tbl_vacancies WHERE status = 1 AND salary_range BETWEEN '{$data[1][0]}' AND '{$data[1][1]}' AND skills IN (SELECT skills FROM tbl_vacancies WHERE skills LIKE '%{$data[2]['value']}%') ");

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

    if (isset($_GET['do-accountResume'])){
        $data = $_POST['data'];
        $id = $data[0];
        $query = $Functions->PDO("UPDATE tbl_personalinfo Set given_name = '{$data[1][0]}',family_name = '{$data[1][2]}',middle_name = '{$data[1][1]}',gender = '{$data[1][3]}',age = '{$data[1][4]}',date_of_birth = '{$data[1][5]}',place_of_birth = '{$data[1][6]}', permanent_address = '{$data[1][7]}',citizenship = '{$data[1][8]}',height = '{$data[1][9]}',weight = '{$data[1][10]}',mother_name = '{$data[1][11]}',father_name = '{$data[1][12]}',language = '{$data[1][13]}',religion = '{$data[1][14]}',mother_occupation = '{$data[1][15]}',father_occupation = '{$data[1][16]}' WHERE id = '{$id}'");
        // print_r($query);     
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-update'])){
        $data = $_POST['data'];
        $id = $data[0];
        if($data[1][0]['name'] == "field_Email"){
            $email = $Functions->escape($data[1][0]['value']);
            $query = $Functions->PDO("UPDATE tbl_applicant SET email = {$email} WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_GivenName"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET given_name = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_MiddleName"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET middle_name = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_LastName"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET family_name = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_Gender"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET gender = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_Age"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET age = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_DateOfBirth"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET date_of_birth = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_PlaceOfBirth"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET place_of_birth = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_PermanentAddress"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET permanent_address = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_Citizenship"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET citizenship = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_Weight"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET weight = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_Height"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET height = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_MotherName"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET mother_name = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_FatherName"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET father_name = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_Language"){
            $language = $Functions->PDO_IDGenerator('tbl_language','id');
            $date = $Functions->PDO_DateAndTime();
            $level = $data[1][1]['value'];
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET language = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                $queryLanguage = $Functions->PDO("INSERT INTO tbl_language(id,applicant_id,language,level,date) VALUES('{$language}','{$id}','{$name}','{$level}','{$date}')");
                if($queryLanguage->execute()){
                    echo 1;
                }
                else{
                    $Data = $queryLanguage->errorInfo();
                    print_r($Data);
                }
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_Religion"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET religion = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_Mother_Occupation"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET mother_occupation = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_Father_Occupation"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_personalinfo SET father_occupation = '{$name}' WHERE id = '{$id}';");
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
    }

    if (isset($_GET['do-updateCareer'])){
        $data = $_POST['data'];
        $id = $data[0];
        if($data[1][0]['name'] == "field_dateFirst"){
            $from = $data[1][0]['value'];
            $to = $data[1][1]['value'];
            $query = $Functions->PDO("UPDATE tbl_career SET inclusive_fromdate = '{$from}', inclusive_todate = '{$to}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_position"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_career SET position_title = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_agency"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_career SET agency = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_salary"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_career SET monthly_salary = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_appointment"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_career SET appointment_status = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_govt_service"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_career SET govt_service = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
    }

    if (isset($_GET['do-updateAcad'])){
        $data = $_POST['data'];
        $id = $data[0];
       if($data[1][0]['name'] == "field_yearLevel"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_acadinfo SET level = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_school"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_acadinfo SET schoolattended = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_degree"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_acadinfo SET degree = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_units"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_acadinfo SET highestlevel = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_dateFirst"){
            $name = $data[1][0]['value']." : ".$data[1][1]['value'];
            $query = $Functions->PDO("UPDATE tbl_acadinfo SET periodofattendance = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
    }

    if(isset($_GET['do-update-image'])){
        $data = $_POST['data'];
        $user = $data[0];
        $picture = $Functions->saveImage($user,$data[1]);
        $query = $Functions->PDO("UPDATE tbl_personalinfo SET picture = '{$picture}' WHERE id = '{$user}';");
        // print_r($picture);
        // print_r($query);
        if($query->execute()){
            echo 1;
        }
        else{
            // unlink('../img/profile/'.$picture);
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }
    
    if (isset($_GET['do-resume'])){
        $data = $_POST['data'];
        print_r($data);
        $id = $Functions->PDO_IDGenerator('tbl_resume','id');
        $fname = 'resume.pdf';
        $file = fopen('../img/'.$fname, 'w+');
        fwrite($file, $data[1]);
        fclose($file);

        $query = $Functions->PDO("INSERT INTO tbl_resume(id,applicant_id,resume) VALUES('{$id}','{$data[0]}','{$fname}')");
        // print_r($data[1]);
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['get-academicAll'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_acadinfo WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }
    
    if (isset($_GET['get-academic'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_acadinfo WHERE id = '{$data}';");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-skills'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_skills WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-references'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_references WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-language'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_language WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-seminar'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_seminars WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }
    
    if (isset($_GET['get-career'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_career WHERE id = '{$data}';");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-careerAll'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_career WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-applicant'])){
        $data = $_POST['data'];

        $queryApplicant = $Functions->PDO("SELECT * FROM tbl_applicant RIGHT JOIN tbl_personalinfo ON tbl_applicant.id = tbl_personalinfo.id WHERE tbl_applicant.id = '{$data}' ");
            print_r(json_encode($queryApplicant[0]));
    }

    if (isset($_GET['get-FacebookUser'])){
        $data = $_POST['data'];

        $queryApplicant = $Functions->PDO("SELECT * FROM tbl_fbaccount RIGHT JOIN tbl_personalinfo ON tbl_applicant.id = tbl_personalinfo.id WHERE tbl_fbaccount.id = '{$data}' ");
            print_r(json_encode($queryApplicant[0]));
    }    

    if (isset($_GET['get-FacebookUser'])){
        $data = $_POST['data'];
        $queryApplicant = $Functions->PDO("SELECT * FROM tbl_fbaccount RIGHT JOIN tbl_personalinfo ON tbl_applicant.id = tbl_personalinfo.id WHERE tbl_applicant.id = '{$data}' ");
        print_r(json_encode($queryApplicant[0]));
    }

    if (isset($_GET['get-jobs'])){
        $data = $_POST['data'];
        $temp = [];
        $jobs = [];
        $queryskill = $Functions->PDO("SELECT skill FROM tbl_skills WHERE applicant_id = '{$data}'");
        foreach ($queryskill as $key => $value) {
            $query = $Functions->PDO("SELECT * FROM tbl_vacancies WHERE status = 1 AND id NOT IN (SELECT vacancy_id FROM tbl_application WHERE applicant_id = '{$data}') AND skills IN (SELECT skills FROM tbl_vacancies WHERE skills LIKE '%{$value[0]}%')");
            foreach ($query as $key => $value) {
                $jobs [] = $value;
            }
        }
        $filtered = array_unique($jobs,SORT_REGULAR);
        foreach ($filtered as $key => $value) {
            $queryEmployer = $Functions->PDO("SELECT * FROM tbl_employer WHERE id ='{$value[1]}'");
            $skills = (is_array(json_decode($value[5])))?$value[5]:($value[5]=="[null]")?:json_encode([$value[5]]);
            $temp[] = [$value[0],$queryEmployer[0][5],$queryEmployer[0][3],$value[4],$value[2],$skills];
        }
        print_r(json_encode($temp));
    }

    if (isset($_GET['get-Bjobs'])){
        $data = $_POST['data'];
        $temp = [];
        $query = $Functions->PDO("SELECT * FROM tbl_vacancies WHERE status = 1 AND id IN (SELECT vacancy_id FROM tbl_bookmark WHERE applicant_id = '{$data}')");
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
        $query = $Functions->PDO("SELECT vacancy_id FROM tbl_bookmark WHERE applicant_id = '{$data}'");
        foreach ($query as $key => $value) {
            $temp[] = $value[0];
        }
        print_r(json_encode($temp));
    }
//0977 1417 410

?> 