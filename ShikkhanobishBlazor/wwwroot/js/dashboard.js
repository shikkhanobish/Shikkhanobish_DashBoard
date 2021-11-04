'use strict';
const api_baseurl = "https://api.shikkhanobish.com/api/ShikkhanobishLogin/";
const api_teacher_baseurl = "https://api.shikkhanobish.com/api/ShikkhanobishTeacher/"
const cors_fetch_get = { 
    method: 'GET', 
    mode: 'cors'
}
const cors_fetch_post = { 
    method: 'POST', 
    mode: 'cors'
}
var all_tuition_history = null;
var all_institutes = null;
var all_classinfo = null;
var all_subjects = null;
var all_chapters = null;
var all_students = null;
var all_teachers = null;
var all_withdraw_request = null;
$(document).ready(function(){
    try{
        startup_calls()
    }catch(exception){
        console.error(exception);
    }
})



//var table = $('#all_student_datatable').DataTable({
//    'paging': true
//});





var i = 80

//var length = table.page.info().recordsTotal;

//var table = $('#all_student_datatable').DataTable();
//var x = table.rows().count();

function get_Count(){
    document.getElementById('randomNum').innerHTML=57
}
     

async function get_table_data(){
    return new Promise (async (resolve, reject) => {
        try{
            let tutionHistory = await fetch(api_baseurl + 'getStudentTuitionHistory' , cors_fetch_get)
            tutionHistory.json().then(data => {
                all_tuition_history = data;
            });
            let institutes = await fetch(api_baseurl + 'getInstitution' , cors_fetch_get)
            institutes.json().then(data => {
                all_institutes = data
            });
            let classInfo = await fetch(api_baseurl + 'getClassInfo' , cors_fetch_get)
            classInfo.json().then(data => {
                all_classinfo = data
            });
            let subject = await fetch(api_baseurl + 'getSubject' , cors_fetch_get)
            subject.json().then(data => {
                all_subjects = data
            });
            let chapter = await fetch(api_baseurl + 'getChapter' , cors_fetch_get)
            chapter.json().then(data => {
                all_chapters = data
            });
            let students = await fetch(api_baseurl + 'getStudent' , cors_fetch_get)
            students.json().then(data => {
                all_students = data
            });
            let teachers = await fetch(api_teacher_baseurl + 'getAllTeacher' , cors_fetch_post)
            teachers.json().then(data => {
                all_teachers = data
            });
            let withdraws = await fetch(api_teacher_baseurl + 'getAllTeacherWithdrawHistory' , cors_fetch_post)
            withdraws.json().then(data => {
                all_withdraw_request = data
                resolve(200);
            });
            
        }catch(err){
            console.error(err)
            resolve(500)
        }
    })
}
async function startup_calls(){
    let datafetch = await get_table_data();
    await generate_charts(datafetch)
    await dashboard_stats(datafetch);
    await generate_tables(datafetch)

}

async function generate_tables(datafetch){
    let all_teacher_withdraw_table = await generate_all_teacher_withdraw_table(datafetch);
}

async function generate_charts(datafetch){
    let ins_v_tui_his = await generate_institute_vs_tution_history_barchart(datafetch);
    let cla_v_tui_his = await generate_classinfo_vs_tution_history_barchart(datafetch);
    let sub_v_tui_his = await generate_subject_vs_tution_history_barchart(datafetch);
    let cha_v_tui_his = await generate_chapter_vs_tution_history_barchart(datafetch);
    let sub_inc_v_tui_his = await generate_subject_income_vs_tution_history_barchart(datafetch);
    let cha_inc_v_tui_his = await generate_chapter_income_vs_tution_history_barchart(datafetch);
    let tui_v_each_day = await generate_tution_vs_tution_history_per_day_linechart(datafetch);
}

function generate_datatable(target_dom, data_source){
    let columns = [];
    let table_data = [];
    let row_array = [];
    console.log(data_source)
    if(data_source && data_source.length > 0){
        // Collection Column Names
        let columns_keys = Object.keys(data_source[0]);
        columns_keys.map(key => columns.push({title: key}))
        // Formatting rows
        data_source.map(row => {
            // console.log(row)
            row_array = [];
            columns.map(item => row_array.push(row[item.title]))
            table_data.push(row_array)
        })
        // console.log(columns)
        // console.log(table_data)
    }
    else if(data_source && Object.keys(data_source).length > 0){
        let columns_keys = Object.keys(data_source);
        console.log("Column Keys::", columns_keys)
        columns_keys.map(key => columns.push({title: key}))
        for(let x in data_source){
            console.log(x)
            row_array.push(data_source[x])
            table_data.push(row_array)
        }
        console.log("Column ::", columns)
        console.log("Table ::", table_data)

    }
    return $(target_dom).DataTable( {
        data: table_data,
        columns: columns,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        responsive: true,
        paging:   true,
        ordering: true,
        info:     true
    } );
}

async function generate_all_teacher_withdraw_table(datafetch){
    let target_dom = "#all_withdraw_list";
    let flag = true
    if(datafetch === 500){
        if(all_withdraw_request === null){
            flag = false;
        }
    }
    if(flag === true){
        return  generate_datatable(target_dom, all_teachers)
    }
}

async function generate_institute_vs_tution_history_barchart(datafetch){
    let flag = true
    if(datafetch === 500){
        if(all_institutes === null || all_tuition_history === null){
            flag = false;
        }
    }
    if(flag === true){
        return generate_bar_chart(all_institutes, "name" , all_tuition_history, "institutionID", "firstChoiceID", "No of Tuitions", "institute-v-firstchoice-bar")
    }
}

