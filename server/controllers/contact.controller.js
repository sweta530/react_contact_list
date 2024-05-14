const Contact = require('../models/contact.model')
const { v4: uuidv4 } = require('uuid');
const { successResponse, errorResponse, catchResponse, getFileExtension, getBaseUrl } = require('../utility')
const { addContactValidation } = require('./validation/contact.validation')
const fs = require('fs');

exports.getall = async function (req, res) {
    try {
        let contact = await Contact.find()
        if (contact == null) {
            return errorResponse(res, {}, 'There is No Contacts available', 400)
        }

        if (contact.length > 0) {
            for (let i = 0; i < contact.length; i++) {
                if (contact[i].profile_image != '') {
                    let base_url = req.protocol + "://" + req.headers.host
                    let image = `/images/contact_image/${contact[i].profile_image}`;
                    contact[i].profile_image = `${base_url}${image}`;
                }
            }
        }

        return successResponse(res, contact, 'Contact details', 200)
    } catch (e) {
        return catchResponse(res, {}, e, 'Something went wrong', 500)
    }
}

exports.add = async function (req, res) {
    const { error, isValid } = addContactValidation(req.body)

    if (!isValid) {
        return errorResponse(res, error, "Invalid Request", 400)
    }

    try {
        let image_name = ''
        if (req.files != null) {
            let image = req.files.profile_image
            image_name = req.files.profile_image.name
            let file_extension = getFileExtension(image_name)
            image_name = `${uuidv4()}.${file_extension}`

            await image.mv(`public/images/contact_image/${image_name}`);
        }

        let data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            company: req.body.company,
            address: req.body.address,
            profile_image: image_name,
        };

        const contact = new Contact(data)
        const resData = await contact.save(data)
        return successResponse(res, resData, 'Contact added successfully', 200)

    } catch (err) {
        return catchResponse(res, err.message, 'Something went wrong', 500)
    }
}

exports.update = async function (req, res) {
    const { error, isValid } = addContactValidation(req.body)

    if (!isValid) {
        return errorResponse(res, error, "Invalid Request", 400)
    }

    try {
        let id = req.params.id
        let contact = await Contact.find({ "_id": id })
        if (contact == null) {
            return errorResponse(res, {}, 'Contact does not exist', 400)
        }

        let image_name = contact[0].profile_image; // Use the current image name as default

        if (req.files != null && req.files.profile_image) {
            let image = req.files.profile_image
            image_name = req.files.profile_image.name
            let file_extension = getFileExtension(image_name)
            image_name = `${uuidv4()}.${file_extension}`

            await image.mv(`public/images/contact_image/${image_name}`);

            // Delete the old image file
            const filePath = `public/images/contact_image/${contact[0].profile_image}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log('File does not exist.');
                    } else {
                        console.error('Error deleting file:', err);
                    }
                } else {
                    console.log('File deleted successfully');
                }
            });
        }

        let updatedData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            company: req.body.company,
            address: req.body.address,
            profile_image: image_name,
        };

        const resData = await Contact.findByIdAndUpdate(
            id, updatedData
        )
        return successResponse(res, resData, 'Contact Updated successfully', 200)

    } catch (err) {
        return catchResponse(res, err.message, 'Something went wrong', 500)
    }
}

exports.delete = async function (req, res) {
    try {
        let id = req.params.id
        let contact = await Contact.find({ "_id": id })
        if (contact == null) {
            return errorResponse(res, {}, 'Contact does not exists', 400)
        }
        fs.unlink(`public/images/contact_image/${contact[0].profile_image}`, (err) => {
            console.log("error in remove image from file system in Update data ", err);
        });

        await Contact.deleteOne({ "_id": id })

        return successResponse(res, contact, 'Contact deleted successfully', 200)
    } catch (e) {
        console.log(e)
        return catchResponse(res, {}, e, 'Something went wrong', 500)
    }
}

exports.get = async function (req, res) {
    try {
        let id = req.params.id
        let contact = await Contact.find({ "_id": id })
        if (contact == null) {
            return errorResponse(res, {}, 'Contact does not exists', 400)
        }
        if (contact[0].profile_image) {
            let base_url = req.protocol + "://" + req.headers.host
            let image = `/images/contact_image/${contact[0].profile_image}`;
            contact[0].profile_image = `${base_url}${image}`;
        }

        return successResponse(res, contact, 'Contact deleted successfully', 200)
    } catch (e) {
        console.log(e)
        return catchResponse(res, {}, e, 'Something went wrong', 500)
    }
}