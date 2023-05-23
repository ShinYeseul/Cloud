var util = require("./util");

exports.List = (req, res) => {
    ws_id = req.id;
    var query = 'SELECT id, ws_id, parent_id, name, serial_num, manufacturing_company, p_location, type, CONVERT((SELECT COUNT(*) FROM t_equip c WHERE c.parent_id = p.id ), CHAR) AS child_count  FROM t_equip p WHERE parent_id is NULL and ws_id = ' + ws_id;
    req.query = query;
    util.GetEquipsQuery(req, res);
}

exports.GetChild = (req, res) => {
    equip_id = req.id;
    var query = 'SELECT id, ws_id, parent_id, name, serial_num, manufacturing_company, p_location, type, CONVERT((SELECT COUNT(*) FROM t_equip c WHERE c.parent_id = p.id ), CHAR) AS child_count  FROM t_equip p WHERE parent_id = ' + equip_id
    req.query = query;
    util.GetEquipsQuery(req, res);
}

exports.EquipAdd = (req, res) => {
    const data = req.body;
    let key = util.DataToKey(data);
    let value = util.DataToValue(data);
    req.query = 'INSERT INTO t_equip (' + key + ') VALUES (' + value + ')'
    successmsg = "Add Complete"
    failmsg = "Check Type Name"
    util.InsertQuery(req, res, successmsg, failmsg);
}

exports.EquipGet = (req, res) => {
    equip_id = req.id;
    req.query = 'SELECT id, ws_id, parent_id, name, p_location, TYPE, CONVERT((SELECT COUNT(*) FROM t_equip c WHERE c.parent_id = p.id ), CHAR) AS child_count FROM t_equip p WHERE id = ' + equip_id
    util.GetEquipsQuery(req, res);
}

exports.EquipEdit = (req, res) => {
    const data = req.body;
    const keyvalue = util.DataToKeyValue(data)
    equip_id = req.id;
    req.query = 'UPDATE t_equip SET ' + keyvalue + ' WHERE deleted = 0 AND id = ' + equip_id
    successmsg = "Edit Complete"
    failmsg = "Check Equip ID"
    util.UpdateQuery(req, res, successmsg, failmsg);
}

exports.EquipDelete = (req, res) => {
    equip_id = req.id;
    req.query = 'UPDATE t_equip SET deleted = 1 WHERE deleted = 0 AND id = ' + equip_id
    successmsg = "Delete Complete"
    failmsg = "Check Equip ID"
    util.UpdateQuery(req, res, successmsg, failmsg);
}

exports.TypeList = (req, res) => {
    req.query = 'SELECT id, name, descript FROM t_equip_type WHERE deleted = 0'
    util.GetQuery(req, res)
}

exports.TypeAdd = (req, res) => {
    const data = req.body;
    let key = util.DataToKey(data);
    let value = util.DataToValue(data);

    req.query = 'INSERT INTO t_equip_type (' + key + ') VALUES (' + value + ')'
    successmsg = "Add Complete"
    failmsg = "Error"
    util.UpdateQuery(req, res, successmsg, failmsg)
}

exports.TypeEdit = (req, res) => {
    const data = req.body;
    const id = req.id
    let keyvalue = util.DataToKeyValue(data);
    req.query = 'UPDATE t_equip_type SET ' + keyvalue + ' WHERE id = ' + id;
    console.log(req.query);
    const successmsg = "Edit Complete";
    const failmsg = "Check Type Name";
    util.UpdateQuery(req, res, successmsg, failmsg);
}

exports.TypeDelete = (req, res) => {
    const id = req.id;
    req.query = 'UPDATE t_equip_type SET deleted = 1 WHERE id = ' + id + ' AND deleted = 0';
    successmsg = "Delete Complete"
    failmsg = "Check Type Values"
    util.UpdateQuery(req, res, successmsg, failmsg)
}