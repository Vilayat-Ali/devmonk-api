const bcryptjs = require('bcryptjs');

module.exports.hashString = (data) => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(data, salt);
    return hash;
}

module.exports.compareHash = (plain, cipher) => {
    if(bcryptjs.compare(plain, cipher)){
        return true;
    }else{
        return false;
    }
}