'use strict';

module.exports = [
  {
    description: 'Get all tags',
    method: 'GET',
    path: '/tags',
    requires_authorization: true,
    fn: async function({ homey }) {
      const app = homey.app;
      return await app.getTags();
    }
  },
  {
    description: 'Add or update a tag',
    method: 'POST',
    path: '/tags',
    requires_authorization: true,
    fn: async function({ homey, body }) {
      const app = homey.app;
      const { tag_id, tag_name } = body;

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
    fn: async function({ homey, params }) {
      const app = homey.app;
      const { tagId } = params;

      if (!tagId) {
        throw new Error('Missing tagId');
      }

      return await app.deleteTag(tagId);
    }
  }
];
