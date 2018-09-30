import axios from 'axios';

const TRACE_HEADER = 'x-cloud-trace-context';

const API_PUBLIC_ADDRESS = 'https://www.peddecord.photo/api/v1';

// TODO: make extensible for more addresses...
function getApiAddress() {
  if (
    typeof document === 'undefined' &&
    process.env.API_V1_NODEPORT_SERVICE_HOST &&
    process.env.API_V1_NODEPORT_SERVICE_PORT
  ) {
    return `http://${process.env.API_V1_NODEPORT_SERVICE_HOST}:${
      process.env.API_V1_NODEPORT_SERVICE_PORT
    }`;
  }

  return API_PUBLIC_ADDRESS;
}

async function axiosMiddleware(ctx, next) {
  const trace = ctx.headers[TRACE_HEADER] || 'local';

  const instance = axios.create({
    headers: {
      [TRACE_HEADER]: trace,
    },
  });

  instance.interceptors.request.use((req) => {
    const serviceURL = getApiAddress();

    const newReq = {
      ...req,
      baseURL: serviceURL,
    };

    ctx.logger.info(
      {
        method: req.method.toUpperCase(),
        serviceURL: serviceURL + req.url,
      },
      'service call'
    );

    return newReq;
  });

  ctx.axios = instance;

  return next();
}

export default axiosMiddleware;
