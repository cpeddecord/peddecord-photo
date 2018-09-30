const temporaryTemplate = (s: string): string => {
  return `<!DOCTYPE html><html><head><meta name="google-site-verification" content="LIA0G4bJQIQGiM8VX3vHKIJf_yRMiG8TQqQKRPkkJ2g" /></head><body>hello world: ${s}</body></html>`;
};

export default [
  '/*',
  async (ctx): Promise<any> => {
    ctx.body = temporaryTemplate(ctx.request.path);
  },
];
