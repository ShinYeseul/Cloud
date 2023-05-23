var util = require("./util");

exports.List = (req, res) => {
    var query = 'SELECT id, user_id, password, permission, manage_site, name, phone, address, use_grant, create_date, delete_date, lastlogin_date from t_user';

    req.query = query;
    util.GetQuery(req, res);
}

exports.Add = (req, res) => {
    const data = req.body;

    let query = 'INSERT INTO t_user (' + util.DataToKey(data) + ', create_date) VALUES (' + util.DataToValue(data) + ', ' + util.GetCurrentTimeMillis() + ')'  
    req.query = query;

    successmsg = "Add Complete";
    failmsg = "Error"
    util.InsertQuery(req, res, successmsg, failmsg);
}

exports.Info = (req, res) => {
    const data = req.body;

    const id = util.FindData(data, "user_id");
    const pw = util.FindData(data, "password");
    let query = 'SELECT id, user_id, password, name, phone, address, permission, manage_site, use_grant, create_date, delete_date, lastlogin_date from t_user' + ' WHERE  user_id = ' + "'" + id + "'" + ' and password = ' + "'" + pw + "'";

    req.query = query;
    util.GetQuery(req, res)
}

exports.Edit = (req, res) => {
    const data = req.body;
    const id = util.FindData(data, "user_id");
    const pass = util.FindData(data, "password");
    const keyvalue = util.DataToKeyValue(data);

    const query = `UPDATE t_user SET ${keyvalue} WHERE user_id = '${id}' AND password = '${pass}'`;
    req.query = query;

    util.UpdateQuery(req, res);
}

exports.Disable = (req, res) => {
    const data = req.body;

    const id = util.FindData(data, "user_id");
    const pass = util.FindData(data, "password");
    const currentTimeMillis = util.GetCurrentTimeMillis(); 

    const query = `UPDATE t_user SET delete_date = '${currentTimeMillis}' WHERE user_id = '${id}' and password = '${pass}'`;
    req.query = query;

    successmsg = "Delete Complete";
    failmsg = "Check Input Value";
    util.UpdateQuery(req, res, successmsg, failmsg);
}


exports.Login = (req, res) => {
    const data = req.body;
    let id = util.FindData(data, "user_id");
    let pwd = util.FindData(data, "password");

    req.user_id = id;
    req.password = pwd;
    util.Login(req, res);
};


