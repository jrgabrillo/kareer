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
            $log = $Functions->log($data[1],$data[0],"Deleted skill",'Delete');
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

    if (isset($_GET['do-updateInfo'])){/**/
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
            $log = $Functions->log($data,$data,"Deleted Academic",'Delete');
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
            $log = $Functions->log($data,$data,"Deleted Career",'Delete');
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-updateAcademic'])){/**/
        $data = $_POST['data'];
        
        $id = $data[0];
        $applicant_id = $Functions->escape($data[1]);
        $yearLevel = $Functions->escape($data[2]);
        $school = $Functions->escape($data[3]);
        $degree = $Functions->escape($data[4]);
        $units = $Functions->escape($data[5]);
        $fromYear = $Functions->escape($data[6]);
        $toYear = $Functions->escape($data[7]);

        $q = $Functions->PDO("UPDATE  tbl_acadinfo  SET  level = {$yearLevel}, schoolattended = {$school}, degree = {$degree}, highestlevel = {$units}, yearenrolled = {$fromYear}, yeargraduated = {$toYear} WHERE id = '{$id}'");
        if($q->execute()){
            $log = $Functions->log($data[1],$id,"Updated Academic",'Update');
            echo 1;
        }
        else{
            $Data = $q->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-updateCareer'])){/**/
        $data = $_POST['data'];
        $id = $data[0];
        $applicant_id = $Functions->escape($data[1]);
        $agency = $Functions->escape($data[2]);
        $position = $Functions->escape($data[3]);
        $salary = $Functions->escape($data[4]);
        $appointment = $Functions->escape($data[5]);
        $fromDate = $Functions->escape($data[6]);
        $toDate = $Functions->escape($data[7]);

        $name = $data[1][0]['value'];
        $q = $Functions->PDO("UPDATE tbl_career SET applicant_id = {$applicant_id}, agency = {$agency}, position_title = {$position}, monthly_salary = {$salary}, appointment_status = {$appointment}, inclusive_fromdate = {$fromDate}, inclusive_todate = {$toDate} WHERE id = '{$id}';");
        if($q->execute()){
            $log = $Functions->log($data[1],$id,"Updated Career",'Update');
            echo 1;
        }
        else{
            $Data = $q->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['get-jobs'])){/**/
        $data = $_POST['data'];
        $s  = "";
        $min = $data[1];
        // print_r($data);
        $count = ($data[2] == "all")?$Functions->PDO("SELECT COUNT(*) FROM tbl_logs"):$data[2];
        $q_skill = $Functions->PDO("SELECT skill FROM tbl_skills WHERE applicant_id = '{$data[0]}' ORDER BY `date`");
        foreach ($q_skill as $i => $v){$s .= "{$v[0]} ";}
        $q_s = $Functions->PDO("SELECT a.id, a.employer_id, a.business_id, a.short_description, a.vacancy_date, a.job_title, a.skills, a.salary_range, b.company_name, b.image, b.address, b.email, MATCH(a.skills) AGAINST ('{$s}' IN BOOLEAN MODE) * 10 as rel_skills, MATCH(a.job_title) AGAINST ('{$s}' IN BOOLEAN MODE) * 5 as rel_job FROM tbl_vacancies a LEFT JOIN tbl_business b ON b.id = a.business_id WHERE a.status = 1 AND MATCH (a.skills, a.job_title) AGAINST ('{$s}' IN BOOLEAN MODE) ORDER BY (rel_skills)+(rel_job) DESC LIMIT {$min},{$count};");

        print_r(json_encode($q_s));
    }

    if (isset($_GET['get-jobsByID'])){/**/
        $data = $_POST['data'];
        $s  = "";
        $min = $data[1];
        $count = ($data[2] == "all")?$Functions->PDO("SELECT COUNT(*) FROM tbl_logs"):$data[2];
        $q_skill = $Functions->PDO("SELECT skill FROM tbl_skills WHERE applicant_id = '{$data[0]}' ORDER BY `date`");
        foreach ($q_skill as $i => $v){$s .= "{$v[0]} ";}
        $q_s = $Functions->PDO("SELECT a.id, a.employer_id, a.business_id, a.short_description, a.description, a.vacancy_date, a.job_title, a.skills, a.salary_range, b.company_name, b.image, b.address, b.email, MATCH(a.skills) AGAINST ('{$s}' IN BOOLEAN MODE) * 10 as rel_skills, MATCH(a.job_title) AGAINST ('{$s}' IN BOOLEAN MODE) * 5 as rel_job FROM tbl_vacancies a LEFT JOIN tbl_business b ON b.id = a.business_id WHERE a.status = 1 AND MATCH (a.skills, a.job_title) AGAINST ('{$s}' IN BOOLEAN MODE) ORDER BY (rel_skills)+(rel_job) DESC LIMIT {$min},{$count};");
        print_r(json_encode($q_s));
    }
?> 