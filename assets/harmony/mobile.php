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
            $q_profile = $Functions->PDO("SELECT aa.id, bb.family_name, bb.given_name, aa.email, bb.picture FROM tbl_applicant aa LEFT JOIN tbl_personalinfo bb ON aa.id = bb.id WHERE aa.email = {$email}");
            if($Functions->testPassword($password,$query[0][3]) && ($query[0][6] == 1)){
                $_SESSION["kareer"] = [$query[0][2],$query[0][0]];
                print_r(json_encode(["Active","applicant",['id'=> $q_profile[0][0], 'last_name'=> $q_profile[0][1], 'first_name'=> $q_profile[0][2], 'email'=> $q_profile[0][3], 'picture'=> $q_profile[0][4]]]));
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
        $field = (($data[2] == 'kareer-oauth') || ($data[2] == ''))?'id':'auth_id';
        $query = $Functions->PDO("SELECT * FROM tbl_applicant RIGHT JOIN tbl_personalinfo ON tbl_applicant.id = tbl_personalinfo.id WHERE email = {$email} AND tbl_applicant.{$field} = {$auth_id}");
        print_r(json_encode($query));
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

    if (isset($_GET['get-career'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT * FROM tbl_career WHERE applicant_id = '{$data}';");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-business'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT company_name, image, address, email, contact_number, description FROM tbl_business WHERE id = '{$data}';");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-businessManagers'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT name, email, picture, position FROM tbl_businessmanagers WHERE business_id = '{$data}'");
        print_r(json_encode($query));
    }

    if (isset($_GET['get-jobs'])){/**/
        $data = $_POST['data'];
        $s  = "";
        $min = $data[1];
        // print_r($data);
        $count = ($data[2] == "all")?$Functions->PDO("SELECT COUNT(*) FROM tbl_logs"):$data[2];
        $q_skill = $Functions->PDO("SELECT skill FROM tbl_skills WHERE applicant_id = '{$data[0]}' ORDER BY `date`");
        foreach ($q_skill as $i => $v){$s .= "{$v[0]} ";}
        $q_s = $Functions->PDO("SELECT a.id, a.employer_id, a.business_id, a.short_description, a.vacancy_date, a.job_title, a.skills, a.salary_min, a.salary_max, b.company_name, b.image, b.address, b.email, MATCH(a.skills) AGAINST ('{$s}' IN BOOLEAN MODE) * 10 as rel_skills, MATCH(a.job_title) AGAINST ('{$s}' IN BOOLEAN MODE) * 5 as rel_job FROM tbl_vacancies a LEFT JOIN tbl_business b ON b.id = a.business_id WHERE a.status = 1 AND MATCH (a.skills, a.job_title) AGAINST ('{$s}' IN BOOLEAN MODE) ORDER BY (rel_skills)+(rel_job) DESC LIMIT {$min},{$count};");

        print_r(json_encode($q_s));
    }

    if (isset($_GET['get-jobs1'])){/**/
        $data = $_POST['data'];
        $s  = "";
        $min = $data[1];
        $count = ($data[2] == "all")?$Functions->PDO("SELECT COUNT(*) FROM tbl_logs"):$data[2];
        $q_skill = $Functions->PDO("SELECT skill FROM tbl_skills WHERE applicant_id = '{$data[0]}' ORDER BY `date`");
        foreach ($q_skill as $i => $v){$s .= "{$v[0]} ";}
        $q_s = $Functions->PDO("SELECT a.id, a.employer_id, a.business_id, a.short_description, a.vacancy_date, a.job_title, a.skills, a.salary_min,a.salary_max, b.company_name, b.image, b.address, b.email, (SELECT FLOOR(RAND()*(10-5+1)+5)) as rel_skills, (SELECT FLOOR(RAND()*(10-5+1)+5)) as rel_job FROM tbl_vacancies a LEFT JOIN tbl_business b ON b.id = a.business_id WHERE a.status = 1 ORDER BY (rel_skills)+(rel_job) DESC LIMIT {$min},{$count};");

        print_r(json_encode($q_s));
    }

    if (isset($_GET['get-jobById'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT a.job_title, a.vacancy_date, a.skills, a.salary_min,a.salary_max, a.description, a.date, b.company_name, b.address, b.image FROM tbl_vacancies a LEFT JOIN tbl_business b ON a.business_id = b.id WHERE a.id = '{$data}'");
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
        $picture = ($data[6] == "")? $Functions->escape("profile.png") : $Functions->escape($data[6]);
        $message = "<div><b><font size='6'>Welcome to Kareer</font></b><br/><br/><br/>Thank you for registering to Kareer. </div> ";
        $date = $Functions->PDO_DateAndTime();
        $id = $Functions->PDO_IDGenerator('tbl_applicant','id');
        $validate = $Functions->PDO("SELECT count(*) FROM tbl_applicant WHERE email = {$email}");

        if($validate[0][0]==0){
            $query = $Functions->PDO("INSERT INTO tbl_applicant(id,email,password,auth_type,auth_id,status) VALUES('{$id}',{$email},'{$password}',{$auth},{$auth_id},'1'); INSERT INTO tbl_personalinfo(id, given_name, family_name,picture, date) VALUES('{$id}',{$firstname},{$lastname},{$picture},'{$date}')");
            if($query->execute()){
                $result = $Functions->mail($email,$subject,$message);
                print_r(json_encode(['id'=>$id,'last_name'=>$data[1],'first_name'=>$data[0],'email'=>$data[2],'picture'=>$picture]));
            }
            else
                echo 0;
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
            $log = $Functions->log($data[2],$id,"Added {$data[3]} skill",'Add');
            print_r($id);
        }
        else{
            echo 0;
        }
    }

    if (isset($_GET['do-deleteSkill'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("DELETE FROM tbl_skills WHERE id = '{$data[3]}';");
        if($query->execute()){
            $log = $Functions->log($data[2],$data[3],"Deleted skill",'Delete');
            echo 1;
        }
        else{
            $Data = $query->errorInfo();
            print_r($Data);
        }
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
        if($q->execute()){
            $log = $Functions->log($id,$id,"Updated {$data[1]}",'Update');
            echo 1;
        }
        else{
            $Data = $q->errorInfo();
            print_r($Data);
        }
    }

    if (isset($_GET['do-action'])){/* updating to read*/
        $data = $_POST['data'];
        if($data[1] == 'notification'){
            $q = $Functions->PDO("UPDATE tbl_logs SET status = '0' WHERE to_account_id = '{$data[0]}' AND header = 'application'");
        }
        else if($data[1] == 'message'){
            $q = $Functions->PDO("");
        }
        else{
            $q = $Functions->PDO("");
        }
        if($q->execute()){
            echo 1;
        }
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

    if (isset($_GET['do-jobApply'])){
        $data = $_POST['data'];
        $date = $Functions->PDO_DateAndTime();
        $id = $Functions->PDO_IDGenerator('tbl_application','id');
        $q = $Functions->PDO("SELECT * FROM tbl_application WHERE vacancy_id = '{$data[0]}' AND applicant_id = '{$data[1]}';");
        if(count($q)<1){
            $query = $Functions->PDO("INSERT INTO tbl_application(id,vacancy_id,applicant_id,date,status) VALUES('{$id}','{$data[0]}','{$data[1]}','{$date}','5');");
            if($query->execute()){
                $log = $Functions->log($data[1],$id,"applied",'Add');
                print_r(1);
            }
            else{
                print_r(0);
            }
        }
        else{
            print_r(2);
        }
    }

    if (isset($_GET['do-jobBookmark'])){
        $data = $_POST['data'];
        $id = $Functions->PDO_IDGenerator('tbl_bookmark','id');
        $date = $Functions->PDO_DateAndTime();

        $q = $Functions->PDO("SELECT * FROM tbl_bookmark WHERE vacancy_id = '{$data[0]}' AND applicant_id = '{$data[1]}';");
        if(count($q)<1){
            $query = $Functions->PDO("INSERT INTO tbl_bookmark(id,vacancy_id,applicant_id,date,status) VALUES('{$id}','{$data[0]}','{$data[1]}','{$date}','1');");
            if($query->execute()){
                $log = $Functions->log($data[1],$id,"bookmarked",'Add');
                print_r(1);
            }
            else{
                print_r(0);
            }
        }
        else{
            print_r(2);
        }
    }

    /*othan ------ purpose: get bookmarks, filter if applicant applied to a bookmarked job */
    if(isset($_GET['get-bookmarks'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT b.id, c.company_name, c.image, b.job_title, b.vacancy_date FROM tbl_bookmark a LEFT JOIN tbl_vacancies b ON a.vacancy_id = b.id LEFT JOIN tbl_business c ON c.id = b.business_id WHERE applicant_id = '{$data}' AND vacancy_id NOT IN (SELECT vacancy_id FROM tbl_application)");
        print_r(json_encode($query));
    }
    if(isset($_GET['do-updateImage'])){/**/
        $data = $_POST['data'];
        // print_r($data);
        $date = new DateTime();
        $time = $date->getTimestamp();
        $q = $Functions->PDO("SELECT * FROM tbl_personalinfo WHERE id = '{$data[0]}'");
        $_filename = ($q[0][12] == "")?"icon.png":$q[0][12];
        if(file_exists("../images/logo/{$_filename}")){
            $filename = "../images/logo/{$_filename}";
        }
        else{
            $_filename = "applicant_{$time}.rnr";
            $filename = "../images/logo/{$_filename}";
        }           
        $picture = $Functions->saveImage($filename,$data[2]);
        $q = $Functions->PDO("UPDATE tbl_personalinfo SET picture = '{$_filename}' WHERE id = '{$data[0]}'");
        if($q->execute()){
            $log = $Functions->log($data[0],$data[0],'update picture','Update');
            echo 1;
        }
        else{
            $Data = $q->errorInfo();
            print_r($Data);
        }
    }
    if (isset($_GET['get-messages'])){/**/
        $data = $_POST['data'];
        $result = [];
        $query = $Functions->PDO("SELECT DISTINCT from_account_id, to_account_id, subject_id FROM tbl_messages WHERE to_account_id = '{$data}'");
        foreach ($query as $key => $value) {
            $queryVacancies = $Functions->PDO("SELECT business_id, job_title FROM tbl_vacancies WHERE id = '{$value[2]}'");
            $queryBusiness = $Functions->PDO("SELECT DISTINCT id,company_name,image FROM tbl_business WHERE id = '{$queryVacancies[0][0]}'");
            $result[] = [$queryBusiness[0],$queryVacancies[0][1]];
        }
        print_r(json_encode($result));
    }
    if (isset($_GET['get-messageConvo'])){/**/
        $data = $_POST['data'];
        $query = $Functions->PDO("SELECT c.image, b.name, a.message, a.date FROM tbl_messages a INNER JOIN tbl_businessmanagers b ON a.from_account_id = b.id INNER JOIN tbl_business c ON c.id = b.business_id INNER JOIN tbl_personalinfo d ON d.id = a.to_account_id WHERE c.id = '{$data}' AND a.header = 'application' ORDER BY date DESC");
        print_r(json_encode($query));
    }
    /*unread and read notification query*/
    if (isset($_GET['get-notifications'])){/**/
        $data = $_POST['data'];
        $q = $Functions->PDO("SELECT b.id, d.company_name, d.image, a.status, a.date, a.header FROM tbl_logs a INNER JOIN tbl_application b ON a.to_account_id = b.id INNER JOIN tbl_vacancies c ON b.vacancy_id = c.id INNER JOIN tbl_business d ON c.business_id = d.id WHERE b.applicant_id = '{$data}' AND a.header ='application' ORDER by a.date ASC");
        // $q = $Functions->PDO("SELECT d.id, d.company_name, d.image, a.status, a.date FROM tbl_logs a INNER JOIN tbl_schedule b ON a.to_account_id = b.id INNER JOIN tbl_vacancies c ON b.subject_id = c.id INNER JOIN tbl_business d ON c.business_id = d.id WHERE b.to_account_id = '{$data}' AND a.remarks = 'schedule'");
        print_r(json_encode($q));        

    }
    if (isset($_GET['get-notificationInfo'])){/**/
        $data = $_POST['data'];
        $q = $Functions->PDO("SELECT d.id, d.company_name, d.image, a.remarks, c.job_title FROM tbl_logs a INNER JOIN tbl_application b ON a.to_account_id = b.id INNER JOIN tbl_vacancies c ON b.vacancy_id = c.id INNER JOIN tbl_business d ON c.business_id = d.id WHERE b.id = '{$data}';");
        print_r(json_encode($q));        

    }
    /**/
?> 