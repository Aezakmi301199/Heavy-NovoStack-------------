import {
    db
} from "../database/db.js";
import * as fs from 'fs';
import knex from "knex";
class AdvertismentService {
    async findCriteries(criteriesObject) {
        console.log(criteriesObject)
        //  console.log(criteriesObject)
        console.log('DASDAS')
        console.log(criteriesObject)
        if (criteriesObject.category === true) {
            criteriesObject.category = await db('category').select('category', 'id')
        } 
        else if (criteriesObject.category != '' && criteriesObject.dopSettings != undefined &&
        criteriesObject.dopSettings.findIndex(dopS => dopS.category == criteriesObject.category) == -1) {
            console.log('1232')
            criteriesObject.dopSettings = await db('undercategories')
                .select('*')
                .where({
                    category: criteriesObject.category
                })
                .orderBy('undercategories.id', 'asc')
        } else if (criteriesObject.category != '' && criteriesObject.dopSettings == undefined) {
            console.log(criteriesObject.dopSettings)
            console.log('КАК ТАК??????????????7')
            criteriesObject.dopSettings = await db('undercategories')
                .select('*')
                .where({
                    category: criteriesObject.category
                })
                .orderBy('undercategories.id', 'asc')
        }
        for (var key in criteriesObject) {

            if (criteriesObject[key] == true) {
                if (key == 'brand') {
                    criteriesObject[key] = criteriesObject.brand = await db('brand').select('category', 'brand', 'id').where({
                        category: criteriesObject.category
                    })

                } else {
                    const values = await db('spares')
                        .select({
                            id: 'spares.id',
                            [key]: 'spares.value'
                        })
                        .where({
                            category: criteriesObject.category,
                            subcategory: key
                        })
                    const index = criteriesObject.dopSettings.findIndex(dopset => dopset.subcategory == key)
                    criteriesObject[key] = values
                }
                //  console.log(criteriesObject.dopSettings[key])   
            }
        }
        //   console.log(criteriesObject)
        console.log(criteriesObject)
        return criteriesObject;
    }
    async getAllAdvertisment() {
        const adverts = await db({
                advt: 'advertisment'
            }).select({
                advt_id: 'advt.id',
                user_id: 'u.id',
                user_login: 'u.login',
                title: 'advt.title',
                exposition: 'advt.exposition',
                category: 'advt.category',
                cost: 'advt.cost',
                create_at: 'advt.create_at',
                location: 'advt.location',
                mileage: 'advt.mileage',
            })
            .leftJoin({
                u: 'userclient'
            }, {
                'advt.user_id': 'u.id'
            }).orderBy('advt.id', 'desc')
        for (let i = 0; i < adverts.length; i++) {
            let pictures = await db('pictureadvertisment')
                .select('id', 'path')
                .where('pictureadvertisment.advert_id', '=', adverts[i].advt_id)
            let dopSettings = await db({
                    dopSettings: 'advertismentdopsettings'
                })
                .select({
                    subcategory: 'dopSettings.subcategory',
                    value: 'dopSettings.value',
                    unit: 'undercategories.unit'
                })
                .leftJoin('undercategories', {
                    'undercategories.subcategory': 'dopSettings.subcategory'
                })
                // .where('dopSettings.advert_id','=',id)
                .where(function () {
                    this // dopSettings.advert_id
                        .where({
                            'dopSettings.advert_id': adverts[i].advt_id
                        })
                        .andWhere({
                            'undercategories.category': adverts[i].category
                        })
                })
            adverts[i] = {
                ...adverts[i],
                pictures,
                dopSettings: dopSettings
            }
        }
        return adverts
    }
    async getAdvertismentByIDAdvert(id) {
        console.log(id)
        let advert = await db({
                advt: 'advertisment'
            }).select({
                advt_id: 'advt.id',
                user_id: 'u.id',
                user_login: 'u.login',
                title: 'advt.title',
                exposition: 'advt.exposition',
                cost: 'advt.cost',
                create_at: 'advt.create_at',
                location: 'advt.location',
                category: 'advt.category',
                mileage:'advt.mileage'
                //  cat:db.raw('select dopSettings.advert_id where dopSettings.advert_id = ?', [id])
                // 'select dopSettings.advert_id where dopSettings.advert_id = ?', [id] )
                //dopSettings: [db.raw('select advt.advert_id where advt.advert_id = ?', [id])]
                // "SELECT vote WHERE user_id = :loggedInUserId", { loggedInUserId }
                // `SELECT * WHERE advert_id = ${id}`)
            })

            .leftJoin({
                u: 'userclient'
            }, {
                'advt.user_id': 'u.id'
            }).where('advt.id', '=', id).first()
        //  .leftJoin({dopSettings:'advertismentdopsettings'},{'advt.id':'dopSettings.advert_id'})
        let pictures = await db('pictureadvertisment')
            .select('id', 'path').where('pictureadvertisment.advert_id', '=', id)

        let dopSettings = await db({
                dopSettings: 'advertismentdopsettings'
            })
            .select({
                subcategory: 'dopSettings.subcategory',
                value: 'dopSettings.value',
                unit: 'undercategories.unit'
            })
            .leftJoin('undercategories', {
                'undercategories.subcategory': 'dopSettings.subcategory'
            })
            // .where('dopSettings.advert_id','=',id)
            .where(function () {
                this // dopSettings.advert_id
                    .where({
                        'dopSettings.advert_id': id
                    })
                    .andWhere({
                        'undercategories.category': advert.category
                    })
            })
        return advert = {
            ...advert,
            pictures: pictures,
            dopSettings: dopSettings
        }
    }

