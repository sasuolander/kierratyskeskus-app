const fs = require('fs');
const Template = require('../controllers/templates.controller');

const TemplateRoutes = (app) => {
  // all templates
  app.get('/allTemplates', (req, res) => {
    fs.readFile(`${__dirname}/data.json`, (err, data) => {
      if (err) {
        res.status(500).send('something went wrong');
      } else {
        const templates = JSON.parse(data);
        res.status(200).send(templates);
      }
    });
  });

  // template by id
  app.get('/template/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile(`${__dirname}/data.json`, (err, data) => {
      if (err) {
        res.status(200).send('something went wrong');
      } else {
        const template = JSON.parse(data);
        const needle = id.toString();
        let result = template[0];

        for (let i = 0; i < template.length; i++) {
          if (template[i].temp_id === needle) {
            result = template[i];
            i = template.length;
          }
        }

        res.status(200).send(result);
      }
    });
  });


  // templates by category id
  app.get('/templates/:catId', (req, res) => {
    const { catId } = req.params;
    Template.getAllBySubCatId((catId), (err, templatesCat) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.status(200).send(templatesCat);

      return null;
    });
  });


  app.post('/createTemplate', (req, res) => {
    const { template } = req.body;

    fs.readFile(`${__dirname}/data.json`, (err, data) => {
      if (err) {
        res.status(200).send('something went wrong');
      } else {
        const templates = JSON.parse(data);

        templates.push(template);

        fs.writeFile(`${__dirname}/data.json`, JSON.stringify(templates), (error) => {
          if (error) res.status(500).send('error ');
          console.log('Data written to file');
          res.status(200).send('New template is added');
        });
      }
    });
  });
};

module.exports = TemplateRoutes;