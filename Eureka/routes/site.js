/**
 * @swagger
 * tags:
 *   name: Site
 *   description: 지역 추가, 조회, 수정, 삭제
 */
/**
 * @swagger
 * tags:
 *   name: Workspace
 *   description: 해당 Site의 작업공간 추가, 조회, 수정, 삭제
 */
const router = require("express").Router();
const control = require("../control/control_site");


/**
 * @swagger
 * paths:
 *  /site:
 *    get:
 *      tags: [Site]
 *      summary: "site 목록 조회"
 *      description: "등록된 site 목록을 조회한다."
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/sites'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.get('/', control.List);

/**
 * @swagger
 * paths:
 *  /site:
 *    post:
 *      tags: [Site]
 *      summary: "site 추가"
 *      description: "site 추가시 사용"
 *      requestBody:
 *        description: 사이트 추가에 필요한 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: site_name
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/addSite'
 *        "404":
 *          $ref: '#/components/responses/404/addSite'
 *        "500":
 *          $ref: '#/components/responses/500/error'
 */
router.post('/', control.AddSite);

/**
 * @swagger
 * paths:
 *  /site/{site_id}:
 *    get:
 *      tags: [Site]
 *      summary: "site 조회"
 *      description: "선택한 site의 정보을 조회한다."
 *      parameters:
 *          - in: path
 *            name: site_id
 *            required: false
 *            description: site ID
 *            schema :
 *              type: integer
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/site'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.get('/:id', control.GetSite);

/**
 * @swagger
 * paths:
 *  /site/{site_id}:
 *    put:
 *      tags: [Site]
 *      summary: "site 수정"
 *      description: "선택한 site의 정보을 수정한다."
 *      parameters:
 *          - in: path
 *            name: site_id
 *            required: false
 *            description: site ID
 *            schema :
 *              type: integer
 *      requestBody:
 *        description: 사이트 수정에 필요한 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: site이름
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/editSite'
 *        "404":
 *          $ref: '#/components/responses/404/editSite'
 */
router.put('/:id', control.EditSite);

/**
 * @swagger
 * paths:
 *  /site/{site_id}:
 *    delete:
 *      tags: [Site]
 *      summary: "site 삭제"
 *      description: "선택한 site를 삭제한다."
 *      parameters:
 *          - in: path
 *            name: site_id
 *            required: false
 *            description: site ID
 *            schema :
 *              type: integer
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/deleteSite'
 *        "404":
 *          $ref: '#/components/responses/404/deleteSite'
 */
router.delete('/:id', control.DeleteSite);

router.param('id', (req, res, next, value) => {
    req.site_id = value;
    next()
})


/**
 * @swagger
 * paths:
 *  /site/{site_id}/Workspace:
 *    get:
 *      summary: "Workspace 목록 조회"
 *      description: "선택한 site의 Workspace 목록을 조회한다."
 *      parameters:
 *          - in: path
 *            name: site_id
 *            required: false
 *            description: site ID
 *            schema :
 *              type: integer   
 *      tags: [Workspace]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/workspaces'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.get('/:id/Workspace', control.GetWorkspaceList);

/**
 * @swagger
 * paths:
 *  /site/{site_id}/Workspace:
 *    post:
 *      tags: [Workspace]
 *      summary: "workspace 추가"
 *      description: "workspace 추가시 사용"
 *      parameters:
 *          - in: path
 *            name: site_id
 *            required: false
 *            description: site ID
 *            schema :
 *              type: integer
 *      requestBody:
 *        description: workspace 추가에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: test Cobot Area
 *                ip_address:
 *                  type: string
 *                  example: 255.255.255.255
 *                type:
 *                  type: int
 *                  example: 0
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/addWorkspace'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.post('/:id/Workspace', control.AddWorkspace);

/**
 * @swagger
 * paths:
 *  /site/{site_id}/Workspace/{workspace_id}:
 *    get:
 *      tags: [Workspace]
 *      summary: "Workspace 조회"
 *      description: "선택한 Workspace를 조회한다."
 *      parameters:
 *          - in: path
 *            name: site_id
 *            required: false
 *            description: site ID
 *            schema :
 *              type: integer
 *          - in: path
 *            name: workspace_id
 *            required: false
 *            description: workspace ID
 *            schema:
 *              type: integer
 *      responses:
 *        "200":
 *          description: Workspace 조회결과
 *          content:
 *            application/json; charset=utf-8:
 *              schema:
 *                type: object
 *                properties:
 *                    result: 
 *                      type: boolean
 *                      example: "OK"
 *                    status:
 *                      type: integer
 *                      example: 200
 *                    message:
 *                      type: object
 *                      example:
 *                          [
 *                               {
 *                                    "id": 1,
 *                                    "site_id": 1,
 *                                    "name": "Seoul Cobot Area",
 *                                    "ip_address": "192.168.3.2",
 *                                    "type": 0
 *                                }
 *                          ]
 *        "404":
 *          $ref: '#/components/responses/404/error'                          
 */
router.get('/:id/Workspace/:wid', control.GetWorkspace);

/**
 * @swagger
 * paths:
 *  /site/{site_id}/Workspace/{workspace_id}:
 *    put:
 *      tags: [Workspace]
 *      summary: "Workspace 수정"
 *      description: "선택한 Workspace를 수정한다."
 *      parameters:
 *          - in: path
 *            name: site_id
 *            required: false
 *            description: site ID
 *            schema :
 *              type: integer
 *          - in: path
 *            name: workspace_id
 *            required: false
 *            description: workspace ID
 *            schema:
 *              type: integer
 *      requestBody:
 *        description: workspace 수정에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: test Cobot Area
 *                ip_address:
 *                  type: string
 *                  example: 255.255.255.255
 *                type:
 *                  type: int
 *                  example: 0
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/editWorkspace'
 *        "404":
 *          $ref: '#/components/responses/404/editWorkspace'
 */
router.put('/:id/Workspace/:wid', control.EditWorkspace);

/**
 * @swagger
 * paths:
 *  /site/{site_id}/Workspace/{workspace_id}:
 *    delete:
 *      tags: [Workspace]
 *      summary: "Workspace 삭제"
 *      description: "선택한 Workspace를 삭제한다."
 *      parameters:
 *          - in: path
 *            name: site_id
 *            required: false
 *            description: site ID
 *            schema :
 *              type: integer
 *          - in: path
 *            name: workspace_id
 *            required: false
 *            description: workspace ID
 *            schema:
 *              type: integer
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/deleteWorkspace'
 *        "404":
 *          $ref: '#/components/responses/404/deleteWorkspace'
 */
router.delete('/:id/Workspace/:wid', control.DeleteWorkspace);

router.param('wid', (req, res, next, value) => {
    req.w_id = value;
    next()
})


module.exports = router;