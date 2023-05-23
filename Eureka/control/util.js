exports.GetQuery = (req, res, err) => {
    GetQuery(req, res, err);
}

exports.GetEquipsQuery = (req, res,err) => {
    GetEquipsQuery(req, res,err);
}


exports.InsertQuery = (req, res, successmsg, failmsg ) => {
    InsertQuery(req, res, successmsg, failmsg);
}

exports.UpdateQuery = (req, res, successmsg, failmsg) => {
    UpdateQuery(req, res, successmsg, failmsg);
}

exports.FindData = (data, key) => {
    return findData(data, key)
}

exports.Login = (req, res) => {
    Login(req, res)
}

exports.MultiQuery = (req, res) => {
    MultiQuery(req, res)
}

function findData(data, target) {
    return data[target] || null;
}

async function GetQuery(req, res, err) {
    try {
        const mariadb = require('../db/db');
        const row = await mariadb.executeQuery(req.query);

        if (row.length > 0) {
            res.status(200).json({ result: "OK", status: 200, message: row });
        } else {
            res.status(404).json({ result: "Error", status: 404, message: err.message });
        }
    } catch (exception) {
        console.log(exception);
        res.status(500).send("Internal Server Error.");
    }
}

async function GetEquipsQuery(req, res) {
    const mariadb = require('../db/db');
    const row = await mariadb.executeQuery(req.query);
    var resultmsg;
    if (row.length > 0) {
        for (i = 0; i < row.length; i++) {
            count = parseInt(row[i]["child_count"]);
            row[i]["child_count"] = count;
        }
        resultmsg = "OK";
        res.statusCode = 200;
    }
    else {
        resultmsg = "Error";
        res.statusCode = 404;
    }
    const msg = {
        result: resultmsg,
        status: res.statusCode,
        message: row
    };

    try {
        res.send(msg);
    }
    catch (exception) {
        console.log(exception)
    }
}


async function InsertQuery(req, res, successmsg, failmsg) {
    try {
        const mariadb = require('../db/db');
        const row = await mariadb.executeQuery(req.query);
        if (typeof row == "string") {
            res.status(409).json({ result: "OK", status: 409, message: row });
        }
        else {
            if (row.affectedRows == 0) {
                res.status(404).json({ result: "Error", status: 404, message: failmsg });
            }
            else {
                res.status(200).json({ result: "OK", status: 200, message: successmsg });
            }
        }

    }
    catch (exception) {
        console.log(exception);
        res.status(500).send("Internal Server Error.");
    }
}

async function UpdateQuery(req, res, successmsg, failmsg) {
    try {
        const mariadb = require('../db/db');
        const row = await mariadb.executeQuery(req.query);
        if (row.affectedRows == 0) {
            res.status(404).json({ result: "Error", status: 404, message: failmsg });
        } else {
            res.status(200).json({ result: "OK", status: 200, message: successmsg });
        }
    } catch (exception) {
        console.log(exception);
        res.status(500).send("Internal Server Error.");
    }
}

async function Login(req, res) {
    try {
        const mariadb = require('../db/db');

        const queryId = `SELECT user_id FROM t_user WHERE user_id = '${req.user_id}' AND delete_date IS NULL`;
        const rows = await mariadb.executeQuery(queryId);

        if (rows.length === 0) {
            return res.status(404).json({ result: "Error", status: 404, message: "ID is invalid." });
        }

        const queryPass = `SELECT use_grant FROM t_user WHERE user_id = '${req.user_id}' AND password = '${req.password}'`;
        const rows2 = await mariadb.executeQuery(queryPass);

        console.log(rows2)
        if (rows2.length === 0) {
            return res.status(404).json({ result: "Error", status: 404, message: "Passwords do not match." });
        } else {
            const useGrant = rows2[0]["use_grant"];
            if (useGrant === 1) {
                const currentTimeMillis = new Date().getTime();
                const queryUpdate = `UPDATE t_user SET lastlogin_date = '${currentTimeMillis}' WHERE user_id = '${req.user_id}'`;
                await mariadb.executeQuery(queryUpdate);
                return res.status(200).json({ result: "OK", status: 200, message: "Login Success" });
            } else {
                return res.status(404).json({ result: "Failed", status: 404, message: "Waiting for permission. Please contact the system administrator." });
            }
        }

    } catch (exception) {
        console.log(exception);
        return res.status(500).send("Internal Server Error.");
    }
}

async function MultiQuery(req, res) {
    const mariadb = require('../db/db');
    const row = await mariadb.executeMultipleQueries(req.querys);

    try {
        if (row.length > 0 && row == "Complete") {
            res.status(200).json({ result: "OK", status: 200, message: row });
        }
        else {
            res.status(404).json({ result: "Error", status: 404, message: row });
        }
    }
    catch (exception) {
        console.log(exception)
    }
}

exports.DataToKey = (data) => {
    let change = dataToKey(data);
    return change;
}

exports.DataToValue = (data) => {
    let change = dataToValue(data);
    return change;
}

exports.DataToKeyValue = (data) => {
    let change = dataToKeyValue(data);
    return change;
}

exports.GetCurrentTimeMillis = () => {
    var currentTimeMillis = new Date().getTime();
    return currentTimeMillis;
}

exports.ArrayToString = (datas) => {
    let output = "";
    const count = datas.length;
    console.log("datas: ", datas)
    console.log("count: ", datas.length)

    for (let i = 0; i < count; i++) {
        output += "[" + datas[i] + "]";

        if (i < count - 1) {
            output += ",";
        }
    }
    return "[" + output + "]";
};


function dataToKey(data) {
    return Object.keys(data).join(", ");
}

function dataToValue(data) {
    const values = Object.values(data).map(value => `'${value}'`);
    return values.join(", ");
}
function dataToKeyValue(data) {
    return Object.entries(data).map(([key, value]) => `${key} = '${value}'`).join(", ");
}

exports.SendErrorRes = (req, res) => {
    const msg = {
        result: "Error",
        status: 404,
        message: "The wrong approach."
    };
    try {
        res.send(msg);
    }
    catch (exception) {
        console.log(exception)
    }
}



