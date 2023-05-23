/**
 * @swagger
 * tags:
 *   name: AMR
 *   description: AMR 조회, 수정
 *   
*/
const router = require("express").Router();
const controller = require("../control/control_amr");

/**
 * @swagger
 * paths:
 *  /amr/{amr_id}:
 *    put:
 *      summary: "AMR 수정"
 *      description: "AMR 수정시 사용한다."
 *      parameters:
 *          - in: path
 *            name: amr_id
 *            required: false
 *            description: AMR ID
 *            schema :
 *              type: integer
 *      requestBody:
 *        description: AMR 수정에 필요한 정보
 *        request: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                position_x:
 *                  type: number
 *                  example: 0
 *                position_y:
 *                  type: number
 *                  example: 0
 *                position_z:
 *                  type: number
 *                  example: 0
 *                rotation_u:
 *                  type: number
 *                  example: 0
 *                rotation_v:
 *                  type: number
 *                  example: 0
 *                rotation_w:
 *                  type: number
 *                  example: 0
 *                status:
 *                  type: integer
 *                  example: 0
 *                operation:
 *                  type: integer
 *                  example: 0
 *                reg_date:
 *                  type: string
 *                  example: "reg_date"
 *      tags: [AMR]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/editAMR'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.put('/:id', controller.updateAMR);

/**
 * @swagger
 * paths:
 *  /amr/{amr_id}/info:
 *    get:
 *      summary: "AMR 정보 조회"
 *      description: "해당 AMR의 정보를 조회한다."
 *      parameters:
 *          - in: path
 *            name: amr_id
 *            required: false
 *            description: AMR ID
 *            schema :
 *              type: integer
 *      tags: [AMR]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/AMR'
 *        "404":
 *          $ref: '#/components/responses/404/AMR'
 */
router.get('/:id/info', controller.getPosition);

router.param('id', (req, res, next, value) => {
    req.id = value;
    next()
})

module.exports = router;