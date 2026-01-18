'use strict';

const Homey = require('homey');

module.exports = [
  {
    description: 'Get all tags',
    method: 'GET',
    path: '/tags',
    requires_authorization: true,
    fn: async function(args) {
      const app = await Homey.app;
      return await app.getTags();
    }
  },
  {
    description: 'Add or update a tag',
    method: 'POST',
    path: '/tags',
    requires_authorization: true,
    fn: async function(args) {
      const app = await Homey.app;
      const { tag_id, tag_name } = args.body;

      if (!tag_id || !tag_name) {
        throw new Error('Missing tag_id or tag_name');
      }

      return await app.saveTag(tag_id, { name: tag_name });
    }
  },
  {
    description: 'Delete a tag',
    method: 'DELETE',
    path: '/tags/:tagId',
    requires_authorization: true,
    fn: async function(args) {
      const app = await Homey.app;
      const { tagId } = args.params;

      if (!tagId) {
        throw new Error('Missing tagId');
      }

      return await app.deleteTag(tagId);
    }
  }
];
