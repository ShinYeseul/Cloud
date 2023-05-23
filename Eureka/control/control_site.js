var util = require("./util");

exports.List = (req, res) => {
    var query = 'SELECT id, name from t_site where deleted = 0'; 
    req.query = query;
    util.GetQuery(req, res)
}

exports.AddSite = (req, res) => {
    const data = req.body;
    let key = util.DataToKey(data);
    let value = util.DataToValue(data);
    req.query = 'INSERT INTO t_site (' + key + ') VALUES (' + value + ')'  
    successmsg = "Add Complete";
    failmsg = "Please Input Site Name"
    util.UpdateQuery(req, res, successmsg, failmsg)
}

exports.GetSite = (req, res) => {
    site_id = req.site_id
    var query = 'SELECT id, name from t_site where deleted = 0 and id = ' + site_id;  
    req.query = query;
    util.GetQuery(req, res)
}

exports.EditSite = (req, res) => {
    site_id = req.site_id
    const data = req.body;
    let keyvalue = util.DataToKeyValue(data);
    req.query = 'UPDATE t_site SET ' + keyvalue + ' WHERE deleted = 0 and id = ' + site_id;
    successmsg = "Edit Complete";
    failmsg = "Check Site ID"
    util.UpdateQuery(req, res, successmsg, failmsg)
}

exports.DeleteSite = (req, res) => {
    site_id = req.site_id
    req.query = 'UPDATE t_site SET deleted = 1 WHERE deleted = 0 and id = ' + site_id;    
    successmsg = "Delete Complete";
    failmsg = "Check Site ID"
    util.UpdateQuery(req, res, successmsg, failmsg)
}

exports.GetWorkspaceList = (req, res) => {
    site_id = req.site_id
    req.query = 'select id, site_id, name, ip_address, type from t_site_workspace where deleted = 0 and site_id =' + site_id;      
    util.GetQuery(req, res)
}

exports.AddWorkspace = (req, res) => {
    site_id = req.site_id
    const data = req.body;
    let key = util.DataToKey(data);
    let value = util.DataToValue(data);
    req.query = 'INSERT INTO t_site_workspace (site_id, ' + key + ') VALUES (' + site_id + ', ' + value + ')'              
    successmsg = "Add Complete";
    failmsg = "Error"
    util.UpdateQuery(req, res, successmsg, failmsg)
}

exports.GetWorkspace = (req, res) => {
    site_id = req.site_i
    w_id = req.w_id
    req.query = 'select id, site_id, name, ip_address, type from t_site_workspace where deleted = 0 and site_id =' + site_id + ' and id = ' + w_id;         //t_site_workspace 테이블에서 deleted 값이 0인 특정 site_id, w_id를 가진 데이터 조회
    failmsg = "Please Check Input Value."
    util.GetQuery(req, res, failmsg)
}

exports.EditWorkspace = (req, res) => {
    site_id = req.site_id
    w_id = req.w_id;
    const data = req.body;
    let keyvalue = util.DataToKeyValue(data);
    req.query = 'UPDATE t_site_workspace SET ' + keyvalue + ' WHERE deleted = 0 and id = ' + w_id + ' and site_id = ' + site_id;  
    successmsg = "Edit Complete";
    failmsg = "Check Site or Workspace ID";
    util.UpdateQuery(req, res, successmsg, failmsg)
}

exports.DeleteWorkspace = (req, res) => {
    w_id = req.w_id;
    site_id = req.site_id
    req.query = 'UPDATE t_site_workspace SET deleted = 1 WHERE deleted = 0 and id = ' + w_id + ' and site_id = ' + site_id;    
    successmsg = "Delete Complete";
    failmsg = "Check Site or Workspace ID";
    util.UpdateQuery(req, res, successmsg, failmsg)
}