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
var all_vouchers = null;
var all_voucher_history = null;

async function get_table_data(){
    return new Promise (async (resolve, reject) => {
        try{
            let vouchers = await fetch(api_baseurl + 'getVoucher' , cors_fetch_get)
            vouchers.json().then(data => {
                all_vouchers = data;
            })
            let voucher_history = await fetch(api_baseurl + 'getVoucherHistory' , cors_fetch_get)
            voucher_history.json().then(data => {
                all_voucher_history = data;
                resolve(200);
            })
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
    let all_vouchers_table = await generate_all_vouchers_table(datafetch);
    let all_voucher_history_list = await generate_all_voucher_history_table(datafetch);
}

function generate_all_vouchers_table(datafetch){
    let target_dom = "#all_vouchers_datatable";
    let flag = true
    if(datafetch === 500){
        if(all_vouchers === null){
            flag = false;
        }
    }
    if(flag === true){
        return  generate_datatable(target_dom, all_vouchers)
    }
}

function generate_all_voucher_history_table(datafetch){
    let target_dom = "#all_voucher_history_datatable";
    let flag = true
    if(datafetch === 500){
        if(all_voucher_history === null){
            flag = false;
        }
    }
    if(flag === true){
        return  generate_datatable(target_dom, all_voucher_history)
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

$(document).ready(function(){
    try{
        startup_calls()
    }catch(exception){
        console.error(exception);
    }
})