async function generate_classinfo_vs_tution_history_barchart(datafetch){
    let flag = true
    if(datafetch === 500){
        if(all_classinfo === null || all_tuition_history === null){
            flag = false;
        }
    }
    if(flag === true){
        return generate_bar_chart(all_classinfo, "name" , all_tuition_history, "classID", "secondChoiceID", "No of Tuitions", "classinfo-v-secondchoice-bar")
    }
}

async function generate_subject_vs_tution_history_barchart(datafetch){
    let flag = true
    if(datafetch === 500){
        if(all_subjects === null || all_tuition_history === null){
            flag = false;
        }
    }
    if(flag === true){
        return generate_bar_chart(all_subjects, "name" , all_tuition_history, "subjectID", "thirdChoiceID", "No of Tuitions", "subject-v-thirdchoice-bar")
    }
}

async function generate_chapter_vs_tution_history_barchart(datafetch){
    let flag = true
    if(datafetch === 500){
        if(all_chapters === null || all_tuition_history === null){
            flag = false;
        }
    }
    if(flag === true){
        return generate_bar_chart(all_chapters, "name" , all_tuition_history, "chapterID", "forthChoiceID", "No of Tuitions", "chapter-v-forthchoice-bar")
    }
}

async function generate_subject_income_vs_tution_history_barchart(datafetch){
    let flag = true
    if(datafetch === 500){
        if(all_subjects === null || all_tuition_history === null){
            flag = false;
        }
    }
    if(flag === true){
        return generate_bar_chart_for_income(all_subjects, "name" , all_tuition_history, "subjectID", "thirdChoiceID", "cost", "teacherEarn", "Income", "subject-v-income-bar")
    }
}

async function generate_chapter_income_vs_tution_history_barchart(datafetch){
    let flag = true
    if(datafetch === 500){
        if(all_subjects === null || all_tuition_history === null){
            flag = false;
        }
    }
    if(flag === true){
        return generate_bar_chart_for_income(all_chapters, "name" , all_tuition_history, "chapterID", "forthChoiceID", "cost", "teacherEarn", "Income", "chapter-v-income-bar")
    }
}

async function generate_tution_vs_tution_history_per_day_linechart(datafetch){
    let flag = true
    if(datafetch === 500){
        if(all_subjects === null || all_tuition_history === null){
            flag = false;
        }
    }
    if(flag === true){
        let dates = [];
        let unique_dates = [];
        all_tuition_history.map(th => {
            let onlyDate = th.date.split(" ");
            dates.push(onlyDate[0]);
        })
        unique_dates = dates.filter(onlyUnique);
        return generate_line_chart(unique_dates, all_tuition_history, "date", "No of Tuitions", "tuition-v-date-line")
    }
}

async function dashboard_stats(datafetch){
    if(datafetch === 200){
        if(all_students.length){
            $('#total_student').html(all_students.length)
        }
        if(all_teachers.length){
            $('#total_teacher').html(all_teachers.length)
        }
        if(all_tuition_history.length){
            $('#total_tuition').html(all_tuition_history.length)
            let income = 0;
            all_tuition_history.map( th => {
                income += th.cost
            })
            $('#total_income').html(income)
        }
    }
}

async function generate_bar_chart($data1 , $data1_key, $data2, $data2_filter_key, $data2_key, $data2_label, $dom_target){
    
    let all_labels = [];
    let y_values = [];
    let $filtered_data2 = [];
    

    $data1.map( obj => {
        all_labels.push(obj[$data1_key])
        $filtered_data2 = $data2.filter( data => data[$data2_key] == obj[$data2_filter_key])
        // console.log("filtered_data2", $filtered_data2)
        y_values.push($filtered_data2.length)
    })
    // console.log("y_values", y_values)

    let config = {
        type: "bar",
        data: {
            labels: all_labels,
            datasets:[{
                label: $data2_label,
                data: y_values
            }]
        }
    }
    let ctx = document.getElementById($dom_target).getContext('2d');
    let bar_chart = new Chart(ctx,config)
    return bar_chart;
}

async function generate_bar_chart_for_income($data1 , $data1_key, $data2, $data2_filter_key, $data2_key, $data2_prop1, $data2_prop2, $data2_label, $dom_target){
    
    let all_labels = [];
    let y_values = [];
    let $filtered_data2 = [];
    

    $data1.map( obj => {
        all_labels.push(obj[$data1_key])
        $filtered_data2 = $data2.filter( data => data[$data2_key] == obj[$data2_filter_key])
        console.log("$filtered_data2::", $filtered_data2)
        let total_income = 0;
        $filtered_data2.map( th => {
            total_income += ( th[$data2_prop1] - th[$data2_prop2] )
        })
        y_values.push(total_income)
    })
    console.log("y_values", y_values)

    let config = {
        type: "bar",
        data: {
            labels: all_labels,
            datasets:[{
                label: $data2_label,
                data: y_values
            }]
        }
    }
    let ctx = document.getElementById($dom_target).getContext('2d');
    let bar_chart = new Chart(ctx,config)
    return bar_chart;
}

async function generate_line_chart($data1, $data2, $data2_key, $data2_label, $dom_target){
    let all_labels = [];
    let y_values = [];
    let filtered_data2 = 0;

    $data1.map( obj => {
        all_labels = $data1
        filtered_data2 = 0
        $data2.map( data => {
            let date = data[$data2_key].split(" ")
            if(date[0] == obj){
                filtered_data2++
            }
        })
        // console.log("filtered_data2", $filtered_data2)
        y_values.push(filtered_data2)
    })
    // console.log("y_values", y_values)

    let config = {
        type: "line",
        data: {
            labels: all_labels,
            datasets:[{
                label: $data2_label,
                data: y_values
            }]
        }
    }
    let ctx = document.getElementById($dom_target).getContext('2d');
    let bar_chart = new Chart(ctx,config)
    return bar_chart;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}



