<?php
session_start();
include("Functions.php");
$Functions = new DatabaseClasses;

    /*sessions*/
    if (isset($_GET['kill-session'])){
       if(isset($_POST["data"])){
            print_r(session_destroy());
            //echo "0";
        }
        else{
            echo "Hacker";
        }
    }
    if (isset($_GET['get-session'])){
       if(isset($_POST["data"])){
            if((isset($_SESSION['u7836']))&&(isset($_SESSION['p7836']))){
                $session = [$_SESSION['u7836'],$_SESSION['p7836']];
                print_r(json_encode($_SESSION));
            }
            else{
                echo 0;
            }
        }
        else{
            echo "Hacker";
        }
    }

    /*login*/
    if (isset($_GET['get-accessLevel'])){
        if(isset($_POST['data'])){
            $data = $_POST['data'];
            $check = $_SESSION['x7836'];
            if(sha1(1)==$check){
                echo "applicant";
            }
            else if(sha1(2)==$check){
                echo "employer";
            }
            else if(sha1(3)==$check){
                echo "admin";
            }
            else if(sha1(4)==$check){
                echo "student";
            }
            else{
                echo "Hacker";
            }
        }
        else{
            echo "Hacker";
        }
    }
    if (isset($_GET['get-login'])){
        if(isset($_POST['data'])){
            $data = $_POST['data']; $flag = 0;

            $email = $data[0]['value'];
            $password = sha1($data[1]['value']);
            $_password = $data[1]['value'];

            $QueryApplicant = $Functions->PDO_SQL("SELECT * FROM tbl_applicant  WHERE email = '{$email}' AND password = '{$password}'");
            $QueryEmployer = $Functions->PDO_SQL("SELECT * FROM tbl_employer  WHERE email = '{$email}' AND password = '{$password}'");
            $QueryAdmin = $Functions->PDO_SQL("SELECT * FROM tbl_user  WHERE username = '{$email}' AND password = '{$password}'");
            $QueryStudent = $Functions->PDO_SQL("SELECT * FROM tbl_student  WHERE student_id = '{$email}' AND password = '{$_password}'");

            if(count($QueryApplicant)==1){
                $flag = 1;
            }
            else if(count($QueryEmployer)==1){
                $flag = 2;
            }
            else if(count($QueryAdmin)==1){
                $flag = 3;
            }
            else if(count($QueryStudent)==1){
                $flag = 4;
            }
            else{
                echo 0;
            }

            if($flag>0){
                echo $flag;
                $_SESSION['u7836'] = $email;
                $_SESSION['p7836'] = $password;
                $_SESSION['r7836'] = sha1("r");
                $_SESSION['o7836'] = sha1("o");
                $_SESSION['f7836'] = sha1("f");
                $_SESSION['x7836'] = sha1($flag);
                $_SESSION['g7836'] = sha1("g");
                $_SESSION['i7836'] = sha1("i");
                $_SESSION['a7836'] = $_password;
            }
        }
        else{
            echo "Hacker";
        }
    }
    if (isset($_GET['get-account'])){
       if(isset($_POST["data"])){
            $session = [$_SESSION['u7836'],$_SESSION['p7836']];

            $email = $session[0];
            $password = $session[1];
            $_password = $_SESSION['a7836'];

            $QueryApplicant = $Functions->PDO_SQL("SELECT * FROM tbl_applicant  WHERE email = '{$email}' AND password = '{$password}'");
            $QueryEmployer = $Functions->PDO_SQL("SELECT * FROM tbl_employer  WHERE email = '{$email}' AND password = '{$password}'");
            $QueryAdmin = $Functions->PDO_SQL("SELECT * FROM tbl_user  WHERE username = '{$email}' AND password = '{$password}'");
            $QueryStudent = $Functions->PDO_SQL("SELECT * FROM tbl_student  WHERE student_id = '{$email}' AND password = '{$_password}'");

            if(count($QueryApplicant)==1){
                print_r(json_encode($QueryApplicant));
            }
            else if(count($QueryEmployer)==1){
                print_r(json_encode($QueryEmployer));
            }
            else if(count($QueryAdmin)==1){
                print_r(json_encode($QueryAdmin));
            }
            else if(count($QueryStudent)==1){
                print_r(json_encode($QueryStudent));
            }
            else{
                echo "Access Denied";
            }        
        }
        else{
            echo "Hacker";
        }
    }

    /*registration*/
    if (isset($_GET['do-registerApplicant'])) {
        if(isset($_POST['data'])){
            $id = $Functions->PDO_IDGenerator('tbl_applicant','id');
            $date = $Functions->PDO_DateAndTime();
            $data = $_POST['data'];

            $lname = $data[0]['value'];
            $fname = $data[1]['value'];
            $mname = $data[2]['value'];
            $address = $data[3]['value'];
            $contactno = $data[4]['value'];
            $email = $data[5]['value'];
            $password = sha1($data[6]['value']);

            $Query2 = $Functions->PDO_SQL("SELECT * FROM tbl_employer WHERE email = '{$email}'");
            $Query1 = $Functions->PDO_SQL("SELECT * FROM tbl_applicant WHERE email = '{$email}'");
            if((count($Query1)>0) || (count($Query2)>0)){
                echo 0;
            }
            else{
                $QueryString = "INSERT INTO tbl_applicant(id,lname,fname,mname,address,contactno,email,password,image) VALU    ES('{$id}','{$lname}','{$fname}','{$mname}','{$address}','{$contactno}','{$email}','{$password}','profile avatar.jpg')";
                $Query = $Functions->PDO_SQLQuery($QueryString);
                if($Query->execute())
                    echo 1;
                else{
                    $Data = $Query->errorInfo();
                    print_r($Data);
                }
            }
        }
        else{
            echo "Hacker";
        }
    }
    if (isset($_GET['do-registerEmployer'])) {
        if(isset($_POST['data'])){
            $id = $Functions->PDO_IDGenerator('tbl_employer','id');
            $date = $Functions->PDO_DateAndTime();
            $data = $_POST['data'];

            $cname = $data[0][0]['value'];
            $email = $data[0][1]['value'];
            $password = $data[1];
            // $password = sha1($data[1]);

            $Query2 = $Functions->PDO_SQL("SELECT * FROM tbl_employer WHERE email = '{$email}'");
            $Query1 = $Functions->PDO_SQL("SELECT * FROM tbl_applicant WHERE email = '{$email}'");
            if((count($Query1)>0) || (count($Query2)>0)){
                echo 0;
            }
            else{
                $QueryString = "INSERT INTO tbl_employer(id,company_name,email,password,image,status) VALUES('{$id}','{$cname}','{$email}','{$password}','profile avatar.jpg','1')";
                $Query = $Functions->PDO_SQLQuery($QueryString);
                if($Query->execute())
                    echo 1;
                else{
                    $Data = $Query->errorInfo();
                    print_r($Data);
                }
            }
        }
        else{
            echo "Hacker";
        }
    }
    if (isset($_GET['do-registerStudent'])) {
        if(isset($_POST['data'])){
            $id = $Functions->PDO_IDGenerator('tbl_student','id');
            $date = $Functions->PDO_DateAndTime();
            $data = $_POST['data'];

            $array = [$data[0][0]['value'],
            $data[0][1]['value'],
            $data[0][2]['value'],
            $data[0][3]['value'],
            $data[0][4]['value'],
            $data[0][5]['value'],
            $data[0][6]['value'],
            $data[0][7]['value'],
            $data[0][8]['value'],
            $data[0][9]['value'],
            $data[0][10]['value'],
            $data[0][11]['value'],
            $data[0][12]['value'],
            $data[0][13]['value'],
            $data[0][14]['value'],
            $data[0][15]['value'],
            $data[0][16]['value'],
            $data[0][17]['value']];

            $array = json_encode($array);
            $studentID = $data[0][18]['value'];
            $password = $data[1];

            $Query1 = $Functions->PDO_SQL("SELECT * FROM tbl_student WHERE student_id = '{$studentID}'");
            if((count($Query1)>0)){
                echo 0;
            }
            else{
                $QueryString = "INSERT INTO tbl_student(id,student_id,password,details,picture) VALUES('{$id}','{$studentID}','{$password}','{$array}','profile avatar.jpg')";
                $Query = $Functions->PDO_SQLQuery($QueryString);
                if($Query->execute())
                    echo 1;
                else{
                    $Data = $Query->errorInfo();
                    print_r($Data);
                }
            }
        }
        else{
            echo "Hacker";
        }
    }

    /*administrator*/
    if (isset($_GET['get-allEmployer'])){
        if(isset($_POST["data"])){
            $QueryEmployer = $Functions->PDO_SQL("SELECT * FROM tbl_employer");
            print_r(json_encode($QueryEmployer));
        }
        else{
            echo "Hacker";
        }
    }
    if (isset($_GET['set-acceptPendingEmployer'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];

            $Query = $Functions->PDO_SQLQuery("UPDATE tbl_employer SET status = '1' WHERE id = '{$data}'");
            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }    
    if (isset($_GET['set-declinePendingEmployer'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];

            $Query = $Functions->PDO_SQLQuery("UPDATE tbl_employer SET status = '2' WHERE id = '{$data}'");
            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }    
    if (isset($_GET['get-allApplicant'])){
        if(isset($_POST["data"])){
            $QueryEmployer = $Functions->PDO_SQL("SELECT * FROM tbl_applicant");
            print_r(json_encode($QueryEmployer));
        }
        else{
            echo "Hacker";
        }
    }
    if (isset($_GET['get-allStudent'])){
        if(isset($_POST["data"])){
            $QueryEmployer = $Functions->PDO_SQL("SELECT * FROM  tbl_student");
            print_r(json_encode($QueryEmployer));
        }
        else{
            echo "Hacker";
        }
    }

    /*employer*/
    if (isset($_GET['do-postJob'])) {
        if(isset($_POST['data'])){
            $id = $Functions->PDO_IDGenerator('tbl_vacancies','id');
            $date = $Functions->PDO_DateAndTime();
            $data = $_POST['data'];

            $employer_id = $data[0];
            $description = $data[1][2]['value'];
            $vacancy_date = $data[1][1]['value'];
            $job_title = $data[1][0]['value'];

            if(count($data[1])==4)
                $skills = json_encode($data[1][3]);
            else
                $skills = json_encode([]);

            $QueryString = "INSERT INTO tbl_vacancies(id,employer_id,description,vacancy_date,job_title,skills,date) VALUES('{$id}','{$employer_id}','{$description}','{$vacancy_date}','{$job_title}','{$skills}','{$date}')";
            $Query = $Functions->PDO_SQLQuery($QueryString);
            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }

    if (isset($_GET['do-completeData'])) {
        if(isset($_POST['data'])){
            $id = $Functions->PDO_IDGenerator('tbl_vacancies','id');
            $date = $Functions->PDO_DateAndTime();
            $data = $_POST['data'];

            $employer_id = $data[1];
            $lastname = $data[0][0]['value'];
            $firstname = $data[0][1]['value'];
            $description = $data[0][2]['value'];

            $Query = $Functions->PDO_SQLQuery("UPDATE tbl_employer SET lname = '{$lastname}', fname = '{$firstname}', description = '{$description}' WHERE id = '{$employer_id}'");
            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }

    if(isset($_GET['update-image'])){
        if(isset($_POST['data'])){
            $data = $_POST['data'];
            $file = $data[0].'-'.time().'.apr';

            $handle = fopen('../img/'.$file, 'w+');

            fwrite($handle, $data[2]);
            fclose($handle);

            if($data[1] == 'employer'){
                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_employer SET image = '{$file}' WHERE id = '{$data[0]}'");
            }
            else if($data[1] == 'applicant'){
                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_employer SET image = '{$file}' WHERE id = '{$data[0]}'");
            }
            else if($data[1] == 'student'){
                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_student SET picture = '{$file}' WHERE id = '{$data[0]}'");
            }
            else{
                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_user SET image = '{$file}' WHERE id = '{$data[0]}'");
            }

            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }

    if(isset($_GET['get-jobs'])){
        if(isset($_POST["data"])){
            $QueryEmployer = $Functions->PDO_SQL("SELECT * FROM tbl_vacancies");
            print_r(json_encode($QueryEmployer));
        }
        else{
            echo "Hacker";
        }
    }

    if(isset($_GET['send-mail'])){
        $data = $_POST['data'];

        $message = "<div style='text-align: center;width: 500px;position: relative;margin: 0 auto;border-radius: 3px;background: #4485F4;color: #fff;padding: 30px;border-top: yellow solid 10px;top: 50px;box-shadow: 0px 0px 50px #ccc;margin-top: 50px;margin-bottom: 50px;'><b><font size='6'>Welcome to PSU Job Portal</font></b><br/><br/><br/>Thank you for registering to PSU Job Portal. Here is your&nbsp;system generated password: {$data[1]}&nbsp;<br/><br/><br/>Please change your password as soon as you get in to your account. <br/>Log in here: <a href='http://psujobs.apparato.net/' style='color: #fff;'>http://psujobs.apparato.net/</a> &nbsp;<br/><br/><br/>Thanks and God bless.</div> ";
        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: PSU Jobs <apparato.net>' . "\r\n";
        $subject = 'PSU Job Portal - Applicant Account Registration';

        $result = mail($data[0],$subject,$message,$headers);
    }

    if(isset($_GET['do-updateData'])){
        if(isset($_POST['data'])){
            $date = $Functions->PDO_DateAndTime();
            $data = $_POST['data'];
            if($data[0] == 'admin'){
                if($data[2] == 'Given Name'){
                    $field = 'fname';
                    $val = $data[3];
                }
                else if($data[2] == 'Family Name'){
                    $field = 'lname';
                    $val = $data[3];
                }
                else if($data[2] == 'Username'){
                    $field = 'username';
                    $val = $data[3];
                    $_SESSION['u7836'] = $val;
                }
                else{
                    $field = 'password';
                    $val = sha1($data[3]);
                    $_SESSION['p7836'] = $val;
                }
                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_user SET {$field} = '{$val}' WHERE id = '{$data[1]}'");
                if($Query->execute()){
                    echo 1;
                }
                else{
                    $Data = $Query->errorInfo();
                    print_r($Data);
                }
            }
            else if($data[0] == 'employer'){
                if($data[2] == 'Company'){
                    $field = 'company_name';
                    $val = $data[3];
                }
                else if($data[2] == 'Description'){
                    $field = 'description';
                    $val = $data[3];
                }
                else if($data[2] == 'DTI'){
                    $field = 'dti';
                    $val = $data[3];
                }
                else if($data[2] == 'BIR'){
                    $field = 'bir';
                    $val = $data[3];
                }
                else if($data[2] == 'Given Name'){
                    $field = 'fname';
                    $val = $data[3];
                }
                else if($data[2] == 'Family Name'){
                    $field = 'lname';
                    $val = $data[3];
                }
                else if($data[2] == 'Address'){
                    $field = 'address';
                    $val = $data[3];
                }
                else if($data[2] == 'Contact number'){
                    $field = 'contactno';
                    $val = $data[3];
                }
                else if($data[2] == 'email'){
                    $field = 'username';
                    $val = $data[3];
                    $_SESSION['u7836'] = $val;
                }
                else{
                    $field = 'password';
                    $val = sha1($data[3]);
                    $_SESSION['p7836'] = $val;
                }

                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_employer SET {$field} = '{$val}' WHERE id = '{$data[1]}'");
                if($Query->execute()){
                    echo 1;
                }
                else{
                    $Data = $Query->errorInfo();
                    print_r($Data);
                }
            }
            else if($data[0] == 'student'){
                if($data[2] == 'resume'){
                    $field = 'resume';
                    $val = json_encode([$date,$data[3]]);
                }
                else if($data[2] == 'New Password'){
                    $field = 'password';
                    $val = $data[3];
                    $_SESSION['p7836'] = $val;
                }

                $Query = $Functions->PDO_SQLQuery("UPDATE tbl_student SET {$field} = '{$val}' WHERE id = '{$data[1]}'");
                if($Query->execute()){
                    echo 1;
                }
                else{
                    $Data = $Query->errorInfo();
                    print_r($Data);
                }
            }
        }
        else{
            echo "Hacker";
        }
    }

    if(isset($_GET['do-getAllJobsPosts'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];
            $result = [];
            $Query = $Functions->PDO_SQL("SELECT * FROM tbl_vacancies ORDER BY date DESC");
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

    if(isset($_GET['do-getJobsPosts'])){
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

    if(isset($_GET['do-getJob'])){
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

    if(isset($_GET['do-searchJobsPosts'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];
            $keywords = "";
            $result = [];

            foreach ($data[1] as $key => $value) {
                $keywords .= "skills LIKE '%{$value}%'";
                if(($key+1) != count($data[1]))
                    $keywords .= " or ";
            }

            $Query = $Functions->PDO_SQL("SELECT * FROM tbl_vacancies WHERE job_title LIKE '%{$data[0]}%' OR {$keywords} ORDER BY date DESC");
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

    if(isset($_GET['do-savejob'])){
        if(isset($_POST["data"])){
            $id = $Functions->PDO_IDGenerator('tbl_application','id');
            $date = $Functions->PDO_DateAndTime();
            $data = $_POST['data'];
            $applicant = json_encode([$data[0][0],$data[0][1],$data[0][3],json_decode($data[0][2])]);

            $QueryString = "INSERT INTO  tbl_application(id,vacany_id,applicant,description,date) VALUES('{$id}','{$data[1]}','{$applicant}','{$data[2]}','{$date}')";
            $Query = $Functions->PDO_SQLQuery($QueryString);
            if($Query->execute())
                echo 1;
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }

    if(isset($_GET['do-getApplications'])){
        if(isset($_POST["data"])){
            $data = $_POST['data'];
            $result = [];
            $Query = $Functions->PDO_SQL("SELECT * FROM tbl_application ORDER BY date DESC");
            foreach ($Query as $key => $value) {
                $applicant = json_decode($value[2]);
                if($data == $applicant[0]){
                    $QueryVacancy = $Functions->PDO_SQL("SELECT * FROM tbl_vacancies WHERE id = '{$value[1]}'");
                    $QueryEmployer = $Functions->PDO_SQL("SELECT * FROM tbl_employer WHERE id = '{$QueryVacancy[0][1]}'");
                    $result[] = [$value,$QueryEmployer[0],$QueryVacancy[0]];
                }
            }
            print_r(json_encode($result));
        }
        else{
            echo "Hacker";
        }
    }

    if(isset($_GET['do-uploadResume'])){
        header('Content-Type:application/json');

        $uploaded = [];
        $succeeded = [];
        $failed = [];
        $allowed = ['docx','pdf'];

        if(!empty($_FILES['file'])){
            $name = $_FILES['file']['name'];
            if($_FILES['file']['error'] == 0){
                $temp = $_FILES['file']['tmp_name'];
                $ext = explode('.',$name);
                $ext = strtolower(end($ext));
                $file = sha1($temp).'-'.time().'.'.$ext;
                if(in_array($ext, $allowed) && move_uploaded_file($temp,'../files/'.$file)){
                    $succeeded[] = array(
                        'name' => $name,
                        'file' => $file,
                    );
                }
                else{
                    $failed[] = array(
                        'name' => $name,
                    );
                }
            }
            else{
                $failed[] = array(
                    'name' => $name,
                );
            }

            if(!empty($_POST['ajax'])){
                echo json_encode(array(
                    'succeeded' => $succeeded,
                    'failed' => $failed
                ));
            }
        }
        else{
            $failed[] = array(
                "Unable to upload the file."
            );
            echo json_encode(array(
                'succeeded' => $succeeded,
                'failed' => $failed
            ));
        }
    }

    if(isset($_GET['do-decline'])){
        if(isset($_POST['data'])){
            $data = $_POST['data'];

            $Query = $Functions->PDO_SQLQuery("UPDATE tbl_application SET status = '0' WHERE id = '{$data}'");
            if($Query->execute()){
                echo 1;
            }
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }

    if(isset($_GET['do-inviteInterview'])){
        if(isset($_POST['data'])){
            $data = $_POST['data'];
            $date = $Functions->PDO_DateAndTime();
            $val = json_encode([$date,$data[1]]);
            $Query = $Functions->PDO_SQLQuery("UPDATE tbl_application SET status = '{$val}' WHERE id = '{$data[0]}'");
            if($Query->execute()){
                echo 1;
            }
            else{
                $Data = $Query->errorInfo();
                print_r($Data);
            }
        }
        else{
            echo "Hacker";
        }
    }

?> 
