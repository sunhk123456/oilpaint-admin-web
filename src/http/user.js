import instance from "./http"
function updateUserPassword(id,params) {
    return new Promise((reslove,reject)=>{
        instance.put('api/User/'+id,params).then(res=>{
            reslove(res)
        }).catch(error=>{
            reject(error)
        });
    });
    }
function deleteUser(id) {
    return new Promise((reslove,reject)=>{
        instance.delete('api/User/'+id).then(res=>{
            reslove(res)
        }).catch(error=>{
            reject(error)
        });
    });
}
function indexUser(params) {
    return new Promise((reslove,reject)=>{
        instance.get('api/User/',params).then(res=>{
            reslove(res)
        }).catch(error=>{
            reject(error)
        });
    });
}
export {updateUserPassword,deleteUser,indexUser};