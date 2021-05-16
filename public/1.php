<?php
function getPass($pass){
    return md5(sha1($pass).md5("thougthscomment"));
}
echo getPass(123456);