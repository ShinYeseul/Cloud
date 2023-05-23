/**
 * @swagger
 * tags:
 *   name: Cobot
 *   description: 로봇팔 조회, 수정
 *   
*/
const router = require("express").Router();
const controller = require("../control/control_cobot");

/**
 * @swagger
 * paths:
 *  /cobot/{cobot_id}:
 *    put:
 *      summary: "로봇팔 수정"
 *      description: "로봇팔 수정시 사용한다."
 *      parameters:
 *          - in: path
 *            name: cobot_id
 *            required: false
 *            description: Cobot ID
 *            schema :
 *              type: integer
 *      requestBody:
 *        description: 로봇팔 수정에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                position_x:
 *                  type: number
 *                  example: 0.00517982
 *                position_y:
 *                  type: number
 *                  example: -0.185095
 *                position_z:
 *                  type: number
 *                  example: 1.32842
 *                rotation_u:
 *                  type: number
 *                  example: 179.745
 *                rotation_v:
 *                  type: number
 *                  example: 179.572
 *                rotation_w:
 *                  type: number
 *                  example: 179.987
 *                joint1:
 *                  type: number
 *                  example: -0.0000453981
 *                joint2:
 *                  type: number
 *                  example: 0.000544777
 *                joint3:
 *                  type: number
 *                  example: -0.000181592
 *                joint4:
 *                  type: number
 *                  example: 0.000217551
 *                joint5:
 *                  type: number
 *                  example: 0
 *                joint6:
 *                  type: number
 *                  example: 0.000108776
 *                status:
 *                  type: integer
 *                  example: 0
 *                operation:
 *                  type: integer
 *                  example: 0
 *                gripper:
 *                  type: integer
 *                  example: 660
 *                reg_date:
 *                  type: string
 *                  example: "reg_date"
 *      tags: [Cobot]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/editCobot'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.put('/:id', controller.updateCobot);

/**
 * @swagger
 * paths:
 *  /cobot/{cobot_id}/info:
 *    get:
 *      summary: "로봇팔 정보 조회"
 *      description: "해당 로봇팔의 정보를 조회한다."
 *      parameters:
 *          - in: path
 *            name: cobot_id
 *            required: false
 *            description: Cobot ID
 *            schema :
 *              type: integer
 *      tags: [Cobot]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/cobot'
 *        "404":
 *          $ref: '#/components/responses/404/cobot'
 */
router.get('/:id/info', controller.getInfo);

router.param('id', (req, res, next, value) => {
    req.id = value;
    next()
})

module.exports = router;