    async getAllAdvertismentByUser(id) {
        let adverts = await db({
                advt: 'advertisment'
            }).select({
                advt_id: 'advt.id',
                user_id: 'u.id',
                user_login: 'u.login',
                title: 'advt.title',
                exposition: 'advt.exposition',
                cost: 'advt.cost',
                create_at: 'advt.create_at',
                location: 'advt.location',
                category: 'advt.category',
            })
            .leftJoin({
                u: 'userclient'
            }, {
                'advt.user_id': 'u.id'
            }).where('advt.user_id', '=', id).orderBy('advt.id', 'desc')
            for (let i = 0; i < adverts.length; i++) {
                let pictures = await db('pictureadvertisment')
                    .select('id', 'path')
                    .where('pictureadvertisment.advert_id', '=', adverts[i].advt_id)
                let dopSettings = await db({
                        dopSettings: 'advertismentdopsettings'
                    })
                    .select({
                        subcategory: 'dopSettings.subcategory',
                        value: 'dopSettings.value',
                        unit: 'undercategories.unit'
                    })
                    .leftJoin('undercategories', {
                        'undercategories.subcategory': 'dopSettings.subcategory'
                    })
                    // .where('dopSettings.advert_id','=',id)
                    .where(function () {
                        this // dopSettings.advert_id
                            .where({
                                'dopSettings.advert_id': adverts[i].advt_id
                            })
                            .andWhere({
                                'undercategories.category': adverts[i].category
                            })
                    })
                adverts[i] = {
                    ...adverts[i],
                    pictures,
                    dopSettings: dopSettings
                }
            }
            return adverts
    }
    async createAdvertisment(advertWithMainSettings, dopSettings, pictures = [], id) {
    
        console.log('CREATE')

        advertWithMainSettings.cost = advertWithMainSettings.cost.replace(/ /g, '')
        advertWithMainSettings.mileage = advertWithMainSettings.mileage.replace(/ /g, '')
        pictures = Array.isArray(pictures) ? pictures : [pictures]
        advertWithMainSettings = {
            user_id: id,
            ...advertWithMainSettings.title ? {
                title: advertWithMainSettings.title
            } : {},
            ...advertWithMainSettings.category ? {
                category: advertWithMainSettings.category
            } : {},
            ...advertWithMainSettings.mileage ? {
                mileage: advertWithMainSettings.mileage
            } : {},
            ...advertWithMainSettings.exposition ? {
                exposition: advertWithMainSettings.exposition
            } : {},
            ...advertWithMainSettings.location ? {
                location: advertWithMainSettings.location
            } : {},
            ...advertWithMainSettings.exposition ? {
                exposition: advertWithMainSettings.exposition
            } : {},
            ...advertWithMainSettings.cost ? {
                cost: advertWithMainSettings.cost
            } : {},
            ...advertWithMainSettings.brand ? {
                brand: advertWithMainSettings.brand
            } : {},
        }

        const [{
            id: idAdvert
        }] = await db('advertisment').insert({
            ...advertWithMainSettings
        }).returning('id')

        const pathToDirAdvert = `${process.cwd()}/stor/adverts`;
        const pathToDirUser = `${pathToDirAdvert}/${id}`;
        const pathToAdvert = `${pathToDirUser}/${idAdvert}`;
        fs.stat(pathToDirUser, function (err, stats) {
            if (err) {
                console.log('Norm2.0')
                fs.mkdir(`${pathToAdvert}`, {
                    recursive: true
                }, (err) => {
                    console.log('pzdc')
                    if (err) {
                        console.log('Norm3.0')
                        console.log(err)
                    } else {
                        for (let i = 0; i < pictures.length; i++) {
                            pictures[i].mv(`${pathToAdvert}/${pictures[i].name}`, function (err) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                    }
                })
            } else {
                fs.mkdir(`${pathToAdvert}`, (err) => {
                    if (err) {
                        console.log('ошибка на 75 стр')
                    } else {
                        for (let i = 0; i < pictures.length; i++) {
                            pictures[i].mv(`${pathToAdvert}/${pictures[i].name}`, function (err) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                    }
                })
            }
        })
        for (let i = 0; i < pictures.length; i++) {
            console.log('ФОТО')
            await db('pictureadvertisment').insert({
                advert_id: idAdvert,
                path: `/adverts/${id}/${idAdvert}/${pictures[i].name}`,
            })
        }
        console.log('gde-to')
        console.log(dopSettings)
        for (let i = 0; i < dopSettings.length; i++) {
            if(dopSettings[i].value && dopSettings[i].id) {
                await db('advertismentdopsettings')
                .insert({
                    advert_id: idAdvert,
                    subcategory: dopSettings[i].subcategory,
                    value: dopSettings[i].value
                })
            }
            //   let dopsetting = {[Object.keys(dopSettings)[i]]:Object.values(dopSettings)[i]}
            
        }
        return idAdvert
    }
    async updateAdvertisment(advertWithMainSettings, dopSettings, pictures,deletePic, id) {

        console.log(deletePic)
        console.log('RAS')
        console.log(dopSettings)
        let advt_id = advertWithMainSettings.advt_id
        console.log(pictures.length)
        console.log('NADO LUBA')
        console.log(deletePic)
        let idAdvert= advertWithMainSettings.advt_id
        console.log(idAdvert)
        advertWithMainSettings.cost = typeof (advertWithMainSettings.cost) == 'string' ? advertWithMainSettings.cost.replace(/ /g, '') : advertWithMainSettings.cost
        advertWithMainSettings.mileage = typeof (advertWithMainSettings.mileage) == 'string' ? advertWithMainSettings.mileage.replace(/ /g, '') : advertWithMainSettings.mileage
        advertWithMainSettings = {
            user_id: id,
            ...advertWithMainSettings.title ? {
                title: advertWithMainSettings.title
            } : {},
            ...advertWithMainSettings.category ? {
                category: advertWithMainSettings.category
            } : {},
            ...advertWithMainSettings.mileage ? {
                mileage: advertWithMainSettings.mileage
            } : {},
            ...advertWithMainSettings.exposition ? {
                exposition: advertWithMainSettings.exposition
            } : {},
            ...advertWithMainSettings.location ? {
                location: advertWithMainSettings.location
            } : {},
            ...advertWithMainSettings.exposition ? {
                exposition: advertWithMainSettings.exposition
            } : {},
            ...advertWithMainSettings.cost ? {
                cost: advertWithMainSettings.cost
            } : {},
        }
        await db('advertisment').update(
            advertWithMainSettings
        ).where({
            id: idAdvert
        })
        const pathToDirAdvert = `${process.cwd()}/stor/adverts`;
        const pathToDirUser = `${pathToDirAdvert}/${id}`;
        const pathToAdvert = `${pathToDirUser}/${idAdvert}`;
        fs.stat(pathToDirUser, function (err, stats) {
            if (err) {
                console.log('Norm2.0')
                fs.mkdir(`${pathToAdvert}`, {
                    recursive: true
                }, (err) => {
                    console.log('pzdc')
                    if (err) {
                        console.log('Norm3.0')
                        console.log(err)
                    } else {
                        for (let i = 0; i < pictures.length; i++) {
                            pictures[i].mv(`${pathToAdvert}/${pictures[i].name}`, function (err) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                    }
                })
            } else {
                for (let i = 0; i < pictures.length; i++) {
                    pictures[i].mv(`${pathToAdvert}/${pictures[i].name}`, function (err) {
                        if (err) {
                            console.log('AF')
                            console.log(err)
                        }  
                    })
                }
            }
        })
        for (let i = 0; i < pictures.length; i++) {
            await db('pictureadvertisment').insert({
                advert_id: idAdvert,
                path: `/adverts/${id}/${idAdvert}/${pictures[i].name}`,
            })
        }

        for (let i = 0; i < dopSettings.length; i++) {
            if (dopSettings[i].value) {
                const rez = await db('advertismentdopsettings')
                .update({
                    advert_id: advt_id,
                    subcategory:dopSettings[i].subcategory,
                    value: dopSettings[i].value
                }).where({
                    advert_id: advt_id,
                    subcategory: dopSettings[i].subcategory
                })
                if (rez == 0) {
                    console.log('vhod')
                    await db('advertismentdopsettings').insert({
                        advert_id: advt_id,
                        subcategory:dopSettings[i].subcategory,
                        value: dopSettings[i].value
                    })
                }
            }  else {
                const rez = await db('advertismentdopsettings').del().where({
                    advert_id: advt_id,
                    subcategory: dopSettings[i].subcategory
                })
            }
        }

        for (let i = 0; i < deletePic.length; i++) {
                await db('pictureadvertisment')
                .del().where({id:deletePic[i].id});
                fs.unlink(`${deletePic[i].path}`,function(err){
                    if(err) return console.log(err);})
        }
        console.log('YES')
        console.log(dopSettings)
        return dopSettings
    }

    async getAllFilteredAdvertisment(mainSettings, dopSettings = []) {
        console.log("LOL")
        console.log(mainSettings)
        console.log(dopSettings)
        if (mainSettings.sort) {
            let sorted = mainSettings.sort.split('/')
            mainSettings.sort = {
                sortBY: sorted[0],
                value: sorted[1]
            }
            console.log(mainSettings)
        }
        mainSettings = {
            ...mainSettings.category ? {
                category: mainSettings.category
            } : {},
            ...mainSettings.mileage ? {
                mileage: mainSettings.mileage
            } : {},
            ...mainSettings.cost ? {
                cost: {
                    min: mainSettings.cost.min * 1000,
                    max: mainSettings.cost.max * 1000
                }
            } : {},
            //    ...mainSettings.cost ? {cost:{min:mainSettings.cost.min*1000,max:mainSettings.cost.max*1000}} : {},
            ...mainSettings.sort ? {
                sort: mainSettings.sort
            } : {
                sort: {
                    sortBY: 'id',
                    value: 'desc'
                }
            },
            ...mainSettings.brand ? {
                brand: mainSettings.brand
            } : {},
            //cost: { min: 1288, max: 8961}
        }
        console.log('ASD')
        console.log(mainSettings)
        let adverts = await db({
                advt: 'advertisment'
            }).select({
                advt_id: 'advt.id',
                user_id: 'u.id',
                user_login: 'u.login',
                title: 'advt.title', // .raw('select * from users where id = ?', [1])
                exposition: 'advt.exposition',
                cost: 'advt.cost',
                create_at: 'advt.create_at',
                location: 'advt.location',
                category: 'advt.category', //.raw('select * from advertismentdopsettings where advert_id = ?', [26])
                //  const {rows} = await db.raw('select * from advertismentdopsettings where advert_id = ?', [26])
            })
            .leftJoin({
                u: 'userclient'
            }, {
                'advt.user_id': 'u.id'
            }).orderBy(`advt.${mainSettings.sort.sortBY}`, `${mainSettings.sort.value}`)
            //.leftJoin({dopSettings:'advertismentdopsettings'},{'advt.id':'dopSettings.advert_id'})
            .where(function () {
                for (let i = 0; i < Object.keys(mainSettings).length; i++) {
                    switch (Object.keys(mainSettings)[i]) {
                        case 'category':
                            this
                                .where('advt.category', mainSettings.category)
                            break;
                        case 'cost':
                            this
                                .where('advt.cost', '>', mainSettings.cost.min)
                                .andWhere('advt.cost', '<', mainSettings.cost.max)
                            break;
                        case 'mileage':
                            if (mainSettings.mileage.min) {
                                this
                                    .where('advt.mileage', '>', mainSettings.mileage.min)
                            }
                            if (mainSettings.mileage.max) {
                                this
                                    .where('advt.mileage', '<', mainSettings.mileage.max)
                            }
                            break;
                        case 'brand':
                            this
                                .where('advt.brand', mainSettings.brand)
                            break;
                        default:
                            break
                    }
                }

            })
        console.log(adverts)
        console.log('VHOD')
        console.log('С ФРОНТА ДОПЫ')
        let filteredID = []
        if (dopSettings.length != 0) {
            for (let i = 0; i < adverts.length; i++) {
                console.log('ИЗМ')
                console.log(dopSettings)
                console.log(dopSettings.length)
                var dops = await db({
                        dopSettings: 'advertismentdopsettings'
                    })
                    .select('subcategory', 'value', 'advert_id')
                    .where({
                        advert_id: adverts[i].advt_id
                    }).orderBy('dopSettings.id', 'asc')
                console.log('ДОПЫ')
                console.log(dops)

                if (dops.length != 0 && dops.length >= dopSettings.length) {
                    console.log('СЮДА ЗАШёл?')
                    var count = 0;
                    dopSettings.forEach((curr, idx) => {
                        if (curr.subcategorytype && curr.min != null) {
                            console.log(idx)
                            console.log(curr.min)
                            console.log(curr.max)
                            console.log(dops[idx].value)
                            console.log(curr.min <= Number(dops[idx].value))
                            console.log(curr.max >= Number(dops[idx].value))

                            if (curr.min <= Number(dops[idx].value) && curr.max >= Number(dops[idx].value)) {
                                console.log('УСПЕХ')
                                count++
                                console.log(count)
                            } else {
                                count--
                            }
                        } else {
                            console.log('ЗАХОД')
                            console.log(curr.value)
                            console.log(dops[idx].value)
                            if (curr.value == dops[idx].value || curr.value == '' || curr.value == undefined) {
                                count++
                            }
                        }

                    })
                    console.log(count)
                    console.log(dopSettings.length)
                    if (count == dopSettings.length) {
                        console.log(count)
                        console.log(dopSettings.length)
                        console.log('ОДИН СЧЁТЧИК')
                        console.log(adverts[i].advt_id)
                        console.log(filteredID)
                        filteredID.push(adverts[i].advt_id)
                    }
                    console.log(`${count} - счёт`);
                }
            }
            console.log('LADA')
            console.log(filteredID)
            filteredID = filteredID.length == 0 ? null : filteredID
        }


        console.log(filteredID)
        console.log('PZDC')
        console.log(filteredID)
        if (filteredID == null) {
            console.log('ZDES?')
            console.log(filteredID == false)
            adverts = []
        } else if (filteredID.length) {
            console.log('СТРОКА 285')
            adverts = adverts.filter(adv => filteredID.includes(adv.advt_id))
        }


        for (let i = 0; i < adverts.length; i++) {
            let pictures = await db('pictureadvertisment')
                .select('id', 'path')
                .where('pictureadvertisment.advert_id', '=', adverts[i].advt_id)
            let dopSettings = await db({
                    dopSettings: 'advertismentdopsettings'
                })
                .select({
                    subcategory: 'dopSettings.subcategory',
                    value: 'dopSettings.value',
                    unit: 'undercategories.unit'
                })
                .leftJoin('undercategories', {
                    'undercategories.subcategory': 'dopSettings.subcategory'
                })
                // .where('dopSettings.advert_id','=',id)
                .where(function () {
                    this // dopSettings.advert_id
                        .where({
                            'dopSettings.advert_id': adverts[i].advt_id
                        })
                        .andWhere({
                            'undercategories.category': adverts[i].category
                        })
                })
            adverts[i] = {
                ...adverts[i],
                pictures,
                dopSettings
            }
        }
        console.log(adverts)
        return adverts
    }
    async deleteAdvert(id) {
        await db('advertisment').del().where({
            id
        })
        return id
    }

}

export default new AdvertismentService();
