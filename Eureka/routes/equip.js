/**
 * @swagger
 * tags:
 *   name: Equips
 *   description: 장치 추가, 조회, 수정, 삭제
 *   
*/

/**
 * @swagger
 * tags:
 *   name: Type
 *   description: 장치 타입 추가, 조회, 수정, 삭제
 *   
*/

const router = require("express").Router();
const control = require("../control/control_equip");

/**
 * @swagger
 * paths:
 *  /equip/List/{workspace_id}:
 *    get:
 *      summary: "장치 목록 조회"
 *      description: "해당 workspace의 장치 목록을 조회한다."
 *      parameters:
 *          - in: path
 *            name: workspace_id
 *            required: false
 *            description: Workspace ID
 *            schema :
 *              type: integer
 *      tags: [Equips]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/equips'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.get('/List/:id', control.List);

/**
 * @swagger
 * paths:
 *  /equip/{equip_id}/child:
 *    get:
 *      summary: "하위 장치 조회"
 *      description: "해당 장치의 하위 장치를 조회한다."
 *      parameters:
 *          - in: path
 *            name: equip_id
 *            required: false
 *            description: Equip ID
 *            schema :
 *              type: integer
 *      tags: [Equips]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/equips'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.get('/:id/child', control.GetChild);

/**
 * @swagger
 * paths:
 *  /equip:
 *    post:
 *      summary: "장치 추가"
 *      description: "장치 추가시 사용한다."
 *      requestBody:
 *        description: 장치 추가에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ws_id:
 *                  type: integer
 *                  example: 1
 *                parent_id:
 *                  type: integer
 *                  description: parent의 id를 포함하거나 최상위로 등록시 null
 *                  example: 1
 *                name:
 *                  type: string
 *                  description: 장치의 이름
 *                  example: 로봇 이름
 *                p_location:
 *                  type: string
 *                  description: 위치 정보
 *                  example: null
 *                type:
 *                  type: integer
 *                  description: Equip type id
 *                  example: 1
 *      tags: [Equips]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/addEquip'
 *        "404":
 *          $ref: '#/components/responses/404/addEquip'
 */
router.post('/', control.EquipAdd);

/**
 * @swagger
 * paths:
 *  /equip/{equip_id}:
 *    get:
 *      summary: "장치 조회"
 *      description: "해당 장치의 정보를 조회한다."
 *      parameters:
 *          - in: path
 *            name: equip_id
 *            required: false
 *            description: Equip ID
 *            schema :
 *              type: integer
 *      tags: [Equips]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/equips'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.get('/:id', control.EquipGet);

/**
 * @swagger
 * paths:
 *  /equip/{equip_id}:
 *    put:
 *      summary: "장치 수정"
 *      description: "장치 수정시 사용한다."
 *      parameters:
 *          - in: path
 *            name: equip_id
 *            required: false
 *            description: Equip ID
 *            schema :
 *              type: integer
 *      requestBody:
 *        description: 장치 수정에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ws_id:
 *                  type: integer
 *                  example: 1
 *                parent_id:
 *                  type: integer
 *                  description: parent의 id를 포함하거나 최상위로 등록시 parent_id 보내지 않음
 *                  example: 1
 *                name:
 *                  type: string
 *                  description: 장치의 이름
 *                  example: 로봇 이름
 *                p_location:
 *                  type: string
 *                  description: 위치 정보
 *                  example: null
 *                type:
 *                  type: integer
 *                  description: Equip type id
 *                  example: 1
 *      tags: [Equips]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/editEquip'
 *        "404":
 *          $ref: '#/components/responses/404/editEquip'
 */
router.put('/:id', control.EquipEdit);

/**
 * @swagger
 * paths:
 *  /equip/{equip_id}:
 *    delete:
 *      summary: "장치 삭제"
 *      description: "장치 삭제시 사용한다."
 *      parameters:
 *          - in: path
 *            name: equip_id
 *            required: false
 *            description: Equip ID
 *            schema :
 *              type: integer
 *      tags: [Equips]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/deleteEquip'
 *        "404":
 *          $ref: '#/components/responses/404/deleteEquip'
 */
router.delete('/:id', control.EquipDelete);


/**
 * @swagger
 * paths:
 *  /equip/Type/List:
 *    get:
 *      summary: "장치 타입 목록 조회"
 *      description: "장치의 타입 목록을 조회한다."
 *      tags: [Type]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/types'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.get('/Type/List', control.TypeList);

/**
 * @swagger
 * paths:
 *  /equip/Type:
 *    post:
 *      summary: "장치 타입 추가"
 *      description: "장치 타입 추가시 사용한다."
 *      requestBody:
 *        description: 장치 타입 추가에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: COBOT_ARM
 *                descript:
 *                  type: string
 *                  example: Cobot Arm
 *      tags: [Type]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/addType'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.post('/Type', control.TypeAdd);

/**
 * @swagger
 * paths:
 *  /equip/Type/:id:
 *    put:
 *      summary: "장치 타입 수정"
 *      description: "장치 타입 수정시 사용한다."
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Type ID
 *            schema :
 *              type: integer
 *      requestBody:
 *        description: 장치 수정에 필요한 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: COBOT_ARM
 *                descript:
 *                  type: string
 *                  example: Cobot Arm
 *      tags: [Type]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/editType'
 *        "404":
 *          $ref: '#/components/responses/404/editType'
 */
router.put('/Type/:id', control.TypeEdit);

/**
 * @swagger
 * paths:
 *  /equip/Type/:id:
 *    delete:
 *      summary: "장치 타입 삭제"
 *      description: "장치 타입 삭제시 사용한다."
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Type ID
 *            schema :
 *              type: integer
 *      tags: [Type]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/deleteType'
 *        "404":
 *          $ref: '#/components/responses/404/deleteType'
 */
router.delete('/Type/:id', control.TypeDelete);

router.param('id', (req, res, next, value) => {
    req.id = value;
    next()
})

module.exports = router;