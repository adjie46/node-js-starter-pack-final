const myFunction = require("../helper/myFunction");
const config = require("../config/config");
var path = require('path');
const fs = require('fs');

const {
    log
} = require("console");

exports.dashboardPage = async (req, res) => {

    let pages = req.query;
    let dataDashboard = {};
    let token = req.session.tokenLogin

    data = null
    myProfile = {};

    var webProfile;

    await myFunction.API_SERVICE(`webProfile`, 'get', null)
        .then(response => {
            webProfile = response.data[0]
        })
        .catch(response => {
            console.log(response);
            return res.status(response.code).json({
                success: response.success,
                code: response.code,
                message: response.message,
                data: []
            });
        })

    await myFunction.API_SERVICE('profile', 'get', data, token)
        .then(response => {
            if (response.success) {

                myProfile = {
                    id: response.data.id,
                    fullName: response.data.adminName,
                    emailAddress: response.data.adminEmail,
                    adminPhone: response.data.adminPhone,
                    adminRole: response.data.adminRole
                }
            } else {
                if (response.code == 401) {
                    req.session.destroy((err) => {
                        res.redirect("/");
                    });
                }
            }
        })
        .catch(response => {
            res.redirect("/404");
        })

    if (myFunction.isEmpty(pages)) {
        dataDashboard.curent_pages = "dashboard";
    } else {
        dataDashboard.curent_pages = pages.pages
    }

    await myFunction.API_SERVICE(`menu`, 'get', null, req.session.tokenLogin)
        .then(async response => {
            if (dataDashboard.curent_pages != "dashboard") {

                var result
                result = response.menu.filter(function (obj, index) {
                    var data = obj.menus.id === dataDashboard.curent_pages;
                    return data;
                })

                if (result.length == 0) {
                    result = response.menu.filter(function (obj, index) {
                        var data = obj.menus.type === 2;
                        return data;
                    })
                }

                myProfile.permission = result[0]

                var fileContents;
                try {
                    fileContents = fs.readdirSync(`./app/view/pages/${result[0].menus.menuLink}`).forEach(file => {
                        if (file != "") {
                            myProfile.module = true
                        } else {
                            myProfile.module = false
                        }
                    });
                } catch (err) {
                    myProfile.module = false
                }

                //GET DATA
                if (result[0].menus.menuLink == "setting_api") {
                    await myFunction.API_SERVICE(`/settings/api-key`, 'get', null, req.session.tokenLogin)
                        .then(response => {
                            dataDashboard.data_api = response
                        })
                        .catch(response => {
                            res.redirect("/404");
                        })
                }

            }
        })
        .catch(response => {
            res.redirect("/404");
        })

    return res.render("dashboard", {
        csrfToken: req.csrfToken(),
        data: myProfile,
        dataDashboard: dataDashboard,
        web: webProfile,
        includeCss: function () {
            if (!myFunction.isEmpty(myProfile.permission)) {
                if (myProfile.permission.menus.menuLink == "setting_api") {
                    return `${myProfile.permission.menus.menuLink}/css`;
                } else if (myProfile.permission.menus.menuLink == "setting_website") {
                    return `${myProfile.permission.menus.menuLink}/css`;
                } else {
                    return 'blank';
                }
            } else {
                return 'blank';
            }

        },
        includeJs: function () {
            if (!myFunction.isEmpty(myProfile.permission)) {
                if (myProfile.permission.menus.menuLink == "setting_api") {
                    return `${myProfile.permission.menus.menuLink}/js`;
                } else if (myProfile.permission.menus.menuLink == "setting_website") {
                    return `${myProfile.permission.menus.menuLink}/js`;
                } else {
                    return 'blank';
                }
            } else {
                return 'blank';
            }

        },
        whichPartial: function () {
            if (!myFunction.isEmpty(myProfile.permission)) {
                if (myProfile.permission.menus.menuLink == "setting_api") {
                    return `${myProfile.permission.menus.menuLink}/index`;
                } else if (myProfile.permission.menus.menuLink == "setting_website") {
                    return `${myProfile.permission.menus.menuLink}/index`;
                } else if (myProfile.permission.menus.menuLink == "setting_user") {
                    return `${myProfile.permission.menus.menuLink}/index`;
                } else {
                    return 'blank';
                }
            } else {
                return 'blank';
            }
        }
    });
}