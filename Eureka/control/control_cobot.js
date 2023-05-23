var util = require("./util");

exports.updateCobot = (req, res) => {
    const data = req.body;
    const keyvalue = util.DataToKeyValue(data)
    query = 'UPDATE t_equip_cobot SET ' + keyvalue + ' WHERE  equip_id= ' + req.id;
    req.query = query;
    successmsg = "Edit Complete";
    failmsg = "Check Cobot ID";
    util.UpdateQuery(req, res, successmsg, failmsg);
}

exports.getInfo = (req, res) => {
    req.query = 'SELECT position_x, position_y, position_z, rotation_u, rotation_v, rotation_w, joint1, joint2, joint3, joint4, joint5, joint6, status, operation, gripper, reg_date From t_equip_cobot WHERE equip_id = ' + req.id;
    util.GetQuery(req, res);
}