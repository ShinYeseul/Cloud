/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가, 조회, 수정, 삭제
 */
var express = require('express');
var router = express.Router();
const user = require("../control/control_user");

/**
 * @swagger
 * paths:
 *  /user:
 *    get:
 *      summary: "유저 목록 조회"
 *      description: "현재 가입된 유저의 정보를 모두 조회한다."
 *      tags: [Users]
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/user'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 */
router.get('/', user.List);

/**
 * @swagger
 * paths:
 *  /user:
 *    post:
 *      summary: "유저 추가"
 *      description: "유저 추가시 사용한다."
 *      tags: [Users]
 *      requestBody:
 *        description: 유저 추가에 필요한 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: string
 *                  example: test@test.com
 *                password:
 *                  type: string
 *                  example: 1q2w3e4r!@
 *                permission:
 *                  type: integer
 *                  example: 1
 *                manage_site:
 *                  type: integer
 *                  example: 1
 *                name:
 *                  type: string
 *                  example: username
 *                phone:
 *                  type: string
 *                  example: 82-10-1234-5678
 *                address:
 *                  type: string
 *                  example: seoul
 *                  
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/addUser'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 *        "409":
 *          $ref: '#/components/responses/409/error'
 *        "500":
 *          $ref: '#/components/responses/500/error'
 */
router.post('/', user.Add);

/**
 * @swagger
 * paths:
 *  /user/info:
 *    post:
 *      summary: "유저 정보"
 *      description: "유저 정보 조회시 사용한다."
 *      tags: [Users]
 *      requestBody:
 *        description: 유저 조회에 필요한 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: string
 *                  example: test@test.com
 *                password:
 *                  type: string
 *                  example: 1q2w3e4r!@
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/info'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 *        "500":
 *          $ref: '#/components/responses/500/error'
 */
router.post('/info', user.Info);

/**
 * @swagger
 * paths:
 *  /user:
 *    put:
 *      summary: "유저 수정"
 *      description: "유저 수정시 사용한다."
 *      tags: [Users]
 *      requestBody:
 *        description: 유저 수정에 필요한 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: string
 *                  example: test@test.com
 *                password:
 *                  type: string
 *                  example: 1q2w3e4r!@
 *                permission:
 *                  type: integer
 *                  example: 1
 *                manage_site:
 *                  type: integer
 *                  example: 1
 *                name:
 *                  type: string
 *                  example: username
 *                phone:
 *                  type: string
 *                  example: 82-10-1234-5678
 *                address:
 *                  type: string
 *                  example: seoul
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/editUser'
 *        "404":
 *          $ref: '#/components/responses/404/error'
 *        "500":
 *         $ref:  '#/components/responses/500/error'
 */
router.put('/', user.Edit);

/**
 * @swagger
 * paths:
 *  /user:
 *    delete:
 *      summary: "유저 삭제"
 *      description: "유저를 삭제시 사용한다."
 *      tags: [Users]
 *      requestBody:
 *        description: 유저 삭제에 필요한 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: string
 *                  example: test@test.com
 *                password:
 *                  type: string
 *                  example: 1q2w3e4r!@
 *      responses:
 *        "200":
 *          $ref: '#/components/responses/200/deleteUser'
 *        "404":
 *          $ref: '#/components/responses/404/deleteUser'
 *        "500":
 *          $ref: '#/components/responses/500/error'
 */
router.delete('/', user.Disable);

/**
 * @swagger
 * paths:
 *  /user/login:
 *    post:
 *      summary: "유저 로그인"
 *      description: "유저 로그인시 사용한다. (보안 미적용상태)"
 *      tags: [Users]
 *      requestBody:
 *        description: 유저 로그인에 필요한 정보
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user_id:
 *                  type: string
 *                  example: test@test.com
 *                password:
 *                  type: string
 *                  example: 1q2w3e4r!@
 *      responses:
 *        "Success":
 *          $ref: '#/components/responses/login/Success'
 *        "Wrong_ID":
 *          $ref: '#/components/responses/404/WrongId'
 *        "Wrong_Password":
 *          $ref: '#/components/responses/404/WrongPassword'
 *        "Permission_Denied":
 *          $ref: '#/components/responses/404/PermissionDenied'
 */
router.post('/login', user.Login);

module.exports = router;
