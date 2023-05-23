/**
 * @swagger
 * tags:
 *   name: Operation
 *   description: Operation 실행, 정지, 조회, 수정
 *   
*/
const router = require("express").Router();
const control = require("../control/control_operation");

/**
 * @swagger
 * paths:
 *  /operation/OperationStart:
 *    post:
 *      summary: "Operation 실행"
 *      description: "Operation을 실행한다."
 *      requestBody:
 *        description: Operation 실행에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                cobot_id:
 *                  type: integer
 *                  example: 1
 *                amr_id:
 *                  type: integer
 *                  example: 13
 *                order_time:
 *                  type: string
 *                  example: "1678321639621"
 *      tags: [Operation]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/affect'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.post('/OperationStart', control.OperationStart);

/**
 * @swagger
 * paths:
 *  /operation/OperationStop:
 *    post:
 *      summary: "Operation 정지"
 *      description: "Operation을 정지한다."
 *      requestBody:
 *        description: Operation 정지에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                cobot_id:
 *                  type: integer
 *                  example: 1
 *                amr_id:
 *                  type: integer
 *                  example: 13
 *                end_time:
 *                  type: string
 *                  example: "1678321639621"
 *                o_id:
 *                  type: integer
 *                  example: 133
 *      tags: [Operation]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/affect'
 *        "404":
 *          $ref: '#/components/responses/404/editEquip'
 */
router.post('/OperationStop', control.OperationStop);

/**
 * @swagger
 * paths:
 *  /operation/TaskStart:
 *    put:
 *      summary: "Task start time값 등록"
 *      description: "Task start time값 등록시 사용한다."
 *      requestBody:
 *        description: Task start time값 등록에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                o_id:
 *                  type: integer
 *                  example: 133
 *                task:
 *                  type: integer
 *                  example: 1
 *                order_time:
 *                  type: string
 *                  example: "1678321639621"
 *                start_time:
 *                  type: string
 *                  example: "1678426637443"
 *      tags: [Operation]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/affect'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.put('/TaskStart', control.StartTask);

/**
 * @swagger
 * paths:
 *  /operation/TaskEnd:
 *    put:
 *      summary: "Task end time값 등록"
 *      description: "Task end time값 등록시 사용한다."
 *      requestBody:
 *        description: Task end time값 등록에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                o_id:
 *                  type: integer
 *                  example: 133
 *                task:
 *                  type: integer
 *                  example: 1
 *                order_time:
 *                  type: string
 *                  example: "1678321639621"
 *                end_time:
 *                  type: string
 *                  example: "1678426654472"
 *      tags: [Operation]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/affect'
 *        "404":
 *          $ref: '#/components/responses/404/endTask'
 */
router.put('/TaskEnd', control.EndTask);

/**
 * @swagger
 * paths:
 *  /operation/TaskAdd:
 *    post:
 *      summary: "Task 추가"
 *      description: "Task 추가시 사용한다."
 *      requestBody:
 *        description: Task 추가에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                o_id:
 *                  type: integer
 *                  example: 133
 *                task:
 *                  type: integer
 *                  example: 1
 *                order_time:
 *                  type: string
 *                  example: "1678321639621"
 *      tags: [Operation]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/addTask'
 *        "404":
 *          $ref: '#/components/responses/404/addTask'
 */
router.post('/TaskAdd', control.AddTask);

/**
 * @swagger
 * paths:
 *  /operation/ObjectUpdate:
 *    put:
 *      summary: "Object 수정"
 *      description: "Object 수정시 사용한다."
 *      requestBody:
 *        description: Object 수정에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                o_id:
 *                  type: integer
 *                  example: 133
 *                cluster:
 *                  type: string
 *                  example: "[]"
 *                moving:
 *                  type: string
 *                  example: "[]"
 *                movedone:
 *                  type: string
 *                  example: "[]"
 *      tags: [Operation]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/editObject'
 *        "404":
 *          $ref: '#/components/responses/404/editObject'
 */
router.put('/ObjectUpdate', control.UpdateObject);

router.param('id', (req, res, next, value) => {
    req.id = value;
    next()
})

/**
 * @swagger
 * paths:
 *  /operation/{operation_id}:
 *    get:
 *      summary: "Operation 정보 조회"
 *      description: "해당 Operation의 정보를 조회한다."
 *      parameters:
 *          - in: path
 *            name: operation_id
 *            required: false
 *            description: Operation ID
 *            schema :
 *              type: integer
 *      tags: [Operation]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/operation'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.get('/:id', control.GetOperation);

/**
 * @swagger
 * paths:
 *  /operation/{operation_id}/CurrentTask:
 *    get:
 *      summary: "CurrentTask 정보 조회"
 *      description: "해당 Operation의 CurrentTask 정보를 조회한다."
 *      parameters:
 *          - in: path
 *            name: operation_id
 *            required: false
 *            description: Operation ID
 *            schema :
 *              type: integer
 *      tags: [Operation]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/ctask'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.get('/:id/CurrentTask', control.GetCurrentTask);

/**
 * @swagger
 * paths:
 *  /operation/{operation_id}/GetObject:
 *    get:
 *      summary: "Object 정보 조회"
 *      description: "해당 Operation의 Object 정보를 조회한다."
 *      parameters:
 *          - in: path
 *            name: operation_id
 *            required: false
 *            description: Operation ID
 *            schema :
 *              type: integer
 *      tags: [Operation]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/object'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.get('/:id/GetObject', control.GetObject);

module.exports = router;