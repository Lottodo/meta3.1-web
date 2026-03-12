const send = (res, status, payload) => {
  const format = res.locals.format === 'text' ? 'text' : 'json';

  if (format === 'text') {
    const body = typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);

    return res.status(status).type('text/plain; charset=utf-8').send(body);
  }

  return res.status(status).json(payload);
}

const ok = (res, data, status = 200, extra = {}) => {
  return send(res,status, {
    success: true,
    ...extra,
    data
  });
}

const fail = (res, message, status = 400, extra = {}) => {
  return send(res,status, {
    success: false,
    message,
    ...extra,
  });
}

module.exports = {
  send,
  ok,
  fail
};