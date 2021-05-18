import instance from "./http"
function addMessage(id,params) {
    return new Promise((reslove,reject)=>{
        instance.put('api/LeaveMessage/'+id,params).then(res=>{
            reslove(res)
        }).catch(error=>{
            reject(error)
        });
    });
    }
function deleteMessage(id) {
    return new Promise((reslove,reject)=>{
        instance.delete('api/LeaveMessage/'+id).then(res=>{
            reslove(res)
        }).catch(error=>{
            reject(error)
        });
    });
}
export {addMessage,deleteMessage};