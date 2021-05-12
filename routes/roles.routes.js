import express from 'express';
const { Router } = express;
const router = Router()
import Right from '../models/Right.js'
import Users_GroupRole from '../models/Users_GroupRoles.js'

router.get('/roles/:role/:groupId', async (req, res) => {
    try {
        let roles = await Users_GroupRole.find({
            role: req.params.role,
            group_id: req.params.groupId
        })
        res.json(roles)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.get('/role_define/:user_name/:groupId', async (req, res) => {
    try {
        let role = await Users_GroupRole.findOne({
            user_name: req.params.user_name,
            group_id: req.params.groupId
        })
        res.json(role)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.get('/roles_all/:groupId', async (req, res) => {
    try {
        let roles = await Users_GroupRole.find({
            group_id: req.params.groupId
        })
        res.json(roles)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.put('/roles_update/:user_name/:groupId', async (req, res) => {
    try {
        let roles = await Users_GroupRole.updateOne({
            group_id: req.params.groupId,
            user_name: req.params.user_name
        },
        {role:req.body.role})
        res.json(roles)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
export default router