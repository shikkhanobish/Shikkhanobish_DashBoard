'use strict';
const api_baseurl = "https://api.shikkhanobish.com/api/ShikkhanobishLogin/";
const api_teacher_baseurl = "https://api.shikkhanobish.com/api/ShikkhanobishTeacher/"

const cors_fetch_get = { 
    method: 'GET', 
    mode: 'cors',
}
const cors_fetch_post = { 
    method: 'POST', 
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}
var all_institutes = null;
var all_classinfo = null;
var all_subjects = null;
var all_chapters = null;

async function get_table_data(){
    return new Promise (async (resolve, reject) => {
        try{
            let institutes = await fetch(api_baseurl + 'getInstitution' , cors_fetch_post)
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
                resolve(200)
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
    await populate_dropdowns();
}

async function add_institute(id, title, name){
    let postObject = { 
        body : JSON.stringify({
            institutionID : id,
            title: title,
            name: name
        }), 
        ...cors_fetch_post
    }
    // console.log(postObject)
    let addInstitute = await fetch(api_baseurl + 'setInstitution' , postObject)
    addInstitute.json().then(data => {
        console.log(data)
        if(data.Status === 0){
            $('#add_institute_modal').modal('hide')
            window.location.reload();
        }else{
            alert("Adding Institution has been failed");
        }
    })
}

async function add_class(id, title, name, inst_id){
    let postObject = { 
        body : JSON.stringify({
            institutionID : inst_id,
            classID : id,
            title: title,
            name: name
        }), 
        ...cors_fetch_post
    }
    // console.log(postObject)
    let addClass = await fetch(api_baseurl + 'setClassInfo' , postObject)
    addClass.json().then(data => {
        console.log(data)
        if(data.Status === 0){
            $('#add_class_modal').modal('hide')
            window.location.reload();
        }else{
            alert("Adding Class has been failed");
        }
    })
}

async function add_subject(id, title, name, group_name, class_id){
    let postObject = { 
        body : JSON.stringify({
            classID : class_id,
            subjectID : id,
            title: title,
            name: name,
            groupName: group_name
        }), 
        ...cors_fetch_post
    }
    // console.log(postObject)
    let addSubject = await fetch(api_baseurl + 'setSubject' , postObject)
    addSubject.json().then(data => {
        console.log(data)
        if(data.Status === 0){
            $('#add_subject_modal').modal('hide')
            window.location.reload();
        }else{
            alert("Adding Subject has been failed");
        }
    })
}

async function add_chapter(id, title, name, subject_id, class_id){
    let postObject = { 
        body : JSON.stringify({
            chapterID : id,
            classID : class_id,
            subjectID : subject_id,
            title: title,
            name: name,
        }), 
        ...cors_fetch_post
    }
    // console.log(postObject)
    let addChapter = await fetch(api_baseurl + 'setChapter' , postObject)
    addChapter.json().then(data => {
        console.log(data)
        if(data.Status === 0){
            $('#add_chapter_modal').modal('hide')
            window.location.reload();
        }else{
            alert("Adding Chapter has been failed");
        }
    })
}

async function generate_tables(datafetch){
    let all_institutes_table = await generate_all_institutes_table(datafetch);
    let all_classes_table = await generate_all_classes_table(datafetch);
    let all_subjects_table = await generate_all_subjects_table(datafetch);
    let all_chapters_table = await generate_all_chapters_table(datafetch);
}

function destroy_datatables(){

} 

function generate_all_institutes_table(datafetch){
    let target_dom = "#institutes_datatable";
    let flag = true
    if(datafetch === 500){
        if(all_institutes === null){
            flag = false;
        }
    }
    if(flag === true){
        return  generate_datatable(target_dom, all_institutes)
    }
}

function generate_all_classes_table(datafetch){
    let target_dom = "#classes_datatable";
    let flag = true
    if(datafetch === 500){
        if(all_classinfo === null){
            flag = false;
        }
    }
    if(flag === true){
        return  generate_datatable(target_dom, all_classinfo)
    }
}

function generate_all_subjects_table(datafetch){
    let target_dom = "#subjects_datatable";
    let flag = true
    if(datafetch === 500){
        if(all_subjects === null){
            flag = false;
        }
    }
    if(flag === true){
        return  generate_datatable(target_dom, all_subjects)
    }
}

function generate_all_chapters_table(datafetch){
    let target_dom = "#chapters_datatable";
    let flag = true
    if(datafetch === 500){
        if(all_chapters === null){
            flag = false;
        }
    }
    if(flag === true){
        return  generate_datatable(target_dom, all_chapters)
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
        // console.log("Column ::", columns)
        // console.log("Table ::", table_data)

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


async function populate_dropdowns(){
    let innerOptions = '';
    if(all_institutes && all_institutes.length > 0){
        innerOptions = '';
        all_institutes.map(x => {
            innerOptions += '<option value=' + x.institutionID + ' ' + '>' + x.institutionID + '</option>'
        })
        $("#add_class_under_institute").html(innerOptions);
    }else if(all_institutes && typeof(all_institutes) == "object"){
        innerOptions = '';
        innerOptions += '<option value=' + all_institutes.institutionID + ' ' + '>' + all_institutes.institutionID+'</option>'
        $("#add_class_under_institute").html(innerOptions);
    }
    if(all_classinfo && all_classinfo.length > 0){
        let innerOptions = '';
        all_classinfo.map(x => {
            innerOptions += '<option value=' + x.classID + ' ' +'>'+x.classID+ ' Ins:' + x.institutionID +'</option>'
        })
        $("#add_subject_under_class").html(innerOptions);
        $("#add_chapter_under_subject_under_class").html(innerOptions);
    }else if(all_classinfo && typeof(all_classinfo) == "object"){
        let innerOptions = '';
            innerOptions += '<option value=' + x.classID + ' ' +'>'+x.classID+ ' Ins:' + x.institutionID +'</option>'
        $("#add_subject_under_class").html(innerOptions);
        $("#add_chapter_under_subject_under_class").html(innerOptions);
    }
    if(all_subjects && all_subjects.length > 0){
        let innerOptions = '';
        all_subjects.map(x => {
            innerOptions += '<option value=' + x.subjectID + ' ' + 'data-classID=' + x.classID + '>'+x.subjectID+'</option>'
        })
        $("#add_chapter_under_subject").html(innerOptions);
    }else if(all_subjects && typeof(all_subjects) == "object"){
        let innerOptions = '';
            innerOptions += '<option value=' + x.subjectID + ' ' + 'data-classID=' + x.classID +'>'+x.subjectID+'</option>'
        $("#add_chapter_under_subject").html(innerOptions);
    }
}


function focus_field(element_id){
    $('.validation_text').hide();
    $('#'+element_id).trigger('focus')
}

function select_class(){
    let subjectId = $('#add_chapter_under_subject').val()
    $('#add_chapter_under_subject>option').each(function(x,v){
        if(subjectId == v.value){
            $('#add_chapter_under_subject_under_class').val(v.dataset.classid)
        }
        console.log(v.dataset.classid)
    })
}

$(document).ready(function() {
    var spinner = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;Submitting...`;
    startup_calls()
    $('#add_institute_modal').on('shown.bs.modal', function () {
        focus_field('add_institute_title')
    })

    $('#add_class_modal').on('shown.bs.modal', function () {
        focus_field('add_class_title')
    })

    $('#add_subject_modal').on('shown.bs.modal', function () {
        focus_field('add_subject_title')
    })
    
    $('#add_chapter_modal').on('shown.bs.modal', function () {
        focus_field('add_chapter_title')
        select_class();
    })

    $('#add_chapter_under_subject').on('change', function(){
        select_class();
    })
    
    $('#add_institute_submit').click(function(e){
        e.preventDefault()
        let id = "";
        let title = "";
        let name = "";
        id = $('#add_institute_id').val()
        title = $('#add_institute_title').val()
        name = $('#add_institute_name').val()
        if( id == "" || title == "" || name == ""){
            $('.validation_text').show();
        }else{
            $(this).html(spinner);
            add_institute(id, title, name)
        }
    })

    $('#add_class_submit').click(function(e){
        e.preventDefault()
        let id = "";
        let title = "";
        let name = "";
        let inst_id = "";
        id = $('#add_class_id').val()
        title = $('#add_class_title').val()
        name = $('#add_class_name').val()
        inst_id = $('#add_class_under_institute').val()
        if( id == "" || title == "" || name == ""){
            $('.validation_text').show();
        }else{
            $(this).html(spinner);
            add_class(id, title, name, inst_id)
        }
    })

    $('#add_subject_submit').click(function(e){
        e.preventDefault()
        let id = "";
        let title = "";
        let name = "";
        let group_name = "";
        let class_id = "";
        id = $('#add_subject_id').val()
        title = $('#add_subject_title').val()
        name = $('#add_subject_name').val()
        class_id = $('#add_subject_under_class').val()
        group_name = $('#add_subject_group_name').val()
        if( id == "" || title == "" || name == "" || group_name == ""){
            $('.validation_text').show();
        }else{
            $(this).html(spinner);
            add_subject(id, title, name, group_name, class_id)
        }
    })

    $('#add_chapter_submit').click(function(e){
        e.preventDefault()
        let id = "";
        let title = "";
        let name = "";
        let subject_id = "";
        let class_id = "";
        id = $('#add_chapter_id').val()
        title = $('#add_chapter_title').val()
        name = $('#add_chapter_name').val()
        subject_id = $('#add_chapter_under_subject').val()
        class_id = $('#add_chapter_under_subject_under_class').val()
        if( id == "" || title == "" || name == "" || subject_id == "" || class_id == ""){
            $('.validation_text').show();
        }else{
            $(this).html(spinner);
            add_chapter(id, title, name, subject_id, class_id)
        }
    })
} );

