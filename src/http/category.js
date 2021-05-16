import instance from "./http";

function categorySave() {
    return  new Promise(function (resolve,reject) {
        instance.post('admin/category/indexall').then(res=>{

            resolve(res);


        }).catch(error=>{
            reject(error);
        })
    })


}
function categoryIndex() {



}
function categoryUpdate() {


}
function categoryRead() {


}function categoryDelete() {


}
export {categorySave,categoryIndex,categoryDelete,categoryRead,categoryUpdate}