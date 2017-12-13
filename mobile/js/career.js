'use strict';
    // if (!params) return;
    var self = this;
    // var processor = 'http://192.168.1.20/kareer/assets/harmony/mobile.php?';
    // var processor = 'http://localhost/kareer/assets/harmony/mobile.php?';
    var processor = 'http://localhost/kareer/mobile/harmony/mobile.php?';
    // var processor = 'http://kareerserver.rnrdigitalconsultancy.com/assets/harmony/mobile.php?';
    var directory = '/';
    var $$ = Dom7;
    var view = app.addView('.view-main');

var career = {
        ini:function(){
            var applicantData = JSON.parse(localStorage.getItem('applicant'));
            var list = career.getAll(applicantData[0][0]);
            $$("a[data-cmd='add-career']").on('click',function(){
                career.add(applicantData[0][0]);
            });
            career.show(list);
            career.delete(list);

            $("a.index").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
                account.controller(data);
            });

            app.onPageInit('index',function(page){
                account.controller();
            });
        },
        add:function(id){
            // console.log("othan");
            $("a.career").addClass('hidden');
            $("a.add").addClass('hidden');
            $("div.list").addClass('hidden');
            $("div.add").removeClass('hidden');
            $("a.add").addClass('hidden');
            $("a.goback").removeClass('hidden');
            // $("a.cancel").addClass('hidden');
            $("div.toolbar").addClass('hidden');    

            
            $('#field_govt_service').material_select('close');

            // $("#field_dateFirst").on('change',function(){
                var date1 = $("#field_dateFirst").val();
                console.log(date1);
                // dates(date1);
            // });

            let dates = function(date1){
                console.log(date1);
            }


            $("a.cancel").on('click',function(){
                $("div.list").removeClass('hidden');
                $("div.add").addClass('hidden');
                $("a.career").removeClass('hidden');
                $("a.add").removeClass('hidden');
                $("div.toolbar").removeClass('hidden');
                $("div.empty").addClass('hidden');
                // $("a.save").addClass('hidden');
                // $("a.cancel").addClass('hidden');
            });

            $("a.goback").on('click',function(){
                $("div.list").removeClass('hidden');
                $("div.add").addClass('hidden');
                $("a.add").removeClass('hidden');
                $("a.goback").addClass('hidden');
                $("a.home").removeClass('hidden');
                // $("a.index").removeClass('hidden');
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            $("a.home").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });
            app.onPageInit('builderCareer',function(page){
                career.ini();
            });
            app.onPageInit('career',function(page){
                career.ini();
            });


            $("#form_career").validate({
                rules: {
                    field_dateFirst: {required: true, maxlength:20},
                    field_dateLast: {required: true, maxlength:20},
                    field_position: {required: true, maxlength:100},
                    field_agency: {required: true, maxlength:100},
                    field_salary: {required: true, maxlength:5},
                    field_appointment: {required: true, maxlength:100},
                    field_govt_service: {required: true, maxlength:100},
                },
                errorElement : 'div',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if(placement){
                        $(placement).append(error)
                    } 
                    else{
                        error.insertAfter(element);
                    }
                },
                submitHandler: function (form) {
                    var _form = $(form).serializeArray();
                    console.log(_form);
                    // var data = system.ajax(processor+'do-career',[id,_form]);
                    // data.done(function(data){
                    //     console.log(data);
                    //     if(data != 0){
                    //         $$("input").val("");
                    //         system.notification("Kareer","Career Added.",false,2000,true,false,function(){
                    //             career.ini();
                    //         });
                    //     }
                    //     else{
                    //         system.notification("Kareer","Failed.",false,3000,true,false,false);
                    //     }
                    // })
                }
            });
        },
        getAll:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'get-career',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        get:function(id){
            var $data = "";
            var jobs = system.ajax(processor+'do-editCareer',id);
            jobs.done(function(data){
                $data = data;
            });
            return JSON.parse($data);
        },
        show:function(list){
            var content = "";       
            $.each(list,function(i,v){
                content += "<li class='collection-item row'>"+
                            "   <div class='chip' style = 'width: 10%;'>"+
                            "   <div class='chip-media bg-blue' style = 'width: 50px !important; height: 50px !important; font-size: 24px;'>"+v[4][0]+"</div>"+
                            "   </div>"+
                            "   <div class = 'col 33'>"+
                            "   <div class='title color-teal' ><strong class ='color-black'>"+v[4]+"</strong></div>"+
                            "   <div class ='color-teal' ><small class ='color-black'>"+v[2]+" - "+v[3]+"</small></div>"+
                            "   </div>"+
                            "   <a class='col 33 right btn btn-floating btn-flat waves-effect waves-teal waves-light' href='#' data-cmd='edit' data-node='"+v[0]+"'><i class='icon small f7-icons color-gray'>chevron_right</i></a>"+
                            "</li>";
                $("a.career").removeClass('disabled');
                $("div.empty").addClass('hidden');

            });

            $$("#display_career").html("<ul class='collection'>"+content+"</ul");
            // $$("a[data-cmd='edit']").on('click',function(){
            //     var data = $(this).data();
            //     var id = data.node;
            //     var c = career.get(id);
            //     var store = JSON.parse(localStorage.getItem('f7form-form_career'));
            //     var careerData = $.map(store, function(value, index) {
            //         return [value];
            //     });
            //     console.log(c);
            //     console.log(store);
            //     console.log(careerData);
            //     career.edit(c,careerData);
                
            // });
            $("a.career").on('click',function(){
                var data = $(this).data('load');
                view.router.loadPage("pages/admin/"+data+".html");
            });

            app.onPageInit('builderAcademic',function(page){
                academic.ini();
            });

        },
        delete:function(data){
            $("a[data-cmd='delete']").on('click',function(){
                var data = $(this).data();
                var id = data.node;
                var content =   "        <ul>"+
                                "            <li>"+
                                "                <h5 class = 'center'>Are you sure?"+
                                "                </h5>"+
                                "            </li>"+
                                "            <li>"+
                                "                <a href='#' class='close-popover btn waves-effect waves-teal waves-light btn btn-flat grey-text white'>Cancel</a>"+
                                "                <a data-cmd='proceed' class='waves-effect waves-teal waves-light btn btn-flat grey-text white'>Yes</a>"+
                                "            </li>"+
                                "        </ul>";
                $("#deletePopover").html(content);
                $("a[data-cmd='proceed']").on('click',function(){
                    var acad = system.ajax(processor+'do-deleteCareer',id);
                    acad.done(function(data){
                        console.log(acad);
                            if(data != 0){
                                system.notification("Kareer","Success. Please wait.",false,2000,true,false,function(){
                                    app.closeModal('.popover-delete', true);
                                    app.closeModal('.popup career', true);
                                    // $("a.career").addClass('disabled');
                                    career.ini();
                                });

                            }
                            else{
                                system.notification("Kareer","Failed.",false,3000,true,false,false);
                            }
                    });
                });
            });
        },
        edit:function(c,careerData){
            // console.log(c);
            var initial = c;
            var current = careerData;
            var storedData = app.formStoreData('form_career',{
                    'field_dateFirst' : c[0][2],
                    'field_dateLast' : c[0][3],
                    'field_position' : c[0][4],
                    'field_agency' : c[0][5],
                    'field_salary' : c[0][6],
                    'field_appointment' : c[0][7],
                    'field_govt_service' : c[0][8]
            }); 
            $("div.toolbar").addClass('hidden');
            $("a.career").addClass('hidden');
            $("a.add").addClass('hidden');
            $("a.save").removeClass('hidden');
            $("a.cancel").removeClass('hidden');
            $("div.list").addClass('hidden');
            $("div.edit").removeClass('hidden');
            $("div.input-field").addClass('not-empty-state');
            $("input.form-control").addClass('not-empty-state');
            $("label").addClass('active');

            $("a.cancel").on('click',function(){

                $("div.edit").addClass('hidden');
                $("div.add").addClass('hidden');
                $("a.save").addClass('hidden');
                $("a.cancel").addClass('hidden');                
                $("a.career").removeClass('hidden');
                $("a.add").removeClass('hidden');
                $("div.list").removeClass('hidden');
                $("div.toolbar").removeClass('hidden');
                var list = career.getAll(c[0][1]);
                career.show(list);
                // localStorage.removeItem('f7form-form_career','');

                // // if(storedData){
                // console.log(storedData);
                // // }
            });

            $("a.save").on('click',function(){              
                var storedData = app.formGetData('form_career');
                if(storedData){
                // console.log(storedData);
                }
            });
        }
    }