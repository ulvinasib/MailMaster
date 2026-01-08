const TemplateService = require( '../services/TemplateService');


class TemplateController {
    async create(req, res) {
        try {
            //1. getting user id from request object
            const userId = req.user ? req.user.id : 'e965629e-8d5b-4e5c-9ef6-41e78daa228a';

            //2.Passing the useriD FROM and data to service layer
            const template = await TemplateService.createTemplate(userId, req.body);

            res.status(201).json(template);
        } catch (error) {
            console.error("Error creating template:", error);
            res.status(500).json({ error: "Internal Server Error" })
        }
    }


    async getAll(req, res) {
        try {
            const userId = req.user.id;
            const templates = await TemplateService.getTemplatesForUser(userId)
            res.json(templates)
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" })
        }
    }


    async update(req,res){
        try {
            const userId = req.user.id;
            const templateId = req.params.id;
            const updatedTemplate = await TemplateService.updatedTemplate(userId,templateId, req.body);
            res.json(updatedTemplate)
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" })
        }
    }
}

// Make sure you are exporting an INSTANCE of the class
module.exports = new TemplateController();