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
var all_payment_history = null;
var all_premium_student = null;
var all_students = null;




async function get_table_data(){
    return new Promise (async (resolve, reject) => {
        try{
            let tutionHistory = await fetch(api_baseurl + 'getStudentTuitionHistory' , cors_fetch_get)
            tutionHistory.json().then(data => {
                all_tuition_history = data;
            })
            let paymentHistory = await fetch(api_baseurl + 'getStudentPaymentHistory' , cors_fetch_get)
            paymentHistory.json().then(data => {
                all_payment_history = data
            })
            let students = await fetch(api_baseurl + 'getStudent' , cors_fetch_get)
            students.json().then(data => {
                all_students = data
            })
            let premiumStudent = await fetch(api_teacher_baseurl + 'getAllPremiumStudent' , cors_fetch_post)
            premiumStudent.json().then(data => {
                all_premium_student = data
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
    console.log(datafetch)
    await generate_tables(datafetch);
}
async function generate_tables(datafetch){
    let all_students_table = await generate_all_students_table(datafetch);
    let tuition_history = await generate_tuition_history_table(datafetch);
    let payment_history = await generate_payment_history_table(datafetch);
    let premium_student = await generate_premium_student_table(datafetch);
}

function generate_all_students_table(datafetch){
    let target_dom = "#all_student_datatable";
    let flag = true
    if(datafetch === 500){
        if(all_students === null){
            flag = false;
        }
    }
    if(flag === true){
        return  generate_datatable(target_dom, all_students)
    }
}

function generate_tuition_history_table(datafetch){
    let target_dom = "#student_tution_history_datatable";
    let flag = true
    if(datafetch === 500){
        if(all_tuition_history === null){
            flag = false;
        }
    }
    if(flag === true){
        return  generate_datatable(target_dom, all_tuition_history)
    }
}

function generate_payment_history_table(datafetch){
    let target_dom = "#student_payment_history_datatable";
    let flag = true
    if(datafetch === 500){
        if(all_payment_history === null){
            flag = false;
        }
    }
    if(flag === true){
        return  generate_datatable(target_dom, all_payment_history)
    }
}

function generate_premium_student_table(datafetch){
    let target_dom = "#premium_student_datatable";
    let flag = true
    if(datafetch === 500){
        if(all_premium_student === null){
            flag = false;
        }
    }
    if(flag === true){
        return  generate_datatable(target_dom, all_premium_student)
    }
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

