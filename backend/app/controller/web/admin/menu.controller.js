const model = require("../../../database/models/index");
const responseStatus = require("../../../helper/responseStatus");
const myFunction = require("../../../helper/myFunction");
const messages = require("../../../helper/messages");
const config = require("../../../config/config");
const {
    Op
} = require("sequelize");

const logMiddleware = require("../../../middleware/log.middleware");

const uploadFile = require("../../../middleware/upload.middleware");

exports.showMenu = async (req, res, next) => {
    try {
        await uploadFile(req, res);

        data = req.decrypted.payload;

        menu = await model.gUserHasMenu.findAll({
            include: [{
                model: model.gMenu,
                as: "menus",
                where: {
                    status: 1
                }
            }],
            where: {
                [Op.and]: [{
                        idUser: data.adminId
                    },
                    {
                        read: 1
                    }
                ]
            },
            order: [
                ['order', 'ASC'],
            ]
        })

        newData = []

        var objectdlu = JSON.stringify(menu);
        var menuu = JSON.parse(objectdlu);

        await myFunction.asyncForEach(menu, async (element, index) => {
            await myFunction.waitFor(1);
            if (element.menus.subMenu) {

                subMenu = await model.gMenu.findAll({
                    where: {
                        [Op.and]: [{
                                subMenuId: element.menus.id
                            },
                            {
                                status: 1
                            }
                        ]
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ]
                })
                menuu[index].menus.subMenuItem = subMenu;
            }
        })


        return res.status(responseStatus.OK).json({
            success: true,
            code: responseStatus.OK,
            message: messages.dataFound,
            menu: menuu
        });

    } catch (error) {
        if (error.message == messages.notAllowed) {
            return res.status(responseStatus.serverError).send({
                success: false,
                code: responseStatus.serverError,
                message: messages.fileIsNotAllowed,
            });
        } else if (error.message == messages.fileToLarge) {
            return res.status(responseStatus.serverError).send({
                success: false,
                code: responseStatus.serverError,
                message: messages.fileToLargeMessage,
            });
        }
    }
}