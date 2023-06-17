'use strict';

/**
 * A set of functions called "actions" for `send-email`
 */

module.exports = {
	sendEmail: async (ctx, next) => {
		await strapi.plugins['email'].services.email.send({
			to: 'azracstudios@gmail.com',
			from: 'adarshravicoimbatore@gmail.com', //e.g. single sender verification in SendGrid
			cc: 'azracstudios@gmail.com, ravikumarr.tii@gmail.com',
			subject: 'Quote Request',
			attachments: [
				{
					filename: `${ctx.request.body.filename}`,
					content: `${ctx.request.body.fileContent}`
				}
			]
		});
    return "Success!"
	}
};
