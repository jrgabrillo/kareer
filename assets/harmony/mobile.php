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
    if(isset($_GET['send-mail'])){
        $data = $_POST['data'];
        $receiver = $data[0];
        $subject =  $data[1];
        $message = $data[2];

        $result = $Functions->mailTemplate("{$receiver}, rufo.gabrillo@gmail.com, info@rnrdigitalconsultancy.com",$subject,$message);
        print_r($result);
    }
    
    if(isset($_GET['validateEmail'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT count(*) FROM tbl_applicant WHERE email = '{$data}'");
        print_r($query[0][0]);
    }

    if (isset($_GET['do-logIn'])){/**/
        $data = $_POST["data"];
        $email = $Functions->escape($data[0]);
        $password = $data[1];
        $query = $Functions->PDO("SELECT * FROM tbl_applicant WHERE email = {$email}");
        if(count($query)>0){
            if($Functions->testPassword($password,$query[0][3]) && ($query[0][6] == 1)){
                $_SESSION["kareer"] = [$query[0][2],$query[0][0]];
                print_r(json_encode(["Active","applicant"]));
            }
            else{
                print_r(json_encode(["Failed",2]));
            }
        }
        else{
            print_r(json_encode(["Failed",2]));
        }
    }

    if (isset($_GET['do-logInAuth'])){/**/
        $data = $_POST['data'];
        $email = $Functions->escape($data[0]);
        $auth_id = $Functions->escape($data[1]);
        $field = ($data[2] == 'kareer-oauth')?'id':'auth_id';
        $query = $Functions->PDO("SELECT * FROM tbl_applicant WHERE email = {$email} AND {$field} = {$auth_id}");
        if(count($query)>0){
            $_SESSION["kareer"] = [$query[0][2],$query[0][0]];
            print_r(json_encode(["Active","applicant"]));
        }
        else{
            print_r(json_encode(["Failed",2]));
        }
    }

    if (isset($_GET['get-account'])){/**/
        $data = $_POST['data'];
        $email = $Functions->escape($data[0]);
        $auth_id = $Functions->escape($data[1]);
        $field = ($data[2] == 'kareer-oauth')?'id':'auth_id';
        $query = $Functions->PDO("SELECT * FROM tbl_applicant RIGHT JOIN tbl_personalinfo ON tbl_applicant.id = tbl_personalinfo.id WHERE email = {$email} AND {$field} = {$auth_id}");
        print_r(json_encode($query));
    }

    if (isset($_GET['do-signUp'])){/**/
        $data = $_POST['data'];
        $firstname = $Functions->escape($data[0]);
        $lastname = $Functions->escape($data[1]);
        $email = $Functions->escape($data[2]);
        $password = $Functions->password($data[3]);
        $auth = $Functions->escape($data[4]);
        $auth_id = $Functions->escape($data[5]);
        $picture = ($data[6] == "")? "profile.png" : $Functions->escape($data[6]);

        $date = $Functions->PDO_DateAndTime();
        $id = $Functions->PDO_IDGenerator('tbl_applicant','id');
        $validate = $Functions->PDO("SELECT count(*) FROM tbl_applicant WHERE email = {$email}");

        if($validate[0][0]==0){
            $query = $Functions->PDO("INSERT INTO tbl_applicant(id,email,password,auth_type,auth_id,status) VALUES('{$id}',{$email},'{$password}',{$auth},{$auth_id},'1'); INSERT INTO tbl_personalinfo(id, given_name, family_name,picture, date) VALUES('{$id}',{$firstname},{$lastname},{$picture},'{$date}')");
            if($query->execute()){
                print_r(json_encode(['id'=>$id,'last_name'=>$data[1],'first_name'=>$data[0],'email'=>$data[2],'picture'=>$picture]));
            }
            else{
                echo 0;
            }
        }
        else{
            echo 0;
        }
    }

    if (isset($_GET['do-addSkill'])){/**/
        $data = $_POST['data'];        
        $id = $Functions->PDO_IDGenerator('tbl_skills','id');
        $date = $Functions->PDO_DateAndTime();
        $skill = $Functions->escape($data[3]);
        $level =  1;

        $query = $Functions->PDO("INSERT INTO tbl_skills(id,applicant_id,skill,level,date) VALUES('{$id}','{$data[2]}',{$skill},{$level},'{$date}')");
        if($query->execute()){
            $log = $Functions->log($data[2],$id,"Added {$data[3]}",'Add');
            print_r($id);
        }
        else{
            echo 0;
        }
    }

    if (isset($_GET['do-deleteSkill'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("DELETE FROM tbl_skills WHERE id = '{$data[2]}';");
        if($query->execute()){
            $log = $Functions->log($data[1],$data[2],"Deleted skill",'Delete');
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['get-skills'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT id,skill FROM tbl_skills WHERE applicant_id = '{$data}' ORDER BY level ASC");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-academic'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_acadinfo WHERE applicant_id = '{$data}';");
        print_r(json_encode($query));
    }

    if (isset($_GET['do-addAcademic'])){/**/
        $data = $_POST['data'];
        $id = $Functions->PDO_IDGenerator('tbl_acadinfo','id');
        $date = $Functions->PDO_DateAndTime();

        $applicant_id = $Functions->escape($data[1]);
        $yearLevel = $Functions->escape($data[2]);
        $school = $Functions->escape($data[3]);
        $degree = $Functions->escape($data[4]);
        $units = $Functions->escape($data[5]);
        $fromYear = $Functions->escape($data[6]);
        $toYear = $Functions->escape($data[7]);
        
        $q = $Functions->PDO("INSERT INTO tbl_acadinfo(id,applicant_id,level,schoolattended,degree,yearenrolled,highestlevel,yeargraduated,date) VALUES('{$id}',{$applicant_id},{$yearLevel},{$school},{$degree},{$fromYear},{$units},{$toYear},'{$date}')");
        if($q->execute()){
            $log = $Functions->log($data[1],$id,"Added Academic",'Add');
            print_r($id);
        }
        else{
            echo 0;
        }
    }

    if (isset($_GET['do-addCareer'])){/**/
        $data = $_POST['data'];
        $id = $Functions->PDO_IDGenerator('tbl_career','id');
        $date = $Functions->PDO_DateAndTime();

        $applicant_id = $Functions->escape($data[1]);
        $agency = $Functions->escape($data[2]);
        $position = $Functions->escape($data[3]);
        $salary = $Functions->escape($data[4]);
        $appointment = $Functions->escape($data[5]);
        $fromDate = $Functions->escape($data[6]);
        $toDate = $Functions->escape($data[7]);

        $q = $Functions->PDO("INSERT INTO tbl_career(id,applicant_id,agency,position_title,monthly_salary,appointment_status,inclusive_fromdate,inclusive_todate,date) VALUES('{$id}',{$applicant_id},{$agency},{$position},{$salary},{$appointment},{$fromDate},{$toDate},'$date')");

        if($q->execute()){
            $log = $Functions->log($data[1],$id,"Added Career",'Add');
            print_r($id);
        }
        else{
            echo 0;
        }
    }

    if (isset($_GET['get-career'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_career WHERE applicant_id = '{$data}';");
        print_r(json_encode($query));
    }

    if (isset($_GET['do-deleteAcademic'])){/**/
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

    if (isset($_GET['do-deleteCareer'])){/**/
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

    if (isset($_GET['do-updateAcademic'])){/**/
        $data = $_POST['data'];
        
        $applicant_id = $Functions->escape($data[1]);
        $yearLevel = $Functions->escape($data[2]);
        $school = $Functions->escape($data[3]);
        $degree = $Functions->escape($data[4]);
        $units = $Functions->escape($data[5]);
        $fromYear = $Functions->escape($data[6]);
        $toYear = $Functions->escape($data[7]);
        $id = $data[0];
        $q = $Functions->PDO("UPDATE  tbl_acadinfo  SET  level = {$yearLevel}, schoolattended = {$school}, degree = {$degree}, highestlevel = {$units}, yearenrolled = {$fromYear}, yeargraduated = {$toYear} WHERE id = '{$id}'");
        if($q->execute()){
            echo 1;
        }
        else{
            $Data = $q->errorInfo();
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

    if (isset($_GET['do-deleteSeminar'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("DELETE FROM tbl_seminars WHERE id = '{$data}';");
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-deleteLanguage'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("DELETE FROM tbl_language WHERE id = '{$data}';");
        if($query->execute()){
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-deleteReference'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("DELETE FROM tbl_references WHERE id = '{$data}';");
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

    if (isset($_GET['do-updateInfo'])){
        $data = $_POST['data'];
        $id  = $data[2];
        // print_r($data);

        if($data[1] == "field_fname"){
            $field = $Functions->escape($data[3]);
            $q = $Functions->PDO("UPDATE tbl_personalinfo SET given_name = {$field} WHERE id = '{$id}';");
        }
        else if($data[1] == "field_mname"){
            $field = $Functions->escape($data[3]);
            $q = $Functions->PDO("UPDATE tbl_personalinfo SET middle_name = {$field} WHERE id = '{$id}';");
        }
        else if($data[1] == "field_lname"){
            $field = $Functions->escape($data[3]);
            $q = $Functions->PDO("UPDATE tbl_personalinfo SET family_name = {$field} WHERE id = '{$id}';");
        }
        else if($data[1] == "field_dob"){
            $field = $Functions->escape($data[3]);
            $q = $Functions->PDO("UPDATE tbl_personalinfo SET date_of_birth = {$field} WHERE id = '{$id}';");
        }
        else if($data[1] == "field_address"){
            $field = $Functions->escape($data[3]);
            $q = $Functions->PDO("UPDATE tbl_personalinfo SET permanent_address = {$field} WHERE id = '{$id}';");
        }
        else if($data[1] == "field_number"){
            $field = $Functions->escape($data[3]);
            $q = $Functions->PDO("UPDATE tbl_personalinfo SET phone = {$field} WHERE id = '{$id}';");
        }
        else if($data[1] == "field_bio"){
            $field = $Functions->escape($data[3]);
            $q = $Functions->PDO("UPDATE tbl_applicant SET description = {$field} WHERE id = '{$id}';");
        }
        else if($data[1] == "field_email"){
            $field = $Functions->escape($data[3]);
            $q = $Functions->PDO("UPDATE tbl_applicant SET email = {$field} WHERE id = '{$id}';");
        }
        else if($data[1] == "field_password"){
            $field = $Functions->password($data[3]);
            $q = $Functions->PDO("UPDATE tbl_applicant SET password = '{$field}' WHERE id = '{$id}';");
        }
        else{
            $q = $Functions->PDO("");
        }

        if($q->execute())
            echo 1;
        else{
            $Data = $q->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-updateCareer'])){
        $data = $_POST['data'];
        $id = $data[0];
        if($data[1][0]['name'] == "field_date1"){
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

    if (isset($_GET['do-updateSkill'])){
        $data = $_POST['data'];
        $id = $data[0];
        $level = $data[1][1]['value'];
        $name = $data[1][0]['value'];
        $querySkills = $Functions->PDO("UPDATE tbl_skills SET skill = '{$name}', level ='{$level}' WHERE id = '{$id}';");
        if($querySkills->execute()){
            echo 1;
        }
        else{
            $Data = $querySkills->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-updateLanguage'])){
        $data = $_POST['data'];
        $id = $data[0];
        $level = $data[1][1]['value'];
        $name = $data[1][0]['value'];
        $querySkills = $Functions->PDO("UPDATE tbl_language SET language = '{$name}', level ='{$level}' WHERE id = '{$id}';");
        if($querySkills->execute()){
            echo 1;
        }
        else{
            $Data = $querySkills->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-updateReference'])){
        $data = $_POST['data'];
        $id = $data[0];
       if($data[1][0]['name'] == "field_name"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_references SET name = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_relationship"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_references SET relationship = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_profession"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_references SET profession = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_email"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_references SET email = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_phone"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_references SET phone = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_address"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_references SET address = '{$name}' WHERE id = '{$id}';");
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

    if (isset($_GET['do-updateSeminar'])){
        $data = $_POST['data'];
        $id = $data[0];
       if($data[1][0]['name'] == "field_event"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_seminars SET event = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_location"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_seminars SET location = '{$name}' WHERE id = '{$id}';");
            // print_r($query);
            if($query->execute()){
                echo 1;
            }
            else{
                $Data = $query->errorInfo();
                print_r($Data);
            }
        }
        else if($data[1][0]['name'] == "field_date"){
            $name = $data[1][0]['value'];
            $query = $Functions->PDO("UPDATE tbl_seminars SET date = '{$name}' WHERE id = '{$id}';");
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

    if (isset($_GET['get-referencesAll'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_references WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-reference'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_references WHERE id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-languageALL'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_language WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-language'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_language WHERE id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-seminarAll'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_seminars WHERE applicant_id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-seminar'])){
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_seminars WHERE id = '{$data}'");
        print_r(json_encode($query));
    }
    
    if (isset($_GET['get-applicant'])){
        $data = $_POST['data'];

        print_r($data);
        $queryApplicant = $Functions->PDO("SELECT * FROM tbl_applicant RIGHT JOIN tbl_personalinfo ON tbl_applicant.id = tbl_personalinfo.id WHERE tbl_applicant.id = '{$data}'");
            print_r(json_encode($queryApplicant[0]));
    }

    if (isset($_GET['get-FacebookUser'])){
        $data = $_POST['data'];

        $queryApplicant = $Functions->PDO("SELECT * FROM tbl_fbaccount RIGHT JOIN tbl_personalinfo ON tbl_applicant.id = tbl_personalinfo.id WHERE tbl_fbaccount.id = '{$data}' ");
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
?> 