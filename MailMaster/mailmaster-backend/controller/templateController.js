const TemplateService = require('../services/TemplateService');


class TemplateController {
    async create(req, res) {
        try {
            //1. getting user id from request object
            // const userId = req.user ? req.user.id : 'e965629e-8d5b-4e5c-9ef6-41e78daa228a';
            const userId = req.user.id;

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
            // const userId = req.user?.id || 'e965629e-8d5b-4e5c-9ef6-41e78daa228a';
            const userId = req.user.id;
            const templates = await TemplateService.getTemplatesForUser(userId)
            res.json(templates)
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" })
        }
    }


    async update(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const updatedTemplate = await TemplateService.updateTemplate(userId, id, req.body);

            if (!updatedTemplate) {
                res.status(404).json({ error: "Template not found" });
            }

            res.json(updatedTemplate);
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const deletedTemplate = await TemplateService.deteleTemplate(userId, id);

            if (!deletedTemplate) {
                res.status(404).json({ error: "Template not found" });
            } else {
                res.json({ message: "Template deleted successfully" });
                res.status(200);
            }
        } catch (error) {
            console.error("Error deleting template:", error);
            res.status(500).json({ error: "Internal Server Error" })
        }
    }


}

// Make sure you are exporting an INSTANCE of the class
module.exports = new TemplateController();