import instance from "./http"
function stayhomeRead(id) {
    return new Promise((reslove,reject)=>{
        instance.get('api/stayhome/'+id).then(res=>{
            reslove(res)
        }).catch(error=>{
            reject(error)
        });
    });
    }

export {stayhomeRead};