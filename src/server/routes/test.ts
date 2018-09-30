const temporaryTemplate = (s: string): string => {
  return `<!DOCTYPE html><html><head><meta name="google-site-verification" content="LIA0G4bJQIQGiM8VX3vHKIJf_yRMiG8TQqQKRPkkJ2g" /></head><body>API Response: ${s}</body></html>`;
};

export default [
  '/test',
  async (ctx) => {
    const results = await ctx.axios({
      method: 'get',
      baseURL: '<API_V1>',
      url: '/graphql?query={galleries{id}}',
    });

    ctx.body = temporaryTemplate(
      `<code>${JSON.stringify(results.data)}</code>`
    );
  },
];
