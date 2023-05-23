var util = require("./util");

exports.updateAMR = (req, res) => {
    const data = req.body;
    const keyvalue = util.DataToKeyValue(data)
    query = 'UPDATE t_equip_amr SET ' + keyvalue + ' WHERE  equip_id= ' + req.id;
    req.query = query;
    successmsg = "Edit Complete";
    failmsg = "Check AMR ID";
    util.UpdateQuery(req, res, successmsg, failmsg);
}

exports.getPosition = (req, res) => {
    req.query = 'SELECT position_x, position_y, position_z, rotation_u, rotation_v, rotation_w, status, operation, reg_date From t_equip_amr WHERE equip_id = ' + req.id;
    util.GetQuery(req, res);
}
