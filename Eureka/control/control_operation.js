var util = require("./util");

exports.OperationStart = (req, res) => {
    const data = req.body;
    let cobot_id = util.FindData(data, "cobot_id");
    let amr_id = util.FindData(data, "amr_id");
    let order_time = util.FindData(data, "order_time");

    if (cobot_id == null || amr_id == null || order_time == null) {
        util.SendErrorRes(req, res)
    }
    else {
        query1 = 'INSERT INTO t_operation (cobot_id, amr_id, task, order_time, start_time) VALUES (' + cobot_id + ', ' + amr_id + ', 0, ' + order_time + ', ' + order_time + ');';
        query2 = 'INSERT INTO t_operation_task (o_id, task, order_time) VALUES (LAST_INSERT_ID(), 1, ' + order_time + ');';
        query3 = 'INSERT INTO t_operation_object (o_id) VALUES (LAST_INSERT_ID());';
        query4 = 'UPDATE t_equip_amr SET operation = LAST_INSERT_ID() WHERE equip_id = ' + amr_id;
        query5 = 'UPDATE t_equip_cobot SET operation = LAST_INSERT_ID() WHERE equip_id = ' + cobot_id;

        querys = { query1, query2, query3, query4, query5 };
        req.querys = querys;
        util.MultiQuery(req, res);
    }
}

exports.OperationStop = (req, res) => {
    const data = req.body;
    let cobot_id = util.FindData(data, "cobot_id");
    let amr_id = util.FindData(data, "amr_id");
    let end_time = util.FindData(data, "end_time");
    let o_id = util.FindData(data, "o_id");

    if (cobot_id == null || amr_id == null || end_time == null || o_id == null) {
        util.SendErrorRes(req, res)
    }
    else {
        query1 = 'UPDATE t_equip_amr SET operation = 0 WHERE equip_id = ' + amr_id;
        query2 = 'UPDATE t_equip_cobot SET operation = 0 WHERE equip_id = ' + cobot_id;
        query3 = 'UPDATE t_operation SET end_time = ' + "'" + end_time + "'" + ' WHERE idx = ' + o_id;
        querys = { query1, query2, query3 };
        req.querys = querys;
        util.MultiQuery(req, res);
    }
}

exports.StartTask = (req, res) => {
    data = req.body
    o_id = data['o_id']
    task = data['task']
    order_time = data['order_time']
    start_time = data['start_time']
    query1 = 'UPDATE t_operation_task SET start_time = ' + start_time + ' WHERE o_id = ' + o_id + ' AND task = ' + task + ' AND order_time = ' + "'" + order_time + "'"
    query2 = 'UPDATE t_operation SET task = ' + task + ' WHERE idx = ' + o_id;
    querys = { query1, query2 };
    req.querys = querys;

    util.MultiQuery(req, res)
}

exports.EndTask = (req, res) => {
    data = req.body
    o_id = data['o_id']
    task = data['task']
    order_time = data['order_time']
    end_time = data['end_time']
    console.log(end_time)
    req.query = 'UPDATE t_operation_task SET end_time = ' + end_time + ' WHERE o_id = ' + o_id + ' AND task = ' + task + ' AND order_time = ' + "'" + order_time + "'"
    successmsg = "Complete"
    failmsg = "Check Input Value"
    util.UpdateQuery(req, res, successmsg, failmsg)
}

exports.AddTask = (req, res) => {
    data = req.body
    o_id = data['o_id']
    task = data['task']
    order_time = data['order_time']
    req.query = 'INSERT INTO t_operation_task (o_id, task, order_time) VALUES (' + o_id + ', ' + task + ', ' + "'" + order_time + "'" + ');';

    successmsg = "Add Complete"
    failmsg = "Check Input Value"

    util.InsertQuery(req, res, successmsg, failmsg)
}

exports.UpdateObject = (req, res) => {
    data = req.body
    o_id = data['o_id']
    cluster = util.ArrayToString(data['cluster'])
    moving = util.ArrayToString(data['moving'])
    movedone = util.ArrayToString(data['movedone'])
    req.query = 'UPDATE t_operation_object SET cluster = ' + "'" + cluster + "', moving = '" + moving + "', movedone = '" + movedone + "'" + ' WHERE o_id = ' + o_id
    successmsg = "Edit Complete"
    failmsg = "Check Operation ID"
    util.UpdateQuery(req, res, successmsg, failmsg)
}

exports.GetOperation = (req, res) => {
    o_id = req.id
    req.query = 'select idx, cobot_id, amr_id, task, order_time, start_time, end_time from t_operation where idx =' + o_id;
    util.GetQuery(req, res)
}

exports.GetCurrentTask = (req, res) => {
    o_id = req.id
    req.query = 'SELECT o_id, task, order_time, start_time, end_time FROM t_operation_task WHERE o_id = ' + o_id + ' ORDER BY order_time DESC LIMIT 1';
    util.GetQuery(req, res)
}

exports.GetObject = (req, res) => {
    o_id = req.id
    req.query = 'SELECT o_id, cluster, moving, movedone FROM t_operation_object WHERE o_id = ' + o_id
    util.GetQuery(req, res)
}
