import React, { Component } from 'react'


const apiGet = "http://192.168.1.3:3000/list_all_foods";
const apiPost ="http://192.168.1.3:3000/insert_new_foods";
const apiPut = "http://192.168.1.3:3000/update_a_foods";
const apiDelete = "http://192.168.1.3:3000/delete_a_foods";
async function getData(){
    try{
        let response = await fetch(apiGet);
        let responseJson = await response.json();
        //console.log(responseJson);
        return responseJson.data;
       

    }
    catch(error){
        console.error(`error is ${error}`);

    }
}
async function insertNewFood(param){
    try{
        let response = await fetch(apiPost,{
            method:'POST',
            headers:{
                'Accept':'application/json',
            'Content-Type':'application/json',

            },
            body:JSON.stringify(param)
            
        }); 
        let responseJson = await response.json();
        return responseJson.result;

    }
    catch(error){
        console.error(`error is ${error}`);
    }

}
async function updateFood(param){
    try{
        let response = await fetch(apiPut,{
            method: 'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',

            },
            body:JSON.stringify(param),
        });
        let responseJson = await response.json();
        return responseJson.result;

    }
    catch(err){
        console.error(`error is ${error}`);

    }
}
async function deleteFood(param){
    try{
        let response = await fetch(apiDelete,{
            method: 'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',

            },
            body:JSON.stringify(param),
        });
        let responseJson = await response.json();
        return responseJson.result;

    }
    catch(err){
        console.error(`error is ${error}`);

    }
}

export {getData,insertNewFood,updateFood,deleteFood};